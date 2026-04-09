import React from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { DiscoveryFilters, SortOption } from '../../../shared/types';
import { Button } from '../../../shared/atoms/Button';

interface DiscoveryToolbarProps {
  filters: DiscoveryFilters;
  collections: {
    regionOptions: string[];
    activityOptions: string[];
    facilityOptions: string[];
    levelOptions: string[];
    sortOptions: Record<SortOption, string>;
  };
  onChange: <K extends keyof DiscoveryFilters>(key: K, value: DiscoveryFilters[K]) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
}

const CONTROL_CLASS =
  'h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15';

export const DiscoveryToolbar: React.FC<DiscoveryToolbarProps> = ({
  filters,
  collections,
  onChange,
  onReset,
  hasActiveFilters,
  totalCount,
}) => {
  return (
    <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Planning Filters
          </div>
          <p className="mt-2 text-sm text-text-muted">
            Narrow the shortlist by destination fit, operations, and booking readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-text-muted">
            <span className="font-semibold text-text">{totalCount}</span> destinations match
          </p>
          {hasActiveFilters ? (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <input
              value={filters.query}
              onChange={(event) => onChange('query', event.target.value)}
              placeholder="Search destination or site..."
              className={`${CONTROL_CLASS} pl-9`}
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Region</span>
          <select value={filters.region} onChange={(event) => onChange('region', event.target.value)} className={CONTROL_CLASS}>
            <option value="">All Regions</option>
            {collections.regionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Activity</span>
          <select value={filters.activity} onChange={(event) => onChange('activity', event.target.value)} className={CONTROL_CLASS}>
            <option value="">All Activities</option>
            {collections.activityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Sort</span>
          <select value={filters.sort} onChange={(event) => onChange('sort', event.target.value as SortOption)} className={CONTROL_CLASS}>
            {Object.entries(collections.sortOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Group Size</span>
          <select value={filters.groupSize} onChange={(event) => onChange('groupSize', event.target.value)} className={CONTROL_CLASS}>
            <option value="">Any Group</option>
            <option value="10-20">10-20</option>
            <option value="21-40">21-40</option>
            <option value="41+">41+</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Season</span>
          <select value={filters.season} onChange={(event) => onChange('season', event.target.value)} className={CONTROL_CLASS}>
            <option value="">All Seasons</option>
            <option value="Nov">Dry Season Ready</option>
            <option value="Dec">Peak Dry Season</option>
            <option value="Year-round">Year-round</option>
            <option value="Jun">Wet Season Sensitive</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Facility</span>
          <select value={filters.facility} onChange={(event) => onChange('facility', event.target.value)} className={CONTROL_CLASS}>
            <option value="">Any Facility</option>
            {collections.facilityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Activity Level</span>
          <select value={filters.level} onChange={(event) => onChange('level', event.target.value)} className={CONTROL_CLASS}>
            <option value="">Any Level</option>
            {collections.levelOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">Lead Time</span>
          <select value={filters.leadTime} onChange={(event) => onChange('leadTime', event.target.value)} className={CONTROL_CLASS}>
            <option value="">Any Lead Time</option>
            <option value="7">Within 7 days</option>
            <option value="14">Within 14 days</option>
            <option value="30">30+ day planning</option>
          </select>
        </label>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-4 text-sm text-text-muted">
        <div className="flex items-center gap-2 font-semibold text-text">
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
          Search state is URL-synced
        </div>
        <p className="mt-1">
          Shareable filters and sort order make the shortlist easy to revisit across the public, faculty, and admin planning flows.
        </p>
      </div>
    </section>
  );
};
