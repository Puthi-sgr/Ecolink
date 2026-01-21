import React from 'react';
import { Card } from '../../../shared/molecules/Card';

interface SystemStatsProps {
  pendingProjects: number;
  pendingTrips: number;
}

export const SystemStats: React.FC<SystemStatsProps> = ({ pendingProjects, pendingTrips }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="flex flex-col gap-1 border-l-4 border-l-status-pending">
        <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Pending Proposals</span>
        <span className="text-2xl font-bold text-text">{pendingProjects}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-clay">
        <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Trip Requests</span>
        <span className="text-2xl font-bold text-text">{pendingTrips}</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-accent">
        <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Active Grants</span>
        <span className="text-2xl font-bold text-text">12</span>
      </Card>
      <Card className="flex flex-col gap-1 border-l-4 border-l-status-completed">
        <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Total Users</span>
        <span className="text-2xl font-bold text-text">84</span>
      </Card>
    </div>
  );
};