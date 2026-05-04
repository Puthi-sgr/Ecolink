import {
  QuoteDocumentState,
  QuoteRequest,
  QuoteRequestComment,
  QuoteRequestStatus,
  QuoteStageHistoryEntry,
  TripPlan,
  UserRole,
  WorkflowHistoryEvent,
  WorkflowNoteScope,
} from '../types';

type LegacyQuoteStatus = QuoteRequestStatus | 'New';

interface LegacyQuoteCommentSeed extends Partial<QuoteRequestComment> {
  role?: UserRole | 'SYSTEM';
}

interface QuoteWorkflowSeed {
  id: string;
  requesterRole: UserRole;
  targetDate?: string;
  groupSize?: string;
  purpose?: string;
  transportPreference?: string;
  accessibilityNotes?: string;
  tripPlanId?: string;
  lastUpdated?: string;
  status?: LegacyQuoteStatus;
  revisionCount?: number;
  stageHistory?: QuoteStageHistoryEntry[];
  comments?: LegacyQuoteCommentSeed[];
  historyEvents?: WorkflowHistoryEvent[];
}

interface CreateQuoteCommentInput {
  author: string;
  authorRole: UserRole | 'SYSTEM';
  body: string;
  scope: WorkflowNoteScope;
  date?: string;
}

const DOCUMENT_LABELS: Record<QuoteDocumentState['key'], string> = {
  brief: 'Trip brief',
  itinerary: 'Itinerary draft',
  'approval-pack': 'Approval pack',
};

const ROLE_LABELS: Record<UserRole | 'SYSTEM', string> = {
  PUBLIC: 'Public traveler',
  FACULTY: 'Faculty requester',
  ADMIN: 'Admin operations',
  SYSTEM: 'EcoLink workflow',
};

const createStageId = (status: QuoteRequestStatus, date: string) =>
  `${status.toLowerCase().replace(/\s+/g, '-')}-${date}`;

const createHistoryId = (prefix: string, date: string, suffix: string) =>
  `${prefix}-${date.replaceAll('-', '')}-${suffix}`;

const sortHistoryEvents = (events: WorkflowHistoryEvent[]) =>
  [...events].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

const normalizeLegacyComment = (
  comment: LegacyQuoteCommentSeed,
  requesterRole: UserRole,
  lastUpdated: string
): QuoteRequestComment => {
  const authorRole = comment.authorRole || comment.role || requesterRole;
  const scope =
    comment.scope ||
    (authorRole === UserRole.ADMIN || authorRole === 'SYSTEM' ? 'internal' : 'requester');
  const date = comment.date || lastUpdated;

  return {
    id: comment.id || createHistoryId('note', date, `${authorRole}-${scope}`),
    author: comment.author || ROLE_LABELS[authorRole],
    authorRole,
    body: comment.body || '',
    scope,
    date,
  };
};

const createDocumentHistoryEvent = (
  documentState: QuoteDocumentState,
  actorRole: UserRole | 'SYSTEM'
): WorkflowHistoryEvent => ({
  id: createHistoryId('document', documentState.updatedAt || 'pending', `${documentState.key}-${documentState.status}`),
  type: 'document',
  title:
    documentState.status === 'Ready'
      ? `${documentState.label} ready`
      : documentState.status === 'Draft'
        ? `${documentState.label} updated`
        : `${documentState.label} pending`,
  summary: documentState.summary,
  actorRole,
  date: documentState.updatedAt,
  documentKey: documentState.key,
});

const createNoteHistoryEvent = (comment: QuoteRequestComment): WorkflowHistoryEvent => ({
  id: `history-${comment.id}`,
  type: 'note',
  title: comment.scope === 'internal' ? 'Internal note added' : 'Requester note added',
  summary: comment.body,
  actorRole: comment.authorRole,
  date: comment.date,
  scope: comment.scope,
});

const createRevisionHistoryEvent = (
  revisionCount: number,
  date: string,
  actorRole: UserRole
): WorkflowHistoryEvent => ({
  id: createHistoryId('revision', date, String(revisionCount)),
  type: 'revision',
  title: `Revision ${revisionCount} opened`,
  summary: 'The request was reopened so dates, transport, or readiness assumptions could be adjusted.',
  actorRole,
  date,
});

const createStageHistoryEvent = (entry: QuoteStageHistoryEntry): WorkflowHistoryEvent => ({
  id: `history-${entry.id}`,
  type: 'stage',
  title: entry.title,
  summary: entry.summary,
  actorRole: entry.actorRole,
  date: entry.date,
});

const buildInitialHistoryEvents = (
  stageHistory: QuoteStageHistoryEntry[],
  comments: QuoteRequestComment[],
  documentStates: QuoteDocumentState[],
  revisionCount: number,
  requesterRole: UserRole,
  lastUpdated: string
) =>
  sortHistoryEvents([
    ...stageHistory.map(createStageHistoryEvent),
    ...comments.map(createNoteHistoryEvent),
    ...documentStates
      .filter((documentState) => documentState.updatedAt && documentState.status !== 'Pending')
      .map((documentState) => createDocumentHistoryEvent(documentState, UserRole.ADMIN)),
    ...(revisionCount > 0 ? [createRevisionHistoryEvent(revisionCount, lastUpdated, requesterRole)] : []),
  ]);

export const normalizeQuoteStatus = (status?: LegacyQuoteStatus): QuoteRequestStatus => {
  switch (status) {
    case 'New':
      return 'Under Review';
    case 'Needs Info':
    case 'Quoted':
    case 'Approved':
    case 'Locked':
    case 'Draft':
    case 'Under Review':
      return status;
    default:
      return 'Draft';
  }
};

export const getQuoteMissingFields = (
  seed: Partial<Pick<QuoteRequest, 'targetDate' | 'groupSize' | 'purpose' | 'transportPreference'>>
) => {
  const missing: string[] = [];
  if (!seed.targetDate?.trim()) missing.push('Preferred date');
  if (!seed.groupSize?.trim()) missing.push('Group size');
  if (!seed.purpose?.trim()) missing.push('Purpose');
  if (!seed.transportPreference?.trim()) missing.push('Transport preference');
  return missing;
};

export const getQuoteOwnerRole = (status: QuoteRequestStatus, requesterRole: UserRole): UserRole => {
  switch (status) {
    case 'Draft':
    case 'Needs Info':
      return requesterRole;
    case 'Under Review':
    case 'Quoted':
    case 'Locked':
      return UserRole.ADMIN;
    case 'Approved':
      return UserRole.FACULTY;
    default:
      return requesterRole;
  }
};

export const getQuoteNextAction = (status: QuoteRequestStatus, missingFields: string[]) => {
  switch (status) {
    case 'Draft':
      return missingFields.length
        ? `Complete ${missingFields.join(', ')} before sending this request forward.`
        : 'Submit this draft for faculty/admin review when the readiness checklist is complete.';
    case 'Needs Info':
      return `Add ${missingFields.join(', ').toLowerCase()} so admin can continue quote preparation.`;
    case 'Under Review':
      return 'Await admin routing, logistics checks, and first quote preparation.';
    case 'Quoted':
      return 'Review the quote summary and reopen it if dates, size, or transport assumptions need revision.';
    case 'Approved':
      return 'Finalize the approval pack and confirm the internal traveler brief.';
    case 'Locked':
      return 'Trip is locked. Use the brief and approval pack to coordinate final operations.';
    default:
      return 'Review the latest request details.';
  }
};

export const getQuoteDocumentStates = (status: QuoteRequestStatus, lastUpdated: string): QuoteDocumentState[] => [
  {
    key: 'brief',
    label: DOCUMENT_LABELS.brief,
    status: 'Ready',
    summary: 'Core package summary, traveler fit, and operating assumptions are available for download.',
    updatedAt: lastUpdated,
  },
  {
    key: 'itinerary',
    label: DOCUMENT_LABELS.itinerary,
    status: status === 'Draft' || status === 'Needs Info' ? 'Draft' : 'Ready',
    summary:
      status === 'Draft' || status === 'Needs Info'
        ? 'Trip flow is drafted, but sequencing still depends on schedule confirmation.'
        : 'Itinerary draft is ready for faculty review and timing feedback.',
    updatedAt: lastUpdated,
  },
  {
    key: 'approval-pack',
    label: DOCUMENT_LABELS['approval-pack'],
    status: status === 'Approved' || status === 'Locked' ? 'Ready' : 'Pending',
    summary:
      status === 'Approved' || status === 'Locked'
        ? 'Approval pack is assembled with logistics notes, payment guidance, and coordination checkpoints.'
        : 'Approval pack will be assembled once the request passes quote and faculty review.',
    updatedAt: lastUpdated,
  },
];

const getStageSummary = (status: QuoteRequestStatus, missingFields: string[]) => {
  switch (status) {
    case 'Draft':
      return 'Request created in the planner and waiting for readiness review.';
    case 'Needs Info':
      return missingFields.length
        ? `Waiting on ${missingFields.join(', ').toLowerCase()} before admin can quote.`
        : 'Waiting on requester clarifications before the quote can move forward.';
    case 'Under Review':
      return 'Admin is checking site fit, lead time, and transport assumptions.';
    case 'Quoted':
      return 'A prototype quote has been prepared and is ready for faculty review.';
    case 'Approved':
      return 'Faculty alignment is complete and the request can move to ops preparation.';
    case 'Locked':
      return 'Trip is locked with final working assumptions for coordination.';
    default:
      return 'Workflow update available.';
  }
};

const getStageTitle = (status: QuoteRequestStatus) => {
  switch (status) {
    case 'Draft':
      return 'Request drafted';
    case 'Needs Info':
      return 'More information required';
    case 'Under Review':
      return 'Admin review in progress';
    case 'Quoted':
      return 'Prototype quote issued';
    case 'Approved':
      return 'Faculty approval confirmed';
    case 'Locked':
      return 'Trip locked for operations';
    default:
      return status;
  }
};

export const createQuoteStageEntry = (
  status: QuoteRequestStatus,
  date: string,
  requesterRole: UserRole,
  missingFields: string[],
  summary?: string
): QuoteStageHistoryEntry => ({
  id: createStageId(status, date),
  status,
  title: getStageTitle(status),
  summary: summary || getStageSummary(status, missingFields),
  actorRole: status === 'Draft' || status === 'Needs Info' ? requesterRole : UserRole.ADMIN,
  date,
});

export const getDefaultQuoteComments = (
  status: QuoteRequestStatus,
  lastUpdated: string,
  requesterRole: UserRole,
  missingFields: string[]
): QuoteRequestComment[] => {
  if (status === 'Needs Info') {
    return [
      {
        id: `note-requester-${lastUpdated}`,
        author: ROLE_LABELS[UserRole.ADMIN],
        authorRole: UserRole.ADMIN,
        scope: 'requester',
        body: `Before we issue a quote, please confirm ${missingFields.join(', ').toLowerCase()} and any site-access constraints.`,
        date: lastUpdated,
      },
      {
        id: `note-internal-${lastUpdated}`,
        author: ROLE_LABELS[UserRole.ADMIN],
        authorRole: UserRole.ADMIN,
        scope: 'internal',
        body: 'Hold quote preparation until the traveler confirms date, group size, and transport assumptions.',
        date: lastUpdated,
      },
    ];
  }

  if (status === 'Quoted' || status === 'Approved' || status === 'Locked') {
    return [
      {
        id: `note-requester-${lastUpdated}`,
        author: ROLE_LABELS[UserRole.ADMIN],
        authorRole: UserRole.ADMIN,
        scope: 'requester',
        body: 'Prototype quote prepared with the current transport, staffing, and readiness assumptions.',
        date: lastUpdated,
      },
      {
        id: `note-internal-${lastUpdated}`,
        author: ROLE_LABELS[requesterRole],
        authorRole: requesterRole,
        scope: 'internal',
        body: 'Reviewed internally. Keep the itinerary draft aligned with the current cohort size and timing window.',
        date: lastUpdated,
      },
    ];
  }

  return [
    {
      id: `note-requester-${lastUpdated}`,
      author: ROLE_LABELS.SYSTEM,
      authorRole: 'SYSTEM',
      scope: 'requester',
      body: 'Planner draft created. Complete readiness details to move this request forward.',
      date: lastUpdated,
    },
  ];
};

export const buildQuoteStageHistory = (
  status: QuoteRequestStatus,
  lastUpdated: string,
  requesterRole: UserRole,
  missingFields: string[],
  revisionCount = 0
) => {
  const history: QuoteStageHistoryEntry[] = [
    {
      id: createStageId('Draft', lastUpdated),
      status: 'Draft',
      title: revisionCount > 0 ? `Revision ${revisionCount} opened` : 'Request drafted',
      summary:
        revisionCount > 0
          ? 'The quote was reopened so date, transport, or readiness assumptions could be updated.'
          : 'A new request was created from the planner or package detail surface.',
      actorRole: requesterRole,
      date: lastUpdated,
    },
  ];

  if (status !== 'Draft') {
    history.push(createQuoteStageEntry(status, lastUpdated, requesterRole, missingFields));
  }

  return history;
};

export const normalizeQuoteRequest = (seed: QuoteWorkflowSeed & Pick<QuoteRequest, 'packageId'>): QuoteRequest => {
  const lastUpdated = seed.lastUpdated || new Date().toISOString().slice(0, 10);
  const status = normalizeQuoteStatus(seed.status);
  const missingFields = getQuoteMissingFields(seed);
  const revisionCount = seed.revisionCount || 0;
  const stageHistory =
    seed.stageHistory && seed.stageHistory.length
      ? seed.stageHistory
      : buildQuoteStageHistory(status, lastUpdated, seed.requesterRole, missingFields, revisionCount);
  const comments =
    (seed.comments && seed.comments.length
      ? seed.comments
      : getDefaultQuoteComments(status, lastUpdated, seed.requesterRole, missingFields)
    ).map((comment) => normalizeLegacyComment(comment, seed.requesterRole, lastUpdated));
  const documentStates = getQuoteDocumentStates(status, lastUpdated);
  const historyEvents =
    seed.historyEvents && seed.historyEvents.length
      ? sortHistoryEvents(seed.historyEvents)
      : buildInitialHistoryEvents(
          stageHistory,
          comments,
          documentStates,
          revisionCount,
          seed.requesterRole,
          lastUpdated
        );

  return {
    id: seed.id,
    tripPlanId: seed.tripPlanId,
    packageId: seed.packageId,
    requesterRole: seed.requesterRole,
    targetDate: seed.targetDate || '',
    groupSize: seed.groupSize || '',
    purpose: seed.purpose || '',
    transportPreference: seed.transportPreference || '',
    accessibilityNotes: seed.accessibilityNotes || '',
    status,
    lastUpdated,
    currentOwnerRole: getQuoteOwnerRole(status, seed.requesterRole),
    nextAction: getQuoteNextAction(status, missingFields),
    missingFields,
    documentStates,
    revisionCount,
    stageHistory,
    comments,
    historyEvents,
  };
};

export const createDraftQuoteFromPlan = (
  requestId: string,
  plan: TripPlan,
  packageId: string,
  requesterRole: UserRole
) =>
  normalizeQuoteRequest({
    id: requestId,
    tripPlanId: plan.id,
    packageId,
    requesterRole,
    targetDate: plan.targetDate,
    groupSize: plan.groupSize,
    purpose: plan.notes,
    transportPreference: '',
    status: 'Draft',
    lastUpdated: new Date().toISOString().slice(0, 10),
  });

export const updateQuoteRequestWorkflow = (
  request: QuoteRequest,
  updates: Partial<QuoteRequest>,
  nextStatus?: QuoteRequestStatus,
  historySummary?: string
) => {
  const lastUpdated = updates.lastUpdated || new Date().toISOString().slice(0, 10);
  const status = nextStatus || updates.status || request.status;
  const stageHistory = [...request.stageHistory];
  const revisionCount = updates.revisionCount ?? request.revisionCount;
  const candidateComments = (updates.comments || request.comments) as LegacyQuoteCommentSeed[];
  const candidate = {
    ...request,
    ...updates,
    status,
    lastUpdated,
    comments: candidateComments,
    stageHistory,
    revisionCount,
  };

  const missingFields = getQuoteMissingFields(candidate);
  const lastStage = stageHistory[stageHistory.length - 1];
  if (!lastStage || lastStage.status !== status || historySummary) {
    stageHistory.push(
      createQuoteStageEntry(status, lastUpdated, request.requesterRole, missingFields, historySummary)
    );
  }

  return normalizeQuoteRequest({
    ...candidate,
    status,
    stageHistory,
    comments: candidateComments,
    historyEvents: request.historyEvents,
  });
};

export const appendQuoteRequestComment = (
  request: QuoteRequest,
  input: CreateQuoteCommentInput
) => {
  const nextIndex = request.comments.length + 1;
  const nextComment = normalizeLegacyComment(
    {
      id: createHistoryId(
        'note',
        input.date || request.lastUpdated,
        `${input.authorRole}-${input.scope}-${nextIndex}`
      ),
      author: input.author,
      authorRole: input.authorRole,
      scope: input.scope,
      body: input.body,
      date: input.date,
    },
    request.requesterRole,
    input.date || request.lastUpdated
  );

  const normalized = normalizeQuoteRequest({
    ...request,
    comments: [...request.comments, nextComment],
    lastUpdated: nextComment.date,
    historyEvents: [...request.historyEvents, createNoteHistoryEvent(nextComment)],
  });

  return {
    ...normalized,
    historyEvents: sortHistoryEvents(normalized.historyEvents),
  };
};
