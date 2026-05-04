import React from 'react';
import { PlannerStatus, ProjectStatus, QuoteRequestStatus } from '../types';
import { getStatusPresentation } from '../domain/statusPresentation';

interface StatusBadgeProps {
  status: ProjectStatus | QuoteRequestStatus | PlannerStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const presentation = getStatusPresentation(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset ${presentation.className}`}
    >
      {presentation.label}
    </span>
  );
};
