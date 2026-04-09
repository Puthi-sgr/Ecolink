import {
  PlannerStatus,
  ProjectStatus,
  QuoteDocumentState,
  QuoteRequest,
  Trip,
  TripPlan,
  UserRole,
  WorkflowRecord,
  WorkflowStatus,
} from '../types';

const FALLBACK_DOCUMENTS: QuoteDocumentState[] = [
  {
    key: 'brief',
    label: 'Trip brief',
    status: 'Draft',
    summary: 'Planner brief is still being prepared.',
    updatedAt: '',
  },
  {
    key: 'itinerary',
    label: 'Itinerary draft',
    status: 'Pending',
    summary: 'Itinerary will appear after request review begins.',
    updatedAt: '',
  },
  {
    key: 'approval-pack',
    label: 'Approval pack',
    status: 'Pending',
    summary: 'Approval pack stays pending until the trip is approved.',
    updatedAt: '',
  },
];

export const mapPlannerStatusToWorkflowStatus = (status: PlannerStatus): WorkflowStatus => {
  switch (status) {
    case 'Draft':
      return 'Draft';
    case 'Ready to Request':
    case 'Ready for Faculty Review':
      return 'Under Review';
    case 'Requested':
      return 'Under Review';
    default:
      return 'Draft';
  }
};

export const mapProjectStatusToWorkflowStatus = (status: ProjectStatus): WorkflowStatus => {
  switch (status) {
    case ProjectStatus.PENDING:
      return 'Under Review';
    case ProjectStatus.APPROVED:
      return 'Approved';
    case ProjectStatus.LOCKED:
      return 'Locked';
    case ProjectStatus.CANCELLED:
    case ProjectStatus.COMPLETED:
    default:
      return 'Locked';
  }
};

const sortByCreatedDate = (left?: string, right?: string) => {
  const leftDate = new Date(left || '1970-01-01').getTime();
  const rightDate = new Date(right || '1970-01-01').getTime();
  return rightDate - leftDate;
};

const linkTripToRequest = (request: QuoteRequest | undefined, trips: Trip[]) => {
  if (!request) return undefined;

  return (
    trips.find((trip) => trip.quoteRequestId === request.id) ||
    trips.find(
      (trip) =>
        trip.tripPlanId === request.tripPlanId ||
        (trip.packageId === request.packageId &&
          trip.date === request.targetDate &&
          trip.purpose === request.purpose)
    )
  );
};

const buildRecordFromRequest = (request: QuoteRequest, plans: TripPlan[], trips: Trip[]): WorkflowRecord => {
  const linkedPlan = request.tripPlanId ? plans.find((plan) => plan.id === request.tripPlanId) : undefined;
  const linkedTrip = linkTripToRequest(request, trips);

  return {
    id: request.id,
    packageId: request.packageId,
    plan: linkedPlan,
    request,
    trip: linkedTrip,
    status: linkedTrip ? mapProjectStatusToWorkflowStatus(linkedTrip.status) : request.status,
    ownerRole: request.currentOwnerRole,
    deadlineDate: linkedTrip?.date || request.targetDate || linkedPlan?.targetDate || '',
    documentStates: request.documentStates,
    missingFields: request.missingFields,
    nextAction: request.nextAction,
    revisionCount: request.revisionCount,
    isTripLinked: Boolean(linkedTrip),
  };
};

const buildRecordFromPlan = (plan: TripPlan): WorkflowRecord => ({
  id: plan.id,
  packageId: plan.packageIds[0] || '',
  plan,
  status: mapPlannerStatusToWorkflowStatus(plan.status),
  ownerRole: plan.travelerType === 'Leisure' ? UserRole.PUBLIC : UserRole.FACULTY,
  deadlineDate: plan.targetDate,
  documentStates: FALLBACK_DOCUMENTS.map((document) => ({
    ...document,
    updatedAt: plan.createdAt,
  })),
  missingFields: [
    ...(!plan.targetDate ? ['Preferred date'] : []),
    ...(!plan.groupSize ? ['Group size'] : []),
    ...(!plan.notes ? ['Purpose'] : []),
  ],
  nextAction:
    plan.status === 'Draft'
      ? 'Complete the planner notes and target date, then create or submit a request.'
      : 'Open the request workspace and review the linked request state.',
  revisionCount: 0,
  isTripLinked: false,
});

export const buildWorkflowRecords = (
  plans: TripPlan[],
  requests: QuoteRequest[],
  trips: Trip[]
): WorkflowRecord[] => {
  const requestRecords = requests.map((request) => buildRecordFromRequest(request, plans, trips));
  const linkedPlanIds = new Set(requestRecords.map((record) => record.plan?.id).filter(Boolean));
  const unlinkedPlanRecords = plans
    .filter((plan) => !linkedPlanIds.has(plan.id))
    .map((plan) => buildRecordFromPlan(plan));

  return [...requestRecords, ...unlinkedPlanRecords].sort((left, right) =>
    sortByCreatedDate(
      left.request?.lastUpdated || left.plan?.createdAt || left.trip?.date,
      right.request?.lastUpdated || right.plan?.createdAt || right.trip?.date
    )
  );
};

export const groupWorkflowRecords = (records: WorkflowRecord[]) => ({
  savedPlans: records.filter((record) => record.plan && !record.request),
  draft: records.filter((record) => record.status === 'Draft'),
  needsInfo: records.filter((record) => record.status === 'Needs Info'),
  underReview: records.filter((record) => record.status === 'Under Review'),
  quoted: records.filter((record) => record.status === 'Quoted'),
  approved: records.filter((record) => record.status === 'Approved'),
  locked: records.filter((record) => record.status === 'Locked'),
  tripLinked: records.filter((record) => record.isTripLinked),
});

export const getWorkflowRecordById = (records: WorkflowRecord[], id?: string | null) =>
  (id ? records.find((record) => record.id === id) : undefined) || records[0];

export const getTopPackageDemand = (records: WorkflowRecord[]) => {
  const demand = records.reduce<Record<string, number>>((accumulator, record) => {
    if (!record.packageId) return accumulator;
    accumulator[record.packageId] = (accumulator[record.packageId] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(demand).sort((left, right) => right[1] - left[1]);
};

