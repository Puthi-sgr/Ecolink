import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { PackageFaq } from '../components/PackageFaq';
import { PackageOverview } from '../components/PackageOverview';
import { SeasonalityHighlights } from '../components/SeasonalityHighlights';
import { TypicalSchedule } from '../components/TypicalSchedule';

interface PublicPackageDetailOverviewAndItineryProps {
  pkg: CBETPackage;
  hero?: React.ReactNode;
}

export const PublicPackageDetailOverviewAndItinery: React.FC<PublicPackageDetailOverviewAndItineryProps> = ({ pkg, hero }) => {
  return (
    <section id="overview" className="scroll-mt-32 space-y-14">
      {hero}
      <PackageOverview pkg={pkg} />

      <div className="grid gap-10">
        <TypicalSchedule schedule={pkg.scheduleOutline} />
      </div>

      <div className="grid gap-10">
        <SeasonalityHighlights
          title="Availability Snapshot"
          rangeStartMonth={pkg.availabilityMonths.startMonth}
          rangeEndMonth={pkg.availabilityMonths.endMonth}
          peakStartMonth={pkg.availabilityMonths.peakStartMonth}
          peakEndMonth={pkg.availabilityMonths.peakEndMonth}
          peakLabel="Peak Planning Window"
          bestSeasonNote={pkg.availabilityMonths.bestSeasonNote}
          wetSeasonNote={pkg.availabilityMonths.wetSeasonNote}
        />
      </div>

      <PackageFaq pkg={pkg} />
    </section>
  );
};
