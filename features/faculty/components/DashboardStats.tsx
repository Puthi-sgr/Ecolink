import React from 'react';
import { MetricCard } from '../../../shared/ui/MetricCard';

interface DashboardStatsProps {
  activeResearchCount: number;
  upcomingTripsCount: number;
  savedPlansCount: number;
  draftRequestsCount: number;
  recentDocumentsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  activeResearchCount,
  upcomingTripsCount,
  savedPlansCount,
  draftRequestsCount,
  recentDocumentsCount,
}) => {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-5">
      <MetricCard label="Active Research" value={activeResearchCount} />
      <MetricCard label="Upcoming Trips" value={upcomingTripsCount} tone="accent" />
      <MetricCard label="Saved Plans" value={savedPlansCount} />
      <MetricCard label="Draft Requests" value={draftRequestsCount} tone="primary" />
      <MetricCard label="Recent Documents" value={recentDocumentsCount} />
    </div>
  );
};
