import React, { Suspense, lazy } from 'react';
import { Map, MapPin } from 'lucide-react';
import { usePackages } from '../../../shared/repositories/packageRepository';
import { usePackageDiscovery } from '../../../shared/hooks/usePackageDiscovery';
import { CBETPackage, DiscoveryViewMode } from '../../../shared/types';
import { Button } from '../../../shared/atoms/Button';
import { CatalogGrid } from './CatalogGrid';
import { DiscoveryToolbar } from './DiscoveryToolbar';
import { PackageCompareTray } from './PackageCompareTray';

const CBETMap = lazy(() => import('../CBETMap').then((module) => ({ default: module.CBETMap })));

interface FieldSiteDiscoverySectionProps {
  basePath: string;
  defaultViewMode?: DiscoveryViewMode;
}

export const FieldSiteDiscoverySection: React.FC<FieldSiteDiscoverySectionProps> = ({
  basePath,
  defaultViewMode = 'map',
}) => {
  const packages = usePackages();
  const { filters, filteredPackages, setFilter, resetFilters, hasActiveFilters, collections } = usePackageDiscovery(
    packages,
    basePath,
    defaultViewMode
  );

  const handlePackageSelect = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <section className="bg-surface-2/30 py-16">
      <div className="container mx-auto mb-12 px-4 text-center md:px-5 xl:px-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-muted">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          Available Destinations
        </div>
        <h2 className="mb-4 text-4xl font-bold font-serif text-text">Find Your Field Site</h2>
        <p className="mx-auto max-w-xl text-text-muted">
          Browse university-ready packages, compare logistics, and move the strongest options into the trip planner before requesting review.
        </p>
      </div>

      <div className="container mx-auto space-y-6 px-4 pb-12 md:px-5 xl:px-6">
        <DiscoveryToolbar
          filters={filters}
          collections={collections}
          onChange={setFilter}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
          <div className="hidden md:block" />

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/88 p-1 shadow-[0_18px_40px_rgba(25,28,29,0.08)] ring-1 ring-[rgba(194,198,212,0.28)] backdrop-blur-xl">
              <button
                type="button"
                aria-pressed={filters.viewMode === 'cards'}
                onClick={() => setFilter('viewMode', 'cards')}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                  filters.viewMode === 'cards'
                    ? 'bg-gradient-to-r from-primary to-primary-500 text-white shadow-[0_12px_24px_rgba(68,152,26,0.22)]'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Photo View
              </button>
              <button
                type="button"
                aria-pressed={filters.viewMode === 'map'}
                onClick={() => setFilter('viewMode', 'map')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                  filters.viewMode === 'map'
                    ? 'bg-gradient-to-r from-primary to-primary-500 text-white shadow-[0_12px_24px_rgba(68,152,26,0.22)]'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                <Map className="h-4 w-4" aria-hidden="true" />
                Map View
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            <p className="text-center text-sm text-text-muted md:text-right">
              Showing <span className="font-bold text-text">{filteredPackages.length}</span> destinations
            </p>
            {hasActiveFilters ? (
              <Button type="button" variant="ghost" size="sm" className="text-sm" onClick={resetFilters}>
                Reset
              </Button>
            ) : null}
          </div>
        </div>

        {filteredPackages.length ? (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {filters.viewMode === 'map' ? (
              <Suspense fallback={<div className="h-[520px] animate-pulse rounded-[28px] bg-surface" />}>
                <CBETMap packages={filteredPackages} onPackageSelect={handlePackageSelect} />
              </Suspense>
            ) : (
              <CatalogGrid packages={filteredPackages} onPackageSelect={handlePackageSelect} />
            )}
          </div>
        ) : (
          <div className="rounded-[28px] bg-surface px-6 py-14 text-center shadow-[0_20px_52px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-text-muted">No matches found</p>
            <h3 className="mt-3 text-2xl font-bold font-serif text-text">Adjust the shortlist filters to reveal more destinations</h3>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">
              Try a broader region, remove the activity-level filter, or switch back to map view to review the full planning surface.
            </p>
            <div className="mt-6 flex justify-center">
              <Button type="button" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        <PackageCompareTray />
      </div>
    </section>
  );
};
