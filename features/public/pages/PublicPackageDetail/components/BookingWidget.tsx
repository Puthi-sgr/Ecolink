import React from 'react';
import { AlertCircle, CalendarDays, Download, FileText, FolderPlus, MapPinned, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '../../../../../shared/atoms/Badge';
import { Button } from '../../../../../shared/atoms/Button';
import { Input } from '../../../../../shared/atoms/Input';
import { Card } from '../../../../../shared/molecules/Card';
import { CBETPackage, User } from '../../../../../shared/types';

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
}) => {
  const minPrice = Math.min(...pkg.capacityBands.map((band) => band.pricePerStudent));
  const maxPrice = Math.max(...pkg.capacityBands.map((band) => band.pricePerStudent));
  const activityLabel = pkg.activities[0] ?? 'Field Experience';

  return (
    <div className="sticky top-24 space-y-6">
      <Card className="overflow-hidden border border-border bg-white p-0 shadow-2xl ring-1 ring-border/70">
        <div className="border-b border-border bg-surface p-6">
          <h3 className="text-[1.7rem] leading-tight text-text">Plan or Request this Trip</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Save the package into the trip planner first, then move into a quote-style request once your date, group size, and purpose are ready.
          </p>
        </div>

        <div className="space-y-5 bg-white p-6">
          <div className="grid grid-cols-2 gap-4 border-b border-border pb-5">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Duration</p>
                <p className="mt-1 text-sm text-text">{pkg.duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinned className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Meeting Point</p>
                <p className="mt-1 text-sm text-text">{pkg.meetingPoint}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Capacity</p>
                <p className="mt-1 text-sm text-text">
                  {pkg.bookingConditions.minGroupSize}-{pkg.bookingConditions.maxGroupSize} students
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Main Activity</p>
                <p className="mt-1 text-sm text-text">{activityLabel}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">From</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-black leading-none text-text">${minPrice}</span>
                  <span className="pb-1 text-base text-text-muted">per student</span>
                </div>
              </div>
              <p className="text-right text-xs uppercase tracking-[0.18em] text-text-muted">Capacity-band pricing</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm">
                {pkg.reviewSummary.label}
              </Badge>
              <Badge variant="surface" size="sm">
                {activityLabel}
              </Badge>
            </div>

            <div className="mt-4 text-sm leading-relaxed text-text-muted">
              <p>
                Current package pricing ranges from <span className="font-semibold text-text">${minPrice}</span> to{' '}
                <span className="font-semibold text-text">${maxPrice}</span> per student, depending on the final group size.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text">Request preparation flow</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="surface" size="sm">Save to Trip Plan</Badge>
                <Badge variant="surface" size="sm">Review readiness</Badge>
                <Badge variant="surface" size="sm">Request Quote</Badge>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                <AlertCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                Readiness checklist
              </div>
              <div className="mt-3 grid gap-2">
                {[
                  { label: 'Preferred date', complete: Boolean(date) },
                  { label: 'Group size', complete: Boolean(size) },
                  { label: 'Purpose', complete: Boolean(purpose) },
                  { label: 'Transport preference', complete: Boolean(transportPreference) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2 text-sm">
                    <span className="text-text">{item.label}</span>
                    <Badge variant={item.complete ? 'accent' : 'outline'} size="sm">
                      {item.complete ? 'Ready' : 'Missing'}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-text-muted">
                {missingFields.length
                  ? `Still missing: ${missingFields.join(', ')}.`
                  : 'The request is ready to move into the quote timeline.'}
              </p>
            </div>
          </div>

          {!isFaculty ? (
            <div className="space-y-4 rounded-2xl border border-primary/15 bg-primary/5 p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-text">Planner-first for public visitors</p>
                <p className="text-sm text-text-muted">
                  Save this destination to a trip plan, download the package brief, or sign in for the protected faculty request flow.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Button className="h-12" onClick={onSaveToPlanner}>
                  <FolderPlus className="h-4 w-4" />
                  Save to Trip Plan
                </Button>
                <Button variant="outline" className="h-12" onClick={onDownloadBrief}>
                  <Download className="h-4 w-4" />
                  Download Brief
                </Button>
                <Button variant="ghost" className="h-12" onClick={onLoginRedirect}>
                  Sign In to Request
                </Button>
              </div>
              <p className="text-xs text-text-muted">Flexible scheduling. Final confirmation follows availability review.</p>
            </div>
          ) : (
            <form onSubmit={onReview} className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">Requesting as</p>
                <p className="text-sm font-bold text-text">{user?.name}</p>
                <p className="text-xs text-text-muted">{user?.email}</p>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Desired Date"
                    type="date"
                    required
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                    className="bg-white"
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
                    className="bg-white"
                  />
                </div>

                <Input
                  label="Course / Purpose"
                  placeholder="e.g. BIO-101 Module 4"
                  required
                  value={purpose}
                  onChange={(event) => onPurposeChange(event.target.value)}
                  className="bg-white"
                />

                <Input
                  label="Transport Preference"
                  placeholder="e.g. Coach + boat transfer"
                  required
                  value={transportPreference}
                  onChange={(event) => onTransportPreferenceChange(event.target.value)}
                  className="bg-white"
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="accessibility-notes">
                    Accessibility / Site Notes
                  </label>
                  <textarea
                    id="accessibility-notes"
                    value={accessibilityNotes}
                    onChange={(event) => onAccessibilityNotesChange(event.target.value)}
                    placeholder="Optional notes for site access, mobility, pacing, or traveler support."
                    className="min-h-[96px] w-full rounded-eco border border-border bg-white px-eco py-eco text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {currentPrice > 0 ? (
                  <div className="animate-in zoom-in-95 rounded-xl border border-primary/20 bg-primary/10 p-4">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Estimated Total</span>
                    <span className="mt-1 block text-3xl font-black text-text">${currentPrice.toLocaleString()}</span>
                    <span className="mt-1 block text-xs text-text-muted">
                      Calculated from the selected group size and the current per-student rate.
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4 rounded-2xl bg-slate-800 p-5 text-white shadow-lg shadow-slate-900/10">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-slate-400/60 bg-slate-700/40 text-slate-100 hover:bg-slate-700"
                    onClick={onSaveToPlanner}
                  >
                    <FolderPlus className="h-4 w-4" />
                    Save to Trip Plan
                  </Button>
                  <Button type="submit" className="h-12 bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-600">
                    Review Readiness
                  </Button>
                </div>
                <p className="text-center text-xs text-slate-200/85">
                  Review readiness first. The final request quote step happens in the confirmation panel.
                </p>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};
