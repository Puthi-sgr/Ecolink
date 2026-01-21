import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { useAdminProjects } from '../data/adminData';
import { useTrips } from '../../../app/TripContext';
import { ProjectStatus } from '../../../shared/types';
import { AdminHeader } from '../components/AdminHeader';
import { SystemStats } from '../components/SystemStats';
import { TripOperationsTable } from '../components/TripOperationsTable';
import { ProposalReviewTable } from '../components/ProposalReviewTable';

export const AdminDashboard: React.FC = () => {
  const projects = useAdminProjects();
  const { trips } = useTrips();
  
  const pendingProjects = projects.filter(p => p.status === ProjectStatus.PENDING).length;
  const pendingTrips = trips.filter(t => t.status === ProjectStatus.PENDING).length;

  return (
    <AdminLayout>
      <AdminHeader />
      <SystemStats pendingProjects={pendingProjects} pendingTrips={pendingTrips} />

      <div className="grid lg:grid-cols-2 gap-8">
          <TripOperationsTable trips={trips} />
          <ProposalReviewTable projects={projects} />
      </div>
    </AdminLayout>
  );
};