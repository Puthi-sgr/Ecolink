import React from 'react';
import { Button } from '../../../../../shared/atoms/Button';
import { QuickFactsCard } from '../components/QuickFactsCard';
import { AboutCbetAccordion } from '../components/AboutCbetAccordion';
import { CommunityImpact } from '../components/CommunityImpact';
import { CbetSnapshot } from '../components/CbetSnapshot';
import { CommunityStoryGovernance } from '../components/CommunityStoryGovernance';
import { ConservationEthics } from '../components/ConservationEthics';
import { SeasonalityHighlights } from '../components/SeasonalityHighlights';
import { CBETAbout } from '../../../../../shared/types';

interface PublicPackageDetailAboutCbetProps {
  onNavigatePricing: () => void;
  about: CBETAbout;
}

export const PublicPackageDetailAboutCbet: React.FC<PublicPackageDetailAboutCbetProps> = ({ onNavigatePricing, about }) => {
  return (
    <section id="about" className="space-y-10 scroll-mt-32">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
        <h3 className="font-bold text-text font-serif text-xl">About This CBET</h3>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <div className="space-y-8">
          <CbetSnapshot
            title={about.snapshot.title}
            description={about.snapshot.description}
            imageKey={about.snapshot.imageKey}
          />

          <CommunityStoryGovernance
            title={about.communityStory.title}
            subtitle={about.communityStory.subtitle}
            description={about.communityStory.description}
            avatarKey={about.communityStory.avatarKey}
            imageKey={about.communityStory.imageKey}
          />
          <ConservationEthics
            title={about.conservation.title}
            description={about.conservation.description}
            imageKey={about.conservation.imageKey}
            ethicsRules={about.conservation.ethicsRules}
          />
          <SeasonalityHighlights
            title={about.seasonality.title}
            rangeStartMonth={about.seasonality.rangeStartMonth}
            rangeEndMonth={about.seasonality.rangeEndMonth}
            peakStartMonth={about.seasonality.peakStartMonth}
            peakEndMonth={about.seasonality.peakEndMonth}
            peakLabel={about.seasonality.peakLabel}
            bestSeasonNote={about.seasonality.bestSeasonNote}
            wetSeasonNote={about.seasonality.wetSeasonNote}
          />
          <CommunityImpact
            title={about.impact.title ?? 'Your Impact'}
            subtitle={about.impact.subtitle}
            breakdown={about.impact.breakdown}
            localLabel={about.impact.localLabel}
          />

          <div className="pt-2">
            <Button onClick={onNavigatePricing} className="px-6">
              View package pricing
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <QuickFactsCard items={about.quickFacts} />
        </aside>
      </div>

      <AboutCbetAccordion items={about.accordion} />
    </section>
  );
};
