import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { CldImage } from '../../../shared/atoms/CldImage';

export const SocialProof: React.FC = () => {
  const expeditions = [
    {
      label: 'Royal University of Phnom Penh',
      imageKey: 'cbet.package.veunsaisiampang.snapshot',
      title: '850+ New Flora Cataloged',
      subtitle: 'Prek Toal biodiversity expedition'
    },
    {
      label: 'Panha Chiet University',
      imageKey: 'cbet.package.veunsaisiampang.community.story',
      title: '20+ Local Guides Trained',
      subtitle: 'Chi Phat community project'
    },
    {
      label: 'Liger Leadership Academy',
      imageKey: 'cbet.package.veunsaisiampang.significance',
      title: 'Zero Waste Goal Achieved',
      subtitle: 'Banteay Chhmar field initiative'
    }
  ];

  return (
    <section className="py-20 bg-surface border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-5 xl:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-text mb-3">
              Impact Success Gallery
            </h2>
            <p className="text-text-muted text-base md:text-lg">
              Real-world outcomes from university eco-tourism initiatives coordinated by EcoLink.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {expeditions.map((trip, idx) => (
              <article
                key={idx}
                className="group relative min-h-[430px] overflow-hidden rounded-[26px] border border-border shadow-lg"
              >
                <CldImage
                  assetKey={trip.imageKey}
                  alt={trip.subtitle}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
                  <div className="inline-flex w-fit items-center rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm ring-1 ring-white/20">
                    {trip.label}
                  </div>

                  <div>
                    <h3 className="max-w-xs text-3xl md:text-[2rem] font-bold leading-tight text-white">
                      {trip.title}
                    </h3>
                    <p className="mt-2 text-lg text-white/85">
                      {trip.subtitle}
                    </p>

                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-6 rounded-xl px-5 py-3 font-semibold shadow-lg shadow-black/20"
                    >
                      Read Case Study
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
