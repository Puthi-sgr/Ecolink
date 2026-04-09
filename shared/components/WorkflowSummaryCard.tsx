import React from 'react';
import { ArrowRightCircle, FileStack, MessageSquareText, UserCircle2 } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Card } from '../molecules/Card';
import { CBETPackage, QuoteRequest, TripPlan, UserRole } from '../types';

interface WorkflowSummaryCardProps {
  request: QuoteRequest;
  pkg?: CBETPackage;
  plan?: TripPlan;
  title?: string;
  actions?: React.ReactNode;
  showInternalNotes?: boolean;
  onOpenPackage?: () => void;
}

const roleLabel = (role: UserRole) => {
  switch (role) {
    case UserRole.PUBLIC:
      return 'Public traveler';
    case UserRole.FACULTY:
      return 'Faculty requester';
    case UserRole.ADMIN:
      return 'Admin operations';
    default:
      return role;
  }
};

const badgeVariantMap: Record<QuoteRequest['status'], 'outline' | 'secondary' | 'primary' | 'accent'> = {
  Draft: 'outline',
  'Needs Info': 'secondary',
  'Under Review': 'primary',
  Quoted: 'accent',
  Approved: 'primary',
  Locked: 'accent',
};

export const WorkflowSummaryCard: React.FC<WorkflowSummaryCardProps> = ({
  request,
  pkg,
  plan,
  title = 'Workflow summary',
  actions,
  showInternalNotes = false,
  onOpenPackage,
}) => {
  const visibleComments = request.comments.filter((comment) =>
    showInternalNotes ? true : comment.scope === 'requester'
  );
  const requesterNoteCount = request.comments.filter((comment) => comment.scope === 'requester').length;
  const internalNoteCount = request.comments.filter((comment) => comment.scope === 'internal').length;

  return (
    <Card title={title} actions={actions} className="rounded-[28px] border border-border bg-white shadow-sm">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-lg font-bold text-text">{pkg?.cbetSite || request.packageId}</p>
              <Badge variant={badgeVariantMap[request.status]} size="sm">
                {request.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-text-muted">{request.purpose || 'Purpose pending'}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <UserCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Owner: {roleLabel(request.currentOwnerRole)}
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl bg-surface p-4 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Target date</p>
            <p className="mt-1 text-sm font-semibold text-text">{request.targetDate || plan?.targetDate || 'Pending'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Group size</p>
            <p className="mt-1 text-sm font-semibold text-text">{request.groupSize || plan?.groupSize || 'Pending'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Transport</p>
            <p className="mt-1 text-sm font-semibold text-text">{request.transportPreference || 'Pending'}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <ArrowRightCircle className="h-4 w-4 text-primary" aria-hidden="true" />
            Next action
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{request.nextAction}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <FileStack className="h-4 w-4 text-primary" aria-hidden="true" />
              Documents
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {request.documentStates.map((documentState) => (
                <Badge key={documentState.key} variant="surface" size="sm">
                  {documentState.label}: {documentState.status}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
              Notes
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="surface" size="sm">
                {requesterNoteCount} requester-visible
              </Badge>
              {showInternalNotes ? (
                <Badge variant="surface" size="sm">
                  {internalNoteCount} internal
                </Badge>
              ) : null}
            </div>
            {visibleComments[0] ? (
              <p className="mt-3 text-sm text-text-muted">{visibleComments[0].body}</p>
            ) : (
              <p className="mt-3 text-sm text-text-muted">No notes recorded yet.</p>
            )}
          </div>
        </div>

        {request.missingFields.length ? (
          <div className="flex flex-wrap gap-2">
            {request.missingFields.map((field) => (
              <Badge key={field} variant="outline" size="sm" className="border-amber-300 text-amber-900">
                {field}
              </Badge>
            ))}
          </div>
        ) : null}

        {onOpenPackage ? (
          <div className="pt-1">
            <Button variant="outline" size="sm" onClick={onOpenPackage}>
              Open package
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
