import React from 'react';
import { CldImage } from '../../../../../shared/atoms/CldImage';

export const CommunityStoryGovernance: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-surface-2">
            <CldImage
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
              alt="Community lead"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Community Story</p>
            <p className="text-xs text-text-muted">CBET committee & youth rangers</p>
          </div>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          Lorem ipsum is managed by a community committee and a youth ranger team. EcoLink works with
          the local CBET committee and a regional conservation partner to coordinate training, safety,
          and visitor protocols. Homestay hosts rotate by family to ensure fair income.
        </p>

        <div className="rounded-2xl border border-border/60 overflow-hidden">
          <div className="aspect-[16/9]">
            <CldImage
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
              alt="Community fieldwork"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
