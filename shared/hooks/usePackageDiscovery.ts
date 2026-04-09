import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { CBETPackage, DiscoveryFilters, DiscoveryViewMode, SortOption } from '../types';
import { parseHashRoute, replaceHashQuery, subscribeToHashRouteChanges } from '../utils/hashRoute';

const DEFAULTS: DiscoveryFilters = {
  query: '',
  region: '',
  activity: '',
  duration: '',
  groupSize: '',
  season: '',
  facility: '',
  level: '',
  leadTime: '',
  travelDate: '',
  viewMode: 'map',
  sort: 'recommended',
};

const SORT_LABELS: Record<SortOption, string> = {
  recommended: 'Recommended',
  'price-low': 'Price: Low to High',
  'duration-short': 'Shortest Duration',
  'large-groups': 'Best for Large Groups',
  flexible: 'Most Flexible',
};

const getHashQuery = (basePath: string) => {
  const { path, query } = parseHashRoute();
  return path === basePath || (basePath === '/' && path === '/') ? query : new URLSearchParams();
};

const parseFilters = (basePath: string): DiscoveryFilters => {
  const query = getHashQuery(basePath);

  return {
    query: query.get('q') ?? DEFAULTS.query,
    region: query.get('region') ?? DEFAULTS.region,
    activity: query.get('activity') ?? DEFAULTS.activity,
    duration: query.get('duration') ?? DEFAULTS.duration,
    groupSize: query.get('group') ?? DEFAULTS.groupSize,
    season: query.get('season') ?? DEFAULTS.season,
    facility: query.get('facility') ?? DEFAULTS.facility,
    level: query.get('level') ?? DEFAULTS.level,
    leadTime: query.get('lead') ?? DEFAULTS.leadTime,
    travelDate: query.get('date') ?? DEFAULTS.travelDate,
    viewMode: (query.get('view') as DiscoveryViewMode) === 'cards' ? 'cards' : 'map',
    sort: (query.get('sort') as SortOption) || DEFAULTS.sort,
  };
};

const durationRank = (duration: string) => {
  if (/half/i.test(duration)) return 0;
  const dayMatch = duration.match(/(\d+)/);
  return dayMatch ? Number(dayMatch[1]) : 1;
};

const matchesGroupSize = (pkg: CBETPackage, groupSize: string) => {
  if (!groupSize) return true;

  const min = pkg.bookingConditions.minGroupSize;
  const max = pkg.bookingConditions.maxGroupSize;

  if (groupSize === '10-20') return max >= 10 && min <= 20;
  if (groupSize === '21-40') return max >= 21 && min <= 40;
  if (groupSize === '41+') return max >= 41;
  return true;
};

const matchesLeadTime = (pkg: CBETPackage, leadTime: string) => {
  if (!leadTime) return true;
  if (leadTime === '7') return pkg.bookingConditions.minLeadTimeDays <= 7;
  if (leadTime === '14') return pkg.bookingConditions.minLeadTimeDays <= 14;
  return pkg.bookingConditions.minLeadTimeDays > 14;
};

const matchesSeason = (pkg: CBETPackage, season: string) => {
  if (!season) return true;
  return pkg.suitableTiming.toLowerCase().includes(season.toLowerCase());
};

const comparePackages = (sort: SortOption) => (a: CBETPackage, b: CBETPackage) => {
  const aPrice = Math.min(...a.capacityBands.map((band) => band.pricePerStudent));
  const bPrice = Math.min(...b.capacityBands.map((band) => band.pricePerStudent));

  if (sort === 'price-low') return aPrice - bPrice;
  if (sort === 'duration-short') return durationRank(a.duration) - durationRank(b.duration);
  if (sort === 'large-groups') return b.bookingConditions.maxGroupSize - a.bookingConditions.maxGroupSize;
  if (sort === 'flexible') return a.bookingConditions.minLeadTimeDays - b.bookingConditions.minLeadTimeDays;

  return b.reviewSummary.score - a.reviewSummary.score || aPrice - bPrice;
};

export const getDiscoveryCollections = (packages: CBETPackage[]) => {
  const regionOptions = Array.from(new Set(packages.map((pkg) => pkg.location))).sort();
  const activityOptions = Array.from(new Set(packages.flatMap((pkg) => pkg.activities))).sort();
  const facilityOptions = Array.from(new Set(packages.flatMap((pkg) => pkg.safetyInfo.facilities))).sort();
  const levelOptions = Array.from(new Set(packages.map((pkg) => pkg.safetyInfo.activityLevel)));

  return {
    regionOptions,
    activityOptions,
    facilityOptions,
    levelOptions,
    sortOptions: SORT_LABELS,
  };
};

export const usePackageDiscovery = (packages: CBETPackage[], basePath: string, defaultViewMode: DiscoveryViewMode = 'map') => {
  const [filters, setFilters] = useState<DiscoveryFilters>(() => ({
    ...parseFilters(basePath),
    viewMode: parseFilters(basePath).viewMode || defaultViewMode,
  }));
  const deferredQuery = useDeferredValue(filters.query);

  useEffect(() => {
    const handleHashChange = () => {
      setFilters((prev) => ({
        ...prev,
        ...parseFilters(basePath),
      }));
    };

    return subscribeToHashRouteChanges(handleHashChange);
  }, [basePath]);

  useEffect(() => {
    replaceHashQuery(
      basePath,
      {
        q: filters.query.trim() || undefined,
        region: filters.region || undefined,
        activity: filters.activity || undefined,
        duration: filters.duration || undefined,
        group: filters.groupSize || undefined,
        season: filters.season || undefined,
        facility: filters.facility || undefined,
        level: filters.level || undefined,
        lead: filters.leadTime || undefined,
        date: filters.travelDate || undefined,
        view: filters.viewMode !== defaultViewMode ? filters.viewMode : undefined,
        sort: filters.sort !== DEFAULTS.sort ? filters.sort : undefined,
      }
    );
  }, [basePath, defaultViewMode, filters]);

  const filteredPackages = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return packages
      .slice()
      .filter((pkg) => {
        const searchSource = `${pkg.name} ${pkg.location} ${pkg.cbetSite} ${pkg.description}`.toLowerCase();
        return !normalizedQuery || searchSource.includes(normalizedQuery);
      })
      .filter((pkg) => !filters.region || pkg.location === filters.region)
      .filter((pkg) => !filters.activity || pkg.activities.includes(filters.activity))
      .filter((pkg) => !filters.duration || pkg.duration === filters.duration)
      .filter((pkg) => matchesGroupSize(pkg, filters.groupSize))
      .filter((pkg) => matchesSeason(pkg, filters.season))
      .filter((pkg) => !filters.facility || pkg.safetyInfo.facilities.includes(filters.facility))
      .filter((pkg) => !filters.level || pkg.safetyInfo.activityLevel === filters.level)
      .filter((pkg) => matchesLeadTime(pkg, filters.leadTime))
      .sort(comparePackages(filters.sort));
  }, [deferredQuery, filters.activity, filters.duration, filters.facility, filters.groupSize, filters.leadTime, filters.level, filters.region, filters.season, filters.sort, packages]);

  const setFilter = <K extends keyof DiscoveryFilters>(key: K, value: DiscoveryFilters[K]) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setFilters({ ...DEFAULTS, viewMode: defaultViewMode });
    });
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'viewMode') return value !== defaultViewMode;
    return value !== '';
  });

  return {
    filters,
    filteredPackages,
    setFilter,
    resetFilters,
    hasActiveFilters,
    collections: getDiscoveryCollections(packages),
  };
};
