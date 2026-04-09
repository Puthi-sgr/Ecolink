import React, { Suspense, lazy, useRef } from 'react';
import { Map, MapPin } from 'lucide-react';
import { useCBETPackages } from '../../../shared/data';
import { usePackageDiscovery } from '../../../shared/hooks/usePackageDiscovery';
import { CBETPackage } from '../../../shared/types';
import { Button } from '../../../shared/atoms/Button';
import { CatalogGrid } from '../components/CatalogGrid';
import { DiscoveryEditorialCollections } from '../components/DiscoveryEditorialCollections';
import { DiscoveryToolbar } from '../components/DiscoveryToolbar';
import { HomeHero } from '../components/HomeHero';
import { HowItWorks } from '../components/HowItWorks';
import { ImpactSection } from '../components/ImpactSection';
import { PackageCompareTray } from '../components/PackageCompareTray';
import { SocialProof } from '../components/SocialProof';
import { TrustStrip } from '../components/TrustStrip';

const CBETMap = lazy(() => import('../CBETMap').then((module) => ({ default: module.CBETMap })));

export const CBETCatalog: React.FC = () => {
  const packages = useCBETPackages();
  const catalogRef = useRef<HTMLDivElement>(null);
  const { filters, filteredPackages, setFilter, resetFilters, hasActiveFilters, collections } = usePackageDiscovery(
    packages,
    '/',
    'map'
  );

  const handleCardClick = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <div className="animate-in fade-in duration-700 bg-background">
      <HomeHero
        onExplore={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        searchTerm={filters.query}
        onSearchChange={(value) => setFilter('query', value)}
        groupSize={filters.groupSize}
        onGroupSizeChange={(value) => setFilter('groupSize', value)}
        tripDate={filters.travelDate}
        onTripDateChange={(value) => setFilter('travelDate', value)}
      />

      <HowItWorks id="process-section" />

      <div ref={catalogRef} className="scroll-mt-20 border-t border-border">
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
            <DiscoveryEditorialCollections
              packages={filteredPackages}
              onBrowseAll={() => {
                window.location.hash = '/destinations';
              }}
            />

            <DiscoveryToolbar
              filters={filters}
              collections={collections}
              onChange={setFilter}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              totalCount={filteredPackages.length}
            />

            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
              <div className="hidden md:block" />

              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    aria-pressed={filters.viewMode === 'cards'}
                    onClick={() => setFilter('viewMode', 'cards')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                      filters.viewMode === 'cards' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-primary'
                    }`}
                  >
                    Photo View
                  </button>
                  <button
                    type="button"
                    aria-pressed={filters.viewMode === 'map'}
                    onClick={() => setFilter('viewMode', 'map')}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                      filters.viewMode === 'map' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-primary'
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
                    <CBETMap packages={filteredPackages} onPackageSelect={handleCardClick} />
                  </Suspense>
                ) : (
                  <CatalogGrid packages={filteredPackages} onPackageSelect={handleCardClick} />
                )}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-border bg-white px-6 py-14 text-center shadow-sm">
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
      </div>

      <SocialProof />
      <ImpactSection />
      <TrustStrip />
    </div>
  );
};
