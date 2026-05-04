import React from 'react';
import { Leaf, PawPrint, Footprints, VolumeX, HelpCircle } from 'lucide-react';
import { CldImage } from '../../../../../shared/atoms/CldImage';
import { CldAssetKey } from '../../../../../shared/utils/cld/cldAssets';

interface EthicsRule {
  title: string;
  description: string;
  icon: string;
}

interface ConservationEthicsProps {
  title: string;
  description: string;
  imageKey: CldAssetKey;
  ethicsRules: EthicsRule[];
}

const ICONS: Record<string, React.ReactNode> = {
  paw: <PawPrint className="w-5 h-5" />,
  mute: <VolumeX className="w-5 h-5" />,
  trail: <Footprints className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />
};

export const ConservationEthics: React.FC<ConservationEthicsProps> = ({
  title,
  description,
  imageKey,
  ethicsRules
}) => {
  return (
    <section className="space-y-5 border-b border-border/70 pb-7">
      <div className="flex flex-col gap-4 border-l-2 border-primary pl-5 sm:flex-row">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-primary-200 bg-surface-2">
          <CldImage
            assetKey={imageKey}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{title}</h4>
          <p className="text-sm leading-relaxed text-text-muted">{description}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ethicsRules.map((rule, index) => (
          <div key={rule.title} className="border-t border-border/70 pt-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary">
                {ICONS[rule.icon] ?? <HelpCircle className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Rule {index + 1}</p>
                <p className="mt-1 text-sm font-bold text-text">{rule.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
