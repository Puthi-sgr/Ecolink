import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { CapacityPricingTable } from '../components/CapacityPricingTable';

interface PublicPackageDetailPricelistingProps {
  pkg: CBETPackage;
}

export const PublicPackageDetailPricelisting: React.FC<PublicPackageDetailPricelistingProps> = ({ pkg }) => {
  return (
    <section id="pricing" className="space-y-6 scroll-mt-32">
      <CapacityPricingTable bands={pkg.capacityBands} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-text">What the package includes</h3>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-text">What requires separate planning</h3>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            {pkg.excludes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-clay/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold font-serif text-text">Deposit & Cancellation</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Deposit</p>
            <p className="mt-2 text-sm text-text-muted">
              {pkg.depositDetails.percentage}% deposit requested {pkg.depositDetails.deadlineDays} days before departure.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Cancellation Summary</p>
            <p className="mt-2 text-sm text-text-muted">{pkg.cancellationSummary}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
