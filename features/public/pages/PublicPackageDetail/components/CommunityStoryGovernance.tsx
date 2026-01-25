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
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-surface-2">
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

        <p className="text-sm text-text-muted leading-relaxed">
          {description}
        </p>

        <div className="rounded-2xl border border-border/60 overflow-hidden">
          <div className="aspect-[16/9]">
            <CldImage
              assetKey={imageKey}
              alt={`${title} fieldwork`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
