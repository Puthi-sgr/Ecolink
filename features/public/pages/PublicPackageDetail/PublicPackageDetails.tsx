import React from 'react';
import { useAuth } from '../../../../app/AuthContext';
import { CBETAbout, CBETPackage, User, UserRole } from '../../../../shared/types';
import { usePackages, getPackageAboutById } from '../../../../shared/repositories/packageRepository';
import { plannerRouteService } from '../../../../shared/services/plannerRouteService';
import {
  buildHashRoute,
  buildPackageBookingRoute,
  replaceHashQuery,
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
import { PackageTrustRail } from './components/PackageTrustRail';
import { TripBriefPreview } from '../../../../shared/components/TripBriefPreview';
import { WorkflowDocumentView } from '../../../../shared/components/WorkflowDocumentView';
import { ArrowLeft, BookOpen, CircleDollarSign, FileText, Users } from 'lucide-react';
import { usePackageBookingFlow } from './hooks/usePackageBookingFlow';

interface PublicPackageDetailsProps {
  packageId: string;
  tab?: string;
}

interface PublicPackageDetailsContentProps {
  pkg: CBETPackage;
  about: CBETAbout;
  activeTab: string;
  isOverviewTab: boolean;
  user: User | null | undefined;
  isFaculty: boolean;
}

const TABS = [
  { id: 'overview', label: 'Overview & Itinerary', icon: FileText },
  { id: 'about', label: 'About CBET', icon: Users },
  { id: 'pricing', label: 'Package Pricing', icon: CircleDollarSign },
  { id: 'travel-guide', label: 'Travel Guide', icon: BookOpen }
];

const TAB_IDS = new Set(TABS.map((tabItem) => tabItem.id));

export const PublicPackageDetails: React.FC<PublicPackageDetailsProps> = ({ packageId, tab }) => {
  const packages = usePackages();
  const { user } = useAuth();
  const isFaculty = user?.role === UserRole.FACULTY;

  const pkg = packages.find(p => p.id === packageId);
  const about = getPackageAboutById(pkg?.id ?? '');
  const activeTab = tab && TAB_IDS.has(tab) ? tab : TABS[0].id;
  const isOverviewTab = activeTab === 'overview';

  if (!pkg) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }
  if (!about) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }

  return (
    <PublicPackageDetailsContent
      pkg={pkg}
      about={about}
      activeTab={activeTab}
      isOverviewTab={isOverviewTab}
      user={user}
      isFaculty={isFaculty}
    />
  );
};

const PublicPackageDetailsContent: React.FC<PublicPackageDetailsContentProps> = ({
  pkg,
  about,
  activeTab,
  isOverviewTab,
  user,
  isFaculty,
}) => {

  const {
    showConfirm,
    setShowConfirm,
    date,
    setDate,
    size,
    setSize,
    purpose,
    setPurpose,
    transportPreference,
    setTransportPreference,
    accessibilityNotes,
    setAccessibilityNotes,
    selectedPricingBandKey,
    currentPrice,
    pricePerStudent,
    activeBandKey,
    activeBandKeys,
    readinessMissingFields,
    printMode,
    latestRequest,
    selectedPlan,
    selectedTrip,
    previewPlan,
    documentAudience,
    handleLoginRedirect,
    handleReview,
    handleFinalSubmit,
    handleSaveToPlanner,
    handleDownloadBrief,
    handleAddPricingBandToTrip,
  } = usePackageBookingFlow({
    pkg,
    user,
    isFaculty,
    activeTab,
  });

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
        header={isOverviewTab ? undefined : (
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent hover:text-primary flex items-center gap-1"
            onClick={() => window.location.hash = '/'}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Button>
        )}
        nav={
          <PackageDetailNav
            items={TABS}
            activeId={activeTab}
            onNavigate={navigateToTab}
          />
        }
        meta={isOverviewTab ? undefined : (
          <>
            <span className="text-text-muted/80">Field partner</span>
            <span className="text-sm font-medium normal-case tracking-normal text-text">{pkg.cbetSite}</span>
            <span className="h-1 w-1 rounded-full bg-border/80" />
            <span className="text-text-muted/80">Managed with</span>
            <span className="text-sm font-medium normal-case tracking-normal text-text">{pkg.managingOrg}</span>
          </>
        )}
        sidebar={
          <div id="package-request-sidebar" className="space-y-6">
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
              onDownloadBrief={handleDownloadBrief}
              onOpenExpanded={() => {
                window.location.hash = buildPackageBookingRoute(pkg.id, {
                  date,
                  size,
                  purpose,
                  transport: transportPreference,
                  access: accessibilityNotes,
                  band: selectedPricingBandKey || activeBandKey,
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
              hero={
                <PackageHero
                  pkg={pkg}
                  onBack={() => {
                    window.location.hash = '/';
                  }}
                  onViewPricing={() => navigateToTab('pricing')}
                />
              }
            />

            <div className="grid gap-8">
              <TripBriefPreview
                pkg={pkg}
                plan={selectedPlan || previewPlan}
                request={latestRequest}
                trip={selectedTrip}
                audience={documentAudience}
                onOpenDocument={() =>
                  latestRequest || selectedPlan
                    ? (window.location.hash = plannerRouteService.buildWorkspaceRoute({
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
            </div>
          </>
        )}
        {activeTab === 'about' && (
          <PublicPackageDetailAboutCbet
            about={about}
            onNavigatePricing={() => navigateToTab('pricing')}
          />
        )}
        {activeTab === 'pricing' && (
          <PublicPackageDetailPricelisting
            pkg={pkg}
            activeBandKeys={activeBandKeys}
            onAddBandToTrip={handleAddPricingBandToTrip}
            onContactPlanner={() => {
              document
                .getElementById('package-request-sidebar')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        )}
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
