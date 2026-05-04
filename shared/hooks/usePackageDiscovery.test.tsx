import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { CBETPackage } from '../types';
import { usePackageDiscovery } from './usePackageDiscovery';

const createPackage = (): CBETPackage => ({
  id: 'CBET-001',
  name: 'Prek Toal Bird Sanctuary',
  location: 'Tonle Sap Biosphere',
  cbetSite: 'Prek Toal Community',
  managingOrg: 'Wildlife Alliance',
  ecoLinkRole: 'Coordinator',
  description: 'Birdwatching and floating village experience.',
  coordinates: {
    lat: 13.156,
    lng: 103.548,
  },
  duration: '1 Full Day',
  scheduleOutline: ['Morning transfer', 'Birdwatching', 'Community lunch'],
  suitableTiming: 'Nov - Mar',
  capacityBands: [
    {
      min: 10,
      max: 20,
      pricePerStudent: 35,
    },
  ],
  includes: ['Meals', 'Guide'],
  excludes: ['Personal expenses'],
  depositDetails: {
    percentage: 30,
    deadlineDays: 14,
  },
  learningOutcomes: ['Wetland ecology'],
  activities: ['Bird Watching'],
  safetyInfo: {
    activityLevel: 'Low',
    riskNotes: 'Wear sun protection.',
    facilities: ['First aid kit'],
    guideRatio: '1:10',
    firstAid: true,
  },
  bookingConditions: {
    minLeadTimeDays: 7,
    minGroupSize: 10,
    maxGroupSize: 40,
    cancellationPolicy: 'Flexible',
    transportNotes: 'Boat transfer included.',
  },
  themes: ['Conservation'],
  bestFor: ['University field trips'],
  availabilityMonths: {
    startMonth: 1,
    endMonth: 12,
    peakStartMonth: 11,
    peakEndMonth: 3,
    bestSeasonNote: 'Dry season is best.',
    wetSeasonNote: 'Wet season requires caution.',
  },
  highlights: ['Floating village'],
  meetingPoint: 'Phnom Penh',
  transportModes: ['Boat', 'Van'],
  languages: ['English', 'Khmer'],
  reviewSummary: {
    score: 4.8,
    count: 24,
    label: 'Excellent',
    responseSpeed: 'Within 2 days',
    communityImpact: 'High',
  },
  cancellationSummary: 'Flexible cancellation',
  faq: [
    {
      question: 'Is it suitable for students?',
      answer: 'Yes.',
    },
  ],
  featuredCollectionIds: ['tonle-sap'],
});

describe('usePackageDiscovery', () => {
  beforeEach(() => {
    window.location.hash = '#/?view=cards';
  });

  it('does not rewrite the hash after leaving the discovery route', async () => {
    renderHook(() => usePackageDiscovery([createPackage()], '/'));

    await waitFor(() => {
      expect(window.location.hash).toBe('#/?view=cards');
    });

    act(() => {
      window.location.hash = '#/planner?view=timeline';
      window.dispatchEvent(new Event('hashchange'));
    });

    await waitFor(() => {
      expect(window.location.hash).toBe('#/planner?view=timeline');
    });
  });
});
