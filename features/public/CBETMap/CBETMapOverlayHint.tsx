import React from 'react';
import { Globe2 } from 'lucide-react';

export const CBETMapOverlayHint: React.FC = () => (
  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-border z-[1000] pointer-events-none">
    <div className="flex items-center gap-2">
      <Globe2 className="w-4 h-4 text-primary" />
      <span className="text-xs font-bold text-text">Interactive Map</span>
    </div>
    <p className="text-[10px] text-text-muted">Hover for details, click to view package.</p>
  </div>
);
