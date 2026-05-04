import React from 'react';
import { CalendarClock, CheckCircle2, ClipboardList, Route, Users } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';

interface BookingReadinessChecklistProps {
  pkg: CBETPackage;
}

const getChecklist = (pkg: CBETPackage) => [
  {
    icon: Users,
    label: 'Group fit',
    title: `${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize} travelers`,
    detail: 'Confirm the cohort sits inside the operating range before staging the request.',
  },
  {
    icon: CalendarClock,
    label: 'Lead time',
    title: `${pkg.bookingConditions.minLeadTimeDays}+ days`,
    detail: 'Give the site team enough time to coordinate guides, transport, and community readiness.',
  },
  {
    icon: ClipboardList,
    label: 'Purpose',
    title: 'Clear trip reason',
    detail: 'Prepare the academic or travel purpose so the quote can be reviewed without follow-up.',
  },
  {
    icon: Route,
    label: 'Movement',
    title: pkg.transportModes.join(' + '),
    detail: 'Review the transfer chain before final approval and traveler briefing.',
  },
];

export const BookingReadinessChecklist: React.FC<BookingReadinessChecklistProps> = ({ pkg }) => {
  return (
    <section className="space-y-5 rounded-[32px] border border-border/70 bg-white/96 px-5 py-7 shadow-sm md:px-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Before requesting</p>
          <h3 className="mt-2 text-2xl font-bold font-serif text-text">Operational checklist</h3>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          4 readiness checks
        </div>
      </div>

      <div className="grid gap-4 border-t border-border/55 pt-5 md:grid-cols-2">
        {getChecklist(pkg).map(({ icon: Icon, label, title, detail }) => (
          <article key={label} className="border-t border-border/70 pt-4">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">{label}</p>
                <h4 className="mt-1 text-base font-semibold leading-snug text-text">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{detail}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
