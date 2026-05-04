import React from 'react';
import { ArrowLeft, MapPin, Mountain } from 'lucide-react';
import { CldImage } from '../../../../../shared/atoms/CldImage';
import { Button } from '../../../../../shared/atoms/Button';
import { CBETPackage } from '../../../../../shared/types';

interface PackageHeroProps {
  pkg: CBETPackage;
  onBack: () => void;
  onViewPricing: () => void;
}

export const PackageHero: React.FC<PackageHeroProps> = ({ pkg, onBack, onViewPricing }) => {
  return (
    <section className="overflow-hidden rounded-[36px] bg-surface shadow-[0_28px_72px_rgba(25,28,29,0.12)] ring-1 ring-[rgba(194,198,212,0.18)]">
      <div className="relative min-h-[420px] bg-surface-2 md:min-h-[520px]">
        {pkg.imageSrc || pkg.imageKey ? (
          <CldImage
            src={pkg.imageSrc}
            assetKey={pkg.imageKey}
            alt={pkg.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            <Mountain className="h-16 w-16 opacity-30" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,16,0.66)_0%,rgba(11,18,16,0.42)_24%,rgba(11,18,16,0.64)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,27,0.16)_0%,rgba(20,32,27,0.42)_58%,rgba(12,18,16,0.72)_100%)]" />

        <div className="absolute inset-0 flex flex-col px-5 py-6 md:px-10 md:py-9">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/92 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Catalog
          </button>

          <div className="flex flex-1 items-center justify-center pb-20 md:pb-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <h1 className="max-w-4xl text-[2.5rem] font-bold font-serif leading-[1.04] text-white md:text-[3.9rem]">
                {pkg.name}
              </h1>

              <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/95 md:text-[1.05rem]">
                <MapPin className="h-4 w-4 text-primary-200" aria-hidden="true" />
                {pkg.location}
              </p>

              <Button
                type="button"
                onClick={onViewPricing}
                className="mt-8 min-w-[11rem] rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] shadow-[0_16px_34px_rgba(68,152,26,0.24)]"
              >
                View Pricing
              </Button>
            </div>
          </div>

          <div className="mt-auto max-w-[34rem]">
            <div className="grid gap-2 border-l border-white/22 pl-4 text-left md:grid-cols-2 md:gap-2 md:pl-5">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">Field Partner</p>
                <p className="mt-1 text-[5px] font-semibold text-white md:text-[10px]">{pkg.cbetSite}</p>
              </div>

              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">Managed With</p>
                <p className="mt-1 text-[5px] font-semibold text-white md:text-[10px]">{pkg.managingOrg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
