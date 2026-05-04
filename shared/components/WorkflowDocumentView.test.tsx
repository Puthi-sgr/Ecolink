import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkflowDocumentView } from './WorkflowDocumentView';
import { CBETPackage, UserRole } from '../types';

const mockPackage: CBETPackage = {
  id: 'CBET-001',
  name: 'Prek Toal Bird Sanctuary',
  location: 'Tonle Sap Biosphere',
  cbetSite: 'Prek Toal Community',
  managingOrg: 'Ministry of Environment',
  ecoLinkRole: 'Coordinator',
  description: 'Wetland learning experience',
  coordinates: { lat: 13.2, lng: 103.6 },
  duration: '1 Full Day',
  scheduleOutline: ['06:30 - Depart Campus', '09:00 - Birding'],
  suitableTiming: 'Dry season',
  capacityBands: [{ min: 15, max: 25, pricePerStudent: 45 }],
  includes: ['Guide'],
  excludes: ['Insurance'],
  depositDetails: { percentage: 20, deadlineDays: 14 },
  learningOutcomes: ['Observe wetland ecosystems'],
  activities: ['Bird Watching'],
  safetyInfo: {
    activityLevel: 'Low',
    riskNotes: 'Sun exposure',
    facilities: ['First aid'],
    guideRatio: '1:15',
    firstAid: true,
  },
  bookingConditions: {
    minLeadTimeDays: 10,
    minGroupSize: 15,
    maxGroupSize: 25,
    cancellationPolicy: 'Full refund',
    transportNotes: 'Coach and boat',
  },
  themes: ['Wildlife'],
  bestFor: ['Field cohorts'],
  availabilityMonths: {
    startMonth: 11,
    endMonth: 5,
    peakStartMonth: 12,
    peakEndMonth: 3,
    bestSeasonNote: 'Best in dry season',
    wetSeasonNote: 'Wet season possible',
  },
  highlights: ['Birding'],
  meetingPoint: 'Phnom Penh',
  transportModes: ['Coach', 'Boat'],
  languages: ['English'],
  reviewSummary: {
    score: 4.8,
    count: 42,
    label: 'Highly rated',
    responseSpeed: '24h',
    communityImpact: 'Strong',
  },
  cancellationSummary: 'Full refund 7 days prior.',
  faq: [],
  featuredCollectionIds: ['wildlife'],
};

describe('WorkflowDocumentView', () => {
  it('renders a clean print document layout', () => {
    render(
        <WorkflowDocumentView
          mode="approval-pack"
          audience="admin"
          pkg={mockPackage}
          printMode
          request={{
            id: 'quote-1',
          packageId: 'CBET-001',
          requesterRole: UserRole.FACULTY,
          targetDate: '2026-05-12',
          groupSize: '20',
          purpose: 'Field methods',
          transportPreference: 'Coach',
          accessibilityNotes: '',
          status: 'Approved',
          lastUpdated: '2026-04-05',
          stageHistory: [],
          currentOwnerRole: UserRole.ADMIN,
          nextAction: 'Assemble pack',
          missingFields: [],
          documentStates: [
            {
              key: 'brief',
              label: 'Trip brief',
              status: 'Ready',
              summary: 'Ready',
              updatedAt: '2026-04-05',
            },
          ],
          revisionCount: 0,
          comments: [],
          historyEvents: [],
        }}
      />
    );

    expect(screen.getByText('Admin operations document mode')).toBeInTheDocument();
    expect(screen.getByText('Admin approval pack')).toBeInTheDocument();
    expect(screen.getByText('Document set status: Trip brief Ready')).toBeInTheDocument();
  });
});
