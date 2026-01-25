import React from 'react';
import { CldImage } from '../../../../../shared/atoms/CldImage';

export const CbetSnapshot: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-text">Snapshot</h4>
        <p className="text-sm text-text-muted leading-relaxed">
          Lorem ipsum is a community-run ecotourism site in a remote forest province, known for
          wildlife observation, indigenous culture, and river crossings. Visits directly support
          local livelihoods and conservation work through locally managed services.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="aspect-[16/9]">
          <CldImage
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"
            alt="Forest trail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
