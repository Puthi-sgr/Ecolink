import React, { useState } from 'react';
import { useCBETPackages } from '../../../shared/data/cbetData';
import { CBETPackage } from '../../../shared/types';
import { CatalogGrid } from '../components/CatalogGrid';
import { CBETMap } from '../CBETMap';
import { useFavorites } from '../../../app/FavoritesContext';
import { Heart, Map, Grid } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const packages = useCBETPackages();
  const { withFavoriteStatus } = useFavorites();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const packagesWithFavorites = withFavoriteStatus(packages);
  const favoritePackages = packagesWithFavorites.filter((pkg) => pkg.isFavorite);

  const handlePackageSelect = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <div className="bg-background">
      <section className="container mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text">Favorites</h1>
            <p className="text-text-muted mt-2">
              Your saved CBET destinations and field sites.
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

      <section className="container mx-auto px-6 pt-6 pb-16">
        {favoritePackages.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-10 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">No favorites yet</h3>
            <p className="text-sm text-text-muted">
              Tap the heart on any destination card to save it here.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <CatalogGrid packages={favoritePackages} onPackageSelect={handlePackageSelect} />
        ) : (
          <CBETMap packages={favoritePackages} onPackageSelect={handlePackageSelect} />
        )}
      </section>
    </div>
  );
};
