import React from 'react';
import { AlertCircle, ArrowRightCircle, Clock3, FileText, MessageSquareText, Route, UserCircle2 } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Card } from '../molecules/Card';
import { CBETPackage, QuoteRequest, TripPlan, UserRole } from '../types';

interface QuoteWorkflowPanelProps {
  request: QuoteRequest;
  pkg?: CBETPackage;
  plan?: TripPlan;
  title?: string;
  actions?: React.ReactNode;
  compact?: boolean;
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

export const QuoteWorkflowPanel: React.FC<QuoteWorkflowPanelProps> = ({
  request,
  pkg,
  plan,
  title = 'Quote workflow',
  actions,
  compact = false,
  onOpenPackage,
}) => {
  const topHistory = compact ? request.stageHistory.slice(-2) : request.stageHistory;
  const commentSlice = compact ? request.comments.slice(0, 1) : request.comments;

  return (
    <Card
      title={title}
      actions={actions}
      className="rounded-[28px] border border-border bg-white shadow-sm"
    >
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

          <div className="flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Updated {request.lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Owner: {roleLabel(request.currentOwnerRole)}
            </span>
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl bg-surface p-4 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Target date</p>
            <p className="mt-1 text-sm font-semibold text-text">{request.targetDate || 'Pending'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Group size</p>
            <p className="mt-1 text-sm font-semibold text-text">{request.groupSize || 'Pending'}</p>
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

        {request.missingFields.length ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              Missing information
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {request.missingFields.map((field) => (
                <Badge key={field} variant="outline" size="sm" className="border-amber-300 text-amber-900">
                  {field}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <Route className="h-4 w-4 text-primary" aria-hidden="true" />
              Timeline
            </div>
            <div className="mt-4 space-y-4">
              {topHistory.map((entry, index) => (
                <div key={entry.id} className="relative pl-5">
                  {index !== topHistory.length - 1 ? (
                    <span className="absolute left-[7px] top-5 h-[calc(100%+12px)] w-px bg-border" aria-hidden="true" />
                  ) : null}
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-primary/20 ring-2 ring-white" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-text">{entry.title}</p>
                    <Badge variant={badgeVariantMap[entry.status]} size="sm">
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
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                Document state
              </div>
              <div className="mt-4 space-y-3">
                {request.documentStates.map((documentState) => (
                  <div key={documentState.key} className="rounded-2xl bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-text">{documentState.label}</p>
                      <Badge variant="surface" size="sm">
                        {documentState.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">{documentState.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
                Latest notes
              </div>
              <div className="mt-4 space-y-3">
                {commentSlice.map((comment) => (
                  <div key={comment.id} className="rounded-2xl bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-text">{comment.author}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{comment.date}</p>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {plan ? (
          <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-muted">
            <p className="font-semibold text-text">{plan.name}</p>
            <p className="mt-1">
              Planner status: <span className="font-semibold text-text">{plan.status}</span>
            </p>
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

