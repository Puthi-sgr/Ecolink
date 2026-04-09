import React from 'react';
import { Clock3, MessageSquareMore, ShieldCheck, Star } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';
import { Badge } from '../../../../../shared/atoms/Badge';

interface PackageTrustRailProps {
  pkg: CBETPackage;
}

export const PackageTrustRail: React.FC<PackageTrustRailProps> = ({ pkg }) => {
  return (
    <div className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">Trust Snapshot</p>
          <h3 className="mt-2 text-xl font-bold font-serif text-text">{pkg.reviewSummary.label}</h3>
        </div>
        <Badge variant="accent" size="sm">
          EcoLink Verified
        </Badge>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <Star className="h-4 w-4 text-primary" aria-hidden="true" />
            {pkg.reviewSummary.score.toFixed(1)} / 5 planning score
          </div>
          <p className="mt-1 text-sm text-text-muted">{pkg.reviewSummary.count} mock planning reviews</p>
        </div>

        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <MessageSquareMore className="h-4 w-4 text-primary" aria-hidden="true" />
            Response speed
          </div>
          <p className="mt-1 text-sm text-text-muted">{pkg.reviewSummary.responseSpeed}</p>
        </div>

        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
            Booking lead time
          </div>
          <p className="mt-1 text-sm text-text-muted">Request at least {pkg.bookingConditions.minLeadTimeDays} days before departure.</p>
        </div>

        <div className="rounded-2xl bg-surface p-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Community impact
          </div>
          <p className="mt-1 text-sm text-text-muted">{pkg.reviewSummary.communityImpact}</p>
        </div>
      </div>
    </div>
  );
};
