import { CBETPackage } from '../types';

type TravelFields =
  | 'themes'
  | 'bestFor'
  | 'availabilityMonths'
  | 'highlights'
  | 'meetingPoint'
  | 'transportModes'
  | 'languages'
  | 'reviewSummary'
  | 'cancellationSummary'
  | 'faq'
  | 'featuredCollectionIds';

type BasePackage = Omit<CBETPackage, TravelFields>;

const MONTH_LOOKUP: Record<string, [number, number, number, number]> = {
  'Dec - May': [12, 5, 1, 3],
  'Nov - Apr': [11, 4, 12, 2],
  'Year-round': [1, 12, 6, 10],
  'Mar - May': [3, 5, 3, 4],
  'Nov - Mar': [11, 3, 12, 2],
  'Dec - Jan': [12, 1, 12, 1],
  'Oct - Jan': [10, 1, 11, 12],
};

const FEATURED_COLLECTION_RULES = [
  { id: 'wildlife', match: ['Bird', 'Dolphin', 'Gibbon', 'Wildlife'] },
  { id: 'culture', match: ['Temple', 'Village', 'Community', 'Cultural'] },
  { id: 'short-escape', match: ['Half Day', '1 Full Day'] },
  { id: 'overnight', match: ['2 Days', '3 Days'] },
];

const inferThemes = (pkg: BasePackage) => {
  const values = new Set<string>();
  const haystack = `${pkg.name} ${pkg.description} ${pkg.activities.join(' ')}`.toLowerCase();

  if (/bird|dolphin|gibbon|wildlife/.test(haystack)) values.add('Wildlife');
  if (/temple|history|cultural|heritage/.test(haystack)) values.add('Culture');
  if (/waterfall|lake|river|mangrove|mekong/.test(haystack)) values.add('Water');
  if (/trek|hike|camp|jungle|adventure/.test(haystack)) values.add('Adventure');
  if (/homestay|village|community/.test(haystack)) values.add('Community');

  return Array.from(values.size ? values : new Set(['Nature']));
};

const inferBestFor = (pkg: BasePackage) => {
  const results = new Set<string>();

  if (pkg.bookingConditions.maxGroupSize >= 40) results.add('Large student groups');
  if (pkg.safetyInfo.activityLevel === 'Low') results.add('First-time field trips');
  if (pkg.safetyInfo.activityLevel === 'High') results.add('Advanced outdoor cohorts');
  if (pkg.duration.includes('Day')) results.add('Short academic windows');
  if (pkg.duration.includes('Night')) results.add('Immersive overnight study');

  return Array.from(results);
};

const inferAvailabilityMonths = (pkg: BasePackage) => {
  const timing = pkg.suitableTiming.match(/[A-Z][a-z]{2} - [A-Z][a-z]{2}|Year-round/)?.[0] ?? 'Year-round';
  const [startMonth, endMonth, peakStartMonth, peakEndMonth] = MONTH_LOOKUP[timing] ?? MONTH_LOOKUP['Year-round'];

  return {
    startMonth,
    endMonth,
    peakStartMonth,
    peakEndMonth,
    bestSeasonNote: pkg.suitableTiming,
    wetSeasonNote: pkg.safetyInfo.riskNotes,
  };
};

const inferHighlights = (pkg: BasePackage) => [
  pkg.activities[0] ?? 'Community-guided experience',
  `${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize} participant planning range`,
  pkg.includes[0] ?? 'Community-hosted logistics',
];

const inferMeetingPoint = (pkg: BasePackage) => {
  if (/Phnom Penh/i.test(pkg.location)) return 'Phnom Penh campus pickup before onward transfer';
  if (/Ratanakiri|Kratie|Stung Treng/i.test(pkg.location)) return 'Regional transfer hub with EcoLink departure briefing';
  return 'Phnom Penh campus pickup with local arrival orientation on site';
};

const inferTransportModes = (pkg: BasePackage) => {
  const note = pkg.bookingConditions.transportNotes.toLowerCase();
  const modes = new Set<string>(['Coach transfer']);

  if (note.includes('boat') || note.includes('ferry')) modes.add('Boat transfer');
  if (note.includes('motorbike')) modes.add('Motorbike transfer');
  if (note.includes('walk') || note.includes('foot')) modes.add('Walking segment');
  if (note.includes('4x4')) modes.add('4x4 transfer');
  if (note.includes('ox-cart')) modes.add('Community cart ride');

  return Array.from(modes);
};

const inferFeaturedCollections = (pkg: BasePackage) => {
  const values = new Set<string>();
  const haystack = `${pkg.name} ${pkg.duration}`.toLowerCase();

  FEATURED_COLLECTION_RULES.forEach((rule) => {
    if (rule.match.some((term) => haystack.includes(term.toLowerCase()))) {
      values.add(rule.id);
    }
  });

  if (!values.size) values.add('community');
  return Array.from(values);
};

const inferReviewSummary = (pkg: BasePackage) => ({
  score: pkg.safetyInfo.firstAid ? 4.8 : 4.6,
  count: 18 + pkg.activities.length * 3,
  label: pkg.safetyInfo.activityLevel === 'High' ? 'Adventure Favorite' : 'Planner Favorite',
  responseSpeed: pkg.bookingConditions.minLeadTimeDays <= 7 ? 'Typically replies within 1 business day' : 'Typically replies within 2 business days',
  communityImpact: `${Math.max(55, 60 + pkg.activities.length * 4)}% of trip value stays with the host community`,
});

const inferFaq = (pkg: BasePackage) => [
  {
    question: 'What should the group confirm before requesting this package?',
    answer: `Confirm your group size, preferred date, and academic purpose. EcoLink uses a minimum lead time of ${pkg.bookingConditions.minLeadTimeDays} days for this site.`,
  },
  {
    question: 'How are transport and arrival handled?',
    answer: pkg.bookingConditions.transportNotes,
  },
  {
    question: 'What happens if the trip needs to be cancelled?',
    answer: pkg.bookingConditions.cancellationPolicy,
  },
];

export const withTravelMetadata = (packages: BasePackage[]): CBETPackage[] =>
  packages.map((pkg) => ({
    ...pkg,
    themes: inferThemes(pkg),
    bestFor: inferBestFor(pkg),
    availabilityMonths: inferAvailabilityMonths(pkg),
    highlights: inferHighlights(pkg),
    meetingPoint: inferMeetingPoint(pkg),
    transportModes: inferTransportModes(pkg),
    languages: ['English', 'Khmer'],
    reviewSummary: inferReviewSummary(pkg),
    cancellationSummary: `${pkg.depositDetails.percentage}% deposit, requested ${pkg.depositDetails.deadlineDays} days before departure. ${pkg.bookingConditions.cancellationPolicy}`,
    faq: inferFaq(pkg),
    featuredCollectionIds: inferFeaturedCollections(pkg),
  }));
