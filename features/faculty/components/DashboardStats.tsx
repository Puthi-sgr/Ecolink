import React from 'react';
import { Card } from '../../../shared/molecules/Card';

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
      <Card className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-text-muted">Active Research</span>
        <span className="text-3xl font-bold text-text">{activeResearchCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-text-muted">Upcoming Trips</span>
        <span className="text-3xl font-bold text-accent">{upcomingTripsCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-text-muted">Saved Plans</span>
        <span className="text-3xl font-bold text-text">{savedPlansCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-text-muted">Draft Requests</span>
        <span className="text-3xl font-bold text-primary">{draftRequestsCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-text-muted">Recent Documents</span>
        <span className="text-3xl font-bold text-text">{recentDocumentsCount}</span>
      </Card>
    </div>
  );
};
