import { CBETPackage } from '../types';

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export interface AvailabilityMonth {
  label: string;
  state: 'off' | 'available' | 'peak';
}

export interface TravelRouteProfile {
  label: string;
  duration: string;
  summary: string;
  segments: string[];
}

export interface LogisticsFrictionProfile {
  label: 'Easy' | 'Moderate' | 'Complex';
  tone: 'positive' | 'neutral' | 'warning';
  score: number;
  summary: string;
  reasons: string[];
}

export interface ComfortIndicator {
  label: string;
  tone: 'positive' | 'neutral' | 'warning';
}

const isWrappedMonthRange = (startMonth: number, endMonth: number, monthIndex: number) => {
  const month = monthIndex + 1;
  if (startMonth <= endMonth) {
    return month >= startMonth && month <= endMonth;
  }
  return month >= startMonth || month <= endMonth;
};

const includesFacility = (pkg: CBETPackage, pattern: RegExp) =>
  pkg.safetyInfo.facilities.some((facility) => pattern.test(facility));

const durationDays = (pkg: CBETPackage) => {
  const match = pkg.duration.match(/(\d+)/);
  return match ? Number(match[1]) : 1;
};

export const getAvailabilityStrip = (pkg: CBETPackage): AvailabilityMonth[] => {
  const { startMonth, endMonth, peakStartMonth, peakEndMonth } = pkg.availabilityMonths;

  return MONTH_LABELS.map((label, index) => {
    const available = isWrappedMonthRange(startMonth, endMonth, index);
    const peak = isWrappedMonthRange(peakStartMonth, peakEndMonth, index);

    return {
      label,
      state: peak ? 'peak' : available ? 'available' : 'off',
    };
  });
};

export const getTravelRouteProfile = (pkg: CBETPackage): TravelRouteProfile => {
  const segments = ['Phnom Penh'];
  const modes = pkg.transportModes;
  const days = durationDays(pkg);

  let duration = '3-4h total routing';
  let label = 'Regional coach route';

  if (/Ratanakiri|Stung Treng/i.test(pkg.location)) {
    duration = '7-9h transfer chain';
    label = 'Long-haul field route';
  } else if (/Koh Kong|Mondulkiri/i.test(pkg.location)) {
    duration = '5-7h transfer chain';
    label = 'Extended coach route';
  } else if (/Siem Reap|Battambang|Kampot|Kep/i.test(pkg.location)) {
    duration = '4-5h transfer chain';
    label = 'Intercity route';
  } else if (days <= 1) {
    duration = '2-3h same-day route';
    label = 'Short field route';
  }

  if (modes.includes('Coach transfer')) segments.push('Coach');
  if (modes.includes('Boat transfer')) segments.push('Boat transfer');
  if (modes.includes('4x4 transfer')) segments.push('4x4 transfer');
  if (modes.includes('Walking segment')) segments.push('On-foot arrival');
  segments.push(pkg.cbetSite);

  return {
    label,
    duration,
    summary: `${label} from Phnom Penh with ${modes.join(' + ').toLowerCase()}.`,
    segments,
  };
};

export const getLogisticsFriction = (
  pkg: CBETPackage,
  travelerGroupSize?: number
): LogisticsFrictionProfile => {
  let score = 0;
  const reasons: string[] = [];

  if (pkg.bookingConditions.minLeadTimeDays >= 14) {
    score += 2;
    reasons.push('Longer lead time');
  }
  if (pkg.transportModes.length >= 2) {
    score += 1;
    reasons.push('Multi-leg routing');
  }
  if (pkg.safetyInfo.activityLevel === 'High') {
    score += 2;
    reasons.push('High activity profile');
  } else if (pkg.safetyInfo.activityLevel === 'Moderate') {
    score += 1;
  }
  if (travelerGroupSize) {
    if (travelerGroupSize > pkg.bookingConditions.maxGroupSize) {
      score += 2;
      reasons.push('Group exceeds preferred capacity');
    } else if (travelerGroupSize >= pkg.bookingConditions.maxGroupSize - 4) {
      score += 1;
      reasons.push('Large-cohort fit needs coordination');
    }
  }

  if (score <= 1) {
    return {
      label: 'Easy',
      tone: 'positive',
      score,
      summary: 'Low-friction planning window with straightforward routing.',
      reasons: reasons.length ? reasons : ['Same-day friendly', 'Straightforward routing'],
    };
  }

  if (score <= 3) {
    return {
      label: 'Moderate',
      tone: 'neutral',
      score,
      summary: 'Needs a little more coordination across timing, routing, or group setup.',
      reasons,
    };
  }

  return {
    label: 'Complex',
    tone: 'warning',
    score,
    summary: 'High-touch trip planning with more routing or readiness dependencies.',
    reasons,
  };
};

export const getComfortIndicators = (pkg: CBETPackage): ComfortIndicator[] => [
  {
    label: pkg.safetyInfo.firstAid ? 'First aid ready' : 'Limited first aid',
    tone: pkg.safetyInfo.firstAid ? 'positive' : 'warning',
  },
  {
    label: includesFacility(pkg, /toilet|restroom/i) ? 'Toilet access' : 'Basic facilities',
    tone: includesFacility(pkg, /toilet|restroom/i) ? 'positive' : 'neutral',
  },
  {
    label: includesFacility(pkg, /water|shower/i) ? 'Water access' : 'Pack essentials',
    tone: includesFacility(pkg, /water|shower/i) ? 'positive' : 'neutral',
  },
  {
    label: pkg.safetyInfo.activityLevel === 'Low' ? 'Low activity' : `${pkg.safetyInfo.activityLevel} activity`,
    tone:
      pkg.safetyInfo.activityLevel === 'Low'
        ? 'positive'
        : pkg.safetyInfo.activityLevel === 'Moderate'
          ? 'neutral'
          : 'warning',
  },
];

export const getAlternativeReason = (
  current: CBETPackage,
  candidate: CBETPackage,
  travelerGroupSize?: number
) => {
  const currentFriction = getLogisticsFriction(current, travelerGroupSize).score;
  const candidateFriction = getLogisticsFriction(candidate, travelerGroupSize).score;

  if (candidateFriction < currentFriction) {
    return 'Simpler logistics for this cohort';
  }

  if (candidate.bookingConditions.minLeadTimeDays < current.bookingConditions.minLeadTimeDays) {
    return 'Better for shorter notice';
  }

  if (candidate.transportModes.length < current.transportModes.length) {
    return 'Cleaner transfer chain';
  }

  if (durationDays(candidate) < durationDays(current)) {
    return 'Easier same-day scheduling';
  }

  return 'Closest learning fit with softer travel friction';
};
