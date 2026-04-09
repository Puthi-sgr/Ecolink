import React from 'react';
import { Calendar, Compass, Route, ShieldCheck, Users } from 'lucide-react';
import { useCBETPackages } from '../../shared/data';
import { Badge } from '../../shared/atoms/Badge';
import { Button } from '../../shared/atoms/Button';
import TravelGuideLayout from './layout/TravelGuideLayout';

const GUIDE_SECTIONS = [
  { id: 'months', label: 'Best Months' },
  { id: 'packing', label: 'Packing' },
  { id: 'travel-time', label: 'Travel Time' },
  { id: 'group-fit', label: 'Group Fit' },
];

const buildScroll = (id: string) => {
  const node = document.getElementById(id);
  if (node) {
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const TravelGuidePage: React.FC = () => {
  const packages = useCBETPackages();
  const seasonalPicks = packages.slice(0, 4);
  const overnightPicks = packages.filter((pkg) => pkg.featuredCollectionIds.includes('overnight')).slice(0, 3);

  const Sidebar = (
    <div className="space-y-6">
      <div className="border-b border-stone-100 pb-6">
        <h3 className="text-base font-bold text-stone-900">Guide Focus</h3>
        <p className="mt-2 text-sm text-stone-500">
          The guide now mirrors the package data so planning guidance and trip discovery stay aligned.
        </p>
      </div>

      <nav className="space-y-3">
        {GUIDE_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => buildScroll(section.id)}
            className="w-full rounded-2xl p-3 text-left text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );

  const Content = (
    <div className="space-y-14">
      <section className="rounded-[36px] border border-border bg-white p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          Planning Companion
        </div>
        <h1 className="mt-4 text-4xl font-bold font-serif text-text">Use the travel guide to reduce planning risk before you request a destination</h1>
        <p className="mt-3 max-w-3xl text-text-muted">
          The strongest travel-agency platforms help users decide, not just browse. This guide focuses on the practical questions: when to go, what to pack, how long transfers take, and which destinations fit each type of group.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => (window.location.hash = '/destinations')}>Browse Destinations</Button>
          <Button variant="outline" onClick={() => (window.location.hash = '/planner')}>
            Open Planner
          </Button>
        </div>
      </section>

      <section id="months" className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-serif text-text">Best Months to Go</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {seasonalPicks.map((pkg) => (
            <div key={pkg.id} className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{pkg.location}</p>
              <h3 className="mt-2 text-xl font-bold text-text">{pkg.cbetSite}</h3>
              <p className="mt-2 text-sm text-text-muted">{pkg.availabilityMonths.bestSeasonNote}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.themes.map((theme) => (
                  <Badge key={theme} variant="surface" size="sm">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="packing" className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-serif text-text">What to Pack by Site Type</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Wildlife & Wetland</h3>
            <p className="mt-3 text-sm text-text-muted">Bring sun protection, binoculars, quick-dry layers, and a field notebook.</p>
          </div>
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Culture & Village</h3>
            <p className="mt-3 text-sm text-text-muted">Pack modest clothing, note-taking tools, and lightweight shoes for mixed terrain.</p>
          </div>
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Adventure & Overnight</h3>
            <p className="mt-3 text-sm text-text-muted">Add a rain layer, headlamp, insect protection, and spare dry clothes.</p>
          </div>
        </div>
      </section>

      <section id="travel-time" className="space-y-6">
        <div className="flex items-center gap-3">
          <Route className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-serif text-text">Travel Time from Phnom Penh</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Short Transfer</h3>
            <p className="mt-2 text-sm text-text-muted">Best for one-day teaching blocks and low-friction faculty requests.</p>
          </div>
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Medium Transfer</h3>
            <p className="mt-2 text-sm text-text-muted">Works well for day trips that need an early start or short overnight extension.</p>
          </div>
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text">Long-Haul Transfer</h3>
            <p className="mt-2 text-sm text-text-muted">Use for immersive fieldwork where the academic value justifies multi-day coordination.</p>
          </div>
        </div>
      </section>

      <section id="group-fit" className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-serif text-text">Field-Trip Suitability</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {overnightPicks.map((pkg) => (
            <div key={pkg.id} className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-text">{pkg.cbetSite}</h3>
              <p className="mt-2 text-sm text-text-muted">
                Strong fit for {pkg.bestFor.join(', ').toLowerCase()} with a planning lead time of {pkg.bookingConditions.minLeadTimeDays} days.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <TravelGuideLayout sidebar={Sidebar} content={Content} />
    </div>
  );
};

export default TravelGuidePage;
