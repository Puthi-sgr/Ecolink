import React, { useState } from 'react';
import { useCBETPackages } from '../../../shared/data/cbetData';
import { CBETPackage } from '../../../shared/types';
import { CatalogGrid } from '../components/CatalogGrid';
import { CBETMap } from '../CBETMap';
import { useFavorites } from '../../../app/FavoritesContext';
import { Map, Grid, SlidersHorizontal, MapPin } from 'lucide-react';

const FILTER_TAGS = [
  'Waterfall',
  'Hiking',
  'Homestay',
  'History',
  'Culture',
  'Temples',
  'Wildlife',
  'Water',
  'Birding',
  'Adventure',
  'Trekking',
  'River'
];

export const DestinationsPage: React.FC = () => {
  const packages = useCBETPackages();
  const { withFavoriteStatus } = useFavorites();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const packagesWithFavorites = withFavoriteStatus(packages);

  const handlePackageSelect = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <div className="bg-background">
      <section className="container mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text">Explore Communities</h1>
            <p className="text-text-muted mt-2">
              Sustainable travel destinations for research and leisure.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <Grid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${
                viewMode === 'map'
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <Map className="w-4 h-4" /> Map
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-6">
        <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="max-w-xs">
                <label className="sr-only" htmlFor="destination-region">
                  Filter by region
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="destination-region"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-border bg-white text-sm text-text"
                  >
                    <option>All Regions</option>
                    <option>Tonle Sap</option>
                    <option>Cardamom Mountains</option>
                    <option>Ratanakiri</option>
                    <option>Kampot</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {FILTER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full border border-border bg-white text-text-muted hover:text-text hover:border-primary/30 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-8 pb-16">
        {viewMode === 'grid' ? (
          <CatalogGrid packages={packagesWithFavorites} onPackageSelect={handlePackageSelect} />
        ) : (
          <CBETMap packages={packagesWithFavorites} onPackageSelect={handlePackageSelect} />
        )}
      </section>
    </div>
  );
};
