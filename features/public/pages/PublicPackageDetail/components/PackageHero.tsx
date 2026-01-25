import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { MapPin, Mountain } from 'lucide-react';
import { CldImage } from '../../../../../shared/atoms/CldImage';

interface PackageHeroProps {
  pkg: CBETPackage;
}

export const PackageHero: React.FC<PackageHeroProps> = ({ pkg }) => {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-surface-2">
        {pkg.imageKey ? (
          <CldImage
            assetKey={pkg.imageKey}
            alt={pkg.name}
            className="w-full h-[320px] md:h-[360px] object-cover"
          />
        ) : (
          <div className="w-full h-[320px] md:h-[360px] flex items-center justify-center text-text-muted">
            <Mountain className="w-14 h-14 opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight text-white">{pkg.name}</h1>
          <p className="text-white/90 flex items-center gap-2 text-sm md:text-base mt-2">
            <MapPin className="w-4 h-4 text-accent" /> {pkg.location}
          </p>
        </div>
      </div>
    </div>
  );
};
