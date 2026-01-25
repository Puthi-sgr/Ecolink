import React from 'react';
import { PawPrint, VolumeX, Footprints, Leaf } from 'lucide-react';
import { CldImage } from '../../../../../shared/atoms/CldImage';

const ETHICS_RULES = [
  {
    title: 'Respect Space',
    description: 'Keep a respectful distance from wildlife and follow guide instructions.',
    icon: <PawPrint className="w-5 h-5" />
  },
  {
    title: 'Silent Observation',
    description: 'No feeding, no flash photography, and keep noise low on trails.',
    icon: <VolumeX className="w-5 h-5" />
  },
  {
    title: 'Stay on Trail',
    description: 'Stay on marked paths to protect habitat and reduce erosion.',
    icon: <Footprints className="w-5 h-5" />
  },
  {
    title: 'Leave No Trace',
    description: 'Pack out waste and avoid single-use plastics during the visit.',
    icon: <Leaf className="w-5 h-5" />
  }
];

export const ConservationEthics: React.FC = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-primary p-5 flex flex-col sm:flex-row gap-4 text-white shadow-sm">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/70 shadow-sm shrink-0">
          <CldImage
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=300&auto=format&fit=crop"
            alt="Forest wildlife"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Conservation Significance</h4>
          <p className="text-sm text-white/90 leading-relaxed">
            The site protects critical rainforest habitat and serves as a sanctuary corridor for rare
            primates, forest birds, and native flora. Ethical wildlife rules keep the experience safe
            and non-intrusive for students and wildlife.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {ETHICS_RULES.map((rule, index) => (
          <div key={rule.title} className="flex items-stretch gap-4">
            <div className="w-6 flex items-center justify-center text-primary font-bold text-2xl leading-none text-center">
              {index + 1}
            </div>
            <div className="flex-1 rounded-2xl border border-primary/25 bg-surface p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {rule.icon}
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
