import React from 'react';
import type { CBETPackage } from '../../../../shared/types';
import { ArrowRight, Mountain } from 'lucide-react';

interface CBETMapTooltipCardProps {
  pkg: CBETPackage;
}

export const CBETMapTooltipCard: React.FC<CBETMapTooltipCardProps> = ({ pkg }) => (
  <div className="w-56 p-0 overflow-hidden bg-white rounded-lg shadow-xl border-0 font-sans">
    <div className="h-24 relative">
      <img src={pkg.imageUrl} className="w-full h-full object-cover" alt={pkg.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-2 left-2 text-white">
        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">{pkg.location}</span>
      </div>
    </div>
    <div className="p-3">
      <h4 className="font-bold text-sm text-text mb-1 line-clamp-1">{pkg.name}</h4>
      <div className="flex items-center gap-1 text-[10px] text-text-muted mb-2">
        <Mountain className="w-3 h-3" />
        <span className="truncate">{pkg.activities[0]}</span>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
        <span className="text-[10px] font-bold text-primary">{pkg.duration}</span>
        <div className="flex items-center text-[10px] font-bold text-text-muted group">
          Details <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  </div>
);
