import React, { useMemo } from 'react';
import { CldImage } from '../../../shared/atoms/CldImage';
import { useCBETPackages } from '../../../shared/data/cbetData';

const formatNumber = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return value.toString();
};

export const ImpactSection: React.FC = () => {
  const packages = useCBETPackages();
  const stats = useMemo(() => {
    if (!packages.length) {
      return {
        totalStudents: 0,
        estimatedRevenue: 0,
        partnerSites: 0,
        lastTripName: 'No trips yet'
      };
    }

    const totalStudents = packages.reduce(
      (sum, pkg) => sum + (pkg.bookingConditions?.maxGroupSize || 0),
      0
    );
    const estimatedRevenue = packages.reduce((sum, pkg) => {
      const baseBand = pkg.capacityBands?.[0];
      if (!baseBand) return sum;
      return sum + baseBand.pricePerStudent * (pkg.bookingConditions?.minGroupSize || 0);
    }, 0);

    return {
      totalStudents,
      estimatedRevenue,
      partnerSites: packages.length,
      lastTripName: packages[0]?.name ?? 'Latest CBET trip'
    };
  }, [packages]);

  return (
    <div className="bg-surface border-b border-border py-4 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-6 text-text-muted">
          <div className="flex flex-col">
            <span className="font-bold text-text text-xl leading-none">{formatNumber(stats.totalStudents)}</span>
            <span className="text-[10px] uppercase tracking-wider">Students Sent</span>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="flex flex-col">
            <span className="font-bold text-text text-xl leading-none">${formatNumber(stats.estimatedRevenue)}</span>
            <span className="text-[10px] uppercase tracking-wider">Community Revenue</span>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="flex flex-col">
            <span className="font-bold text-text text-xl leading-none">{stats.partnerSites}</span>
            <span className="text-[10px] uppercase tracking-wider">Partner Sites</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-2 px-4 py-2 rounded-full border border-border animate-in slide-in-from-right-8 duration-1000">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
            <CldImage assetKey="logo.main" alt="EcoLink logo" className="w-4 h-4 object-contain" />
          </div>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-text-muted text-xs">
            Last trip coordinated: <span className="font-bold text-text">{stats.lastTripName}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
