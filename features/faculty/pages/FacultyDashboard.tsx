import React from 'react';
import { FacultyLayout } from '../layouts/FacultyLayout';
import { useFacultyProjects } from '../data/facultyData';
import { useTrips } from '../../../app/TripContext';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardStats } from '../components/DashboardStats';
import { ProposalsTable } from '../components/ProposalsTable';
import { TripsTable } from '../components/TripsTable';
import { useAuth } from '../../../app/AuthContext';

export const FacultyDashboard: React.FC = () => {
  const projects = useFacultyProjects();
  const { trips } = useTrips();
  const { user } = useAuth();

  // Filter trips for the logged-in faculty (simple name check for demo)
  const myTrips = trips.filter(t => t.facultyName === user?.name || t.facultyName === 'Dr. Sarah Jenning'); // Keep mock data visible for demo

  return (
    <FacultyLayout>
      <DashboardHeader 
        userName={user?.name || "Faculty Member"}
        onNewProposal={() => console.log('New Proposal')} 
      />
      <DashboardStats 
        activeResearchCount={projects.length} 
        upcomingTripsCount={myTrips.length} 
      />

      <div className="space-y-8">
        <TripsTable trips={myTrips} />
        <ProposalsTable projects={projects} />
      </div>
    </FacultyLayout>
  );
};