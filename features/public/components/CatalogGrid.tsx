import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { CBETPackage, UserRole } from '../../../shared/types';
import { useAuth } from '../../../app/AuthContext';
import { Badge } from '../../../shared/atoms/Badge';
import { Clock, MapPin, ArrowRight, Mountain, ShieldCheck, Bus, Utensils, Info } from 'lucide-react';

interface CatalogGridProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ packages, onPackageSelect }) => {
  const { user } = useAuth();
  const isFaculty = user?.role === UserRole.FACULTY;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => {
        // Calculate price range for display
        const prices = pkg.capacityBands.map(b => b.pricePerStudent);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceDisplay = minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

        return (
          <div 
            key={pkg.id} 
            onClick={() => onPackageSelect(pkg)} 
            className="group cursor-pointer"
          >
            <Card className="flex flex-col h-full p-0 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
              {/* Image Section */}
              <div className="h-56 relative overflow-hidden shrink-0">
                {pkg.imageUrl ? (
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted italic bg-surface-2">
                    <Mountain className="w-16 h-16 opacity-20" />
                  </div>
                )}
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-4 left-4">
                  <Badge variant="primary" size="sm" className="bg-white/90 backdrop-blur-sm border-0 shadow-sm">
                    {pkg.managingOrg}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-2 border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-accent" /> {pkg.duration}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1.5 text-sm font-bold font-serif">
                    <MapPin className="w-4 h-4 text-accent" />
                    {pkg.location}
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-text font-serif leading-tight group-hover:text-primary transition-colors pr-4">
                      {pkg.name}
                    </h3>
                    <div className="text-right whitespace-nowrap">
                      <span className="block text-xl font-black text-primary leading-none">
                        {priceDisplay}
                      </span>
                      <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                        est. / student
                      </span>
                    </div>
                  </div>
                  <p className="text-text-muted text-sm line-clamp-2 leading-relaxed h-10 mt-1">
                    {pkg.description}
                  </p>
                </div>

                {/* Trust / Logistics Indicators */}
                <div className="flex flex-wrap gap-2 py-3 border-y border-border/50">
                  <Badge variant="surface" size="xs" icon={<Bus className="w-3 h-3" />}>Transport Included</Badge>
                  <Badge variant="surface" size="xs" icon={<Utensils className="w-3 h-3" />}>Lunch Provided</Badge>
                  <Badge variant="accent" size="xs" icon={<ShieldCheck className="w-3 h-3" />}>Safety Pack</Badge>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Capacity Ready</span>
                    <span className="text-xs font-bold text-text">
                      {pkg.bookingConditions.minGroupSize}-{pkg.bookingConditions.maxGroupSize} Students
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isFaculty ? (
                      <Badge variant="primary" size="sm" className="h-9 px-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                        Request Trip <ArrowRight className="ml-2 w-4 h-4" />
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm" className="h-9 px-4 rounded-xl group-hover:border-primary group-hover:text-primary transition-colors">
                        View Details <Info className="ml-2 w-4 h-4" />
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
