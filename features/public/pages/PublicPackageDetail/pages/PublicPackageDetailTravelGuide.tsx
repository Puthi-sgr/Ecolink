import React from 'react';
import { Activity, Calendar, ClipboardList, ShieldCheck } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';
import { Badge } from '../../../../../shared/atoms/Badge';

interface PublicPackageDetailTravelGuideProps {
  pkg: CBETPackage;
}

const getPackingHighlights = (pkg: CBETPackage) => {
  const items = ['Closed-toe shoes', 'Reusable water bottle'];

  if (pkg.safetyInfo.activityLevel !== 'Low') items.push('Light rain layer');
  if (pkg.transportModes.includes('Boat transfer')) items.push('Sun protection');
  if (pkg.activities.some((item) => /camp|night/i.test(item))) items.push('Headlamp');

  return items;
};

const getTravelTime = (pkg: CBETPackage) => {
  if (/Ratanakiri|Stung Treng/i.test(pkg.location)) return 'Long-haul transfer from Phnom Penh, best as a multi-day itinerary.';
  if (/Kampot|Kampong Speu|Koh Kong/i.test(pkg.location)) return 'Medium transfer from Phnom Penh with same-day or overnight routing options.';
  return 'Short to medium transfer from Phnom Penh with a strong same-day planning option.';
};

export const PublicPackageDetailTravelGuide: React.FC<PublicPackageDetailTravelGuideProps> = ({ pkg }) => {
  return (
    <section id="travel-guide" className="space-y-6 scroll-mt-32">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-primary" />
        <h3 className="font-bold font-serif text-xl text-text">Travel Guide</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-text">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold">Best Months to Go</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{pkg.availabilityMonths.bestSeasonNote}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.themes.map((theme) => (
              <Badge key={theme} variant="surface" size="sm">
                {theme}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-text">
            <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold">Travel Time from Phnom Penh</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{getTravelTime(pkg)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.transportModes.map((mode) => (
              <Badge key={mode} variant="secondary" size="sm">
                {mode}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-text">
            <ClipboardList className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold">Pack for this site type</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            {getPackingHighlights(pkg).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-text">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold">Group Readiness</span>
          </div>
          <p className="mt-3 text-sm text-text-muted">
            Best for {pkg.bestFor.join(', ').toLowerCase()}. The operational risk profile is {pkg.safetyInfo.activityLevel.toLowerCase()} with a guide ratio of {pkg.safetyInfo.guideRatio}.
          </p>
          <div className="mt-4 rounded-2xl bg-surface p-4 text-sm text-text-muted">
            {pkg.safetyInfo.riskNotes}
          </div>
        </div>
      </div>
    </section>
  );
};
