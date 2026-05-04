import React from 'react';
import { Activity, Bus, CalendarClock, Clock3, ClipboardList, Footprints, MapPinned, ShieldCheck, Users, Utensils, Route } from 'lucide-react';
import { CBETPackage } from '../../../../../shared/types';

interface PackageOverviewProps {
  pkg: CBETPackage;
}

export const PackageOverview: React.FC<PackageOverviewProps> = ({ pkg }) => {
  const primaryTransport = pkg.transportModes[0] ?? 'Mixed transfers';
  const mealsLabel = pkg.includes.some((item) => /meal|lunch|dinner|breakfast/i.test(item))
    ? 'Meals included'
    : 'Mixed meals';
  const highlightPoints = pkg.highlights.slice(0, 3);
  const highlightCards = [
    {
      icon: Footprints,
      title: highlightPoints[0] ?? 'Field exploration',
      detail: 'Explore site conditions, community context, and place-based learning on foot.',
    },
    {
      icon: Users,
      title: `${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize} Participant Planning`,
      detail: 'Ideal range for engaged group learning, facilitation, and meaningful interaction.',
    },
    {
      icon: Bus,
      title: `${primaryTransport} Transfer`,
      detail: 'Transport flow is coordinated for academic groups with clear arrival staging.',
    },
  ];
  const practicalDetails = [
    {
      icon: Clock3,
      title: 'Duration',
      value: pkg.duration,
    },
    {
      icon: Activity,
      title: 'Pace',
      value: `${pkg.safetyInfo.activityLevel} pace, suitable for cohort travel`,
    },
    {
      icon: Utensils,
      title: 'Inclusions',
      value: `${mealsLabel} & guided site coordination`,
    },
    {
      icon: MapPinned,
      title: 'Meeting Point',
      value: pkg.meetingPoint,
    },
  ];
  const checklistItems = [
    {
      icon: Users,
      label: 'Group fit',
      title: `${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize} travelers`,
      detail: 'Confirm cohort size fits the operating range.',
    },
    {
      icon: CalendarClock,
      label: 'Lead time',
      title: `${pkg.bookingConditions.minLeadTimeDays}+ days`,
      detail: 'Coordinate guides, transport, and community readiness.',
    },
    {
      icon: ClipboardList,
      label: 'Purpose',
      title: 'Clear trip reason',
      detail: 'Prepare academic or travel purpose for quote review.',
    },
    {
      icon: Route,
      label: 'Movement',
      title: pkg.transportModes.join(' + '),
      detail: 'Review transfer chain and traveler briefing.',
    },
  ];

  return (
    <section className="space-y-8">
      <div className="px-5 py-7 md:px-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="flex items-center lg:pr-2">
            <h2 className="max-w-[12rem] text-[2rem] font-bold font-serif uppercase leading-[0.94] text-text md:text-[2.25rem]">
              Why this this site works for academic travel
            </h2>
          </div>

          <ol className="grid gap-4 md:grid-cols-3" aria-label="Academic travel fit highlights">
            {highlightCards.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="flex h-full flex-col items-center rounded-[28px] border-[3px] border-secondary-200 bg-secondary-50 px-5 py-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center text-text">
                  <Icon className="h-9 w-9 text-text" aria-hidden="true" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-[1.05rem] font-bold leading-tight text-text">{title}</h3>
                <p className="mt-3 text-sm leading-snug text-text-muted">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-border/70 bg-white shadow-sm" aria-labelledby="practical-checklist-heading">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          <div className="bg-clay px-6 py-7 text-white md:px-7">
            <h3 className="text-[2rem] font-bold font-serif leading-[1.02] text-white">Practical details</h3>
            <div className="mt-7 space-y-5">
              {practicalDetails.map(({ icon: Icon, title, value }) => (
                <div key={title} className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-4">
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-300 text-clay shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
                    <Icon className="h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                  </span>
                  <div className="pt-1">
                    <p className="text-[1.02rem] leading-[1.35] text-white/96">
                      <span className="font-bold text-white">{title}:</span> {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-7 md:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Before requesting</p>
                <h3 id="practical-checklist-heading" className="mt-2 text-[2rem] font-bold font-serif leading-[1.02] text-text">
                  Operational checklist
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                4 readiness checks
              </div>
            </div>

            <div className="mt-5 space-y-4 border-t border-border/60 pt-5">
              {checklistItems.map(({ icon: Icon, label, title, detail }) => (
                <article key={label} className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-4 border-b border-border/45 pb-4 last:border-b-0 last:pb-0">
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay text-primary-300 shadow-[0_10px_18px_rgba(25,28,29,0.12)]">
                    <Icon className="h-5 w-5 shrink-0 text-primary-300" aria-hidden="true" />
                  </span>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">{label}</p>
                    <h4 className="mt-1 text-[1.05rem] font-bold leading-snug text-text">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
