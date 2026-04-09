import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';

interface BookingReadinessChecklistProps {
  pkg: CBETPackage;
}

const getChecklist = (pkg: CBETPackage) => [
  `Confirm a group size between ${pkg.bookingConditions.minGroupSize} and ${pkg.bookingConditions.maxGroupSize}.`,
  `Request at least ${pkg.bookingConditions.minLeadTimeDays} days before departure.`,
  `Prepare a clear academic or travel purpose for the site coordination team.`,
  `Review transport notes before final approval: ${pkg.transportModes.join(', ')}.`,
];

export const BookingReadinessChecklist: React.FC<BookingReadinessChecklistProps> = ({ pkg }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-text">Operational Checklist</h3>
      <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {getChecklist(pkg).map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <p className="text-sm text-text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
