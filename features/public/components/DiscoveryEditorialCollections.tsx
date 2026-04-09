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
  <div className="grid gap-4 lg:grid-cols-4">
    {EDITORIAL_COLLECTIONS.map((collection) => {
      const matches = packages.filter((pkg) => pkg.featuredCollectionIds.includes(collection.id));
      const leadPackage = matches[0];

      return (
        <div key={collection.id} className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Editorial fit
          </div>
          <h3 className="mt-4 text-xl font-bold font-serif text-text">{collection.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{collection.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="surface" size="sm">
              {matches.length} packages
            </Badge>
            {leadPackage ? (
              <Badge variant="accent" size="sm">
                {getPackageFitCallout(leadPackage)}
              </Badge>
            ) : null}
          </div>

          {leadPackage ? (
            <div className="mt-4 rounded-2xl bg-surface p-4">
              <p className="text-sm font-semibold text-text">{leadPackage.cbetSite}</p>
              <p className="mt-1 text-sm text-text-muted">{leadPackage.duration} • {leadPackage.location}</p>
            </div>
          ) : null}

          {onBrowseAll ? (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={onBrowseAll}>
                <Compass className="h-4 w-4" />
                Browse all
              </Button>
            </div>
          ) : null}
        </div>
      );
    })}
  </div>
);

