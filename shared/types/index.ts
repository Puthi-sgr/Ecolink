
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
  facilities: string[]; // e.g. "Western Toilets", "Local Toilets", "Running Water"
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

export interface CBETPackage {
  id: string;
  name: string;
  location: string;
  cbetSite: string;
  managingOrg: string;
  ecoLinkRole: string; // e.g. "Coordinator", "Partner"
  
  description: string;
  imageKey?: CldAssetKey;
  imageSrc?: string;
  isFavorite?: boolean;
  
  // Coordinates for Map
  coordinates: {
    lat: number;
    lng: number;
  };

  // Schedule & Timing
  duration: string;
  scheduleOutline: string[];
  suitableTiming: string;
  
  // Capacity & Pricing
  capacityBands: CapacityBand[];
  includes: string[];
  excludes: string[];
  depositDetails: {
    percentage: number;
    deadlineDays: number;
  };

  // Education & Safety
  learningOutcomes: string[];
  activities: string[];
  safetyInfo: SafetyInfo;
  
  // Booking Rules
  bookingConditions: BookingConditions;
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
  method: string; // KHQR, ABA, etc.
  proofUrl: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface Trip {
  id: string;
  // Package Reference
  packageId: string;
  packageName: string;
  
  // Requestor Info
  facultyName: string;
  department: string;
  requestorContact: string; // phone or email
  
  // Trip Details
  date: string;
  groupSize: number;
  purpose: string;
  
  // Status & Ops
  status: ProjectStatus;
  transportStatus?: 'Pending' | 'Booked';
  siteNotified?: boolean;
  
  // Documents
  approvalPack?: ApprovalPack;
  paymentProof?: PaymentProof;
}
