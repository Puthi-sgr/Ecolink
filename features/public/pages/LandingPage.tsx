import React from 'react';
import { HowItWorks } from '../components/HowItWorks';
import { LandingFeatures } from '../components/LandingFeatures';
import { ValueProps } from '../components/ValueProps';
import { Button } from '../../../shared/atoms/Button';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-background">
      <HowItWorks />
      <ValueProps />
      <section className="container mx-auto px-4 py-20 md:px-5 xl:px-6">
        <LandingFeatures />
        <div className="mt-10 rounded-[28px] border border-border bg-surface p-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold font-serif text-text">Ready to choose a field site?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-muted">
            Browse destinations, compare logistics, and move the best option into the planner before requesting review.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => onNavigate('/destinations')}>Browse Destinations</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
