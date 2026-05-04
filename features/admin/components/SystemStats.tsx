import React from 'react';
import { MetricCard } from '../../../shared/ui/MetricCard';

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
      <MetricCard label="Pending Proposals" value={pendingProjects} tone="warning" />
      <MetricCard label="Trip Requests" value={pendingTrips} tone="warning" />
      <MetricCard label="Inquiry Pipeline" value={inquiryCount} tone="accent" />
      <MetricCard label="Documents Ready" value={documentReadyCount} tone="primary" />
      <MetricCard label="Sites Notified" value={siteNotificationCount} />
    </div>
  );
};
