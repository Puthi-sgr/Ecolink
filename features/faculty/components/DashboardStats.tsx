import React from 'react';
import { Card } from '../../../shared/molecules/Card';

interface DashboardStatsProps {
  activeResearchCount: number;
  upcomingTripsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ activeResearchCount, upcomingTripsCount }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="flex flex-col items-start gap-2">
        <span className="text-text-muted text-sm font-medium">Active Research</span>
        <span className="text-3xl font-bold text-text">{activeResearchCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-text-muted text-sm font-medium">Upcoming Trips</span>
        <span className="text-3xl font-bold text-accent">{upcomingTripsCount}</span>
      </Card>
      <Card className="flex flex-col items-start gap-2">
        <span className="text-text-muted text-sm font-medium">Messages</span>
        <span className="text-3xl font-bold text-primary">2</span>
      </Card>
    </div>
  );
};