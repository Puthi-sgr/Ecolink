import React from 'react';
import { Button } from '../../../shared/atoms/Button';

interface LandingHeroProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted, onLearnMore }) => {
  return (
    <section className="text-center space-y-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-text leading-tight">
        Connecting Research with <span className="text-primary">Nature</span>
      </h1>
      <p className="text-lg text-text-muted leading-relaxed">
        EcoLink bridges the gap between academic faculty and administrative oversight 
        for environmental research initiatives. Streamline your proposals today.
      </p>
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button size="lg" onClick={onGetStarted}>Get Started</Button>
        <Button variant="outline" size="lg" onClick={onLearnMore}>Learn More</Button>
      </div>
    </section>
  );
};