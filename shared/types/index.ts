import { CldAssetKey } from '../utils/cld/cldAssets';

export enum UserRole {
  PUBLIC = 'PUBLIC',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN'
}

export enum ProjectStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  LOCKED = 'LOCKED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export type PlannerStatus = 'Draft' | 'Ready to Request' | 'Ready for Faculty Review' | 'Requested';
export type QuoteRequestStatus = 'Draft' | 'Needs Info' | 'Under Review' | 'Quoted' | 'Approved' | 'Locked';
export type SortOption =
  | 'recommended'
  | 'price-low'
  | 'duration-short'
  | 'large-groups'
  | 'flexible';
export type DiscoveryViewMode = 'map' | 'cards';
export type QuoteDocumentKey = 'brief' | 'itinerary' | 'approval-pack';
export type QuoteDocumentStatus = 'Ready' | 'Draft' | 'Pending';
export type WorkflowStatus = QuoteRequestStatus;
export type DocumentViewMode = QuoteDocumentKey;
export type WorkflowWorkspaceView = 'brief' | 'timeline' | 'documents' | 'notes' | 'history';
export type WorkflowNoteScope = 'requester' | 'internal';
export type DocumentAudience = 'requester' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  dateSubmitted: string;
  status: ProjectStatus;
  category: string;
}

export interface CapacityBand {
  min: number;
  max: number;
  pricePerStudent: number;
}

export interface SafetyInfo {
  activityLevel: 'Low' | 'Moderate' | 'High';
  riskNotes: string;
  facilities: string[];
  guideRatio: string;
  firstAid: boolean;
}

export interface BookingConditions {
  minLeadTimeDays: number;
  minGroupSize: number;
  maxGroupSize: number;
  cancellationPolicy: string;
  transportNotes: string;
}

export interface ReviewSummary {
  score: number;
  count: number;
  label: string;
  responseSpeed: string;
  communityImpact: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AvailabilityWindow {
  startMonth: number;
  endMonth: number;
  peakStartMonth: number;
  peakEndMonth: number;
  bestSeasonNote: string;
  wetSeasonNote: string;
}

export interface CBETPackage {
  id: string;
  name: string;
  location: string;
  cbetSite: string;
  managingOrg: string;
  ecoLinkRole: string;
  description: string;
  imageKey?: CldAssetKey;
  imageSrc?: string;
  isFavorite?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  duration: string;
  scheduleOutline: string[];
  suitableTiming: string;
  capacityBands: CapacityBand[];
  includes: string[];
  excludes: string[];
  depositDetails: {
    percentage: number;
    deadlineDays: number;
  };
  learningOutcomes: string[];
  activities: string[];
  safetyInfo: SafetyInfo;
  bookingConditions: BookingConditions;
  themes: string[];
  bestFor: string[];
  availabilityMonths: AvailabilityWindow;
  highlights: string[];
  meetingPoint: string;
  transportModes: string[];
  languages: string[];
  reviewSummary: ReviewSummary;
  cancellationSummary: string;
  faq: FaqItem[];
  featuredCollectionIds: string[];
}

export interface DiscoveryFilters {
  query: string;
  region: string;
  activity: string;
  duration: string;
  groupSize: string;
  season: string;
  facility: string;
  level: string;
  leadTime: string;
  travelDate: string;
  viewMode: DiscoveryViewMode;
  sort: SortOption;
}

export interface TripPlan {
  id: string;
  name: string;
  packageIds: string[];
  targetDate: string;
  travelerType: 'Faculty' | 'Student Group' | 'Research Team' | 'Leisure';
  groupSize: string;
  notes: string;
  status: PlannerStatus;
  createdAt: string;
}

export interface QuoteStageHistoryEntry {
  id: string;
  status: QuoteRequestStatus;
  title: string;
  summary: string;
  actorRole: UserRole | 'SYSTEM';
  date: string;
}

export interface QuoteDocumentState {
  key: QuoteDocumentKey;
  label: string;
  status: QuoteDocumentStatus;
  summary: string;
  updatedAt: string;
}

export interface WorkflowHistoryEvent {
  id: string;
  type: 'stage' | 'document' | 'note' | 'revision';
  title: string;
  summary: string;
  actorRole: UserRole | 'SYSTEM';
  date: string;
  scope?: WorkflowNoteScope;
  documentKey?: QuoteDocumentKey;
}

export interface QuoteRequestComment {
  id: string;
  author: string;
  authorRole: UserRole | 'SYSTEM';
  scope: WorkflowNoteScope;
  body: string;
  date: string;
}

export interface QuoteRequest {
  id: string;
  tripPlanId?: string;
  packageId: string;
  requesterRole: UserRole;
  targetDate: string;
  groupSize: string;
  purpose: string;
  transportPreference: string;
  accessibilityNotes: string;
  status: QuoteRequestStatus;
  lastUpdated: string;
  stageHistory: QuoteStageHistoryEntry[];
  currentOwnerRole: UserRole;
  nextAction: string;
  missingFields: string[];
  documentStates: QuoteDocumentState[];
  revisionCount: number;
  comments: QuoteRequestComment[];
  historyEvents: WorkflowHistoryEvent[];
}

export interface CBETAbout {
  snapshot: {
    title: string;
    description: string;
    imageKey: CldAssetKey;
  };
  communityStory: {
    title: string;
    subtitle?: string;
    description: string;
    avatarKey: CldAssetKey;
    imageKey: CldAssetKey;
  };
  conservation: {
    title: string;
    description: string;
    imageKey: CldAssetKey;
    ethicsRules: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  seasonality: {
    title?: string;
    rangeStartMonth: number;
    rangeEndMonth: number;
    peakStartMonth: number;
    peakEndMonth: number;
    peakLabel?: string;
    bestSeasonNote?: string;
    wetSeasonNote?: string;
  };
  impact: {
    title?: string;
    subtitle?: string;
    breakdown: Array<{
      label: string;
      value: number;
      color?: string;
    }>;
    localLabel?: string;
  };
  quickFacts: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  accordion: Array<{
    title: string;
    content: string;
  }>;
}

export interface ApprovalPack {
  tripId: string;
  files: { name: string; url: string }[];
  publishedAt: string;
}

export interface PaymentProof {
  tripId: string;
  type: 'Deposit' | 'Full';
  amount: number;
  method: string;
  proofUrl: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface Trip {
  id: string;
  packageId: string;
  tripPlanId?: string;
  quoteRequestId?: string;
  packageName: string;
  facultyName: string;
  department: string;
  requestorContact: string;
  date: string;
  groupSize: number;
  purpose: string;
  status: ProjectStatus;
  transportStatus?: 'Pending' | 'Booked';
  siteNotified?: boolean;
  approvalPack?: ApprovalPack;
  paymentProof?: PaymentProof;
}

export interface WorkflowRecord {
  id: string;
  packageId: string;
  plan?: TripPlan;
  request?: QuoteRequest;
  trip?: Trip;
  status: WorkflowStatus;
  ownerRole: UserRole;
  deadlineDate: string;
  documentStates: QuoteDocumentState[];
  missingFields: string[];
  nextAction: string;
  revisionCount: number;
  isTripLinked: boolean;
}
