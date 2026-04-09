import React from 'react';
import { ArrowRight, Scale, X } from 'lucide-react';
import { usePlanner } from '../../../app/PlannerContext';
import { useCBETPackages } from '../../../shared/data';
import { Badge } from '../../../shared/atoms/Badge';
import { Button } from '../../../shared/atoms/Button';
import { PackageExplorerSnapshot } from '../../../shared/components/PackageExplorerInsights';
import { getPackageFitCallout } from '../../../shared/utils/packageFit';

const getPriceLabel = (prices: number[]) => {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `$${min}-$${max}`;
};

const COMPARISON_ROWS = [
  { key: 'fit', label: 'Fit callout' },
  { key: 'duration', label: 'Duration' },
  { key: 'group', label: 'Group fit' },
  { key: 'activity', label: 'Activity level' },
  { key: 'facilities', label: 'Facilities' },
  { key: 'lead', label: 'Lead time' },
  { key: 'price', label: 'Price band' },
  { key: 'transport', label: 'Transport notes' },
] as const;

export const PackageCompareTray: React.FC = () => {
  const packages = useCBETPackages();
  const { compareIds, toggleCompare, clearCompare, savePackageToPlan } = usePlanner();
  const comparedPackages = packages.filter((pkg) => compareIds.includes(pkg.id));

  if (!comparedPackages.length) {
    return null;
  }

  return (
    <section className="mt-6 md:sticky md:bottom-4 md:z-40" aria-labelledby="compare-destinations-heading">
      <div className="rounded-[28px] border border-border bg-white/95 p-4 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
              Compare destinations
            </div>
            <h2 id="compare-destinations-heading" className="mt-2 text-base font-semibold text-text">
              Review shortlist fit, then send the strongest option directly into the planner.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => {
                window.location.hash = '/planner';
              }}
            >
              Open planner
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto" role="region" aria-label="Package comparison table" tabIndex={0}>
          <table className="min-w-[920px] border-separate border-spacing-0">
            <caption className="sr-only">
              Compare up to three destinations across fit, duration, facilities, lead time, pricing, and transport notes.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="min-w-[220px] bg-transparent p-2 text-left align-top md:sticky md:left-0 md:z-10">
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Comparison lens</p>
                    <p className="mt-2 text-sm text-text-muted">Attributes stay pinned so the shortlist reads like a decision matrix.</p>
                  </div>
                </th>
                {comparedPackages.map((pkg) => (
                  <th key={pkg.id} scope="col" className="min-w-[230px] p-2 text-left align-top">
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{pkg.location}</p>
                          <h3 className="mt-1 text-lg font-bold font-serif text-text">{pkg.cbetSite}</h3>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${pkg.cbetSite} from comparison`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                          onClick={() => toggleCompare(pkg.id)}
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="accent" size="sm">
                          {getPackageFitCallout(pkg)}
                        </Badge>
                        {pkg.bestFor.slice(0, 1).map((item) => (
                          <Badge key={item} variant="surface" size="sm">
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <PackageExplorerSnapshot pkg={pkg} />
                      </div>

                      <div className="mt-4 grid gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            savePackageToPlan({
                              packageId: pkg.id,
                              planName: `${pkg.cbetSite} compare shortlist`,
                            })
                          }
                        >
                          Add to plan
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            window.location.hash = `/package/${pkg.id}/overview`;
                          }}
                        >
                          Open package
                        </Button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.key}>
                  <th
                    scope="row"
                    className="p-2 text-left align-top md:sticky md:left-0 md:z-10"
                  >
                    <div className="rounded-2xl border border-border bg-white p-4">
                      <p className="text-sm font-semibold text-text">{row.label}</p>
                    </div>
                  </th>
                  {comparedPackages.map((pkg) => (
                    <td key={`${pkg.id}-${row.key}`} className="p-2 align-top">
                      <div className="rounded-2xl border border-border bg-white p-4 text-sm text-text-muted">
                        {row.key === 'fit' && getPackageFitCallout(pkg)}
                        {row.key === 'duration' && pkg.duration}
                        {row.key === 'group' &&
                          `${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize} travelers`}
                        {row.key === 'activity' && pkg.safetyInfo.activityLevel}
                        {row.key === 'facilities' && pkg.safetyInfo.facilities.slice(0, 3).join(', ')}
                        {row.key === 'lead' && `${pkg.bookingConditions.minLeadTimeDays} days`}
                        {row.key === 'price' &&
                          getPriceLabel(pkg.capacityBands.map((band) => band.pricePerStudent))}
                        {row.key === 'transport' && pkg.bookingConditions.transportNotes}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
