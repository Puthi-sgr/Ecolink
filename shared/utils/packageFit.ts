import { CBETPackage } from '../types';

const durationDays = (duration: string) => {
  const match = duration.match(/(\d+)/);
  return match ? Number(match[1]) : 1;
};

export const getPackageFitCallout = (pkg: CBETPackage) => {
  if (pkg.featuredCollectionIds.includes('short-escape') || durationDays(pkg.duration) <= 1) {
    return 'Lowest logistics friction';
  }

  if (pkg.featuredCollectionIds.includes('overnight') || durationDays(pkg.duration) >= 2) {
    return 'Best for overnight immersion';
  }

  if (pkg.bookingConditions.maxGroupSize >= 24 || pkg.bestFor.some((item) => /cohort|student/i.test(item))) {
    return 'Best for first-time cohorts';
  }

  if (pkg.bookingConditions.minLeadTimeDays <= 10) {
    return 'Best for short-notice planning';
  }

  return 'Best for focused field learning';
};

const scoreAlternative = (current: CBETPackage, candidate: CBETPackage, travelerGroupSize?: number) => {
  let score = 0;

  if (candidate.id === current.id) return -Infinity;
  if (candidate.activities.some((activity) => current.activities.includes(activity))) score += 3;
  if (candidate.location === current.location) score += 2;
  if (candidate.featuredCollectionIds.some((id) => current.featuredCollectionIds.includes(id))) score += 4;
  if (candidate.safetyInfo.activityLevel === current.safetyInfo.activityLevel) score += 1;
  if (candidate.bookingConditions.minLeadTimeDays < current.bookingConditions.minLeadTimeDays) score += 2;
  if (
    travelerGroupSize &&
    travelerGroupSize >= candidate.bookingConditions.minGroupSize &&
    travelerGroupSize <= candidate.bookingConditions.maxGroupSize
  ) {
    score += 3;
  }

  return score;
};

export const getRecommendedAlternatives = (
  current: CBETPackage,
  packages: CBETPackage[],
  travelerGroupSize?: number
) =>
  packages
    .map((candidate) => ({ candidate, score: scoreAlternative(current, candidate, travelerGroupSize) }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((entry) => entry.candidate);

