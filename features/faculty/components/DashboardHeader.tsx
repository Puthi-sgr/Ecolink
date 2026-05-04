import React from 'react';
import { Button } from '../../../shared/atoms/Button';

interface DashboardHeaderProps {
  userName: string;
  onNewProposal: () => void;
  onOpenPlanner: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onNewProposal, onOpenPlanner }) => {
  return (
    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold font-serif text-text">Faculty Travel Dashboard</h1>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-text-muted">Welcome back, {userName}</p>
          <span className="inline-flex items-center rounded-full border border-primary/10 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            Faculty
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={onOpenPlanner}>
          Open Planner
        </Button>
        <Button onClick={onNewProposal}>New Request Draft</Button>
      </div>
    </header>
  );
};
