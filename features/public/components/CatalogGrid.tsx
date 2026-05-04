import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FolderPlus,
  Image,
  Map,
  Mountain,
  Scale,
  ShieldCheck,
  Utensils,
} from 'lucide-react';
import { useAuth } from '../../../app/AuthContext';
import { useFavorites } from '../../../app/FavoritesContext';
import { usePlanner } from '../../../app/PlannerContext';
import { FavoriteButton } from '../../../shared/atoms/FavoriteButton';
import { CldImage } from '../../../shared/atoms/CldImage';
import { Badge } from '../../../shared/atoms/Badge';
import { PackageAvailabilityStrip } from '../../../shared/components/PackageExplorerInsights';
import { Card } from '../../../shared/molecules/Card';
import { CBETPackage, UserRole } from '../../../shared/types';
import { getLogisticsFriction, getTravelRouteProfile } from '../../../shared/utils/packageExplorer';

const PackageMiniMap = lazy(() => import('../CBETMap/PackageMiniMap'));

interface CatalogGridProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
  rowsPerPage?: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const formatDurationLabel = (duration: string) => {
  if (/day/i.test(duration)) return duration;

  const match = duration.match(/(\d+)/);
  if (!match) return duration;

  const days = Number(match[1]);
  const nights = Math.max(days - 1, 1);
  return `${nights} Night${nights > 1 ? 's' : ''}`;
};

const getProvinceLabel = (location: string) => location.toUpperCase();

const getAmenityLabels = (pkg: CBETPackage) => {
  const includeText = pkg.includes.join(' ').toLowerCase();
  const amenities: string[] = [];

  if (/meal|lunch|dinner|breakfast/.test(includeText)) amenities.push('Meals');
  if (pkg.safetyInfo.firstAid || /life jacket|safety/.test(includeText)) amenities.push('Safety Pack');
  if (/transport|transfer|boat/.test(includeText)) amenities.push('Transport');

  return amenities.slice(0, 2);
};

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  packages,
  onPackageSelect,
  rowsPerPage = 3,
}) => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { compareIds, toggleCompare, savePackageToPlan } = usePlanner();
  const isFaculty = user?.role === UserRole.FACULTY;
  const columns = useResponsiveColumns();
  const itemsPerPage = Math.max(rowsPerPage * columns, 1);
  const totalPages = Math.max(Math.ceil(packages.length / itemsPerPage), 1);
  const paginationSignature = `${itemsPerPage}:${packages.length}`;
  const [paginationState, setPaginationState] = useState(() => ({
    page: 1,
    signature: paginationSignature,
  }));
  const currentPage =
    paginationState.signature === paginationSignature
      ? Math.min(paginationState.page, totalPages)
      : 1;

  const setPage = (page: number) => {
    setPaginationState({
      page,
      signature: paginationSignature,
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePackages = packages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {visiblePackages.map((pkg) => (
          <CatalogGridCard
            key={pkg.id}
            pkg={pkg}
            favorite={pkg.isFavorite ?? isFavorite(pkg.id)}
            isCompared={compareIds.includes(pkg.id)}
            isFaculty={isFaculty}
            onPackageSelect={onPackageSelect}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onSaveToPlan={savePackageToPlan}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-text-muted">
            Showing <span className="font-semibold text-text">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-text">{Math.min(startIndex + itemsPerPage, packages.length)}</span>{' '}
            of <span className="font-semibold text-text">{packages.length}</span> destinations
          </p>

          <div className="mt-4 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-text transition-colors shadow-[0_12px_28px_rgba(25,28,29,0.04)] ring-1 ring-[rgba(194,198,212,0.24)] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
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
                      onClick={() => setPage(page)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-primary-500 text-white shadow-[0_12px_24px_rgba(68,152,26,0.22)]'
                          : 'bg-surface text-text-muted shadow-[0_10px_24px_rgba(25,28,29,0.04)] ring-1 ring-[rgba(194,198,212,0.22)] hover:text-primary'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-text transition-colors shadow-[0_12px_28px_rgba(25,28,29,0.04)] ring-1 ring-[rgba(194,198,212,0.24)] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
  favorite: boolean;
  isCompared: boolean;
  isFaculty: boolean;
  onPackageSelect: (pkg: CBETPackage) => void;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSaveToPlan: (input: { packageId: string; planName?: string }) => void;
}

const CatalogGridCard: React.FC<CatalogGridCardProps> = ({
  pkg,
  favorite,
  isCompared,
  isFaculty,
  onPackageSelect,
  onToggleFavorite,
  onToggleCompare,
  onSaveToPlan,
}) => {
  const [showMiniMap, setShowMiniMap] = useState(false);
  const packageHref = `#/package/${pkg.id}/overview`;
  const minPrice = Math.min(...pkg.capacityBands.map((band) => band.pricePerStudent));
  const maxPrice = Math.max(...pkg.capacityBands.map((band) => band.pricePerStudent));
  const amenities = getAmenityLabels(pkg);
  const routeProfile = getTravelRouteProfile(pkg);
  const logisticsFriction = getLogisticsFriction(pkg);

  return (
    <div className="group h-full w-full">
      <Card
        padding="none"
        className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(25,28,29,0.12)]"
      >
        <div className="bg-surface-2/65 px-4 py-1.5 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text">
            {getProvinceLabel(pkg.location)}
          </span>
        </div>

        <div className="relative h-56 overflow-hidden bg-surface-2">
          {showMiniMap ? (
            <Suspense fallback={<div className="h-full w-full animate-pulse bg-surface" />}>
              <PackageMiniMap coordinates={pkg.coordinates} />
            </Suspense>
          ) : pkg.imageSrc || pkg.imageKey ? (
            <CldImage
              src={pkg.imageSrc}
              assetKey={pkg.imageKey}
              alt={pkg.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <Mountain className="h-16 w-16 opacity-25" aria-hidden="true" />
            </div>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white/94 px-3 py-2 text-sm font-medium text-text shadow-[0_14px_32px_rgba(25,28,29,0.14)] ring-1 ring-[rgba(194,198,212,0.24)] backdrop-blur-sm"
              onClick={() => setShowMiniMap((current) => !current)}
            >
              {showMiniMap ? <Image className="h-4 w-4 text-primary" aria-hidden="true" /> : <Map className="h-4 w-4 text-primary" aria-hidden="true" />}
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

        <div className="flex flex-1 flex-col p-4">
          <div className="grid min-h-[64px] grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-start gap-3">
            <div>
              <h3 className="text-[14px] font-bold leading-snug text-text">Phnom Penh</h3>
              <p className="mt-1 text-[12px] text-text">On request</p>
            </div>

            <div className="flex items-center justify-center pt-2 text-text-muted">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="text-right">
              <h3 className="text-[14px] font-bold leading-snug text-text">{pkg.cbetSite}</h3>
              <p className="mt-1 text-[12px] text-text">On request</p>
            </div>
          </div>

          <div className="mt-3 grid min-h-[48px] grid-cols-2 gap-4 border-y border-border/70 py-3 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4 text-text-muted" aria-hidden="true" />
              <span className="text-[12px] uppercase tracking-[0.12em]">{pkg.ecoLinkRole}</span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Clock3 className="h-4 w-4 text-text-muted" aria-hidden="true" />
              <span>{formatDurationLabel(pkg.duration)}</span>
            </div>
          </div>

          <div className="mt-3 min-h-[34px]">
            <a
              href={packageHref}
              className="inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary-300 hover:bg-secondary-100 hover:shadow-sm"
              onClick={(event) => {
                event.preventDefault();
                onPackageSelect(pkg);
              }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white">
                <Activity className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>{pkg.activities[0] ?? 'Main Activity'}</span>
              <span className="text-secondary/70" aria-hidden="true">
                {'>'}
              </span>
            </a>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Explorer insight</p>
              <Badge
                variant={
                  logisticsFriction.tone === 'positive'
                    ? 'accent'
                    : logisticsFriction.tone === 'warning'
                      ? 'secondary'
                      : 'surface'
                }
                size="sm"
              >
                {logisticsFriction.label}
              </Badge>
            </div>
            <p className="mt-2 text-sm font-semibold text-text">{routeProfile.label}</p>
            <p className="mt-1 text-xs text-text-muted">{routeProfile.duration}</p>
            <div className="mt-3">
              <PackageAvailabilityStrip pkg={pkg} />
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-surface p-4">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-text-muted">Per student:</p>
                <div className="mt-1">
                  <span className="text-[1.85rem] font-black leading-none text-text">{currencyFormatter.format(minPrice)}</span>
                </div>
                <p className="mt-1 text-xs text-text-muted">Up to {currencyFormatter.format(maxPrice)} across capacity bands</p>
              </div>

              <a
                href={packageHref}
                className="shrink-0 self-end rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
                onClick={(event) => {
                  event.preventDefault();
                  onPackageSelect(pkg);
                }}
              >
                {isFaculty ? 'Request' : 'Details'}
              </a>
            </div>

            <div className="mt-4 flex min-h-[20px] items-center gap-4 text-xs text-text-muted">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-1.5">
                  {amenity === 'Meals' ? (
                    <Utensils className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                isCompared
                  ? 'border-secondary-200 bg-secondary-50 text-secondary-700'
                  : 'border-border bg-white text-text-muted hover:border-primary/30 hover:text-text'
              }`}
              onClick={() => onToggleCompare(pkg.id)}
            >
              <Scale className="h-4 w-4" aria-hidden="true" />
              {isCompared ? 'Comparing' : 'Compare'}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-primary/30 hover:text-text"
              onClick={() =>
                onSaveToPlan({
                  packageId: pkg.id,
                  planName: `${pkg.cbetSite} shortlist`,
                })
              }
            >
              <FolderPlus className="h-4 w-4" aria-hidden="true" />
              Save to Planner
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
