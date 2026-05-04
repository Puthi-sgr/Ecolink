import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../atoms/Button';
import { StatusBadge } from '../atoms/StatusBadge';
import { PlannerStatus, ProjectStatus, QuoteRequestStatus } from '../types';

interface DetailHeaderProps {
  title: string;
  meta?: React.ReactNode;
  status?: ProjectStatus | QuoteRequestStatus | PlannerStatus;
  onBack?: () => void;
  backLabel?: string;
  actions?: React.ReactNode;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  meta,
  status,
  onBack,
  backLabel = 'Back',
  actions,
}) => (
  <div className="mb-6">
    {onBack ? (
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-2 pl-0 hover:bg-transparent hover:text-primary text-text-muted"
      >
        <ArrowLeft className="w-4 h-4" /> {backLabel}
      </Button>
    ) : null}
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-serif text-text">{title}</h1>
        {meta ? <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-text-muted">{meta}</div> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actions}
        {status ? <StatusBadge status={status} /> : null}
      </div>
    </div>
  </div>
);
