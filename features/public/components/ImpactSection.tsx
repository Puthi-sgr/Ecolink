import React from 'react';

export const ImpactSection: React.FC = () => {
  return (
    <div className="bg-surface border-b border-border py-4 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-6 text-text-muted">
            <div className="flex flex-col">
                <span className="font-bold text-text text-xl leading-none">1,240</span>
                <span className="text-[10px] uppercase tracking-wider">Students Sent</span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="flex flex-col">
                <span className="font-bold text-text text-xl leading-none">$45k</span>
                <span className="text-[10px] uppercase tracking-wider">Community Revenue</span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="flex flex-col">
                <span className="font-bold text-text text-xl leading-none">12</span>
                <span className="text-[10px] uppercase tracking-wider">Partner Sites</span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 bg-surface-2 px-4 py-2 rounded-full border border-border animate-in slide-in-from-right-8 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-text-muted text-xs">
                Last trip coordinated: <span className="font-bold text-text">Prek Toal Biosphere (2 days ago)</span>
            </span>
        </div>
      </div>
    </div>
  );
};
