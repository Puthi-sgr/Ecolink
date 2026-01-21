import React from 'react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold font-serif text-text">System Overview</h1>
      <p className="text-text-muted">Manage project approvals, trips, and user access.</p>
    </header>
  );
};