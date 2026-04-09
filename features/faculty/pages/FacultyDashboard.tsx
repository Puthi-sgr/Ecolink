import React, { useMemo } from 'react';
import { useAuth } from '../../../app/AuthContext';
import { usePlanner } from '../../../app/PlannerContext';
import { useTrips } from '../../../app/TripContext';
import { useOperationsRecords } from '../../../shared/hooks/useOperationsRecords';
import { Badge } from '../../../shared/atoms/Badge';
import { Button } from '../../../shared/atoms/Button';
import { WorkflowSummaryCard } from '../../../shared/components/WorkflowSummaryCard';
import { Card } from '../../../shared/molecules/Card';
import { FacultyLayout } from '../layouts/FacultyLayout';
import { useFacultyProjects } from '../data/facultyData';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardStats } from '../components/DashboardStats';
import { ProposalsTable } from '../components/ProposalsTable';
import { TripsTable } from '../components/TripsTable';
import { useCBETPackages } from '../../../shared/data';
import { buildPlannerWorkspaceRoute } from '../../../shared/utils/hashRoute';

export const FacultyDashboard: React.FC = () => {
  const projects = useFacultyProjects();
  const packages = useCBETPackages();
  const { trips } = useTrips();
  const { user } = useAuth();
  const {
    plans,
    quoteRequests,
    convertPlanToQuoteRequest,
    submitQuoteRequest,
    reopenQuoteRequest,
  } = usePlanner();
  const { records } = useOperationsRecords(plans, quoteRequests, trips);

  const myRecords = records.filter(
    (record) =>
      record.ownerRole === user?.role ||
      record.plan?.travelerType === 'Faculty' ||
      record.plan?.travelerType === 'Research Team'
  );
  const myTrips = myRecords.flatMap((record) =>
    record.trip && (record.trip.facultyName === user?.name || record.trip.facultyName === 'Dr. Sarah Jenning')
      ? [record.trip]
      : []
  );
  const myPlanRecords = myRecords.filter((record) => record.plan && !record.request);
  const myRequestRecords = myRecords.filter((record) => record.request);
  const recentDocuments = myTrips.filter((trip) => trip.approvalPack?.files.length).length;
  const focusRecord = myRequestRecords[0];
  const focusRequest = focusRecord?.request;
  const focusPackage = focusRecord ? packages.find((pkg) => pkg.id === focusRecord.packageId) : undefined;

  const groupedCounts = useMemo(
    () => ({
      savedPlans: myPlanRecords.length,
      needsInfo: myRequestRecords.filter((record) => record.status === 'Needs Info').length,
      readyToSubmit: myRequestRecords.filter((record) => record.status === 'Draft').length,
      quoted: myRequestRecords.filter((record) => record.status === 'Quoted').length,
      upcomingDeadlines: myTrips.filter((trip) => trip.status === 'PENDING').length,
    }),
    [myPlanRecords.length, myRequestRecords, myTrips]
  );

  return (
    <FacultyLayout>
      <DashboardHeader
        userName={user?.name || 'Faculty Member'}
        onNewProposal={() => {
          window.location.hash = '/planner';
        }}
        onOpenPlanner={() => {
          window.location.hash = '/planner';
        }}
      />

      <DashboardStats
        activeResearchCount={projects.length}
        upcomingTripsCount={myTrips.length}
        savedPlansCount={myPlanRecords.length}
        draftRequestsCount={myRequestRecords.length}
        recentDocumentsCount={recentDocuments}
      />

      <div className="mb-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card title="Faculty request lanes">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: 'Saved Plans', value: groupedCounts.savedPlans },
              { label: 'Needs Info', value: groupedCounts.needsInfo },
              { label: 'Ready to Submit', value: groupedCounts.readyToSubmit },
              { label: 'Quoted', value: groupedCounts.quoted },
              { label: 'Upcoming Deadlines', value: groupedCounts.upcomingDeadlines },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Planner handoff panel">
          <div className="space-y-3">
            {myPlanRecords.slice(0, 3).map((record) => {
              const plan = record.plan!;
              const pkg = packages.find((item) => item.id === record.packageId);
              return (
                <div key={plan.id} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-text">{plan.name}</p>
                        <Badge variant="surface" size="sm">
                          {plan.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-text-muted">
                        {pkg?.cbetSite || 'Package pending'} | {plan.targetDate || 'Date pending'} |{' '}
                        {plan.groupSize || 'Size pending'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          window.location.hash = buildPlannerWorkspaceRoute({
                            plan: plan.id,
                            view: 'brief',
                            document: 'brief',
                            audience: 'faculty',
                          });
                        }}
                      >
                        Open in planner
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const request = convertPlanToQuoteRequest(plan.id);
                          if (request) {
                            window.location.hash = buildPlannerWorkspaceRoute({
                              request: request.id,
                              plan: plan.id,
                              view: 'timeline',
                              document: 'brief',
                              audience: 'faculty',
                            });
                          }
                        }}
                      >
                        Convert to request
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {focusRequest && focusPackage ? (
        <div className="mb-8">
          <WorkflowSummaryCard
            request={focusRequest}
            pkg={focusPackage}
            plan={focusRecord?.plan}
            title="Faculty focus request"
            showInternalNotes
            actions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.hash = buildPlannerWorkspaceRoute({
                      request: focusRequest.id,
                      plan: focusRecord?.plan?.id,
                      view: 'timeline',
                      document: 'brief',
                      audience: 'faculty',
                    });
                  }}
                >
                  Open in planner
                </Button>
                {focusRequest.status === 'Draft' || focusRequest.status === 'Needs Info' ? (
                  <Button size="sm" onClick={() => submitQuoteRequest(focusRequest.id)}>
                    Send for review
                  </Button>
                ) : null}
                {focusRequest.status === 'Quoted' || focusRequest.status === 'Approved' ? (
                  <Button variant="outline" size="sm" onClick={() => reopenQuoteRequest(focusRequest.id)}>
                    Reopen
                  </Button>
                ) : null}
              </>
            }
            onOpenPackage={() => {
              window.location.hash = `/package/${focusRequest.packageId}/overview`;
            }}
          />
        </div>
      ) : null}

      <div className="space-y-8">
        <TripsTable trips={myTrips} />
        <ProposalsTable projects={projects} />
      </div>
    </FacultyLayout>
  );
};
