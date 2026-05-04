import React from 'react';
import {
  BusFront,
  CalendarDays,
  Info,
  Users,
} from 'lucide-react';
import { Button } from '../../../../../shared/atoms/Button';
import { CBETPackage } from '../../../../../shared/types';
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogRoot,
} from '../../../../../shared/ui/Dialog';
import { SurfaceSection } from '../../../../../shared/ui/SurfaceSection';
import { getTieredPricingBreakdown } from '../../../../../shared/utils/packagePricing';

interface ConfirmRequestModalProps {
  isOpen: boolean;
  pkg: CBETPackage;
  date: string;
  size: string;
  purpose: string;
  transportPreference: string;
  accessibilityNotes: string;
  missingFields: string[];
  currentPrice: number;
  pricePerStudent: number;
  onClose: () => void;
  onSubmit: () => void;
}

const getTierHeading = (thresholdStart: number, thresholdEnd: number) =>
  thresholdStart === 1
    ? `Up to ${thresholdEnd} travelers`
    : `${thresholdStart}-${thresholdEnd} travelers`;

export const ConfirmRequestModal: React.FC<ConfirmRequestModalProps> = ({
  isOpen,
  pkg,
  date,
  size,
  purpose,
  transportPreference,
  accessibilityNotes,
  missingFields,
  currentPrice,
  pricePerStudent,
  onClose,
  onSubmit,
}) => {
  const normalizedGroupSize = Number(size);
  const pricingBreakdown = getTieredPricingBreakdown(pkg.capacityBands, size);
  const visibleTiers = pricingBreakdown.filter((row) => row.seatsFilled > 0);
  const currentTier =
    visibleTiers.find((row) => row.isCurrentTier) ??
    visibleTiers[visibleTiers.length - 1];
  const nextTier = pricingBreakdown.find(
    (row) => row.seatsFilled === 0 && row.thresholdStart > normalizedGroupSize
  );

  return (
    <DialogRoot isOpen={isOpen} onClose={onClose}>
      <DialogPanel size="xl" className="flex max-h-[calc(100vh-2rem)] flex-col">
        <DialogHeader
          title="Confirm Trip Request"
          description="Review the tiered total before submitting."
          onClose={onClose}
          closeLabel="Close request confirmation"
        />

        <DialogBody className="space-y-5 overflow-y-auto">
          <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_48px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="bg-secondary-50 px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Request snapshot
                </p>
                <h4 className="mt-2 text-[1.6rem] font-bold font-serif leading-[1.02] text-text">
                  {pkg.name}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  {pkg.location}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] bg-white/82 px-4 py-3.5 shadow-[0_14px_30px_rgba(25,28,29,0.05)] ring-1 ring-[rgba(194,198,212,0.18)]">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                      Proposed date
                    </div>
                    <p className="mt-2 text-sm font-bold font-serif text-text">
                      {date}
                    </p>
                  </div>

                  <div className="rounded-[20px] bg-white/82 px-4 py-3.5 shadow-[0_14px_30px_rgba(25,28,29,0.05)] ring-1 ring-[rgba(194,198,212,0.18)]">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                      Group size
                    </div>
                    <p className="mt-2 text-sm font-bold font-serif text-text">
                      {size} students
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/60 px-5 py-5 lg:border-l lg:border-t-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Tiered total
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-2.5">
                  <span className="text-[2.4rem] font-black font-serif leading-none tracking-tight text-text tabular-nums">
                    ${currentPrice.toLocaleString()}
                  </span>
                  <span className="rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
                    Avg ${pricePerStudent.toFixed(2)} / student
                  </span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {currentTier ? (
                    <div className="rounded-[18px] border border-border/70 bg-white px-3.5 py-3 shadow-[0_10px_22px_rgba(25,28,29,0.04)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                        Current band
                      </p>
                      <p className="mt-1 text-sm font-semibold text-text">
                        {getTierHeading(
                          currentTier.thresholdStart,
                          currentTier.thresholdEnd
                        )}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        ${currentTier.band.pricePerStudent} rate
                      </p>
                    </div>
                  ) : null}

                  <div className="rounded-[18px] border border-primary/15 bg-primary/5 px-3.5 py-3 shadow-[0_10px_22px_rgba(25,28,29,0.04)]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                      Next move
                    </p>
                    <p className="mt-1 text-sm font-semibold text-text">
                      {nextTier
                        ? `${nextTier.thresholdStart}+ travelers`
                        : 'Final tier reached'}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {nextTier
                        ? `$${nextTier.band.pricePerStudent} each`
                        : 'No further rate change'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SurfaceSection
            eyebrow={
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Pricing ladder
              </p>
            }
            title="Threshold breakdown"
            actions={
              <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                {visibleTiers.length} active tier{visibleTiers.length === 1 ? '' : 's'}
              </span>
            }
            className="rounded-[28px] bg-surface p-4 shadow-none"
            contentClassName="space-y-2.5"
          >
            {visibleTiers.map((tier) => {
              const tierHeading = getTierHeading(
                tier.thresholdStart,
                tier.thresholdEnd
              );

              return (
                <article
                  key={tier.bandKey}
                  className={`rounded-[22px] border px-4 py-3.5 shadow-[0_10px_24px_rgba(25,28,29,0.04)] transition ${
                    tier.isCurrentTier
                      ? 'border-primary-200 bg-primary/[0.045]'
                      : 'border-border/70 bg-white'
                  }`}
                >
                  <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)_minmax(0,0.42fr)] lg:items-center">
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black tabular-nums ${
                          tier.isCurrentTier
                            ? 'bg-primary text-white shadow-[0_14px_26px_rgba(68,152,26,0.24)]'
                            : 'bg-secondary-50 text-text'
                        }`}
                      >
                        {tier.thresholdStart}
                      </span>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                            {tier.isCurrentTier ? 'Current threshold' : 'Active threshold'}
                          </p>
                        </div>

                        <h5 className="mt-1 text-base font-bold font-serif leading-tight text-text">
                          {tierHeading}
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-text-muted">
                          {tier.seatsFilled} travelers counted in this tier
                        </p>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                        Rate
                      </p>
                      <p className="mt-1.5 text-[1.45rem] font-black leading-none text-primary tabular-nums">
                        ${tier.band.pricePerStudent}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {tier.seatsFilled} x ${tier.band.pricePerStudent}
                      </p>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                        Subtotal
                      </p>
                      <p className="mt-1.5 text-[1.45rem] font-black leading-none text-text tabular-nums">
                        ${tier.subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </SurfaceSection>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-[24px] border border-border/70 bg-white px-4 py-4 shadow-[0_14px_32px_rgba(25,28,29,0.05)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                Academic purpose
              </p>
              <p className="mt-2 text-sm font-medium italic leading-relaxed text-text">
                "{purpose}"
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-border/70 bg-white px-4 py-4 shadow-[0_14px_32px_rgba(25,28,29,0.05)]">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  <BusFront className="h-4 w-4 text-primary" aria-hidden="true" />
                  Transport
                </div>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-text">
                  {transportPreference || 'Pending'}
                </p>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-white px-4 py-4 shadow-[0_14px_32px_rgba(25,28,29,0.05)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Access notes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text">
                  {accessibilityNotes || 'No additional access notes'}
                </p>
              </div>
            </div>
          </div>

          {missingFields.length ? (
            <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-3.5 text-xs text-amber-900">
              <p className="font-bold">Missing details</p>
              <p className="mt-1.5 leading-relaxed">{missingFields.join(', ')}</p>
            </div>
          ) : null}

          <div className="flex items-start gap-3 rounded-[24px] border border-primary/20 bg-primary/5 px-4 py-3.5">
            <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="text-[11px] leading-relaxed text-text-muted">
              <p className="font-bold uppercase tracking-[0.14em] text-primary">
                EcoLink workflow
              </p>
              <p className="mt-1.5">
                Tiered totals stay attached to the request through review and payment.
              </p>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Edit Configuration
          </Button>
          <Button
            onClick={onSubmit}
            className="h-12 px-8 shadow-lg shadow-primary/20"
          >
            Request Quote
          </Button>
        </DialogFooter>
      </DialogPanel>
    </DialogRoot>
  );
};
