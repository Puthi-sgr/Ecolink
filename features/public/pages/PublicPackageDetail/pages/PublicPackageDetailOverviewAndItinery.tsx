import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { PackageOverview } from '../components/PackageOverview';
import { ExperiencePreview } from '../components/ExperiencePreview';
import { LearningOutcomes } from '../components/LearningOutcomes';
import { TypicalSchedule } from '../components/TypicalSchedule';

interface PublicPackageDetailOverviewAndItineryProps {
  pkg: CBETPackage;
}

export const PublicPackageDetailOverviewAndItinery: React.FC<PublicPackageDetailOverviewAndItineryProps> = ({ pkg }) => {
  return (
    <section id="overview" className="space-y-12 scroll-mt-32">
      <PackageOverview pkg={pkg} />
      <ExperiencePreview />

      <div className="grid md:grid-cols-2 gap-12">
        <LearningOutcomes outcomes={pkg.learningOutcomes} />
        <TypicalSchedule schedule={pkg.scheduleOutline} />
      </div>
    </section>
  );
};
