import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { CBETPackage, UserRole } from '../../../shared/types';
import { useAuth } from '../../../app/AuthContext';
import { useFavorites } from '../../../app/FavoritesContext';
import { FavoriteButton } from '../../../shared/atoms/FavoriteButton';
import { CldImage } from '../../../shared/atoms/CldImage';
import { ArrowRight, Bus, ChevronLeft, ChevronRight, Clock3, Image, Map, Mountain, ShieldCheck, Utensils } from 'lucide-react';
import { Marker } from 'react-leaflet';
import { CBETMapCanvas } from '../CBETMap/CBETMapCanvas';
import { createCustomIcon } from '../CBETMap/createCustomIcon';

interface CatalogGridProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
  rowsPerPage?: number;
}

const formatDurationLabel = (duration: string) => {
  if (/day/i.test(duration)) return duration;

  const match = duration.match(/(\d+)/);
  if (!match) return duration;

  const days = Number(match[1]);
  const nights = Math.max(days - 1, 1);
  return `${nights} Night${nights > 1 ? 's' : ''}`;
};

const getRegionLabel = (location: string) => {
  const segments = location.split(',').map((segment) => segment.trim()).filter(Boolean);
  return segments.length > 1 ? segments.reverse().join(' • ') : location;
};

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  packages,
  onPackageSelect,
  rowsPerPage = 3,
}) => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFaculty = user?.role === UserRole.FACULTY;
  const markerIcon = useMemo(() => createCustomIcon(), []);
  const columns = useResponsiveColumns();
  const itemsPerPage = Math.max(rowsPerPage * columns, 1);
  const totalPages = Math.max(Math.ceil(packages.length / itemsPerPage), 1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [packages.length, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePackages = packages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {visiblePackages.map((pkg) => {
        const prices = pkg.capacityBands.map((band) => band.pricePerStudent);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const originalPrice = Math.round(maxPrice * 1.35);
        const favorite = pkg.isFavorite ?? isFavorite(pkg.id);
        const routeEnd = pkg.location.split(',').map((segment) => segment.trim()).filter(Boolean)[0] ?? pkg.location;

        return (
          <CatalogGridCard
            key={pkg.id}
            pkg={pkg}
            routeEnd={routeEnd}
            minPrice={minPrice}
            originalPrice={originalPrice}
            favorite={favorite}
            isFaculty={isFaculty}
            markerIcon={markerIcon}
            onPackageSelect={onPackageSelect}
            onToggleFavorite={toggleFavorite}
          />
        );
      })}
      </div>

      {totalPages > 1 && (
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-text-muted">
            Showing <span className="font-semibold text-text">{startIndex + 1}</span>
            {' '}to{' '}
            <span className="font-semibold text-text">
              {Math.min(startIndex + itemsPerPage, packages.length)}
            </span>
            {' '}of{' '}
            <span className="font-semibold text-text">{packages.length}</span> destinations
          </p>

          <div className="mt-4 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'border border-border bg-white text-text-muted hover:border-primary hover:text-primary'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const useResponsiveColumns = () => {
  const getColumns = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [columns, setColumns] = useState(getColumns);

  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
};

interface CatalogGridCardProps {
  pkg: CBETPackage;
  routeEnd: string;
  minPrice: number;
  originalPrice: number;
  favorite: boolean;
  isFaculty: boolean;
  markerIcon: ReturnType<typeof createCustomIcon>;
  onPackageSelect: (pkg: CBETPackage) => void;
  onToggleFavorite: (id: string) => void;
}

const CatalogGridCard: React.FC<CatalogGridCardProps> = ({
  pkg,
  routeEnd,
  minPrice,
  originalPrice,
  favorite,
  isFaculty,
  markerIcon,
  onPackageSelect,
  onToggleFavorite,
}) => {
  const [showMiniMap, setShowMiniMap] = useState(false);

  return (
    <div className="group h-full">
      <Card
        padding="none"
        className="flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="border-b border-border/70 px-5 py-1.5 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text">
            {getRegionLabel(pkg.location)}
          </span>
        </div>

        <div className="relative h-64 overflow-hidden bg-surface-2">
          {showMiniMap ? (
            <CBETMapCanvas center={[pkg.coordinates.lat, pkg.coordinates.lng]} zoom={11}>
              <Marker
                position={[pkg.coordinates.lat, pkg.coordinates.lng]}
                icon={markerIcon}
              />
            </CBETMapCanvas>
          ) : pkg.imageSrc || pkg.imageKey ? (
            <CldImage
              src={pkg.imageSrc}
              assetKey={pkg.imageKey}
              alt={pkg.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <Mountain className="h-16 w-16 opacity-25" />
            </div>
          )}

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-text shadow-md"
              onClick={(event) => {
                event.stopPropagation();
                setShowMiniMap((current) => !current);
              }}
            >
              {showMiniMap ? <Image className="h-4 w-4 text-primary" /> : <Map className="h-4 w-4 text-primary" />}
              {showMiniMap ? 'Photo' : 'Map'}
            </button>

            <FavoriteButton
              isFavorite={favorite}
              onToggle={(event) => {
                event.stopPropagation();
                onToggleFavorite(pkg.id);
              }}
              className="bg-white text-text hover:bg-white"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="grid min-h-[72px] grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-start gap-3">
            <div>
              <h3 className="text-[15px] font-bold leading-snug text-text">
                {pkg.cbetSite}
              </h3>
              <p className="mt-1 text-[13px] text-text">
                {pkg.bookingConditions.minLeadTimeDays} Apr 2026
              </p>
            </div>

            <div className="flex items-center justify-center pt-2 text-text-muted">
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="text-right">
              <h3 className="text-[15px] font-bold leading-snug text-text">
                {routeEnd}
              </h3>
              <p className="mt-1 text-[13px] text-text">
                {pkg.depositDetails.deadlineDays + 20} May 2026
              </p>
            </div>
          </div>

          <div className="mt-4 grid min-h-[52px] grid-cols-2 gap-4 border-y border-border/70 py-3 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4 text-text-muted" />
              <span className="text-[12px] uppercase tracking-[0.12em]">
                {pkg.ecoLinkRole}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Clock3 className="h-4 w-4 text-text-muted" />
              <span>{formatDurationLabel(pkg.duration)}</span>
            </div>
          </div>

          <div className="mt-3 min-h-[36px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/70 text-white">
                %
              </span>
              <span>{pkg.activities[0] ?? 'Field Experience'}</span>
              <span className="text-primary/60">›</span>
            </div>
          </div>

          <div className="mt-4 flex min-h-[96px] items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-text-muted">
                Per guest, from:
              </p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-[2rem] font-black leading-none text-text">
                  ${minPrice.toLocaleString()}
                </span>
                <span className="text-lg text-text-muted line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                ${Math.round(minPrice / Math.max((pkg.capacityBands[0]?.min ?? 1), 1))} per night
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 self-end rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
              onClick={(event) => {
                event.stopPropagation();
                onPackageSelect(pkg);
              }}
            >
              {isFaculty ? 'Request' : 'Details'}
            </button>
          </div>

          <div className="mt-4 flex min-h-[20px] items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <Utensils className="h-3.5 w-3.5" />
              <span>Meals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Safety Pack</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
