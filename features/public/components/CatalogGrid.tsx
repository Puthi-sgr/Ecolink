import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { CBETPackage, UserRole } from '../../../shared/types';
import { useAuth } from '../../../app/AuthContext';
import { useFavorites } from '../../../app/FavoritesContext';
import { FavoriteButton } from '../../../shared/atoms/FavoriteButton';
import { CldImage } from '../../../shared/atoms/CldImage';
import { Clock, MapPin, ArrowRight, Mountain, ShieldCheck, Bus, Utensils } from 'lucide-react';

interface CatalogGridProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ packages, onPackageSelect }) => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFaculty = user?.role === UserRole.FACULTY;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {packages.map((pkg) => {
        // Calculate price range for display
        const prices = pkg.capacityBands.map(b => b.pricePerStudent);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceDisplay = minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;
        const favorite = pkg.isFavorite ?? isFavorite(pkg.id);

        return (
          <div
            key={pkg.id}
            onClick={() => onPackageSelect(pkg)}
            className="group cursor-pointer"
          >
            <Card
              padding="none"
              className="flex flex-col h-full p-0 overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-3xl"
            >
              <div className="h-92 relative overflow-hidden shrink-0">
                {pkg.imageSrc || pkg.imageKey ? (
                  <CldImage
                    src={pkg.imageSrc}
                    assetKey={pkg.imageKey}
                    alt={pkg.name}
                    className="w-full h-full object-cover object-center scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted italic bg-surface-2">
                    <Mountain className="w-16 h-16 opacity-20" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white shadow-sm">
                    {pkg.managingOrg}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-text shadow-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {pkg.duration}
                  </span>
                  <FavoriteButton
                    isFavorite={favorite}
                    onToggle={(event) => {
                      event.stopPropagation();
                      toggleFavorite(pkg.id);
                    }}
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold font-serif leading-tight">{pkg.name}</h3>
                  <p className="text-sm flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4 text-accent" />
                    {pkg.location}
                  </p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-primary">{pkg.cbetSite}</p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span className="block text-xl font-black text-text leading-none">
                      {priceDisplay}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                      est. / student
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-primary" />
                    <span>Transport Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    <span>Lunch Provided</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Safety Pack</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Capacity Ready</span>
                    <span className="text-sm font-bold text-text">
                      {pkg.bookingConditions.minGroupSize}-{pkg.bookingConditions.maxGroupSize} Students
                    </span>
                  </div>

                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-md shadow-primary/20">
                    {isFaculty ? 'Request Trip' : 'View Details'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
