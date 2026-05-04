import React from 'react';
import { EmptyState } from './EmptyState';
import { SurfaceSection } from './SurfaceSection';

interface DataTableCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export const DataTableCard: React.FC<DataTableCardProps> = ({
  title,
  description,
  actions,
  emptyTitle = 'Nothing to show yet',
  emptyDescription = 'This table will populate once records are available.',
  isEmpty = false,
  children,
}) => (
  <SurfaceSection title={title} actions={actions} className="overflow-hidden" contentClassName="mt-0">
    {description ? <p className="-mt-2 mb-4 text-sm text-text-muted">{description}</p> : null}
    {isEmpty ? <EmptyState title={emptyTitle} description={emptyDescription} /> : <div className="overflow-x-auto">{children}</div>}
  </SurfaceSection>
);

