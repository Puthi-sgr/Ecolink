import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ClipboardList,
  CopyPlus,
  FileStack,
  FolderKanban,
  Route,
  Send,
  SplitSquareVertical,
} from 'lucide-react';
import { useAuth } from '../../../app/AuthContext';
import { usePlanner } from '../../../app/PlannerContext';
import { useTrips } from '../../../app/TripContext';
import { useCBETPackages } from '../../../shared/data';
import { Badge } from '../../../shared/atoms/Badge';
import { Button } from '../../../shared/atoms/Button';
import { PackageExplorerSnapshot } from '../../../shared/components/PackageExplorerInsights';
import { WorkflowDocumentView } from '../../../shared/components/WorkflowDocumentView';
import { WorkflowWorkspace } from '../../../shared/components/WorkflowWorkspace';
import { useOperationsRecords } from '../../../shared/hooks/useOperationsRecords';
import { DocumentAudience, DocumentViewMode, UserRole, WorkflowWorkspaceView } from '../../../shared/types';
import { getWorkflowRecordById } from '../../../shared/utils/operationsModel';
import {
  buildPlannerWorkspaceRoute,
  parseHashRoute,
  parsePlannerWorkspaceQuery,
  replacePlannerWorkspaceQuery,
  subscribeToHashRouteChanges,
} from '../../../shared/utils/hashRoute';

const sectionCard = 'rounded-[28px] border border-border bg-white p-6 shadow-sm';
const getDefaultAudience = (role?: UserRole | null): DocumentAudience => {
  if (role === UserRole.ADMIN) return 'admin';
  if (role === UserRole.FACULTY) return 'faculty';
  return 'requester';
};

const plannerViewLabel = (view: WorkflowWorkspaceView) => {
  if (view === 'brief') return 'Brief';
  return view.charAt(0).toUpperCase() + view.slice(1);
};

export const PlannerPage: React.FC = () => {
  const packages = useCBETPackages();
  const { user } = useAuth();
  const { trips } = useTrips();
  const {
    plans,
    quoteRequests,
    compareIds,
    clearCompare,
    toggleCompare,
    duplicatePlan,
    markPlanReadyForFacultyReview,
    convertPlanToQuoteRequest,
    submitQuoteRequest,
    reopenQuoteRequest,
    addQuoteRequestComment,
    savePackageToPlan,
  } = usePlanner();
  const { records, groups } = useOperationsRecords(plans, quoteRequests, trips);
  const [hashState, setHashState] = useState(() => parseHashRoute());

  useEffect(() => {
    const handleHashChange = () => setHashState(parseHashRoute());
    return subscribeToHashRouteChanges(handleHashChange);
  }, []);

  const workspaceQuery = useMemo(() => parsePlannerWorkspaceQuery(hashState), [hashState]);
  const comparedPackages = useMemo(
    () => packages.filter((pkg) => compareIds.includes(pkg.id)),
    [compareIds, packages]
  );
  const fallbackAudience = getDefaultAudience(user?.role);
  const selectedRecord = getWorkflowRecordById(records, workspaceQuery.request || workspaceQuery.plan);
  const selectedRequest =
    selectedRecord?.request ||
    (workspaceQuery.request ? quoteRequests.find((request) => request.id === workspaceQuery.request) : undefined);
  const selectedPlan =
    selectedRecord?.plan ||
    (workspaceQuery.plan ? plans.find((plan) => plan.id === workspaceQuery.plan) : undefined) ||
    (selectedRequest?.tripPlanId ? plans.find((plan) => plan.id === selectedRequest.tripPlanId) : undefined);
  const selectedTrip = selectedRecord?.trip;
  const selectedPackage =
    packages.find(
      (pkg) =>
        pkg.id ===
        (selectedRecord?.packageId ||
          selectedRequest?.packageId ||
          selectedPlan?.packageIds[0] ||
          comparedPackages[0]?.id)
    ) || comparedPackages[0];

  const activeView =
    workspaceQuery.view ||
    (selectedRequest ? 'timeline' : selectedPlan ? 'brief' : 'timeline');
  const activeDocument = workspaceQuery.document || 'brief';
  const activeAudience = workspaceQuery.audience || fallbackAudience;
  const isPrintMode = workspaceQuery.print === '1';
  const currentUser = {
    name: user?.name || 'Planner guest',
    role: user?.role || UserRole.PUBLIC,
  };

  useEffect(() => {
    if (hashState.path !== '/planner' || workspaceQuery.plan || workspaceQuery.request || !records.length) return;

    const firstRecord = records[0];
    replacePlannerWorkspaceQuery({
      plan: firstRecord.plan?.id,
      request: firstRecord.request?.id,
      view: firstRecord.request ? 'timeline' : 'brief',
      document: 'brief',
      audience: fallbackAudience,
      print: undefined,
    });
  }, [
    fallbackAudience,
    hashState.path,
    records,
    workspaceQuery.plan,
    workspaceQuery.request,
  ]);

  const openPlanWorkspace = (planId: string, view: WorkflowWorkspaceView = 'brief') =>
    replacePlannerWorkspaceQuery({
      plan: planId,
      request: undefined,
      view,
      document: 'brief',
      audience: fallbackAudience,
      print: undefined,
    });

  const openRequestWorkspace = (
    requestId: string,
    planId?: string,
    view: WorkflowWorkspaceView = 'timeline'
  ) =>
    replacePlannerWorkspaceQuery({
      request: requestId,
      plan: planId,
      view,
      document: activeDocument,
      audience: activeAudience,
      print: undefined,
    });

  const syncWorkspaceView = (view: WorkflowWorkspaceView) =>
    replacePlannerWorkspaceQuery({
      plan: selectedPlan?.id,
      request: selectedRequest?.id,
      view,
      document: activeDocument,
      audience: activeAudience,
      print: undefined,
    });

  const syncDocumentMode = (mode: DocumentViewMode) =>
    replacePlannerWorkspaceQuery({
      plan: selectedPlan?.id,
      request: selectedRequest?.id,
      view: selectedRequest ? 'documents' : 'brief',
      document: mode,
      audience: activeAudience,
      print: undefined,
    });

  const syncAudience = (audience: DocumentAudience) =>
    replacePlannerWorkspaceQuery({
      plan: selectedPlan?.id,
      request: selectedRequest?.id,
      view: selectedRequest ? 'documents' : activeView,
      document: activeDocument,
      audience,
      print: undefined,
    });

  const openPrintMode = (mode: DocumentViewMode, audience: DocumentAudience) =>
    replacePlannerWorkspaceQuery({
      plan: selectedPlan?.id,
      request: selectedRequest?.id,
      view: selectedRequest ? 'documents' : 'brief',
      document: mode,
      audience,
      print: '1',
    });

  if (!selectedPackage && !records.length) {
    return (
      <div className="container mx-auto px-4 py-10 md:px-5 xl:px-6">
        <div className={sectionCard}>
          <h1 className="text-3xl font-bold font-serif text-text">Planner workspace</h1>
          <p className="mt-3 text-text-muted">
            No plans or requests exist yet. Save a package into the planner from the catalog to start a workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => (window.location.hash = '/')}>Browse catalog</Button>
            <Button variant="outline" onClick={() => (window.location.hash = '/destinations')}>
              Browse destinations
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isPrintMode && selectedPackage) {
    return (
      <WorkflowDocumentView
        mode={activeDocument}
        audience={activeAudience}
        pkg={selectedPackage}
        plan={selectedPlan}
        request={selectedRequest}
        trip={selectedTrip}
        printMode
        onExitPrint={() =>
          replacePlannerWorkspaceQuery({
            plan: selectedPlan?.id,
            request: selectedRequest?.id,
            view: activeView,
            document: activeDocument,
            audience: activeAudience,
            print: undefined,
          })
        }
        onPrint={() => window.print()}
      />
    );
  }

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 pt-10 md:px-5 xl:px-6" aria-labelledby="planner-workspace-title">
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className={sectionCard}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Route className="h-3.5 w-3.5" aria-hidden="true" />
              Canonical planner workspace
            </div>
            <h1 id="planner-workspace-title" className="mt-4 text-4xl font-bold font-serif text-text">
              Review any request or plan from one shareable workflow surface
            </h1>
            <p className="mt-3 max-w-3xl text-text-muted">
              Use planner query state to reopen a request timeline, switch into role-specific document artifacts,
              separate requester and internal notes, and keep the workflow history visible across roles.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Saved plans</p>
                <p className="mt-2 text-3xl font-bold text-text">{groups.savedPlans.length}</p>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Active requests</p>
                <p className="mt-2 text-3xl font-bold text-text">
                  {records.filter((record) => record.request).length}
                </p>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Needs info</p>
                <p className="mt-2 text-3xl font-bold text-text">{groups.needsInfo.length}</p>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Compare tray</p>
                <p className="mt-2 text-3xl font-bold text-text">{compareIds.length}</p>
              </div>
            </div>
          </div>

          <div className={sectionCard}>
            <h2 className="text-lg font-bold text-text">Workspace shortcuts</h2>
            <div className="mt-4 grid gap-3">
              <Button onClick={() => (window.location.hash = '/destinations')}>Browse destinations</Button>
              <Button variant="outline" onClick={() => (window.location.hash = '/')}>
                Return to catalog
              </Button>
              <Button variant="ghost" onClick={clearCompare}>
                Clear compare tray
              </Button>
            </div>
            {(selectedPlan || selectedRequest) && selectedPackage ? (
              <div className="mt-6 rounded-2xl bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Current deep link</p>
                <a
                  className="mt-2 block break-all text-sm font-semibold text-primary"
                  href={buildPlannerWorkspaceRoute({
                    plan: selectedPlan?.id,
                    request: selectedRequest?.id,
                    view: activeView,
                    document: activeDocument,
                    audience: activeAudience,
                    print: undefined,
                  })}
                >
                  {buildPlannerWorkspaceRoute({
                    plan: selectedPlan?.id,
                    request: selectedRequest?.id,
                    view: activeView,
                    document: activeDocument,
                    audience: activeAudience,
                    print: undefined,
                  })}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 md:px-5 xl:grid-cols-[0.82fr_1.18fr] xl:px-6">
        <div className="space-y-6">
          <section className={sectionCard} aria-labelledby="workspace-queue-heading">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 id="workspace-queue-heading" className="text-xl font-bold font-serif text-text">
                  Workflow queue
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Requests stay summary-oriented here. Open one into the planner workspace for timeline, documents,
                  notes, and history.
                </p>
              </div>
              <Badge variant="surface" size="sm">
                {records.length} records
              </Badge>
            </div>

            <div className="mt-5 grid gap-3">
              {records.map((record) => {
                const pkg = packages.find((item) => item.id === record.packageId);
                const isActive = record.id === selectedRecord?.id;
                const href = buildPlannerWorkspaceRoute({
                  plan: record.plan?.id,
                  request: record.request?.id,
                  view: record.request ? 'timeline' : 'brief',
                  document: 'brief',
                  audience: fallbackAudience,
                });

                return (
                  <a
                    key={record.id}
                    href={href}
                    className={`rounded-2xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                      isActive ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-text">{pkg?.cbetSite || record.packageId}</p>
                        <p className="mt-1 text-sm text-text-muted">
                          {record.request?.purpose || record.plan?.name || 'Planner draft'}
                        </p>
                      </div>
                      <Badge variant={record.request ? 'secondary' : 'surface'} size="sm">
                        {record.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-muted">
                      <span>{record.deadlineDate || 'Date pending'}</span>
                      <span>{record.request?.groupSize || record.plan?.groupSize || 'Size pending'}</span>
                      <span>{record.request ? plannerViewLabel('timeline') : plannerViewLabel('brief')}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          <section className={sectionCard} aria-labelledby="saved-plans-heading">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 id="saved-plans-heading" className="text-xl font-bold font-serif text-text">
                  Saved plans
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Keep plan-level actions light here, then move into the canonical planner workspace once a request
                  exists.
                </p>
              </div>
              <Badge variant="surface" size="sm">
                {plans.length} plans
              </Badge>
            </div>

            <div className="mt-5 grid gap-4">
              {plans.map((plan) => {
                const isActive = plan.id === selectedPlan?.id && !selectedRequest;
                const planPackages = packages.filter((pkg) => plan.packageIds.includes(pkg.id));

                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl border p-5 ${
                      isActive ? 'border-primary bg-primary/5' : 'border-border bg-surface'
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="text-left text-lg font-bold text-text transition-colors hover:text-primary"
                            onClick={() => openPlanWorkspace(plan.id)}
                          >
                            {plan.name}
                          </button>
                          <Badge variant="accent" size="sm">
                            {plan.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-text-muted">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                            {plan.targetDate || 'No date selected'}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-primary" aria-hidden="true" />
                            {plan.groupSize || 'Group size pending'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => duplicatePlan(plan.id)}
                        >
                          <CopyPlus className="h-4 w-4" />
                          Duplicate
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => markPlanReadyForFacultyReview(plan.id)}
                        >
                          Mark ready
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            const request = convertPlanToQuoteRequest(plan.id);
                            if (request) {
                              openRequestWorkspace(request.id, plan.id, 'timeline');
                            }
                          }}
                        >
                          Create request
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {planPackages.map((pkg) => (
                        <Badge key={pkg.id} variant="surface" size="sm">
                          {pkg.cbetSite}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-text-muted">
                      <p className="font-semibold text-text">Planner notes</p>
                      <p className="mt-2 leading-relaxed">{plan.notes || 'No notes captured for this draft yet.'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={sectionCard} aria-labelledby="compare-workspace-heading">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 id="compare-workspace-heading" className="text-xl font-bold font-serif text-text">
                  Compare shortlist
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Keep the shortlist visible inside the planner so strong options can become plans without losing the
                  travel-readiness context.
                </p>
              </div>
              {compareIds.length ? (
                <Button variant="ghost" size="sm" onClick={clearCompare}>
                  Clear
                </Button>
              ) : null}
            </div>

            {comparedPackages.length ? (
              <div className="mt-4 grid gap-4">
                {comparedPackages.map((pkg) => (
                  <div key={pkg.id} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-bold text-text">{pkg.cbetSite}</p>
                        <p className="mt-1 text-sm text-text-muted">{pkg.duration}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            savePackageToPlan({
                              packageId: pkg.id,
                              planName: `${pkg.cbetSite} compare shortlist`,
                            })
                          }
                        >
                          <FolderKanban className="h-4 w-4" />
                          Add to plan
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toggleCompare(pkg.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <PackageExplorerSnapshot pkg={pkg} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-text-muted">
                Compare up to three packages from the catalog or destinations page to review their route, seasonality,
                and logistics friction here.
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          {selectedPackage ? (
            <>
              <div className={sectionCard}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
                      <SplitSquareVertical className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      Active workspace
                    </div>
                    <h2 className="mt-3 text-2xl font-bold font-serif text-text">{selectedPackage.cbetSite}</h2>
                    <p className="mt-1 text-sm text-text-muted">
                      {selectedRequest
                        ? 'Full timeline, document, note, and history detail now lives here.'
                        : 'This plan still needs to become a request before notes, documents, and history become active.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.hash = `/package/${selectedPackage.id}/overview${
                          selectedRequest ? `?request=${selectedRequest.id}` : ''
                        }`;
                      }}
                    >
                      Open package
                    </Button>
                    {selectedRequest && (selectedRequest.status === 'Draft' || selectedRequest.status === 'Needs Info') ? (
                      <Button size="sm" onClick={() => submitQuoteRequest(selectedRequest.id)}>
                        <Send className="h-4 w-4" />
                        Send for review
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              <WorkflowWorkspace
                pkg={selectedPackage}
                plan={selectedPlan}
                request={selectedRequest}
                trip={selectedTrip}
                activeView={activeView}
                documentMode={activeDocument}
                audience={activeAudience}
                currentUser={currentUser}
                onViewChange={syncWorkspaceView}
                onDocumentChange={syncDocumentMode}
                onAudienceChange={syncAudience}
                onOpenPrintMode={openPrintMode}
                onAddNote={
                  selectedRequest
                    ? (scope, body) =>
                        addQuoteRequestComment(selectedRequest.id, {
                          author: currentUser.name,
                          authorRole: currentUser.role,
                          scope,
                          body,
                        })
                    : undefined
                }
                onSubmitRequest={
                  selectedRequest ? () => submitQuoteRequest(selectedRequest.id) : undefined
                }
                onReopenRequest={
                  selectedRequest ? () => reopenQuoteRequest(selectedRequest.id) : undefined
                }
              />
            </>
          ) : null}

          <section className={sectionCard} aria-labelledby="document-states-heading">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
              <FileStack className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 id="document-states-heading">Role-specific document engine</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-text">Requester brief</p>
                <p className="mt-2 text-sm text-text-muted">
                  Keeps readiness and trip assumptions readable for public or faculty requesters.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-text">Faculty itinerary</p>
                <p className="mt-2 text-sm text-text-muted">
                  Re-frames the same workflow into review-ready sequencing and teaching context.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-text">Admin approval pack</p>
                <p className="mt-2 text-sm text-text-muted">
                  Highlights logistics readiness, approval assumptions, and transport coordination.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
