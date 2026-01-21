import React from 'react';
import { Button } from '../../../shared/atoms/Button';

interface DashboardHeaderProps {
  userName: string;
  onNewProposal: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onNewProposal }) => {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold font-serif text-text">Dashboard</h1>
        <div className="flex items-center gap-2 mt-1">
            <p className="text-text-muted">Welcome back, {userName}</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider">
                Faculty
            </span>
        </div>
      </div>
      <div className="flex gap-2">
            <Button variant="outline" onClick={onNewProposal}>+ New Proposal</Button>
      </div>
    </header>
  );
};