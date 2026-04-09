import React, { useEffect, useState } from 'react';
import { useCBETPackages, CBET_ABOUT } from '../../../../shared/data';
import { useAuth } from '../../../../app/AuthContext';
import { usePlanner } from '../../../../app/PlannerContext';
import { useTrips } from '../../../../app/TripContext';
import { DocumentViewMode, ProjectStatus, UserRole } from '../../../../shared/types';
import { getPackageFitCallout, getRecommendedAlternatives } from '../../../../shared/utils/packageFit';
import { getQuoteMissingFields } from '../../../../shared/utils/requestWorkflow';
import { useOperationsRecords } from '../../../../shared/hooks/useOperationsRecords';
import {
  buildHashRoute,
  buildPlannerWorkspaceRoute,
  parseHashRoute,
  replaceHashQuery,
  setHashPath,
  subscribeToHashRouteChanges,
} from '../../../../shared/utils/hashRoute';
import { PublicPackageDetailLayout } from './layout/PublicPackageDetailLayout';
import { PackageHero } from './components/PackageHero';
import { BookingWidget } from './components/BookingWidget';
import { ConfirmRequestModal } from './components/ConfirmRequestModal';
import { PackageNotFound } from './components/PackageNotFound';
import { PackageDetailNav } from './components/PackageDetailNav';
import { PublicPackageDetailOverviewAndItinery } from './pages/PublicPackageDetailOverviewAndItinery';
import { PublicPackageDetailAboutCbet } from './pages/PublicPackageDetailAboutCbet';
import { PublicPackageDetailPricelisting } from './pages/PublicPackageDetailPricelisting';
import { PublicPackageDetailTravelGuide } from './pages/PublicPackageDetailTravelGuide';
import { Button } from '../../../../shared/atoms/Button';
import { Badge } from '../../../../shared/atoms/Badge';
import { PackageTrustRail } from './components/PackageTrustRail';
import {
  PackageAlternativeReason,
  PackageExplorerSnapshot,
} from '../../../../shared/components/PackageExplorerInsights';
import { TripBriefPreview } from '../../../../shared/components/TripBriefPreview';
import { WorkflowSummaryCard } from '../../../../shared/components/WorkflowSummaryCard';
import { WorkflowDocumentView } from '../../../../shared/components/WorkflowDocumentView';
import { ArrowLeft, BookOpen, CircleDollarSign, FileText, Sparkles, Users } from 'lucide-react';

interface PublicPackageDetailsProps {
  packageId: string;
  tab?: string;
}

const TABS = [
  { id: 'overview', label: 'Overview & Itinerary', icon: FileText },
  { id: 'about', label: 'About CBET', icon: Users },
  { id: 'pricing', label: 'Package Pricing', icon: CircleDollarSign },
  { id: 'travel-guide', label: 'Travel Guide', icon: BookOpen }
];

const TAB_IDS = new Set(TABS.map((tabItem) => tabItem.id));

export const PublicPackageDetails: React.FC<PublicPackageDetailsProps> = ({ packageId, tab }) => {
  const packages = useCBETPackages();
  const { user } = useAuth();
  const { addTrip, trips } = useTrips();
  const { addQuoteRequest, plans, quoteRequests, savePackageToPlan } = usePlanner();
  const { records } = useOperationsRecords(plans, quoteRequests, trips);
  const isFaculty = user?.role === UserRole.FACULTY;

  const pkg = packages.find(p => p.id === packageId);
  const about = CBET_ABOUT[pkg?.id ?? ''] ?? Object.values(CBET_ABOUT)[0];
  const activeTab = tab && TAB_IDS.has(tab) ? tab : TABS[0].id;

  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');
  const [transportPreference, setTransportPreference] = useState('');
  const [accessibilityNotes, setAccessibilityNotes] = useState('');
  const [hashState, setHashState] = useState(() => parseHashRoute());

  useEffect(() => {
    const handleHashChange = () => setHashState(parseHashRoute());
    return subscribeToHashRouteChanges(handleHashChange);
  }, []);

  if (!pkg) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }
  if (!about) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }

  const getEstimatedPrice = (groupSize: number) => {
    const band = pkg.capacityBands.find(b => groupSize >= b.min && groupSize <= b.max);
    return band ? band.pricePerStudent * groupSize : 0;
  };

  const currentPrice = size ? getEstimatedPrice(Number(size)) : 0;
  const pricePerStudent = size && currentPrice > 0 ? (currentPrice / Number(size)) : 0;
  const readinessMissingFields = getQuoteMissingFields({ targetDate: date, groupSize: size, purpose, transportPreference });
  const selectedRequestId =
    pkg && hashState.path.startsWith(`/package/${pkg.id}`) ? hashState.query.get('request') : '';
  const printMode = hashState.query.get('print') as DocumentViewMode | null;
  const latestRequest = selectedRequestId
    ? quoteRequests.find((request) => request.id === selectedRequestId)
    : quoteRequests.find((request) => request.packageId === pkg.id);
  const selectedRecord = pkg
    ? records.find(
        (record) =>
          (selectedRequestId && record.request?.id === selectedRequestId) ||
          record.packageId === pkg.id
      )
    : undefined;
  const previewPlan = {
    id: 'preview-plan',
    name: `${pkg.cbetSite} working brief`,
    packageIds: [pkg.id],
    targetDate: date,
    travelerType: isFaculty ? 'Faculty' : 'Leisure',
    groupSize: size,
    notes: purpose,
    status: readinessMissingFields.length ? 'Draft' : 'Ready to Request',
    createdAt: new Date().toISOString().slice(0, 10),
  } as const;
  const recommendedAlternatives = getRecommendedAlternatives(pkg, packages, size ? Number(size) : undefined);
  const fitCallout = getPackageFitCallout(pkg);
  const selectedTrip = selectedRecord?.trip;
  const selectedPlan = selectedRecord?.plan;
  const documentAudience =
    user?.role === UserRole.ADMIN ? 'admin' : isFaculty ? 'faculty' : 'requester';
  const plannerWorkspaceHref = latestRequest
    ? buildPlannerWorkspaceRoute({
        request: latestRequest.id,
        plan: selectedPlan?.id || latestRequest.tripPlanId,
        view: 'timeline',
        document: 'brief',
        audience: documentAudience,
      })
    : selectedPlan
      ? buildPlannerWorkspaceRoute({
          plan: selectedPlan.id,
          view: 'brief',
          document: 'brief',
          audience: documentAudience,
        })
      : '';

  const handleLoginRedirect = () => {
    sessionStorage.setItem('returnTo', `/package/${pkg.id}/${activeTab}`);
    setHashPath('/login');
  };

  const handleReview = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFaculty) {
      handleLoginRedirect();
      return;
    }
    setShowConfirm(true);
  };

  const handleFinalSubmit = () => {
    const request = addQuoteRequest({
      packageId: pkg.id,
      requesterRole: user?.role || UserRole.PUBLIC,
      targetDate: date,
      groupSize: size,
      purpose,
      transportPreference,
      accessibilityNotes,
      status: readinessMissingFields.length ? 'Needs Info' : 'Under Review',
    });
    const newTripId = `EL-${request.id.replace(/^quote-/, '').toUpperCase()}`;
    addTrip({
      id: newTripId,
      packageId: pkg.id,
      quoteRequestId: request.id,
      tripPlanId: request.tripPlanId,
      packageName: pkg.name,
      facultyName: user?.name || '',
      department: 'General Sciences',
      requestorContact: user?.email || '',
      date: date,
      groupSize: Number(size),
      purpose: purpose,
      status: ProjectStatus.PENDING
    });
    setShowConfirm(false);
    setHashPath('/planner', {
      request: request.id,
      plan: request.tripPlanId,
      view: 'timeline',
      document: 'brief',
      audience: isFaculty ? 'faculty' : 'requester',
    });
  };

  const handleSaveToPlanner = () => {
    const plan = savePackageToPlan({
      packageId: pkg.id,
      planName: `${pkg.cbetSite} request draft`,
      targetDate: date,
      groupSize: size,
      notes: purpose,
      travelerType: isFaculty ? 'Faculty' : 'Leisure',
    });
    setHashPath('/planner', { plan: plan.id, view: 'brief' });
  };

  const navigateToTab = (id: string) => {
    window.location.hash = buildHashRoute(`/package/${pkg.id}/${id}`, {
      request: latestRequest?.id,
    });
  };

  if (printMode) {
    return (
      <WorkflowDocumentView
        mode={printMode}
        audience={documentAudience}
        pkg={pkg}
        plan={selectedPlan || previewPlan}
        request={latestRequest}
        trip={selectedTrip}
        printMode
        onExitPrint={() =>
          replaceHashQuery(`/package/${pkg.id}/${activeTab}`, {
            request: latestRequest?.id,
            print: undefined,
          })
        }
        onPrint={() => window.print()}
      />
    );
  }

  return (
    <>
      <PublicPackageDetailLayout
        header={
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent hover:text-primary flex items-center gap-1"
            onClick={() => window.location.hash = '/'}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Button>
        }
        nav={
          <PackageDetailNav
            items={TABS}
            activeId={activeTab}
            onNavigate={navigateToTab}
          />
        }
        meta={
          <>
            <Badge variant="secondary">{pkg.cbetSite}</Badge>
            <span className="text-text-muted">|</span>
            <span className="text-sm font-medium text-text-muted">{pkg.managingOrg}</span>
          </>
        }
        sidebar={
          <div className="space-y-6">
            <PackageTrustRail pkg={pkg} />
            <BookingWidget
              pkg={pkg}
              user={user || null}
              isFaculty={isFaculty}
              date={date}
              size={size}
              purpose={purpose}
              currentPrice={currentPrice}
              onDateChange={setDate}
              onSizeChange={setSize}
              onPurposeChange={setPurpose}
              transportPreference={transportPreference}
              accessibilityNotes={accessibilityNotes}
              missingFields={readinessMissingFields}
              onTransportPreferenceChange={setTransportPreference}
              onAccessibilityNotesChange={setAccessibilityNotes}
              onReview={handleReview}
              onLoginRedirect={handleLoginRedirect}
              onSaveToPlanner={handleSaveToPlanner}
              onDownloadBrief={() => {
                if (latestRequest || selectedPlan) {
                  window.location.hash = buildPlannerWorkspaceRoute({
                    request: latestRequest?.id,
                    plan: selectedPlan?.id || latestRequest?.tripPlanId,
                    view: latestRequest ? 'documents' : 'brief',
                    document: 'brief',
                    audience: documentAudience,
                    print: '1',
                  });
                  return;
                }

                replaceHashQuery(`/package/${pkg.id}/${activeTab}`, {
                  request: latestRequest?.id,
                  print: 'brief',
                });
              }}
            />
          </div>
        }
      >
        {activeTab === 'overview' && (
          <>
            <PublicPackageDetailOverviewAndItinery
              pkg={pkg}
              hero={<PackageHero pkg={pkg} />}
            />

            <div className="grid gap-8">
              <PackageExplorerSnapshot pkg={pkg} travelerGroupSize={size ? Number(size) : undefined} />

              <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  What happens next
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-sm font-semibold text-text">1. Save or stage the trip</p>
                    <p className="mt-2 text-sm text-text-muted">Capture the package in the planner so dates, size, and academic notes stay visible.</p>
                  </div>
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-sm font-semibold text-text">2. Review readiness</p>
                    <p className="mt-2 text-sm text-text-muted">Check the preferred date, group size, transport assumption, and access notes before requesting a quote.</p>
                  </div>
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-sm font-semibold text-text">3. Move into the quote timeline</p>
                    <p className="mt-2 text-sm text-text-muted">Once requested, the same workflow object appears in the planner, faculty dashboard, and admin board.</p>
                  </div>
                </div>
              </div>

              <TripBriefPreview
                pkg={pkg}
                plan={selectedPlan || previewPlan}
                request={latestRequest}
                trip={selectedTrip}
                audience={documentAudience}
                onOpenDocument={() =>
                  latestRequest || selectedPlan
                    ? (window.location.hash = buildPlannerWorkspaceRoute({
                        request: latestRequest?.id,
                        plan: selectedPlan?.id || latestRequest?.tripPlanId,
                        view: latestRequest ? 'documents' : 'brief',
                        document: 'brief',
                        audience: documentAudience,
                        print: '1',
                      }))
                    : replaceHashQuery(`/package/${pkg.id}/${activeTab}`, {
                        request: latestRequest?.id,
                        print: 'brief',
                      })
                }
              />

              {latestRequest ? (
                <WorkflowSummaryCard
                  request={latestRequest}
                  pkg={pkg}
                  plan={selectedPlan || (latestRequest.tripPlanId ? undefined : previewPlan)}
                  title="Live request snapshot"
                  actions={
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.location.hash = buildPlannerWorkspaceRoute({
                            request: latestRequest.id,
                            plan: selectedPlan?.id || latestRequest.tripPlanId,
                            view: 'timeline',
                            document: 'brief',
                            audience: documentAudience,
                          });
                        }}
                      >
                        Open timeline
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.location.hash = buildPlannerWorkspaceRoute({
                            request: latestRequest.id,
                            plan: selectedPlan?.id || latestRequest.tripPlanId,
                            view: 'documents',
                            document: 'brief',
                            audience: documentAudience,
                          });
                        }}
                      >
                        Documents
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          window.location.hash = buildPlannerWorkspaceRoute({
                            request: latestRequest.id,
                            plan: selectedPlan?.id || latestRequest.tripPlanId,
                            view: 'notes',
                            document: 'brief',
                            audience: documentAudience,
                          });
                        }}
                      >
                        Notes
                      </Button>
                    </>
                  }
                />
              ) : null}

              <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
                      <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      Better-fit alternatives
                    </div>
                    <h3 className="mt-3 text-2xl font-bold font-serif text-text">{fitCallout}</h3>
                    <p className="mt-2 text-sm text-text-muted">
                      If this package feels high-friction for your current timing or cohort size, these nearby options preserve similar learning value with different logistics.
                    </p>
                  </div>
                  {plannerWorkspaceHref ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.location.hash = plannerWorkspaceHref;
                      }}
                    >
                      Open in planner
                    </Button>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {recommendedAlternatives.map((alternative) => (
                    <div
                      key={alternative.id}
                      className="rounded-2xl border border-border bg-surface p-4"
                    >
                      <PackageAlternativeReason
                        current={pkg}
                        candidate={alternative}
                        travelerGroupSize={size ? Number(size) : undefined}
                      />
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{alternative.location}</p>
                      <p className="mt-2 text-lg font-bold text-text">{alternative.cbetSite}</p>
                      <p className="mt-2 text-sm text-text-muted">{getPackageFitCallout(alternative)}</p>
                      <div className="mt-4">
                        <PackageExplorerSnapshot
                          pkg={alternative}
                          travelerGroupSize={size ? Number(size) : undefined}
                        />
                      </div>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => {
                          window.location.hash = `/package/${alternative.id}/overview`;
                        }}
                      >
                        Open package
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'about' && (
          <PublicPackageDetailAboutCbet
            about={about}
            onNavigatePricing={() => navigateToTab('pricing')}
          />
        )}
        {activeTab === 'pricing' && <PublicPackageDetailPricelisting pkg={pkg} />}
        {activeTab === 'travel-guide' && <PublicPackageDetailTravelGuide pkg={pkg} />}
      </PublicPackageDetailLayout>

      <ConfirmRequestModal
        isOpen={showConfirm}
        pkg={pkg}
        date={date}
        size={size}
        purpose={purpose}
        transportPreference={transportPreference}
        accessibilityNotes={accessibilityNotes}
        missingFields={readinessMissingFields}
        currentPrice={currentPrice}
        pricePerStudent={pricePerStudent}
        onClose={() => setShowConfirm(false)}
        onSubmit={handleFinalSubmit}
      />
    </>
  );
};
