import { CreateRequestInput, QuoteRequest, QuoteRequestStatus, TripPlan, UserRole } from '../types';
import {
  appendQuoteRequestComment,
  createDraftQuoteFromPlan,
  normalizeQuoteRequest,
  updateQuoteRequestWorkflow,
} from '../utils/requestWorkflow';

const buildId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;

const normalizeIntentKey = (input: Omit<CreateRequestInput, 'source'> & { source?: CreateRequestInput['source'] }) =>
  [
    input.packageId,
    input.tripPlanId || 'standalone',
    input.targetDate?.trim() || 'date-pending',
    input.groupSize?.trim() || 'size-pending',
    input.purpose?.trim() || 'purpose-pending',
    input.transportPreference?.trim() || 'transport-pending',
    input.requesterRole,
  ].join('::');

const findExistingRequestForIntent = (existingRequests: QuoteRequest[], input: CreateRequestInput) => {
  if (input.tripPlanId) {
    return existingRequests.find(
      (request) => request.tripPlanId === input.tripPlanId && request.packageId === input.packageId
    );
  }

  const nextIntentKey = normalizeIntentKey(input);
  return existingRequests.find(
    (request) =>
      normalizeIntentKey({
        packageId: request.packageId,
        requesterRole: request.requesterRole,
        tripPlanId: request.tripPlanId,
        targetDate: request.targetDate,
        groupSize: request.groupSize,
        purpose: request.purpose,
        transportPreference: request.transportPreference,
      }) === nextIntentKey
  );
};

export const workflowService = {
  createPlan(input: {
    packageId: string;
    planName?: string;
    targetDate?: string;
    travelerType?: TripPlan['travelerType'];
    groupSize?: string;
    notes?: string;
  }): TripPlan {
    return {
      id: buildId('plan'),
      name: input.planName?.trim() || 'New Trip Plan',
      packageIds: [input.packageId],
      targetDate: input.targetDate || '',
      travelerType: input.travelerType || 'Faculty',
      groupSize: input.groupSize || '',
      notes: input.notes || '',
      status: 'Draft',
      createdAt: new Date().toISOString().slice(0, 10),
    };
  },

  duplicatePlan(plan: TripPlan): TripPlan {
    return {
      ...plan,
      id: buildId('plan'),
      name: `${plan.name} Copy`,
      status: 'Draft',
      createdAt: new Date().toISOString().slice(0, 10),
    };
  },

  markPlanReadyForFacultyReview(plan: TripPlan): TripPlan {
    return {
      ...plan,
      status: 'Ready for Faculty Review',
    };
  },

  createRequest(input: CreateRequestInput, existingRequests: QuoteRequest[] = []) {
    const existing = findExistingRequestForIntent(existingRequests, input);
    if (existing) {
      return {
        request: existing,
        reusedExisting: true,
      };
    }

    return {
      request: normalizeQuoteRequest({
        id: buildId('quote'),
        source: input.source,
        packageId: input.packageId,
        requesterRole: input.requesterRole,
        targetDate: input.targetDate,
        groupSize: input.groupSize,
        purpose: input.purpose,
        transportPreference: input.transportPreference,
        accessibilityNotes: input.accessibilityNotes,
        tripPlanId: input.tripPlanId,
        status: input.status || 'Under Review',
        lastUpdated: new Date().toISOString().slice(0, 10),
      }),
      reusedExisting: false,
    };
  },

  createRequestFromPlan(
    plan: TripPlan,
    packageId: string,
    requesterRole: UserRole,
    source: CreateRequestInput['source'],
    existingRequests: QuoteRequest[] = []
  ) {
    const existing = existingRequests.find(
      (request) => request.tripPlanId === plan.id && request.packageId === packageId
    );

    if (existing) {
      return {
        request: existing,
        reusedExisting: true,
      };
    }

    return {
      request: {
        ...createDraftQuoteFromPlan(buildId('quote'), plan, packageId, requesterRole),
        source,
      },
      reusedExisting: false,
    };
  },

  submitRequest(request: QuoteRequest) {
    const nextStatus: QuoteRequestStatus = request.missingFields.length ? 'Needs Info' : 'Under Review';
    return updateQuoteRequestWorkflow(
      request,
      {},
      nextStatus,
      nextStatus === 'Needs Info'
        ? 'Readiness check failed. The request is waiting on planner details before admin can quote.'
        : 'Readiness check passed and the request has been sent into admin review.'
    );
  },

  reopenRequest(request: QuoteRequest) {
    return updateQuoteRequestWorkflow(
      request,
      { revisionCount: request.revisionCount + 1 },
      'Needs Info',
      'Quote reopened for changes. Update the assumptions and resubmit for review.'
    );
  },

  updateRequest(request: QuoteRequest, updates: Partial<QuoteRequest>) {
    return updateQuoteRequestWorkflow(request, updates);
  },

  addComment: appendQuoteRequestComment,
};

