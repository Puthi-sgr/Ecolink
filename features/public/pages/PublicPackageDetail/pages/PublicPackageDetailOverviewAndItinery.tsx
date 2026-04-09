import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { BookingReadinessChecklist } from '../components/BookingReadinessChecklist';
import { ExperiencePreview } from '../components/ExperiencePreview';
import { LearningOutcomes } from '../components/LearningOutcomes';
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
    <section id="overview" className="space-y-12 scroll-mt-32">
      {hero}
      <PackageOverview pkg={pkg} />
      <ExperiencePreview />

      <div className="grid gap-12 md:grid-cols-2">
        <LearningOutcomes outcomes={pkg.learningOutcomes} />
        <TypicalSchedule schedule={pkg.scheduleOutline} />
      </div>

      <div className="grid gap-12 md:grid-cols-2">
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
        <BookingReadinessChecklist pkg={pkg} />
      </div>

      <PackageFaq pkg={pkg} />
    </section>
  );
};
