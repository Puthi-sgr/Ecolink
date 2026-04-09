import React from 'react';
import { Card } from '../../../shared/molecules/Card';

interface SystemStatsProps {
  pendingProjects: number;
  pendingTrips: number;
  inquiryCount: number;
  documentReadyCount: number;
  siteNotificationCount: number;
}

export const SystemStats: React.FC<SystemStatsProps> = ({
  pendingProjects,
  pendingTrips,
  inquiryCount,
  documentReadyCount,
  siteNotificationCount,
}) => {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-5">
      <Card className="flex flex-col gap-1 border-l-4 border-l-status-pending">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Pending Proposals</span>
        <span className="text-2xl font-bold text-text">{pendingProjects}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-clay">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Trip Requests</span>
        <span className="text-2xl font-bold text-text">{pendingTrips}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-accent">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Inquiry Pipeline</span>
        <span className="text-2xl font-bold text-text">{inquiryCount}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-primary">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Documents Ready</span>
        <span className="text-2xl font-bold text-text">{documentReadyCount}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-status-completed">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Sites Notified</span>
        <span className="text-2xl font-bold text-text">{siteNotificationCount}</span>
      </Card>
    </div>
  );
};
