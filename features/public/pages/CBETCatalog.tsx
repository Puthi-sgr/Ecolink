import React, { useState, useRef } from 'react';
import { useCBETPackages } from '../../../shared/data/cbetData';
import { CBETPackage } from '../../../shared/types';

// New / Updated Components
import { HomeHero } from '../components/HomeHero';
import { SocialProof } from '../components/SocialProof';
import { HowItWorks } from '../components/HowItWorks';
import { TrustStrip } from '../components/TrustStrip';
import { ImpactSection } from '../components/ImpactSection';
import { CBETMap } from '../CBETMap';
import { CatalogGrid } from '../components/CatalogGrid';

import { Map, MapPin } from 'lucide-react';

export const CBETCatalog: React.FC = () => {
    const packages = useCBETPackages();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');
    const catalogRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (pkg: CBETPackage) => {
        window.location.hash = `/package/${pkg.id}/overview`;
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
                    <div className="container mx-auto px-4 md:px-5 xl:px-6 text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-2 rounded-full text-xs font-bold uppercase tracking-wider text-text-muted mb-4 border border-border">
                            <MapPin className="w-3 h-3" />
                            Available Destinations
                        </div>
                        <h2 className="text-4xl font-bold font-serif text-text mb-4">Find Your Field Site</h2>
                        <p className="text-text-muted max-w-xl mx-auto">
                            Browse university-approved packages below. Filter by duration, capacity, or location to find the perfect match for your syllabus.
                        </p>
                    </div>

                    <div className="container mx-auto px-4 md:px-5 xl:px-6 pb-12">
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                                <div className="hidden md:block" />

                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('cards')}
                                            className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${viewMode === 'cards'
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-text-muted hover:text-primary'
                                                }`}
                                        >
                                            Photo View
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('map')}
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors ${viewMode === 'map'
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-text-muted hover:text-primary'
                                                }`}
                                        >
                                            <Map className="h-4 w-4" />
                                            Map View
                                        </button>
                                    </div>
                                </div>

                                <p className="text-center text-sm text-text-muted md:text-right">
                                    Showing <span className="font-bold text-text">{filteredPackages.length}</span> destinations
                                </p>
                            </div>

                            <div className="animate-in fade-in zoom-in-95 duration-300">
                                {viewMode === 'map' ? (
                                    <CBETMap packages={filteredPackages} onPackageSelect={handleCardClick} />
                                ) : (
                                    <CatalogGrid packages={filteredPackages} onPackageSelect={handleCardClick} />
                                )}
                            </div>
                        </div>
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
