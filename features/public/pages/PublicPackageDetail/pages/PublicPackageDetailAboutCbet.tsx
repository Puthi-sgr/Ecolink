import React from 'react';
import { Button } from '../../../../../shared/atoms/Button';
import { QuickFactsCard } from '../components/QuickFactsCard';
import { AboutCbetAccordion } from '../components/AboutCbetAccordion';
import { CommunityImpact } from '../components/CommunityImpact';
import { CbetSnapshot } from '../components/CbetSnapshot';
import { CommunityStoryGovernance } from '../components/CommunityStoryGovernance';
import { ConservationEthics } from '../components/ConservationEthics';
import { SeasonalityHighlights } from '../components/SeasonalityHighlights';
import { Home, Mountain, ShieldCheck, Sun, Users } from 'lucide-react';

interface PublicPackageDetailAboutCbetProps {
  onNavigatePricing: () => void;
}

const QUICK_FACTS = [
  { label: 'Capacity', value: '15-35 students', icon: <Users className="w-5 h-5" /> },
  { label: 'Facilities', value: 'Basic toilets, drinking water, shelter', icon: <Home className="w-5 h-5" /> },
  { label: 'Best Season', value: 'Nov - Mar (dry season)', icon: <Sun className="w-5 h-5" /> },
  { label: 'Difficulty', value: 'Moderate trekking', icon: <Mountain className="w-5 h-5" /> },
  { label: 'Safety', value: 'First aid kit, local guides, permits', icon: <ShieldCheck className="w-5 h-5" /> }
];

export const PublicPackageDetailAboutCbet: React.FC<PublicPackageDetailAboutCbetProps> = ({ onNavigatePricing }) => {
  return (
    <section id="about" className="space-y-10 scroll-mt-32">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
        <h3 className="font-bold text-text font-serif text-xl">About This CBET</h3>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <div className="space-y-8">
          <CbetSnapshot />

          <CommunityStoryGovernance />
          <ConservationEthics />
          <SeasonalityHighlights />
          <CommunityImpact />

          <div className="pt-2">
            <Button onClick={onNavigatePricing} className="px-6">
              View package pricing
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <QuickFactsCard items={QUICK_FACTS} />
        </aside>
      </div>

      <AboutCbetAccordion />
    </section>
  );
};
