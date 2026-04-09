import React from 'react';
import { Bus, Clock, MapPinned, ShieldCheck, Utensils } from 'lucide-react';
import { Badge } from '../../../../../shared/atoms/Badge';
import { CBETPackage } from '../../../../../shared/types';

interface PackageOverviewProps {
  pkg: CBETPackage;
}

export const PackageOverview: React.FC<PackageOverviewProps> = ({ pkg }) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Badge variant="accent" size="sm" icon={<ShieldCheck className="h-4 w-4" />}>
          EcoLink Verified
        </Badge>
        <Badge variant="surface" size="sm" icon={<Clock className="h-4 w-4" />}>
          {pkg.duration}
        </Badge>
        <Badge variant="surface" size="sm" icon={<Bus className="h-4 w-4" />}>
          {pkg.transportModes[0]}
        </Badge>
        <Badge variant="surface" size="sm" icon={<Utensils className="h-4 w-4" />}>
          {pkg.includes.some((item) => /meal|lunch|dinner|breakfast/i.test(item)) ? 'Meals Included' : 'Mixed Meals'}
        </Badge>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-serif text-text">About this excursion</h2>
        <p className="text-lg leading-relaxed text-text-muted">{pkg.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Best For</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pkg.bestFor.map((item) => (
              <Badge key={item} variant="surface" size="sm">
                {item}
              </Badge>
            ))}
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Package Highlights</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            {pkg.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <MapPinned className="h-4 w-4 text-primary" aria-hidden="true" />
            Meeting Point & Transfer
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{pkg.meetingPoint}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.transportModes.map((mode) => (
              <Badge key={mode} variant="secondary" size="sm">
                {mode}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">{pkg.bookingConditions.transportNotes}</p>
        </div>
      </div>
    </section>
  );
};
