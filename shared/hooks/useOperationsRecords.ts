import { useMemo } from 'react';
import { QuoteRequest, Trip, TripPlan } from '../types';
import { buildWorkflowRecords, getTopPackageDemand, groupWorkflowRecords } from '../utils/operationsModel';

export const useOperationsRecords = (plans: TripPlan[], requests: QuoteRequest[], trips: Trip[]) => {
  const records = useMemo(() => buildWorkflowRecords(plans, requests, trips), [plans, requests, trips]);
  const groups = useMemo(() => groupWorkflowRecords(records), [records]);
  const topDemand = useMemo(() => getTopPackageDemand(records), [records]);

  return {
    records,
    groups,
    topDemand,
  };
};

