import React from 'react';
import { CBETPackage, DocumentAudience, QuoteRequest, Trip, TripPlan } from '../types';
import { WorkflowDocumentView } from './WorkflowDocumentView';

interface TripBriefPreviewProps {
  pkg: CBETPackage;
  plan?: TripPlan;
  request?: QuoteRequest;
  trip?: Trip;
  audience?: DocumentAudience;
  onPrint?: () => void;
  onOpenDocument?: () => void;
}

export const TripBriefPreview: React.FC<TripBriefPreviewProps> = ({
  pkg,
  plan,
  request,
  trip,
  audience,
  onPrint,
  onOpenDocument,
}) => (
  <WorkflowDocumentView
    mode="brief"
    audience={audience}
    pkg={pkg}
    plan={plan}
    request={request}
    trip={trip}
    onPrint={onPrint}
    onOpenDocument={onOpenDocument}
  />
);
