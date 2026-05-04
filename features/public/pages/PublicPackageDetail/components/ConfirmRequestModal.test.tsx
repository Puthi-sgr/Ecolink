import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmRequestModal } from './ConfirmRequestModal';
import { CBETPackage } from '../../../../../shared/types';

const mockPackage = {
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
} satisfies CBETPackage;

describe('ConfirmRequestModal', () => {
  it('focuses the close button and closes on escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ConfirmRequestModal
        isOpen
        pkg={mockPackage}
        date="2026-05-12"
        size="20"
        purpose="Field methods"
        transportPreference="Coach"
        accessibilityNotes=""
        missingFields={[]}
        currentPrice={900}
        pricePerStudent={45}
        onClose={onClose}
        onSubmit={vi.fn()}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close request confirmation' });
    expect(closeButton).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

