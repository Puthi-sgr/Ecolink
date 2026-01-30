import React, { useState, useEffect } from 'react';
import TravelGuideLayout from './layout/TravelGuideLayout';
import ProvinceExplorer from './components/ProvinceExplorer';
import SeasonalGuide from './components/SeasonalGuide';
import PreparationGuide from './components/PreparationGuide';
import AIInspirationScout from './components/AIInspirationScout';
import HeroSlider from './components/HeroSlider';
import { MapPin, Sun, Sparkles, Leaf } from 'lucide-react';
import { useCBETPackages } from '../faculty/data/cbetData';
import type { ProvinceCardData } from './components/ProvinceExplorer';

const SECTIONS = [
  { 
    id: 'provinces', 
    label: 'Provinces', 
    icon: <MapPin className="w-4 h-4" />, 
    tip: 'Regional Intelligence' 
  },
  { 
    id: 'prep', 
    label: 'Preparation', 
    icon: <Leaf className="w-4 h-4" />, 
    tip: '5 tips for eco-packing' 
  },
  { 
    id: 'seasons', 
    label: 'Seasonality', 
    icon: <Sun className="w-4 h-4" />, 
    tip: 'The Natural Cycle' 
  },
  { 
    id: 'ai-scout', 
    label: 'AI Scout', 
    icon: <Sparkles className="w-4 h-4" />, 
    tip: 'Ask our AI Guide' 
  }
];

const TravelGuidePage: React.FC = () => {
  const [explored, setExplored] = useState<Set<string>>(new Set(['provinces']));
  const [activeSection, setActiveSection] = useState<string>('provinces');
  const packages = useCBETPackages();

  const heroSlides = packages.slice(0, 3).map((pkg, index) => ({
    id: index + 1,
    title: (
      <>
        Explore <span className="border-b-4 border-white">{pkg.name}</span> with
        <span className="border-b-4 border-white"> EcoLink</span>
      </>
    ),
    description: pkg.description,
    imageKey: pkg.imageKey,
    link: '#'
  }));

  const provinceCards: ProvinceCardData[] = packages.slice(0, 3).map((pkg, index) => ({
    id: pkg.id,
    name: pkg.cbetSite || pkg.name,
    description: pkg.description,
    imageKey: pkg.imageKey,
    idealFor: pkg.activities.slice(0, 3),
    notIdealFor: ['Short weekend trips', 'Luxury seekers'],
    actionLabel: index === 0 ? 'Explore Research Sites' : index === 1 ? 'Plan Visit' : 'See Seasonal Data',
    seasonalStatus: {
      label: index === 0 ? 'IDEAL: PEAK SEASON' : index === 1 ? 'CONDITIONAL ACCESS' : 'NOT RECOMMENDED (MONSOON)',
      icon: index === 0 ? <Sun className="w-3.5 h-3.5" /> : index === 1 ? <Sparkles className="w-3.5 h-3.5" /> : <Leaf className="w-3.5 h-3.5" />,
      color: index === 0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : index === 1 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
    }
  }));

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track exploration progress and active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          setExplored(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progressPercent = (explored.size / SECTIONS.length) * 100;

  const Sidebar = (
    <div className="space-y-6">
      {/* Quick Stats Header */}
      <div className="pb-6 border-b border-stone-100">
        <h3 className="text-base font-bold text-stone-900 mb-3">Quick Stats</h3>
        <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-2">
          <div 
            className="bg-green-600 h-full transition-all duration-700 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] font-medium text-stone-500">
          Explored: {explored.size} of {SECTIONS.length} sections
        </p>
      </div>

      {/* Navigation Cards */}
      <nav className="space-y-3">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`w-full group text-left transition-all duration-300 ${
                isActive 
                  ? 'bg-white shadow-lg ring-1 ring-stone-100 rounded-[1.5rem] p-4 -mx-1' 
                  : 'hover:bg-stone-50 rounded-2xl p-3'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 group-hover:bg-green-200'
                }`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold transition-colors ${
                    isActive ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'
                  }`}>
                    {section.label}
                  </p>
                  {isActive && (
                    <p className="text-[11px] text-stone-500 mt-1 animate-in fade-in slide-in-from-top-1">
                      {section.tip}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Content = (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* Simplified Sub-Nav for Mobile */}
      <div className="lg:hidden flex justify-center gap-6 border-b border-stone-100 pb-6 mb-12 overflow-x-auto whitespace-nowrap px-4">
        {SECTIONS.map(section => (
          <button 
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`text-xs font-bold transition-colors tracking-tight ${
              activeSection === section.id ? 'text-green-600' : 'text-stone-50'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <ProvinceExplorer provinces={provinceCards} />
      <PreparationGuide />
      <SeasonalGuide />
      <AIInspirationScout />
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <TravelGuideLayout 
        sidebar={Sidebar}
        content={Content}
      />
    </div>
  );
};

export default TravelGuidePage;
