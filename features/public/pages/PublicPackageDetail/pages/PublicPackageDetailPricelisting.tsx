import React from 'react';
import {
  BusFront,
  Check,
  CircleMinus,
  Coffee,
  FileCheck2,
  House,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Users,
  Utensils,
  Wallet,
} from 'lucide-react';
import { Button } from '../../../../../shared/atoms/Button';
import { CapacityBand, CBETPackage } from '../../../../../shared/types';
import { CapacityPricingTable } from '../components/CapacityPricingTable';

interface PublicPackageDetailPricelistingProps {
  pkg: CBETPackage;
  activeBandKeys?: string[];
  onAddBandToTrip?: (band: CapacityBand) => void;
  onContactPlanner?: () => void;
}

const getIncludedIcon = (item: string) => {
  if (/permit|fee|entrance|ticket|conservation/i.test(item)) {
    return FileCheck2;
  }

  if (/guide|ranger|tracker|community/i.test(item)) {
    return Users;
  }

  if (/transport|transfer|boat|coach|minibus|motorbike/i.test(item)) {
    return BusFront;
  }

  if (/meal|lunch|dinner|breakfast/i.test(item)) {
    return Utensils;
  }

  if (/homestay|bed|mosquito|accommodation|bedding/i.test(item)) {
    return House;
  }

  if (/safety|jacket|water|first aid/i.test(item)) {
    return ShieldCheck;
  }

  return Check;
};

const getExcludedIcon = (item: string) => {
  if (/travel|banlung|from\/to|before|after/i.test(item)) {
    return Plane;
  }

  if (/insurance/i.test(item)) {
    return ShieldAlert;
  }

  if (/snack|alcohol|beverage|soda/i.test(item)) {
    return Coffee;
  }

  if (/personal|expense|gratuit|tip/i.test(item)) {
    return Wallet;
  }

  return CircleMinus;
};

export const PublicPackageDetailPricelisting: React.FC<PublicPackageDetailPricelistingProps> = ({
  pkg,
  activeBandKeys,
  onAddBandToTrip,
  onContactPlanner,
}) => {
  const visibleExcludes = pkg.excludes.filter((item) => !/insurance/i.test(item));

  return (
    <section id="pricing" className="space-y-8 scroll-mt-32">
      <CapacityPricingTable
        bands={pkg.capacityBands}
        activeBandKeys={activeBandKeys}
        onAddToTrip={onAddBandToTrip}
      />

      <section className="overflow-hidden rounded-[32px] border border-border/70 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="bg-primary-50 px-6 py-7 md:px-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Included</p>
            <h3 className="mt-2 text-[2rem] font-bold font-serif leading-[1.02] text-text">
              What the package includes
            </h3>

            <div className="mt-6 space-y-0.5">
              {pkg.includes.map((item) => {
                const Icon = getIncludedIcon(item);

                return (
                  <article
                    key={item}
                    className="grid grid-cols-[2.4rem_minmax(0,1fr)] items-start gap-4 border-b border-primary-200/70 py-4 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary">
                      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" strokeWidth={2} />
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-text">{item}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-7 md:px-7 lg:border-l lg:border-border/70">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Plan separately</p>
            <h3 className="mt-2 text-[2rem] font-bold font-serif leading-[1.02] text-text">
              What requires separate planning
            </h3>

            <div className="mt-6 space-y-0.5">
              {visibleExcludes.map((item) => {
                const Icon = getExcludedIcon(item);

                return (
                  <article
                    key={item}
                    className="grid grid-cols-[2.4rem_minmax(0,1fr)] items-start gap-4 border-b border-border/60 py-4 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-text-muted">
                      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" strokeWidth={1.9} />
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-text-muted">{item}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border/70 bg-white px-6 py-6">
          <div className="flex justify-center">
            <Button
              type="button"
              className="min-w-[19rem] rounded-[14px] px-6 py-3 text-base font-semibold"
              onClick={onContactPlanner}
            >
              Questions? Contact an Academic Planner
            </Button>
          </div>
        </div>
      </section>

      <div className="border-b border-border/70 pb-7">
        <h3 className="text-2xl font-bold font-serif text-text">Deposit & Cancellation</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="border-l border-primary-200 pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Deposit</p>
            <p className="mt-2 text-sm text-text-muted">
              {pkg.depositDetails.percentage}% deposit requested {pkg.depositDetails.deadlineDays} days before departure.
            </p>
          </div>
          <div className="border-l border-border pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Cancellation Summary</p>
            <p className="mt-2 text-sm text-text-muted">{pkg.cancellationSummary}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
