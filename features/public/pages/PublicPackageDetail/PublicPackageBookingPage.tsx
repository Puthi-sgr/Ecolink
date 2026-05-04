import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  Route,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useAuth } from '../../../../app/AuthContext';
import { Button } from '../../../../shared/atoms/Button';
import { Card } from '../../../../shared/molecules/Card';
import { usePackages } from '../../../../shared/repositories/packageRepository';
import {
  buildHashRoute,
  parsePackageBookingQuery,
  replacePackageBookingQuery,
  replaceHashQuery,
} from '../../../../shared/utils/hashRoute';
import { CBETPackage, User, UserRole } from '../../../../shared/types';
import { WorkflowDocumentView } from '../../../../shared/components/WorkflowDocumentView';
import { PackageNotFound } from './components/PackageNotFound';
import { BookingWidget } from './components/BookingWidget';
import { ConfirmRequestModal } from './components/ConfirmRequestModal';
import { PackageTrustRail } from './components/PackageTrustRail';
import { PublicPackageDetailPricelisting } from './pages/PublicPackageDetailPricelisting';
import { usePackageBookingFlow } from './hooks/usePackageBookingFlow';

interface PublicPackageBookingPageProps {
  packageId: string;
}

interface PublicPackageBookingPageContentProps {
  pkg: CBETPackage;
  user: User | null | undefined;
  isFaculty: boolean;
}

export const PublicPackageBookingPage: React.FC<PublicPackageBookingPageProps> = ({
  packageId,
}) => {
  const packages = usePackages();
  const { user } = useAuth();
  const isFaculty = user?.role === UserRole.FACULTY;
  const pkg = packages.find((item) => item.id === packageId);

  if (!pkg) {
    return <PackageNotFound onBack={() => (window.location.hash = '/')} />;
  }

  return <PublicPackageBookingPageContent pkg={pkg} user={user} isFaculty={isFaculty} />;
};

const PublicPackageBookingPageContent: React.FC<PublicPackageBookingPageContentProps> = ({
  pkg,
  user,
  isFaculty,
}) => {
  const routeDraft = parsePackageBookingQuery(pkg.id);

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
    currentPrice,
    pricePerStudent,
    activeCapacityBand,
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
    activeTab: 'request',
    initialDraft: {
      date: routeDraft.date,
      size: routeDraft.size,
      purpose: routeDraft.purpose,
      transportPreference: routeDraft.transport,
      accessibilityNotes: routeDraft.access,
      selectedPricingBandKey: routeDraft.band,
    },
  });

  useEffect(() => {
    replacePackageBookingQuery(
      pkg.id,
      {
        date: date || undefined,
        size: size || undefined,
        purpose: purpose || undefined,
        transport: transportPreference || undefined,
        access: accessibilityNotes || undefined,
        band: activeBandKey,
      },
      { preserveExisting: true }
    );
  }, [pkg.id, date, size, purpose, transportPreference, accessibilityNotes, activeBandKey]);

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
          replaceHashQuery(
            `/package/${pkg.id}/request`,
            {
              request: latestRequest?.id,
              print: undefined,
              date: date || undefined,
              size: size || undefined,
              purpose: purpose || undefined,
              transport: transportPreference || undefined,
              access: accessibilityNotes || undefined,
              band: activeBandKey,
            },
            { preserveExisting: true }
          )
        }
        onPrint={() => window.print()}
      />
    );
  }

  const selectedBandLabel = activeCapacityBand
    ? `${activeCapacityBand.min} - ${activeCapacityBand.max} pax`
    : 'Choose a pricing band';
  const currentEstimateLabel =
    currentPrice > 0 ? `$${currentPrice.toLocaleString()}` : 'Add group size';
  const leadTimeLabel = `${pkg.bookingConditions.minLeadTimeDays}+ days lead time`;
  const primaryTransport = transportPreference || pkg.transportModes.join(' + ');

  return (
    <>
      <section className="bg-background py-8 md:py-10">
        <div className="container mx-auto space-y-8 px-4 md:px-5 xl:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              className="pl-0 hover:bg-transparent hover:text-primary"
              onClick={() => {
                window.location.hash = buildHashRoute(`/package/${pkg.id}/overview`, {
                  request: latestRequest?.id,
                });
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to package
            </Button>

            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Full request workspace
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Package pricing, readiness, and request staging in one surface.
              </p>
            </div>
          </div>

          <section className="overflow-hidden rounded-[32px] border border-border/70 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
              <div className="bg-secondary-50 px-6 py-7 md:px-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Request setup
                </p>
                <h1 className="mt-2 text-[2.4rem] font-bold font-serif leading-[0.96] text-text md:text-[2.8rem]">
                  Build the request with full pricing context
                </h1>
                <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-text-muted">
                  Choose the correct capacity band, confirm the transport pattern, and stage a request
                  that can move cleanly into planner review.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    { icon: Clock3, label: 'Duration', value: pkg.duration },
                    { icon: Users, label: 'Capacity band', value: selectedBandLabel },
                    { icon: Route, label: 'Transport', value: primaryTransport },
                    { icon: CalendarClock, label: 'Lead time', value: leadTimeLabel },
                  ].map(({ icon: Icon, label, value }) => (
                    <article
                      key={label}
                      className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 border-b border-secondary-200/80 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_24px_rgba(68,152,26,0.08)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="pt-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                          {label}
                        </p>
                        <p className="mt-1 text-base font-semibold leading-snug text-text">{value}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="px-6 py-7 md:px-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Request summary
                </p>
                <h2 className="mt-2 text-[2rem] font-bold font-serif leading-[1.02] text-text">
                  {pkg.name}
                </h2>
                <p className="mt-2 text-base text-text-muted">{pkg.location}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Card className="rounded-[24px] border border-border/70 bg-surface px-5 py-5 shadow-none">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      Current estimate
                    </p>
                    <p className="mt-3 text-[2.1rem] font-black leading-none text-primary">
                      {currentEstimateLabel}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      The live total updates from the selected group size using cumulative tier pricing.
                    </p>
                  </Card>

                  <Card className="rounded-[24px] border border-border/70 bg-surface px-5 py-5 shadow-none">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      {readinessMissingFields.length ? 'Needs setup' : 'Ready to request'}
                    </div>
                    <p className="mt-3 text-base font-semibold text-text">
                      {readinessMissingFields.length
                        ? `${readinessMissingFields.length} missing field${readinessMissingFields.length > 1 ? 's' : ''}`
                        : 'All required request fields are complete.'}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {readinessMissingFields.length
                        ? `Still needed: ${readinessMissingFields.join(', ')}.`
                        : 'The request can move forward to faculty review without another preparation pass.'}
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
            <div className="min-w-0 space-y-8">
              <PublicPackageDetailPricelisting
                pkg={pkg}
                activeBandKeys={activeBandKeys}
                onAddBandToTrip={handleAddPricingBandToTrip}
                onContactPlanner={() => {
                  document
                    .getElementById('full-booking-widget')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
            </div>

            <aside id="full-booking-widget" className="xl:sticky xl:top-[6.5rem] xl:self-start">
              <div className="space-y-6">
                <PackageTrustRail pkg={pkg} />
                <BookingWidget
                  pkg={pkg}
                  user={user || null}
                  isFaculty={isFaculty}
                  date={date}
                  size={size}
                  purpose={purpose}
                  transportPreference={transportPreference}
                  accessibilityNotes={accessibilityNotes}
                  missingFields={readinessMissingFields}
                  currentPrice={currentPrice}
                  onDateChange={setDate}
                  onSizeChange={setSize}
                  onPurposeChange={setPurpose}
                  onTransportPreferenceChange={setTransportPreference}
                  onAccessibilityNotesChange={setAccessibilityNotes}
                  onReview={handleReview}
                  onLoginRedirect={handleLoginRedirect}
                  onSaveToPlanner={handleSaveToPlanner}
                  onDownloadBrief={handleDownloadBrief}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

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
