import React from 'react';
import { CldImage } from '../../../../../shared/atoms/CldImage';
import { CldAssetKey } from '../../../../../shared/utils/cld/cldAssets';

interface CbetSnapshotProps {
  title: string;
  description: string;
  imageKey: CldAssetKey;
}

export const CbetSnapshot: React.FC<CbetSnapshotProps> = ({ title, description, imageKey }) => {
  return (
    <section className="grid gap-5 border-y border-border/70 py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-center">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Community context</p>
        <h4 className="text-2xl font-bold font-serif text-text">{title}</h4>
        <p className="text-sm leading-relaxed text-text-muted">{description}</p>
      </div>

      <div className="overflow-hidden rounded-[28px]">
        <div className="aspect-[16/9] bg-surface-2">
          <CldImage
            assetKey={imageKey}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
