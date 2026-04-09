import React from 'react';
import { usePlanner } from '../../../app/PlannerContext';
import { useTrips } from '../../../app/TripContext';
import { ProjectStatus } from '../../../shared/types';
import { useOperationsRecords } from '../../../shared/hooks/useOperationsRecords';
import { Badge } from '../../../shared/atoms/Badge';
import { Button } from '../../../shared/atoms/Button';
import { WorkflowSummaryCard } from '../../../shared/components/WorkflowSummaryCard';
import { Card } from '../../../shared/molecules/Card';
import { AdminHeader } from '../components/AdminHeader';
import { ProposalReviewTable } from '../components/ProposalReviewTable';
import { SystemStats } from '../components/SystemStats';
import { TripOperationsTable } from '../components/TripOperationsTable';
import { useAdminProjects } from '../data/adminData';
import { AdminLayout } from '../layouts/AdminLayout';
import { useCBETPackages } from '../../../shared/data';
import { buildPlannerWorkspaceRoute } from '../../../shared/utils/hashRoute';

const PIPELINE_STAGES = ['Draft', 'Needs Info', 'Under Review', 'Quoted', 'Approved', 'Locked'] as const;

export const AdminDashboard: React.FC = () => {
  const projects = useAdminProjects();
  const packages = useCBETPackages();
  const { trips } = useTrips();
  const { quoteRequests, plans, reopenQuoteRequest } = usePlanner();
  const { records, groups, topDemand } = useOperationsRecords(plans, quoteRequests, trips);
  const requestRecords = records.filter((record) => record.request);
  const linkedTrips = groups.tripLinked.flatMap((record) => (record.trip ? [record.trip] : []));

  const pendingProjects = projects.filter((project) => project.status === ProjectStatus.PENDING).length;
  const pendingTrips = linkedTrips.filter((trip) => trip.status === ProjectStatus.PENDING).length;
  const documentReadyCount = linkedTrips.filter((trip) => trip.approvalPack?.files.length).length;
  const siteNotificationCount = linkedTrips.filter((trip) => trip.siteNotified).length;
  const focusRecord = records.find((record) => record.request) || records[0];
  const focusRequest = focusRecord?.request;
  const focusPackage = focusRecord ? packages.find((pkg) => pkg.id === focusRecord.packageId) : undefined;

  return (
    <AdminLayout>
      <AdminHeader />
      <SystemStats
        pendingProjects={pendingProjects}
        pendingTrips={pendingTrips}
        inquiryCount={quoteRequests.length}
        documentReadyCount={documentReadyCount}
        siteNotificationCount={siteNotificationCount}
      />

      <div className="mb-8 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
        <Card title="Inquiry workboard">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {PIPELINE_STAGES.map((status) => (
              <div key={status} className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{status}</p>
                <p className="mt-2 text-2xl font-bold text-text">
                  {groups[
                    status === 'Draft'
                      ? 'draft'
                      : status === 'Needs Info'
                        ? 'needsInfo'
                        : status === 'Under Review'
                          ? 'underReview'
                          : status === 'Quoted'
                            ? 'quoted'
                            : status === 'Approved'
                              ? 'approved'
                              : 'locked'
                  ].length}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {status === 'Draft' && 'Planner-created requests waiting to be sent.'}
                  {status === 'Needs Info' && 'Blocked on date, group, or transport assumptions.'}
                  {status === 'Under Review' && 'Ready for quote building and site-fit checks.'}
                  {status === 'Quoted' && 'Quote prepared and waiting on faculty reaction.'}
                  {status === 'Approved' && 'Approved and ready for approval-pack assembly.'}
                  {status === 'Locked' && 'Trip assumptions locked for coordination.'}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Package demand snapshot">
          <div className="space-y-3">
            {topDemand.slice(0, 4).map(([packageId, count]) => {
              const pkg = packages.find((item) => item.id === packageId);
              return (
                <div key={packageId} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
                  <div>
                    <p className="font-semibold text-text">{pkg?.cbetSite || packageId}</p>
                    <p className="mt-1 text-sm text-text-muted">{pkg?.location || 'Shared destination interest'}</p>
                  </div>
                  <Badge variant="surface" size="sm">
                    {count} saved plans
                  </Badge>
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
            title="Admin focus request"
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
                      audience: 'admin',
                    });
                  }}
                >
                  Open in planner
                </Button>
                {focusRequest.status === 'Quoted' || focusRequest.status === 'Approved' ? (
                  <Button variant="outline" size="sm" onClick={() => reopenQuoteRequest(focusRequest.id)}>
                    Reopen for edits
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

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <Card title="Document and logistics readiness">
          <div className="space-y-3">
            {requestRecords.slice(0, 4).map((record) => {
              const request = record.request!;
              const pkg = packages.find((item) => item.id === record.packageId);
              return (
                <div key={request.id} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-text">{pkg?.cbetSite || request.packageId}</p>
                    <Badge variant="surface" size="sm">
                      {request.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">Next action: {request.nextAction}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {request.documentStates.map((documentState) => (
                      <Badge key={documentState.key} variant="outline" size="sm">
                        {documentState.label}: {documentState.status}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        window.location.hash = buildPlannerWorkspaceRoute({
                          request: request.id,
                          plan: record.plan?.id,
                          view: 'documents',
                          document: 'approval-pack',
                          audience: 'admin',
                        });
                      }}
                    >
                      Open in planner
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Reasoned next actions">
          <div className="space-y-3">
            {requestRecords.slice(0, 4).map((record) => (
              <div key={record.id} className="rounded-2xl border border-border bg-surface p-4">
                <p className="font-semibold text-text">{record.status}</p>
                <p className="mt-2 text-sm text-text-muted">{record.nextAction}</p>
                {record.missingFields.length ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-amber-700">
                    Missing: {record.missingFields.join(', ')}
                  </p>
                ) : null}
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      window.location.hash = buildPlannerWorkspaceRoute({
                        request: record.request?.id,
                        plan: record.plan?.id,
                        view: 'history',
                        document: 'brief',
                        audience: 'admin',
                      });
                    }}
                  >
                    Open in planner
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <TripOperationsTable trips={trips} />
        <ProposalReviewTable projects={projects} />
      </div>
    </AdminLayout>
  );
};
