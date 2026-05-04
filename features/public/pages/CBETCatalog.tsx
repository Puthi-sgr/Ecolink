import React, { useState } from 'react';
import { FieldSiteDiscoverySection } from '../components/FieldSiteDiscoverySection';
import { HomeHero } from '../components/HomeHero';
import { ImpactSection } from '../components/ImpactSection';
import { SocialProof } from '../components/SocialProof';
import { TrustStrip } from '../components/TrustStrip';
import { buildHashRoute } from '../../../shared/utils/hashRoute';

export const CBETCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [tripDate, setTripDate] = useState('');

  const handleExplore = () => {
    window.location.hash = buildHashRoute('/about', {
      q: searchTerm.trim() || undefined,
      group: groupSize || undefined,
      date: tripDate || undefined,
      view: 'map',
    });
  };

  return (
    <div className="animate-in fade-in duration-700 bg-background">
      <HomeHero
        onExplore={handleExplore}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        groupSize={groupSize}
        onGroupSizeChange={setGroupSize}
        tripDate={tripDate}
        onTripDateChange={setTripDate}
      />
      <FieldSiteDiscoverySection basePath="/" defaultViewMode="map" />
      <SocialProof />
      <ImpactSection />
      <TrustStrip />
    </div>
  );
};
