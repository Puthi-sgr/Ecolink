import { FormEvent, useEffect, useState } from 'react';
import { usePlanner } from '../../../../../app/PlannerContext';
import { useTrips } from '../../../../../app/TripContext';
import { useOperationsRecords } from '../../../../../shared/hooks/useOperationsRecords';
import { getQuoteMissingFields } from '../../../../../shared/utils/requestWorkflow';
import {
  findCapacityBandForGroupSize,
  getCapacityBandKey,
  getEstimatedPackageTotal,
  getRecommendedTransportForBand,
  getTieredPricingBreakdown,
} from '../../../../../shared/utils/packagePricing';
import {
  DocumentViewMode,
  TripPlan,
  User,
  UserRole,
} from '../../../../../shared/types';
import { CBETPackage } from '../../../../../shared/types';
import { plannerRouteService } from '../../../../../shared/services/plannerRouteService';
import { tripService } from '../../../../../shared/services/tripService';
import {
  parseHashRoute,
  replaceHashQuery,
  subscribeToHashRouteChanges,
} from '../../../../../shared/utils/hashRoute';

interface PackageBookingFlowOptions {
  pkg: CBETPackage;
  user: User | null | undefined;
  isFaculty: boolean;
  activeTab: string;
  initialDraft?: {
    date?: string;
    size?: string;
    purpose?: string;
    transportPreference?: string;
    accessibilityNotes?: string;
    selectedPricingBandKey?: string;
  };
}

export const usePackageBookingFlow = ({
  pkg,
  user,
  isFaculty,
  activeTab,
  initialDraft,
}: PackageBookingFlowOptions) => {
  const { addTrip, trips } = useTrips();
  const { addQuoteRequest, plans, quoteRequests, savePackageToPlan } = usePlanner();
  const { records } = useOperationsRecords(plans, quoteRequests, trips);

  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState(initialDraft?.date ?? '');
  const [size, setSize] = useState(initialDraft?.size ?? '');
  const [purpose, setPurpose] = useState(initialDraft?.purpose ?? '');
  const [transportPreference, setTransportPreference] = useState(
    initialDraft?.transportPreference ?? ''
  );
  const [accessibilityNotes, setAccessibilityNotes] = useState(
    initialDraft?.accessibilityNotes ?? ''
  );
  const [selectedPricingBandKey, setSelectedPricingBandKey] = useState(
    initialDraft?.selectedPricingBandKey ?? ''
  );
  const [hashState, setHashState] = useState(() => parseHashRoute());

  useEffect(() => {
    const handleHashChange = () => setHashState(parseHashRoute());
    return subscribeToHashRouteChanges(handleHashChange);
  }, []);

  const currentPrice = size ? getEstimatedPackageTotal(pkg.capacityBands, size) : 0;
  const pricePerStudent = size && currentPrice > 0 ? currentPrice / Number(size) : 0;
  const activeCapacityBand = findCapacityBandForGroupSize(pkg.capacityBands, size);
  const activeTierBreakdown = getTieredPricingBreakdown(pkg.capacityBands, size);
  const tierBandKeys = activeTierBreakdown
    .filter((row) => row.seatsFilled > 0)
    .map((row) => row.bandKey);
  const activeBandKey = activeCapacityBand
    ? getCapacityBandKey(activeCapacityBand)
    : selectedPricingBandKey || undefined;
  const activeBandKeys = tierBandKeys.length
    ? tierBandKeys
    : selectedPricingBandKey
      ? [selectedPricingBandKey]
      : [];
  const readinessMissingFields = getQuoteMissingFields({
    targetDate: date,
    groupSize: size,
    purpose,
    transportPreference,
  });

  const selectedRequestId = hashState.path.startsWith(`/package/${pkg.id}`)
    ? hashState.query.get('request')
    : '';
  const printMode = hashState.query.get('print') as DocumentViewMode | null;

  const latestRequest = selectedRequestId
    ? quoteRequests.find((request) => request.id === selectedRequestId)
    : quoteRequests.find((request) => request.packageId === pkg.id);

  const selectedRecord = records.find(
    (record) =>
      (selectedRequestId && record.request?.id === selectedRequestId) ||
      record.packageId === pkg.id
  );

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
  } as const satisfies TripPlan;

  const selectedTrip = selectedRecord?.trip;
  const selectedPlan = selectedRecord?.plan;
  const documentAudience =
    user?.role === UserRole.ADMIN ? 'admin' : isFaculty ? 'faculty' : 'requester';

  const handleLoginRedirect = () => {
    sessionStorage.setItem('returnTo', `/package/${pkg.id}/${activeTab}`);
    window.location.hash = '/login';
  };

  const handleReview = (event: FormEvent) => {
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

    addTrip(
      tripService.createTripFromRequest({
        request,
        packageName: pkg.name,
        facultyName: user?.name,
        requestorContact: user?.email,
        department: 'General Sciences',
      })
    );

    setShowConfirm(false);

    plannerRouteService.openWorkspace({
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

    window.location.hash = plannerRouteService.buildWorkspaceRoute({
      plan: plan.id,
      view: 'brief',
      document: 'brief',
      audience: isFaculty ? 'faculty' : 'requester',
    });
  };

  const handleDownloadBrief = () => {
    if (latestRequest || selectedPlan) {
      window.location.hash = plannerRouteService.buildWorkspaceRoute({
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
    }, { preserveExisting: true });
  };

  const handleAddPricingBandToTrip = (band: CBETPackage['capacityBands'][number]) => {
    const recommendedTransport = getRecommendedTransportForBand(band);
    const currentGroupSize = Number(size);

    setSelectedPricingBandKey(getCapacityBandKey(band));

    if (
      !size ||
      Number.isNaN(currentGroupSize) ||
      currentGroupSize < band.min ||
      currentGroupSize > band.max
    ) {
      setSize(String(band.min));
    }

    setTransportPreference(recommendedTransport);
  };

  return {
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
  };
};
