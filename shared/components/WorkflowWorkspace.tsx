import React, { startTransition, useMemo, useState } from 'react';
import {
  ArrowRightCircle,
  CalendarDays,
  FileStack,
  History,
  Route,
  Users,
} from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import {
  CBETPackage,
  DocumentAudience,
  DocumentViewMode,
  QuoteRequest,
  Trip,
  TripPlan,
  UserRole,
  WorkflowHistoryEvent,
  WorkflowNoteScope,
  WorkflowWorkspaceView,
} from '../types';
import { WorkflowDocumentView } from './WorkflowDocumentView';

interface WorkflowWorkspaceProps {
  pkg: CBETPackage;
  plan?: TripPlan;
  requestId?: string;
  request?: QuoteRequest;
  trip?: Trip;
  activeView: WorkflowWorkspaceView;
  documentMode: DocumentViewMode;
  audience: DocumentAudience;
  currentUser?: {
    name: string;
    role: UserRole;
  } | null;
  onViewChange: (view: WorkflowWorkspaceView) => void;
  onDocumentChange: (mode: DocumentViewMode) => void;
  onAudienceChange: (audience: DocumentAudience) => void;
  onOpenPrintMode: (mode: DocumentViewMode, audience: DocumentAudience) => void;
  onAddNote?: (scope: WorkflowNoteScope, body: string) => void;
  onSubmitRequest?: () => void;
  onReopenRequest?: () => void;
}

const requestTabs: WorkflowWorkspaceView[] = ['timeline', 'documents', 'notes', 'history'];
const planTabs: WorkflowWorkspaceView[] = ['brief', 'timeline'];
const documentModes: DocumentViewMode[] = ['brief', 'itinerary', 'approval-pack'];
const audiences: DocumentAudience[] = ['requester', 'faculty', 'admin'];

const badgeVariantMap = {
  Draft: 'outline',
  'Needs Info': 'secondary',
  'Under Review': 'primary',
  Quoted: 'accent',
  Approved: 'primary',
  Locked: 'accent',
} as const;

const historyVariantMap: Record<
  WorkflowHistoryEvent['type'],
  'outline' | 'secondary' | 'primary' | 'accent' | 'surface'
> = {
  stage: 'primary',
  document: 'accent',
  note: 'surface',
  revision: 'secondary',
};

const tabButtonClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    active ? 'bg-primary text-white shadow-sm' : 'bg-surface text-text-muted hover:bg-surface-2'
  }`;

const audienceLabelMap: Record<DocumentAudience, string> = {
  requester: 'Requester',
  faculty: 'Faculty',
  admin: 'Admin ops',
};

const formatHistoryBadge = (event: WorkflowHistoryEvent) => {
  if (event.type === 'note' && event.scope === 'internal') return 'Internal note';
  if (event.type === 'note') return 'Requester note';
  if (event.type === 'document') return 'Document';
  if (event.type === 'revision') return 'Revision';
  return 'Stage';
};

const renderToneBadge = (status: string) =>
  badgeVariantMap[status as keyof typeof badgeVariantMap] || 'surface';

export const WorkflowWorkspace: React.FC<WorkflowWorkspaceProps> = ({
  pkg,
  plan,
  request,
  trip,
  activeView,
  documentMode,
  audience,
  currentUser,
  onViewChange,
  onDocumentChange,
  onAudienceChange,
  onOpenPrintMode,
  onAddNote,
  onSubmitRequest,
  onReopenRequest,
}) => {
  const [requesterDraft, setRequesterDraft] = useState('');
  const [internalDraft, setInternalDraft] = useState('');
  const availableTabs = request ? requestTabs : planTabs;
  const requesterComments = request?.comments.filter((comment) => comment.scope === 'requester') || [];
  const internalComments = request?.comments.filter((comment) => comment.scope === 'internal') || [];
  const historyEvents = useMemo(() => request?.historyEvents || [], [request?.historyEvents]);

  const handleAddNote = (scope: WorkflowNoteScope) => {
    const body = scope === 'requester' ? requesterDraft.trim() : internalDraft.trim();
    if (!body || !onAddNote) return;

    startTransition(() => {
      onAddNote(scope, body);
    });

    if (scope === 'requester') {
      setRequesterDraft('');
    } else {
      setInternalDraft('');
    }
  };

  return (
    <section className="rounded-[32px] border border-border bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 border-b border-border pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Route className="h-3.5 w-3.5" aria-hidden="true" />
              Canonical workflow workspace
            </div>
            <h2 className="mt-4 text-3xl font-bold font-serif text-text">{pkg.cbetSite}</h2>
            <p className="mt-2 max-w-3xl text-sm text-text-muted">
              Review the active request, move through the document set, and keep requester-visible and internal notes in one linked workspace.
            </p>
          </div>

          {request ? (
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={renderToneBadge(request.status)} size="sm">
                {request.status}
              </Badge>
              <Badge variant="surface" size="sm">
                {request.revisionCount} revisions
              </Badge>
            </div>
          ) : (
            <Badge variant="surface" size="sm">
              {plan?.status || 'Draft'}
            </Badge>
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl bg-surface p-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <ArrowRightCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              Next action
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {request?.nextAction ||
                'Use the planner brief to confirm dates, group size, and purpose before converting this plan into a request.'}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-surface p-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Date
              </div>
              <p className="mt-2 text-sm font-semibold text-text">{request?.targetDate || plan?.targetDate || 'Pending'}</p>
            </div>
            <div className="rounded-2xl bg-surface p-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Group
              </div>
              <p className="mt-2 text-sm font-semibold text-text">{request?.groupSize || plan?.groupSize || 'Pending'}</p>
            </div>
            <div className="rounded-2xl bg-surface p-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                <FileStack className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Notes
              </div>
              <p className="mt-2 text-sm font-semibold text-text">
                {request ? `${requesterComments.length} requester / ${internalComments.length} internal` : 'Plan only'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tabButtonClass(activeView === tab)}
            onClick={() => onViewChange(tab)}
          >
            {tab === 'brief' ? 'Brief' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeView === 'brief' && plan ? (
          <WorkflowDocumentView
            mode="brief"
            audience={audience}
            pkg={pkg}
            plan={plan}
            request={request}
            trip={trip}
            onOpenDocument={() => onOpenPrintMode('brief', audience)}
          />
        ) : null}

        {activeView === 'timeline' ? (
          request ? (
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                  <Route className="h-4 w-4 text-primary" aria-hidden="true" />
                  Workflow timeline
                </div>
                <div className="mt-5 space-y-5">
                  {request.stageHistory.map((entry, index) => (
                    <div key={entry.id} className="relative pl-5">
                      {index < request.stageHistory.length - 1 ? (
                        <span className="absolute left-[7px] top-5 h-[calc(100%+20px)] w-px bg-border" aria-hidden="true" />
                      ) : null}
                      <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-primary/20 ring-2 ring-white" aria-hidden="true" />
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-text">{entry.title}</p>
                        <Badge variant={renderToneBadge(entry.status)} size="sm">
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{entry.date}</p>
                      <p className="mt-2 text-sm text-text-muted">{entry.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-sm font-semibold text-text">Readiness blockers</p>
                  {request.missingFields.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {request.missingFields.map((field) => (
                        <Badge key={field} variant="outline" size="sm" className="border-amber-300 text-amber-900">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-text-muted">No active blockers. This workflow can keep moving.</p>
                  )}
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-sm font-semibold text-text">Fast actions</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {request.status === 'Draft' || request.status === 'Needs Info' ? (
                      <Button size="sm" onClick={onSubmitRequest}>
                        Send for review
                      </Button>
                    ) : null}
                    {request.status === 'Quoted' || request.status === 'Approved' ? (
                      <Button variant="outline" size="sm" onClick={onReopenRequest}>
                        Reopen
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-text">Plan timeline</p>
                <div className="mt-4 space-y-4">
                  {[
                    `Plan created on ${plan?.createdAt || 'pending date'}`,
                    plan?.targetDate
                      ? `Target date captured for ${plan.targetDate}.`
                      : 'Preferred date is still pending.',
                    plan?.groupSize
                      ? `Group size captured for ${plan.groupSize} participants.`
                      : 'Group size still needs confirmation.',
                    plan?.notes
                      ? 'Planner purpose notes are ready for request conversion.'
                      : 'Purpose notes are still missing.',
                  ].map((entry) => (
                    <div key={entry} className="rounded-2xl bg-white p-4 text-sm text-text-muted">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-text">Conversion guidance</p>
                <p className="mt-3 text-sm text-text-muted">
                  Use the brief tab to confirm trip assumptions, then convert this plan into a formal request so timeline, notes, and documents become active.
                </p>
              </div>
            </div>
          )
        ) : null}

        {activeView === 'documents' && request ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text">Role-specific documents</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Switch audience and artifact without leaving the planner workspace.
                  </p>
                </div>
                <Button size="sm" onClick={() => onOpenPrintMode(documentMode, audience)}>
                  Print / Export
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {documentModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={tabButtonClass(documentMode === mode)}
                    onClick={() => onDocumentChange(mode)}
                  >
                    {mode === 'approval-pack' ? 'Approval pack' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {audiences.map((audienceValue) => (
                  <button
                    key={audienceValue}
                    type="button"
                    className={tabButtonClass(audience === audienceValue)}
                    onClick={() => onAudienceChange(audienceValue)}
                  >
                    {audienceLabelMap[audienceValue]}
                  </button>
                ))}
              </div>
            </div>

            <WorkflowDocumentView
              mode={documentMode}
              audience={audience}
              pkg={pkg}
              plan={plan}
              request={request}
              trip={trip}
              onOpenDocument={() => onOpenPrintMode(documentMode, audience)}
            />
          </div>
        ) : null}

        {activeView === 'notes' && request ? (
          <div className="grid gap-6 xl:grid-cols-2">
            {[
              {
                scope: 'requester' as WorkflowNoteScope,
                title: 'Requester-visible notes',
                description: 'These notes can be surfaced from public and faculty-facing request views.',
                notes: requesterComments,
                draft: requesterDraft,
                setDraft: setRequesterDraft,
              },
              {
                scope: 'internal' as WorkflowNoteScope,
                title: 'Internal ops notes',
                description: 'Use these notes for admin/faculty coordination that should stay out of public workflow views.',
                notes: internalComments,
                draft: internalDraft,
                setDraft: setInternalDraft,
              },
            ].map((lane) => (
              <div key={lane.scope} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold text-text">{lane.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{lane.description}</p>

                <div className="mt-4 space-y-3">
                  {lane.notes.length ? (
                    lane.notes.map((comment) => (
                      <div key={comment.id} className="rounded-2xl bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-text">{comment.author}</p>
                          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{comment.date}</p>
                        </div>
                        <p className="mt-2 text-sm text-text-muted">{comment.body}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-white p-4 text-sm text-text-muted">
                      No {lane.scope} notes yet.
                    </div>
                  )}
                </div>

                {onAddNote ? (
                  <div className="mt-4 space-y-3 rounded-2xl bg-white p-4">
                    <label className="block text-sm font-semibold text-text" htmlFor={`note-${lane.scope}`}>
                      Add {lane.scope} note
                    </label>
                    <textarea
                      id={`note-${lane.scope}`}
                      value={lane.draft}
                      onChange={(event) => lane.setDraft(event.target.value)}
                      rows={4}
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={
                        lane.scope === 'requester'
                          ? 'Share the next thing the requester should know.'
                          : 'Capture an internal ops handoff or coordination note.'
                      }
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-text-muted">
                        Posting as {currentUser?.name || 'Planner operator'}
                      </p>
                      <Button size="sm" onClick={() => handleAddNote(lane.scope)}>
                        Add note
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {activeView === 'history' && request ? (
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <History className="h-4 w-4 text-primary" aria-hidden="true" />
              What changed
            </div>
            <div className="mt-5 space-y-4">
              {historyEvents.map((event) => (
                <div key={event.id} className="rounded-2xl bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-text">{event.title}</p>
                      <Badge
                        variant={historyVariantMap[event.type] || 'outline'}
                        size="sm"
                      >
                        {formatHistoryBadge(event)}
                      </Badge>
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{event.date}</p>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{event.summary}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
