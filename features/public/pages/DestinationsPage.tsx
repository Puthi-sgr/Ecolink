import React, { Suspense, lazy } from 'react';
import { Compass, Map, Sparkles } from 'lucide-react';
import { useCBETPackages } from '../../../shared/data';
import { usePackageDiscovery } from '../../../shared/hooks/usePackageDiscovery';
import { CBETPackage } from '../../../shared/types';
import { CatalogGrid } from '../components/CatalogGrid';
import { DiscoveryEditorialCollections } from '../components/DiscoveryEditorialCollections';
import { DiscoveryToolbar } from '../components/DiscoveryToolbar';
import { PackageCompareTray } from '../components/PackageCompareTray';

const CBETMap = lazy(() => import('../CBETMap').then((module) => ({ default: module.CBETMap })));

export const DestinationsPage: React.FC = () => {
  const packages = useCBETPackages();
  const { filters, filteredPackages, setFilter, resetFilters, hasActiveFilters, collections } = usePackageDiscovery(
    packages,
    '/destinations',
    'cards'
  );

  const handlePackageSelect = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 pt-10 md:px-5 xl:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-border bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Destination Browser
            </div>
            <h1 className="mt-4 text-4xl font-bold font-serif text-text">Explore communities by fit, not just by map pin</h1>
            <p className="mt-3 max-w-2xl text-text-muted">
              This page works like a travel-agency shortlist builder: compare collection themes, narrow the logistics, and send the strongest options into the planner.
            </p>
          </div>

          <div className="rounded-[32px] border border-border bg-surface p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Editorial Collections
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-white p-4 text-sm text-text-muted">
              These collections now reflect the same shared package metadata used in compare mode, planner saves, and quote workflow recommendations.
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-6 px-4 py-8 md:px-5 xl:px-6">
        <DiscoveryEditorialCollections packages={filteredPackages} />

        <DiscoveryToolbar
          filters={filters}
          collections={collections}
          onChange={setFilter}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
          totalCount={filteredPackages.length}
        />

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

        {filteredPackages.length ? (
          filters.viewMode === 'map' ? (
            <Suspense fallback={<div className="h-[520px] animate-pulse rounded-[28px] bg-surface" />}>
              <CBETMap packages={filteredPackages} onPackageSelect={handlePackageSelect} />
            </Suspense>
          ) : (
            <CatalogGrid packages={filteredPackages} onPackageSelect={handlePackageSelect} />
          )
        ) : (
          <div className="rounded-[28px] border border-dashed border-border bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-text-muted">No destinations matched</p>
            <h3 className="mt-3 text-2xl font-bold font-serif text-text">The current destination mix is too narrow</h3>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">
              Reset the collection filters or broaden the activity and facility criteria to reopen the full destination set.
            </p>
          </div>
        )}

        <PackageCompareTray />
      </section>
    </div>
  );
};
