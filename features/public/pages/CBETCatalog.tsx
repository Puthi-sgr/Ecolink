import React, { useState, useEffect, useRef } from 'react';
import { useCBETPackages } from '../../../shared/data/cbetData';
import { CBETPackage } from '../../../shared/types';

// New / Updated Components
import { HomeHero } from '../components/HomeHero';
import { SocialProof } from '../components/SocialProof';
import { HowItWorks } from '../components/HowItWorks';
import { TrustStrip } from '../components/TrustStrip';
import { ImpactSection } from '../components/ImpactSection';
import { CBETMap } from '../components/CBETMap';

// Existing Components (Catalog)
import { CatalogGrid } from '../components/CatalogGrid';
import { MapPin, Map as MapIcon, Grid } from 'lucide-react';
import { Button } from '../../../shared/atoms/Button';

export const CBETCatalog: React.FC = () => {
    const packages = useCBETPackages();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

    const catalogRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (pkg: CBETPackage) => {
        window.location.hash = `/package/${pkg.id}`;
    };

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-700 bg-background">

            {/* 1. Hero: Search & Trust */}
            <HomeHero
                onExplore={scrollToCatalog}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* 2. Process: Your Journey Simplified */}
            <HowItWorks id="process-section" />

            {/* 3. Catalog Section */}
            <div ref={catalogRef} className="scroll-mt-20 border-t border-border">

                {/* Catalog Header */}
                <section className="py-16 bg-surface-2/30">
                    <div className="container mx-auto px-6 text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-2 rounded-full text-xs font-bold uppercase tracking-wider text-text-muted mb-4 border border-border">
                            <MapPin className="w-3 h-3" />
                            Available Destinations
                        </div>
                        <h2 className="text-4xl font-bold font-serif text-text mb-4">Find Your Field Site</h2>
                        <p className="text-text-muted max-w-xl mx-auto">
                            Browse university-approved packages below. Filter by duration, capacity, or location to find the perfect match for your syllabus.
                        </p>
                    </div>

                    <div className="container mx-auto px-6 pb-12">

                        {/* Content View */}

                        <div className="animate-in fade-in zoom-in-95 duration-300">
                            <CBETMap packages={filteredPackages} onPackageSelect={handleCardClick} />
                        </div>

                        <div className="animate-in fade-in zoom-in-95 duration-300 pt-10">
                            <CatalogGrid packages={filteredPackages} onPackageSelect={handleCardClick} />
                        </div>


                        {/* Always show Grid if in Map mode but pushed down? No, user toggles. 
                    However, let's keep the map purely interactive and grid for details. 
                    If user selects map, we just show map. 
                */}
                    </div>
                </section>
            </div>

            {/* 4. Social Proof */}
            <SocialProof />

            {/* 5. Social Proof Metrics (Impact) */}
            <ImpactSection />

            {/* 6. Trust Strip */}
            <TrustStrip />
        </div>
    );
};