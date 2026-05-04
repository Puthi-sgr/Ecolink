import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Badge } from '../../../shared/atoms/Badge';
import { Button } from '../../../shared/atoms/Button';
import { CBETPackage } from '../../../shared/types';
import { getPackageFitCallout } from '../../../shared/utils/packageFit';

const EDITORIAL_COLLECTIONS = [
  {
    id: 'wildlife',
    title: 'Top for Wildlife',
    description: 'Birding, primate, and river-led learning with strong conservation narratives.',
  },
  {
    id: 'culture',
    title: 'Culture & Community',
    description: 'Village, craft, and heritage-led packages for interdisciplinary cohorts.',
  },
  {
    id: 'short-escape',
    title: 'Short-Notice Options',
    description: 'Good-fit packages for tighter teaching windows and lower logistics friction.',
  },
  {
    id: 'overnight',
    title: 'Overnight Immersion',
    description: 'Longer stays that reward deeper planning and stronger community contact.',
  },
];

interface DiscoveryEditorialCollectionsProps {
  packages: CBETPackage[];
  onBrowseAll?: () => void;
}

export const DiscoveryEditorialCollections: React.FC<DiscoveryEditorialCollectionsProps> = ({
  packages,
  onBrowseAll,
}) => (
  <section className="rounded-[32px] bg-surface px-5 py-6 shadow-[0_20px_52px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)] md:px-6">
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:items-start">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/88 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted shadow-[0_10px_24px_rgba(25,28,29,0.04)] ring-1 ring-[rgba(194,198,212,0.18)]">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Editorial fit
        </div>

        <div className="space-y-2">
          <h3 className="text-[1.9rem] font-bold font-serif leading-tight text-text">
            Choose a planning lane before filtering hard
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-text-muted">
            These editorial tracks narrow the shortlist by teaching style, logistics pressure, and community
            immersion without forcing a full form first.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="surface" size="sm">
            {packages.length} shortlist destinations
          </Badge>
          <Badge variant="accent" size="sm">
            4 editorial tracks
          </Badge>
        </div>

        {onBrowseAll ? (
          <div className="pt-1">
            <Button variant="secondary" size="sm" onClick={onBrowseAll}>
              <Compass className="h-4 w-4" />
              Browse full destination index
            </Button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {EDITORIAL_COLLECTIONS.map((collection) => {
          const matches = packages.filter((pkg) => pkg.featuredCollectionIds.includes(collection.id));
          const leadPackage = matches[0];

          return (
            <article
              key={collection.id}
              className="group rounded-[24px] bg-white/92 p-4 shadow-[0_14px_32px_rgba(25,28,29,0.05)] ring-1 ring-[rgba(194,198,212,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Editorial fit
                </div>
                <Badge variant="surface" size="sm">
                  {matches.length} packages
                </Badge>
              </div>

              <h4 className="mt-3 text-xl font-bold font-serif leading-tight text-text">{collection.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{collection.description}</p>

              {leadPackage ? (
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent" size="sm">
                      {getPackageFitCallout(leadPackage)}
                    </Badge>
                  </div>
                  <div className="rounded-2xl bg-surface-2/85 px-4 py-3">
                    <p className="text-sm font-semibold text-text">{leadPackage.cbetSite}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {leadPackage.duration} | {leadPackage.location}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-text-muted">No current matches in this shortlist lane.</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
