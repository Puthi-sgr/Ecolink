import React from 'react';
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useDisclosure } from '../../../shared/directives/useDisclosure';
import { DiscoveryFilters, SortOption } from '../../../shared/types';

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
}

const LINE_CONTROL_CLASS =
  'h-12 w-full border-0 border-b border-border bg-transparent px-0 text-base font-semibold text-text outline-none transition-colors placeholder:font-normal placeholder:text-text-muted/70 focus:border-primary focus:ring-0';

const SECONDARY_LINE_CONTROL_CLASS =
  'h-11 w-full border-0 border-b border-border/70 bg-transparent px-0 text-sm font-semibold text-text outline-none transition-colors focus:border-primary focus:ring-0';

const LineLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-[0.72rem] font-bold uppercase tracking-[0.18em] text-text-muted">{children}</span>
);

const getActiveFilterCount = (filters: DiscoveryFilters) =>
  Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'viewMode') return count;
    if (key === 'sort' && value === 'recommended') return count;
    return value ? count + 1 : count;
  }, 0);

const hasAdvancedFilters = (filters: DiscoveryFilters) =>
  Boolean(filters.groupSize || filters.season || filters.facility || filters.level || filters.leadTime);

export const DiscoveryToolbar: React.FC<DiscoveryToolbarProps> = ({
  filters,
  collections,
  onChange,
  onReset,
  hasActiveFilters,
}) => {
  const advancedFilters = useDisclosure(hasAdvancedFilters(filters));
  const activeFilterCount = getActiveFilterCount(filters);

  return (
    <section className="border-y border-border/70 py-7">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] lg:items-end">
        <label className="space-y-2">
          <LineLabel>Where?</LineLabel>
          <input
            value={filters.query}
            onChange={(event) => onChange('query', event.target.value)}
            placeholder="Destination or site"
            className={LINE_CONTROL_CLASS}
          />
        </label>

        <label className="space-y-2">
          <LineLabel>When?</LineLabel>
          <input
            type="date"
            value={filters.travelDate}
            onChange={(event) => onChange('travelDate', event.target.value)}
            className={LINE_CONTROL_CLASS}
          />
        </label>

        <div className="flex min-w-[190px] flex-col gap-3 lg:items-start">
          <button
            type="button"
            aria-expanded={advancedFilters.isOpen}
            aria-controls="discovery-advanced-filters"
            onClick={advancedFilters.toggle}
            className="inline-flex h-12 items-center gap-2 border-b border-border px-0 text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Advanced
            {advancedFilters.isOpen ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className={`inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-colors focus:outline-none focus:ring-[3px] focus:ring-primary/15 ${
              hasActiveFilters ? 'text-clay hover:text-primary' : 'cursor-not-allowed text-text-muted/45'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset filters
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-3">
        <label className="space-y-2">
          <LineLabel>Region</LineLabel>
          <select value={filters.region} onChange={(event) => onChange('region', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
            <option value="">All regions</option>
            {collections.regionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <LineLabel>Activity</LineLabel>
          <select value={filters.activity} onChange={(event) => onChange('activity', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
            <option value="">All activities</option>
            {collections.activityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <LineLabel>Sort</LineLabel>
          <select value={filters.sort} onChange={(event) => onChange('sort', event.target.value as SortOption)} className={SECONDARY_LINE_CONTROL_CLASS}>
            {Object.entries(collections.sortOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {advancedFilters.isOpen ? (
        <div id="discovery-advanced-filters" className="mt-7 animate-in fade-in slide-in-from-top-2 border-t border-border pt-6 duration-300">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-text-muted">Logistics filters</p>
            {activeFilterCount ? (
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-primary">{activeFilterCount} active</p>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <label className="space-y-2">
              <LineLabel>Group</LineLabel>
              <select value={filters.groupSize} onChange={(event) => onChange('groupSize', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
                <option value="">Any group</option>
                <option value="10-20">10-20</option>
                <option value="21-40">21-40</option>
                <option value="41+">41+</option>
              </select>
            </label>

            <label className="space-y-2">
              <LineLabel>Season</LineLabel>
              <select value={filters.season} onChange={(event) => onChange('season', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
                <option value="">All seasons</option>
                <option value="Nov">Dry ready</option>
                <option value="Dec">Peak dry</option>
                <option value="Year-round">Year-round</option>
                <option value="Jun">Wet sensitive</option>
              </select>
            </label>

            <label className="space-y-2">
              <LineLabel>Facility</LineLabel>
              <select value={filters.facility} onChange={(event) => onChange('facility', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
                <option value="">Any facility</option>
                {collections.facilityOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <LineLabel>Level</LineLabel>
              <select value={filters.level} onChange={(event) => onChange('level', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
                <option value="">Any level</option>
                {collections.levelOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <LineLabel>Lead time</LineLabel>
              <select value={filters.leadTime} onChange={(event) => onChange('leadTime', event.target.value)} className={SECONDARY_LINE_CONTROL_CLASS}>
                <option value="">Any lead time</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30+ days</option>
              </select>
            </label>
          </div>
        </div>
      ) : null}
    </section>
  );
};
