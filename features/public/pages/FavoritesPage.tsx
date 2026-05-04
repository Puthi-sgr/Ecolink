import React, { useState } from 'react';
import { usePackages } from '../../../shared/repositories/packageRepository';
import { CBETPackage } from '../../../shared/types';
import { CatalogGrid } from '../components/CatalogGrid';
import { CBETMap } from '../CBETMap';
import { useFavorites } from '../../../app/FavoritesContext';
import { Heart, Map, Grid } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const packages = usePackages();
  const { withFavoriteStatus } = useFavorites();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const packagesWithFavorites = withFavoriteStatus(packages);
  const favoritePackages = packagesWithFavorites.filter((pkg) => pkg.isFavorite);

  const handlePackageSelect = (pkg: CBETPackage) => {
    window.location.hash = `/package/${pkg.id}/overview`;
  };

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-5 xl:px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text">Favorites</h1>
            <p className="text-text-muted mt-2">
              Your saved CBET destinations and field sites.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/88 p-1 shadow-[0_18px_40px_rgba(25,28,29,0.08)] ring-1 ring-[rgba(194,198,212,0.28)] backdrop-blur-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-primary to-primary-500 text-white shadow-[0_12px_24px_rgba(68,152,26,0.22)]'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <Grid className="h-4 w-4" /> Photo View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-primary to-primary-500 text-white shadow-[0_12px_24px_rgba(68,152,26,0.22)]'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <Map className="h-4 w-4" /> Map View
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-5 xl:px-6 pt-6 pb-16">
        {favoritePackages.length === 0 ? (
          <div className="rounded-[28px] bg-surface p-10 text-center shadow-[0_20px_52px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)]">
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
