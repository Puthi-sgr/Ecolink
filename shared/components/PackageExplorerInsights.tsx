import React from 'react';
import { ArrowRight, CalendarDays, Route, ShieldCheck, TimerReset } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { universalToneClasses } from '../theme';
import { CBETPackage } from '../types';
import {
  getAlternativeReason,
  getAvailabilityStrip,
  getComfortIndicators,
  getLogisticsFriction,
  getTravelRouteProfile,
} from '../utils/packageExplorer';

interface PackageAvailabilityStripProps {
  pkg: CBETPackage;
}

interface PackageExplorerSnapshotProps {
  pkg: CBETPackage;
  travelerGroupSize?: number;
  variant?: 'card' | 'line';
}

interface PackageAlternativeReasonProps {
  current: CBETPackage;
  candidate: CBETPackage;
  travelerGroupSize?: number;
}

const monthClassMap = {
  off: 'bg-border/70 text-text-muted',
  available: 'bg-primary-50 text-primary-700',
  peak: 'bg-primary text-white',
} as const;

const comfortToneClassMap = {
  positive: `${universalToneClasses.leaf.softBg} ${universalToneClasses.leaf.text} ${universalToneClasses.leaf.border}`,
  neutral: `${universalToneClasses.clay.softBg} ${universalToneClasses.clay.text} ${universalToneClasses.clay.border}`,
  warning: `${universalToneClasses.sun.softBg} ${universalToneClasses.sun.text} ${universalToneClasses.sun.border}`,
} as const;

export const PackageAvailabilityStrip: React.FC<PackageAvailabilityStripProps> = ({ pkg }) => {
  const availability = getAvailabilityStrip(pkg);

  return (
    <div>
      <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
        <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Seasonality
      </div>
      <div className="mt-2 grid grid-cols-12 gap-1">
        {availability.map((month) => (
          <div
            key={`${pkg.id}-${month.label}`}
            className={`flex h-7 items-center justify-center rounded-full text-[10px] font-bold ${monthClassMap[month.state]}`}
            title={`${month.label}: ${month.state}`}
          >
            {month.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PackageExplorerSnapshot: React.FC<PackageExplorerSnapshotProps> = ({
  pkg,
  travelerGroupSize,
  variant = 'card',
}) => {
  const routeProfile = getTravelRouteProfile(pkg);
  const friction = getLogisticsFriction(pkg, travelerGroupSize);
  const comfortIndicators = getComfortIndicators(pkg).slice(0, 3);
  const wrapperClassName =
    variant === 'line'
      ? 'space-y-5 rounded-[32px] border border-border/70 bg-white/96 px-5 py-7 shadow-sm md:px-7'
      : 'space-y-3 rounded-2xl border border-border bg-white p-4';

  return (
    <div className={wrapperClassName}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
            <Route className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Routing
          </div>
          <p className="mt-2 text-sm font-semibold text-text">{routeProfile.label}</p>
          <p className="mt-1 text-sm text-text-muted">{routeProfile.duration}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted">
            {routeProfile.segments.map((segment, index) => (
              <React.Fragment key={`${pkg.id}-${segment}`}>
                <span>{segment}</span>
                {index < routeProfile.segments.length - 1 ? (
                  <ArrowRight className="h-3 w-3 text-primary/60" aria-hidden="true" />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Badge
          variant={friction.tone === 'positive' ? 'accent' : friction.tone === 'warning' ? 'secondary' : 'surface'}
          size="sm"
        >
          {friction.label} friction
        </Badge>
      </div>

      <PackageAvailabilityStrip pkg={pkg} />

      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
            <TimerReset className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Logistics
          </div>
          <p className="mt-2 text-sm text-text-muted">{friction.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-[220px] md:justify-end">
          {comfortIndicators.map((indicator) => (
            <span
              key={`${pkg.id}-${indicator.label}`}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${comfortToneClassMap[indicator.tone]}`}
            >
              {indicator.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PackageAlternativeReason: React.FC<PackageAlternativeReasonProps> = ({
  current,
  candidate,
  travelerGroupSize,
}) => {
  const reason = getAlternativeReason(current, candidate, travelerGroupSize);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {reason}
    </div>
  );
};
