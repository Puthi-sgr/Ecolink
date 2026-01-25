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
    <section className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-text">{title}</h4>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="aspect-[16/9]">
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
