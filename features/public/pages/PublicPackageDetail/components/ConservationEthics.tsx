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
    <section className="space-y-5">
      <div className="rounded-2xl bg-primary p-5 flex flex-col sm:flex-row gap-4 text-white shadow-sm">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/70 shadow-sm shrink-0">
          <CldImage
            assetKey={imageKey}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">{title}</h4>
          <p className="text-sm text-white/90 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {ethicsRules.map((rule, index) => (
          <div key={rule.title} className="flex items-stretch gap-4">
            <div className="w-6 flex items-center justify-center text-primary font-bold text-2xl leading-none text-center">
              {index + 1}
            </div>
            <div className="flex-1 rounded-2xl border border-primary/25 bg-surface p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {ICONS[rule.icon] ?? <HelpCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-text">{rule.title}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
