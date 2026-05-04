import React from 'react';
import { CldImage } from '../../../../../shared/atoms/CldImage';
import { CldAssetKey } from '../../../../../shared/utils/cld/cldAssets';

interface CommunityStoryGovernanceProps {
  title: string;
  subtitle?: string;
  description: string;
  avatarKey: CldAssetKey;
  imageKey: CldAssetKey;
}

export const CommunityStoryGovernance: React.FC<CommunityStoryGovernanceProps> = ({
  title,
  subtitle,
  description,
  avatarKey,
  imageKey
}) => {
  return (
    <section className="grid gap-5 border-b border-border/70 pb-7 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-center">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-surface-2">
            <CldImage
              assetKey={avatarKey}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{title}</p>
            {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px]">
        <div className="aspect-[16/9] bg-surface-2">
          <CldImage
            assetKey={imageKey}
            alt={`${title} fieldwork`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
