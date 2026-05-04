import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center">
    <p className="text-sm font-semibold text-text">{title}</p>
    <p className="mt-2 text-sm text-text-muted">{description}</p>
  </div>
);

