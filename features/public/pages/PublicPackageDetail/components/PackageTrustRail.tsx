import React from 'react';
import { BadgeCheck, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';

interface PackageTrustRailProps {
  pkg: CBETPackage;
}

export const PackageTrustRail: React.FC<PackageTrustRailProps> = ({ pkg }) => {
  return (
    <section className="border-y border-border/70 py-5">
      <div className="rounded-[28px] border border-border/70 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(25,28,29,0.06)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">Trust snapshot</p>

        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-start">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-[3.35rem] font-black leading-none text-text">{pkg.reviewSummary.score.toFixed(1)}</span>
              <span className="pb-1.5 text-sm font-semibold text-text-muted">/ 5</span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-secondary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={`trust-star-${index + 1}`}
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Ministry verified
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text">
                <BadgeCheck className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                NGO verified
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <p className="text-xs leading-relaxed text-text-muted">{pkg.reviewSummary.count} mock planning reviews</p>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:text-primary-700"
          >
            View detail
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
