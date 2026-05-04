import React from 'react';
import { BusFront, Info, Users } from 'lucide-react';
import { Button } from '../../../../../shared/atoms/Button';
import { CapacityBand } from '../../../../../shared/types';
import {
  getCapacityBandKey,
  getRecommendedTransportForBand,
} from '../../../../../shared/utils/packagePricing';

interface CapacityPricingTableProps {
  bands: CapacityBand[];
  activeBandKeys?: string[];
  onAddToTrip?: (band: CapacityBand) => void;
}

export const CapacityPricingTable: React.FC<CapacityPricingTableProps> = ({
  bands,
  activeBandKeys = [],
  onAddToTrip,
}) => {
  return (
    <section className="border-y border-border/70 py-7">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Pricing bands</p>
          <h3 className="mt-2 text-2xl font-bold font-serif text-text">Capacity & pricing</h3>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted">
          <Info className="h-4 w-4 text-primary" aria-hidden="true" />
          Per-student estimates
        </div>
      </div>

      <div className="space-y-4">
        {bands.map((band) => {
          const bandKey = getCapacityBandKey(band);
          const isActive = activeBandKeys.includes(bandKey);
          const transportLabel = getRecommendedTransportForBand(band);

          return (
            <article
              key={bandKey}
              className={`rounded-[22px] border bg-white px-4 py-4 shadow-[0_12px_28px_rgba(25,28,29,0.06)] transition md:px-5 ${isActive
                ? 'border-primary-200 ring-1 ring-primary-200/70'
                : 'border-border/70'
                }`}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,0.95fr)_1px_minmax(0,1.15fr)_1px_auto_auto] md:items-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-text">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[1.35rem] font-bold font-serif leading-tight text-text">
                      {band.min} - {band.max} pax
                    </p>
                  </div>
                </div>

                <span className="hidden h-14 w-px bg-border/70 md:block" aria-hidden="true" />

                <div>
                  <div className="mt-2 flex items-center gap-2">
                    <BusFront className="h-4 w-4 text-clay" aria-hidden="true" />
                    <p className="text-[1.15rem] font-semibold font-serif leading-tight text-clay">
                      {transportLabel}
                    </p>
                  </div>
                </div>

                <span className="hidden h-14 w-px bg-border/70 md:block" aria-hidden="true" />

                <div className="md:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    Price per student
                  </p>
                  <p className="mt-2 text-[2.35rem] font-black leading-none text-primary tabular-nums">
                    ${band.pricePerStudent}
                  </p>
                </div>

                <div className="md:justify-self-end">
                  <Button
                    type="button"
                    variant={isActive ? 'primary' : 'outline'}
                    className={`min-w-[9.5rem] rounded-[16px] px-5 py-3 text-sm font-semibold ${isActive
                      ? 'bg-[linear-gradient(135deg,var(--color-primary-600),var(--color-primary))]'
                      : 'border-primary/35 bg-white text-primary shadow-none hover:border-primary/50 hover:bg-primary/10'
                      }`}
                    onClick={() => onAddToTrip?.(band)}
                  >
                    {isActive ? 'Added' : 'Add to Trip'}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
