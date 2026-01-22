import React from 'react';
import { Badge } from '../../../../../shared/atoms/Badge';
import { Button } from '../../../../../shared/atoms/Button';
import { CBETPackage } from '../../../../../shared/types';
import { ArrowLeft, MapPin } from 'lucide-react';

interface PackageHeroProps {
  pkg: CBETPackage;
  onBack: () => void;
}

export const PackageHero: React.FC<PackageHeroProps> = ({ pkg, onBack }) => {
  const minPrice = Math.min(...pkg.capacityBands.map((band) => band.pricePerStudent));

  return (
    <section className="bg-primary text-surface py-12 md:py-20">
      <div className="container mx-auto px-6">
        <Button
          variant="ghost"
          className="text-surface hover:bg-white/10 mb-8 pl-0"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {pkg.cbetSite}
              </Badge>
              <span className="text-primary-100/50">{'>'}</span>
              <span className="text-sm font-medium text-primary-100">{pkg.managingOrg}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">{pkg.name}</h1>
            <p className="text-primary-100 flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-accent" /> {pkg.location}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-eco p-4 border border-white/10 text-right">
            <span className="block text-xs uppercase font-bold tracking-widest text-primary-100">From</span>
            <span className="block text-3xl font-black text-white">${minPrice}</span>
            <span className="block text-[10px] uppercase font-bold text-primary-100">est. per student</span>
          </div>
        </div>
      </div>
    </section>
  );
};
