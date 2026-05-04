import React from 'react';
import { AlertCircle, Download, Expand, FolderPlus } from 'lucide-react';
import { ActionGate } from '../../../../../shared/directives/ActionGate';
import { Badge } from '../../../../../shared/atoms/Badge';
import { Button } from '../../../../../shared/atoms/Button';
import { Input } from '../../../../../shared/atoms/Input';
import { Card } from '../../../../../shared/molecules/Card';
import { CBETPackage, User } from '../../../../../shared/types';
import { Textarea } from '../../../../../shared/ui/Textarea';
import {
  getCapacityBandDisplayRange,
  getTieredPricingBreakdown,
} from '../../../../../shared/utils/packagePricing';

interface BookingWidgetProps {
  pkg: CBETPackage;
  user: User | null;
  isFaculty: boolean;
  date: string;
  size: string;
  purpose: string;
  transportPreference: string;
  accessibilityNotes: string;
  missingFields: string[];
  currentPrice: number;
  onDateChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
  onTransportPreferenceChange: (value: string) => void;
  onAccessibilityNotesChange: (value: string) => void;
  onReview: (event: React.FormEvent) => void;
  onLoginRedirect: () => void;
  onSaveToPlanner: () => void;
  onDownloadBrief: () => void;
  onOpenExpanded?: () => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  pkg,
  user,
  isFaculty,
  date,
  size,
  purpose,
  transportPreference,
  accessibilityNotes,
  missingFields,
  currentPrice,
  onDateChange,
  onSizeChange,
  onPurposeChange,
  onTransportPreferenceChange,
  onAccessibilityNotesChange,
  onReview,
  onLoginRedirect,
  onSaveToPlanner,
  onDownloadBrief,
  onOpenExpanded,
}) => {
  const firstBandPrice = pkg.capacityBands[0]?.pricePerStudent ?? 0;
  const { from: rangeStartPrice, to: rangeEndPrice } = getCapacityBandDisplayRange(pkg.capacityBands);
  const activityLabel = pkg.activities[0] ?? 'Field Experience';
  const normalizedGroupSize = Number(size);
  const pricingBreakdown = getTieredPricingBreakdown(pkg.capacityBands, size);
  const visiblePricingTiers = pricingBreakdown.filter((row) => row.seatsFilled > 0);
  const currentTier =
    visiblePricingTiers.find((row) => row.isCurrentTier) ??
    visiblePricingTiers[visiblePricingTiers.length - 1];
  const nextTier = pricingBreakdown.find(
    (row) => row.seatsFilled === 0 && row.thresholdStart > normalizedGroupSize
  );
  const averagePrice =
    size && currentPrice > 0 ? currentPrice / Number(size) : 0;
  const readinessItems = [
    { label: 'Preferred date', complete: Boolean(date) },
    { label: 'Group size', complete: Boolean(size) },
    { label: 'Purpose', complete: Boolean(purpose) },
    { label: 'Transport preference', complete: Boolean(transportPreference) },
  ];
  const setupSteps = [
    'Start with a saved plan',
    'Set a realistic date window',
    'Clarify purpose for the cohort',
  ];

  return (
    <Card padding="none" className="overflow-hidden rounded-[32px] bg-white/96 backdrop-blur-sm">
      <section className="bg-secondary-50 px-6 py-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Request planning</p>
          {onOpenExpanded ? (
            <button
              type="button"
              aria-label="Open full booking workspace"
              title="Open full booking workspace"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/75 bg-white/82 text-text shadow-[0_12px_24px_rgba(25,28,29,0.08)] transition hover:border-primary/35 hover:text-primary"
              onClick={onOpenExpanded}
            >
              <Expand className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-3 text-text">
          <span className="pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">From</span>
          <span className="text-[2.7rem] font-black font-serif leading-none tracking-tight tabular-nums md:text-[3rem]">${firstBandPrice}</span>
          <span className="rounded-full border border-secondary-200 bg-white/72 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
            Per student
          </span>
        </div>
      </section>

      <div className="divide-y divide-border/65">
        <section className="px-6 py-5">
          <h3 className="max-w-[16rem] text-[1.5rem] font-bold font-serif leading-[1.02] text-text">
            Stage the trip before you request it
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {setupSteps.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Pricing range</p>
          <div className="mt-3 flex flex-wrap items-end gap-2.5">
            <span className="rounded-[16px] bg-secondary-50 px-3 py-2 text-[1.6rem] font-black leading-none text-text tabular-nums">
              ${rangeStartPrice}
            </span>
            <span className="pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">to</span>
            <span className="rounded-[16px] bg-secondary-50 px-3 py-2 text-[1.6rem] font-black leading-none text-text tabular-nums">
              ${rangeEndPrice}
            </span>
            <span className="pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">per student</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>Depending on final group size</span>
            </li>
          </ul>

          <div className="mt-4">
            <Badge variant="accent" size="sm">
              {activityLabel}
            </Badge>
          </div>
        </section>

        <ActionGate
          allowed={isFaculty}
          mode="fallback"
          fallback={
            <section className="px-6 py-5">
              <div className="mt-5 grid gap-3">
                <Button type="button" className="h-12" onClick={onSaveToPlanner}>
                  <FolderPlus className="h-4 w-4" />
                  Save to Trip Plan
                </Button>
                <Button type="button" variant="secondary" className="h-12" onClick={onDownloadBrief}>
                  <Download className="h-4 w-4" />
                  Download Brief
                </Button>
                <Button type="button" variant="ghost" className="h-12" onClick={onLoginRedirect}>
                  Sign In to Request
                </Button>
              </div>

              <p className="mt-5 border-t border-border/65 pt-4 text-xs leading-relaxed text-text-muted">
                Flexible scheduling. Final confirmation follows site availability and admin review.
              </p>
            </section>
          }
        >
          {() => (
            <form onSubmit={onReview} className="divide-y divide-border/65">
              <section className="px-6 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Requesting as</p>
                    <p className="mt-1 text-base font-semibold text-text">{user?.name}</p>
                    <p className="text-sm text-text-muted">{user?.email}</p>
                  </div>
                  <Badge variant="surface" size="sm">
                    Faculty flow
                  </Badge>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Desired Date"
                    type="date"
                    required
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                  />

                  <Input
                    label="Estimated Group Size"
                    type="number"
                    min={pkg.bookingConditions.minGroupSize}
                    max={pkg.bookingConditions.maxGroupSize}
                    placeholder={`${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize}`}
                    required
                    value={size}
                    onChange={(event) => onSizeChange(event.target.value)}
                  />
                </div>

                <div className="mt-4 space-y-4">
                  <Input
                    label="Course / Purpose"
                    placeholder="e.g. BIO-101 Module 4"
                    required
                    value={purpose}
                    onChange={(event) => onPurposeChange(event.target.value)}
                  />

                  <Input
                    label="Transport Preference"
                    placeholder="e.g. Coach + boat transfer"
                    required
                    value={transportPreference}
                    onChange={(event) => onTransportPreferenceChange(event.target.value)}
                  />

                  <Textarea
                    id="accessibility-notes"
                    label="Accessibility / Site Notes"
                    value={accessibilityNotes}
                    onChange={(event) => onAccessibilityNotesChange(event.target.value)}
                    placeholder="Optional notes for site access, mobility, pacing, or traveler support."
                  />
                </div>

                {currentPrice > 0 ? (
                  <div className="mt-5 rounded-[22px] border border-primary/15 bg-primary/5 p-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                          Tiered total
                        </p>
                        <p className="mt-2 text-[2rem] font-black leading-none text-text tabular-nums">
                          ${currentPrice.toLocaleString()}
                        </p>
                      </div>

                      <span className="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
                        Avg ${averagePrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 border-t border-primary/15 pt-3 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-start">
                      {currentTier ? (
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                            Current band
                          </p>
                          <p className="mt-1 text-sm font-semibold text-text">
                            {currentTier.thresholdStart === 1
                              ? `Up to ${currentTier.thresholdEnd}`
                              : `${currentTier.thresholdStart}-${currentTier.thresholdEnd}`}
                          </p>
                          <p className="mt-1 text-[11px] text-text-muted">
                            ${currentTier.band.pricePerStudent} each
                          </p>
                        </div>
                      ) : null}

                      {currentTier ? (
                        <span
                          className="hidden h-full w-px bg-primary/15 sm:block"
                          aria-hidden="true"
                        />
                      ) : null}

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                          Next move
                        </p>
                        <p className="mt-1 text-sm font-semibold text-text">
                          {nextTier
                            ? `${nextTier.thresholdStart}+ travelers`
                            : 'Final tier reached'}
                        </p>
                        <p className="mt-1 text-[11px] text-text-muted">
                          {nextTier
                            ? `$${nextTier.band.pricePerStudent} each`
                          : 'No further rate change'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-primary/15 pt-3">
                      {visiblePricingTiers.map((tier) => (
                        <div
                          key={`${tier.thresholdStart}-${tier.thresholdEnd}`}
                          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5 ${
                            tier.isCurrentTier ? 'border-primary/20' : 'border-border/55'
                          } ${tier !== visiblePricingTiers[0] ? 'border-t' : ''}`}
                        >
                          <div className={`min-w-0 ${tier.isCurrentTier ? 'border-l-2 border-primary pl-3' : ''}`}>
                            <p className={`text-[11px] font-semibold ${tier.isCurrentTier ? 'text-primary' : 'text-text'}`}>
                              {tier.thresholdStart === 1
                                ? `Up to ${tier.thresholdEnd} travelers`
                                : `${tier.thresholdStart}-${tier.thresholdEnd} travelers`}
                            </p>
                            <p className="mt-0.5 text-[11px] text-text-muted">
                              {tier.seatsFilled} x ${tier.band.pricePerStudent}
                            </p>
                          </div>
                          <p className={`text-sm font-black leading-none tabular-nums ${tier.isCurrentTier ? 'text-primary' : 'text-text'}`}>
                            ${tier.subtotal.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>

              <section className="px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                    <AlertCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                    Readiness snapshot
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    {missingFields.length ? `${missingFields.length} missing` : 'Ready'}
                  </span>
                </div>

                <div className="mt-4 divide-y divide-border/60 border-y border-border/60">
                  {readinessItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3 py-3">
                      <span className="text-sm text-text">{item.label}</span>
                      <Badge variant={item.complete ? 'accent' : 'secondary'} size="sm">
                        {item.complete ? 'Ready' : 'Missing'}
                      </Badge>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  {missingFields.length
                    ? `Still missing: ${missingFields.join(', ')}.`
                    : 'The request is ready to move into the quote timeline.'}
                </p>
              </section>

              <section className="bg-clay px-6 py-5 text-white">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-white/35 bg-white/8 text-white hover:bg-white/14"
                    onClick={onSaveToPlanner}
                  >
                    <FolderPlus className="h-4 w-4" />
                    Save to Trip Plan
                  </Button>
                  <Button
                    type="submit"
                    className="h-12 bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-500))] text-white shadow-[0_16px_30px_rgba(68,152,26,0.22)]"
                  >
                    Review Readiness
                  </Button>
                </div>
                <p className="mt-4 text-center text-xs text-white/78">
                  Review readiness first. The final request quote step happens in the confirmation panel.
                </p>
              </section>
            </form>
          )}
        </ActionGate>
      </div>
    </Card>
  );
};
