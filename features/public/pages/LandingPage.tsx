import React from 'react';
import { LandingHero } from '../components/LandingHero';
import { LandingFeatures } from '../components/LandingFeatures';
import { ValueProps } from '../components/ValueProps';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      <LandingHero 
        onGetStarted={() => onNavigate('/login')}
        onLearnMore={() => onNavigate('/destinations')}
      />
      <ValueProps />
      <LandingFeatures />
    </div>
  );
};
