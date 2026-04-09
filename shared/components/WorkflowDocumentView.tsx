import React from 'react';
import { CalendarDays, FileCheck2, MapPinned, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Card } from '../molecules/Card';
import { CBETPackage, DocumentAudience, DocumentViewMode, QuoteRequest, Trip, TripPlan } from '../types';

interface WorkflowDocumentViewProps {
  mode: DocumentViewMode;
  audience?: DocumentAudience;
  pkg: CBETPackage;
  plan?: TripPlan;
  request?: QuoteRequest;
  trip?: Trip;
  printMode?: boolean;
  onPrint?: () => void;
  onExitPrint?: () => void;
  onOpenDocument?: () => void;
}

const statusLabel = (request?: QuoteRequest, plan?: TripPlan, trip?: Trip) =>
  request?.status || trip?.status || plan?.status || 'Draft';

const audienceLabelMap: Record<DocumentAudience, string> = {
  requester: 'Requester',
  faculty: 'Faculty',
  admin: 'Admin operations',
};

const getDocumentHeading = (mode: DocumentViewMode, audience: DocumentAudience) => {
  if (mode === 'approval-pack') {
    if (audience === 'admin') return 'Admin approval pack';
    if (audience === 'faculty') return 'Faculty approval summary';
    return 'Requester confirmation pack';
  }

  if (mode === 'itinerary') {
    return audience === 'admin' ? 'Operations itinerary' : 'Trip itinerary';
  }

  return audience === 'faculty' ? 'Faculty trip brief' : audience === 'admin' ? 'Operations brief' : 'Requester trip brief';
};

const getDocumentIntro = (mode: DocumentViewMode, audience: DocumentAudience) => {
  if (mode === 'approval-pack') {
    if (audience === 'admin') {
      return 'Operational handoff artifact with document readiness, routing checkpoints, and approval assumptions.';
    }
    if (audience === 'faculty') {
      return 'Condensed approval-facing view of the package assumptions, readiness, and next actions.';
    }
    return 'High-level confirmation view showing which approvals and logistics steps are underway.';
  }

  if (mode === 'itinerary') {
    if (audience === 'admin') {
      return 'Routing-aware itinerary draft for internal sequencing and coordination.';
    }
    if (audience === 'faculty') {
      return 'Field-ready itinerary draft with timing and teaching context.';
    }
    return 'Traveler-facing itinerary outline with the core trip flow.';
  }

  if (audience === 'admin') {
    return 'Internal summary of traveler assumptions, fit, and operational risk before lock-in.';
  }
  if (audience === 'faculty') {
    return 'Faculty-facing trip brief with learning context, readiness, and next decision points.';
  }
  return 'Traveler-facing brief covering package fit, assumptions, and readiness.';
};

const renderChecklist = (request?: QuoteRequest, audience: DocumentAudience = 'requester') => {
  if (request?.missingFields.length) {
    return (
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        {request.missingFields.map((field) => (
          <li key={field}>Pending: {field}</li>
        ))}
      </ul>
    );
  }

  if (audience === 'admin') {
    return (
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        <li>Routing and transfer assumptions are captured.</li>
        <li>Document statuses are ready for ops review.</li>
        <li>Approval-pack dependencies can move forward.</li>
      </ul>
    );
  }

  if (audience === 'faculty') {
    return (
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        <li>Field-trip purpose and cohort assumptions are aligned.</li>
        <li>Transport preference is ready for internal review.</li>
        <li>Brief is ready to share within the department.</li>
      </ul>
    );
  }

  return (
    <ul className="mt-3 space-y-2 text-sm text-text-muted">
      <li>Preferred date confirmed or provisionally aligned.</li>
      <li>Transport assumption captured and ready for coordination.</li>
      <li>Ready to use for faculty/admin review and print export.</li>
    </ul>
  );
};

const DocumentArticle: React.FC<WorkflowDocumentViewProps> = ({
  mode,
  audience = 'requester',
  pkg,
  plan,
  request,
  trip,
}) => {
  const date = request?.targetDate || plan?.targetDate || trip?.date || 'Date pending';
  const groupSize = request?.groupSize || plan?.groupSize || (trip ? String(trip.groupSize) : 'Group size pending');
  const purpose = request?.purpose || plan?.notes || trip?.purpose || 'Purpose pending';

  return (
    <article
      data-print-root="true"
      className="mx-auto max-w-4xl rounded-[32px] border border-border bg-white p-6 shadow-sm md:p-10"
    >
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted">
              EcoLink document engine
            </p>
            <h1 className="mt-2 text-3xl font-bold font-serif text-text">{getDocumentHeading(mode, audience)}</h1>
            <p className="mt-2 text-sm text-text-muted">{getDocumentIntro(mode, audience)}</p>
            <p className="mt-3 text-sm text-text-muted">
              {pkg.cbetSite} | {pkg.location} | {pkg.managingOrg}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="surface" size="sm">
              {audienceLabelMap[audience]}
            </Badge>
            <Badge variant="accent" size="sm">
              {statusLabel(request, plan, trip)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            Target date
          </div>
          <p className="mt-2 text-sm font-semibold text-text">{date}</p>
        </div>
        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
            Group size
          </div>
          <p className="mt-2 text-sm font-semibold text-text">{groupSize}</p>
        </div>
        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
            <MapPinned className="h-4 w-4 text-primary" aria-hidden="true" />
            Meeting point
          </div>
          <p className="mt-2 text-sm font-semibold text-text">{pkg.meetingPoint}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-surface p-5">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
              {mode === 'brief' && 'Planning summary'}
              {mode === 'itinerary' && 'Trip flow'}
              {mode === 'approval-pack' && 'Approval summary'}
            </p>

            {mode === 'brief' ? (
              <div className="mt-3 space-y-4">
                <p className="text-sm leading-relaxed text-text-muted">{purpose}</p>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>Lead time: {pkg.bookingConditions.minLeadTimeDays} days minimum</li>
                  <li>Transport chain: {pkg.transportModes.join(' -> ')}</li>
                  <li>Cancellation: {pkg.cancellationSummary}</li>
                </ul>
              </div>
            ) : null}

            {mode === 'itinerary' ? (
              <ol className="mt-3 space-y-3 text-sm text-text-muted">
                {pkg.scheduleOutline.map((item) => (
                  <li key={item} className="rounded-xl border border-border bg-surface px-3 py-2">
                    {item}
                  </li>
                ))}
              </ol>
            ) : null}

            {mode === 'approval-pack' ? (
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>Document set status: {request?.documentStates.map((state) => `${state.label} ${state.status}`).join(', ') || 'Pending'}</li>
                <li>Site notification: {trip?.siteNotified ? 'Ready' : 'Pending'}</li>
                <li>Transport status: {trip?.transportStatus || 'Pending'}</li>
              </ul>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                Readiness checklist
              </div>
              {renderChecklist(request, audience)}
            </div>

            <div className="rounded-2xl bg-white p-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                <FileCheck2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Audience callout
              </div>
              <p className="mt-3 text-sm text-text-muted">
                {audience === 'admin'
                  ? 'Use this artifact to coordinate approval readiness, transport sequencing, and site communication.'
                  : audience === 'faculty'
                    ? 'Use this artifact to align department reviewers and keep field-trip assumptions consistent.'
                    : 'Use this artifact to understand what is being requested and what still needs confirmation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const WorkflowDocumentView: React.FC<WorkflowDocumentViewProps> = (props) => {
  const audience = props.audience || 'requester';

  if (props.printMode) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden" data-print-hide="true">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
              {audienceLabelMap[audience]} document mode
            </p>
            <p className="mt-1 text-sm text-text-muted">Use the browser print dialog once this document is ready.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {props.onExitPrint ? (
              <Button variant="ghost" size="sm" onClick={props.onExitPrint}>
                Back to workspace
              </Button>
            ) : null}
            {props.onPrint ? (
              <Button size="sm" onClick={props.onPrint}>
                Print / Export
              </Button>
            ) : null}
          </div>
        </div>
        <DocumentArticle {...props} audience={audience} />
      </div>
    );
  }

  return (
    <Card
      title={getDocumentHeading(props.mode, audience)}
      actions={
        <div className="flex flex-wrap gap-2">
          {props.onOpenDocument ? (
            <Button variant="outline" size="sm" onClick={props.onOpenDocument}>
              Open document mode
            </Button>
          ) : null}
          {props.onPrint ? (
            <Button variant="outline" size="sm" onClick={props.onPrint}>
              Print / Export
            </Button>
          ) : null}
        </div>
      }
      className="rounded-[28px] border border-border bg-white shadow-sm"
    >
      <DocumentArticle {...props} audience={audience} />
    </Card>
  );
};
