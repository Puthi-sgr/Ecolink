import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { Calendar, Activity, ShieldCheck, ClipboardList } from 'lucide-react';

interface PublicPackageDetailTravelGuideProps {
  pkg: CBETPackage;
}

export const PublicPackageDetailTravelGuide: React.FC<PublicPackageDetailTravelGuideProps> = ({ pkg }) => {
  return (
    <section id="travel-guide" className="space-y-6 scroll-mt-32">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
        <h3 className="font-bold text-text font-serif text-xl">Travel Guide</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-2 border border-border rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-text">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Best Timing</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{pkg.suitableTiming}</p>
        </div>

        <div className="bg-surface-2 border border-border rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-text">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Activity Level</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{pkg.safetyInfo.activityLevel}</p>
          <p className="text-xs text-text-muted leading-relaxed">{pkg.safetyInfo.riskNotes}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-2 border border-border rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-text">
            <ClipboardList className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Core Activities</span>
          </div>
          <ul className="space-y-2 text-sm text-text-muted">
            {pkg.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface-2 border border-border rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-text">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">Field Facilities</span>
          </div>
          <ul className="space-y-2 text-sm text-text-muted">
            {pkg.safetyInfo.facilities.map((facility) => (
              <li key={facility} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                <span>{facility}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
