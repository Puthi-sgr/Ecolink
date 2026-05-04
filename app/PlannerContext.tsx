import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getInitialPlans, getInitialQuoteRequests } from '../shared/repositories/plannerRepository';
import { QuoteRequest, QuoteRequestStatus, TripPlan, UserRole, WorkflowNoteScope } from '../shared/types';
import { normalizeQuoteRequest } from '../shared/utils/requestWorkflow';
import { workflowService } from '../shared/services/workflowService';

interface SavePlanInput {
  packageId: string;
  planName?: string;
  targetDate?: string;
  travelerType?: TripPlan['travelerType'];
  groupSize?: string;
  notes?: string;
}

interface CreateQuoteRequestInput {
  packageId: string;
  requesterRole: UserRole;
  targetDate?: string;
  groupSize?: string;
  purpose?: string;
  transportPreference?: string;
  accessibilityNotes?: string;
  tripPlanId?: string;
  status?: QuoteRequestStatus;
}

interface AddQuoteRequestCommentInput {
  author: string;
  authorRole: UserRole | 'SYSTEM';
  body: string;
  scope: WorkflowNoteScope;
}

interface PlannerContextType {
  plans: TripPlan[];
  quoteRequests: QuoteRequest[];
  compareIds: string[];
  savePackageToPlan: (input: SavePlanInput) => TripPlan;
  updatePlan: (id: string, updates: Partial<TripPlan>) => void;
  duplicatePlan: (id: string) => TripPlan | undefined;
  markPlanReadyForFacultyReview: (id: string) => void;
  toggleCompare: (packageId: string) => void;
  clearCompare: () => void;
  addQuoteRequest: (input: CreateQuoteRequestInput) => QuoteRequest;
  convertPlanToQuoteRequest: (planId: string) => QuoteRequest | undefined;
  submitQuoteRequest: (requestId: string) => void;
  reopenQuoteRequest: (requestId: string) => void;
  updateQuoteRequest: (requestId: string, updates: Partial<QuoteRequest>) => void;
  addQuoteRequestComment: (requestId: string, input: AddQuoteRequestCommentInput) => void;
  getPlanById: (id: string) => TripPlan | undefined;
  getQuoteRequestById: (id: string) => QuoteRequest | undefined;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const PLANS_STORAGE_KEY = 'ecolink:trip-plans';
const QUOTES_STORAGE_KEY = 'ecolink:quote-requests';
const COMPARE_STORAGE_KEY = 'ecolink:compare';

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const PlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<TripPlan[]>(() => readStorage(PLANS_STORAGE_KEY, getInitialPlans()));
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() =>
    readStorage(QUOTES_STORAGE_KEY, getInitialQuoteRequests()).map((request) => normalizeQuoteRequest(request))
  );
  const [compareIds, setCompareIds] = useState<string[]>(() => readStorage(COMPARE_STORAGE_KEY, []));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const savePackageToPlan = (input: SavePlanInput) => {
    const nextPlan = workflowService.createPlan(input);

    setPlans((prev) => [nextPlan, ...prev]);
    return nextPlan;
  };

  const updatePlan = (id: string, updates: Partial<TripPlan>) => {
    setPlans((prev) => prev.map((plan) => (plan.id === id ? { ...plan, ...updates } : plan)));
  };

  const duplicatePlan = (id: string) => {
    const source = plans.find((plan) => plan.id === id);
    if (!source) return undefined;

    const nextPlan = workflowService.duplicatePlan(source);

    setPlans((prev) => [nextPlan, ...prev]);
    return nextPlan;
  };

  const markPlanReadyForFacultyReview = (id: string) => {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === id ? workflowService.markPlanReadyForFacultyReview(plan) : plan))
    );
  };

  const toggleCompare = (packageId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(packageId)) {
        return prev.filter((id) => id !== packageId);
      }

      if (prev.length >= 3) {
        return [...prev.slice(1), packageId];
      }

      return [...prev, packageId];
    });
  };

  const clearCompare = () => setCompareIds([]);

  const addQuoteRequest = (input: CreateQuoteRequestInput) => {
    const { request: nextRequest } = workflowService.createRequest(
      {
        source: 'package',
        packageId: input.packageId,
        requesterRole: input.requesterRole,
        targetDate: input.targetDate,
        groupSize: input.groupSize,
        purpose: input.purpose,
        transportPreference: input.transportPreference,
        accessibilityNotes: input.accessibilityNotes,
        status: input.status || 'Under Review',
        tripPlanId: input.tripPlanId,
      },
      quoteRequests
    );

    setQuoteRequests((prev) => (prev.some((request) => request.id === nextRequest.id) ? prev : [nextRequest, ...prev]));

    if (input.tripPlanId) {
      setPlans((prev) =>
        prev.map((plan) => (plan.id === input.tripPlanId ? { ...plan, status: 'Requested' } : plan))
      );
    }

    return nextRequest;
  };

  const convertPlanToQuoteRequest = (planId: string) => {
    const plan = plans.find((item) => item.id === planId);
    if (!plan || !plan.packageIds.length) return undefined;

    const { request: nextRequest } = workflowService.createRequestFromPlan(
      plan,
      plan.packageIds[0],
      UserRole.FACULTY,
      'planner',
      quoteRequests
    );

    setQuoteRequests((prev) => (prev.some((request) => request.id === nextRequest.id) ? prev : [nextRequest, ...prev]));
    return nextRequest;
  };

  const submitQuoteRequest = (requestId: string) => {
    setQuoteRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;
        return workflowService.submitRequest(request);
      })
    );
  };

  const reopenQuoteRequest = (requestId: string) => {
    setQuoteRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? workflowService.reopenRequest(request) : request
      )
    );
  };

  const updateQuoteRequest = (requestId: string, updates: Partial<QuoteRequest>) => {
    setQuoteRequests((prev) =>
      prev.map((request) => (request.id === requestId ? workflowService.updateRequest(request, updates) : request))
    );
  };

  const addQuoteRequestComment = (requestId: string, input: AddQuoteRequestCommentInput) => {
    setQuoteRequests((prev) =>
      prev.map((request) => (request.id === requestId ? workflowService.addComment(request, input) : request))
    );
  };

  const getPlanById = (id: string) => plans.find((plan) => plan.id === id);
  const getQuoteRequestById = (id: string) => quoteRequests.find((request) => request.id === id);

  const value: PlannerContextType = {
    plans,
    quoteRequests,
    compareIds,
    savePackageToPlan,
    updatePlan,
    duplicatePlan,
    markPlanReadyForFacultyReview,
    toggleCompare,
    clearCompare,
    addQuoteRequest,
    convertPlanToQuoteRequest,
    submitQuoteRequest,
    reopenQuoteRequest,
    updateQuoteRequest,
    addQuoteRequestComment,
    getPlanById,
    getQuoteRequestById,
  };

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) throw new Error('usePlanner must be used within PlannerProvider');
  return context;
};
