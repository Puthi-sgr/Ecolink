import React, { useState } from 'react';
import { Button } from '../../../shared/atoms/Button';
import { CldImage } from '../../../shared/atoms/CldImage';
import { Search, Calendar, Users, CheckCircle, MapPin } from 'lucide-react';
import { useCBETPackages } from '../../../shared/data/cbetData';

interface HomeHeroProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onExplore?: () => void;
  onLearnMore?: () => void; // Kept for compatibility if passed
}

export const HomeHero: React.FC<HomeHeroProps> = ({ searchTerm, onSearchChange, onExplore }) => {
  const [activeTab, setActiveTab] = useState('CBET Sites');
  const packages = useCBETPackages();

  return (
    <div className="relative w-full pb-16 bg-surface-2 mb-12">
      {/* Background with overlay */}
      <div className="absolute inset-0 h-[500px] z-0 overflow-hidden">
        <CldImage
          height={600}
          assetKey="hero.main"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-32 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 drop-shadow-md tracking-tight">
          Your Field Trip Starts Here
        </h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium opacity-95">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent fill-white stroke-accent" />
            <span>Verified Safety Protocols</span>
          </div>
          <span className="hidden md:inline text-white/40">|</span>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent fill-white stroke-accent" />
            <span>University Approved</span>
          </div>
        </div>
      </div>

      {/* Search Widget - Overlapping */}
      <div className="container mx-auto px-6 relative z-20 -mt-20">
        <div className="bg-white rounded-xl shadow-2xl p-2 max-w-5xl mx-auto border border-border/50">
          {/* Tabs */}
          <div className="flex gap-2 p-1 mb-2 overflow-x-auto">
            {['CBET Sites', 'Research Projects', 'Workshops'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                    ? 'bg-primary text-white shadow-md'
                    : 'hover:bg-surface-2 text-text-muted bg-transparent'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-2">
            {/* Destination Dropdown */}
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <select
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full h-16 pl-10 pr-10 bg-surface-2 rounded-lg border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium text-text appearance-none cursor-pointer"
              >
                <option value="">All Destinations</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name} ({pkg.location})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Dates (Mock) */}
            <div className="md:col-span-3 relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <div className="absolute top-2 left-10 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden group-focus-within:block">Check-in</div>
              <input
                type="text"
                placeholder="Add dates"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="w-full h-16 pl-10 pr-4 bg-surface-2 rounded-lg border border-transparent focus:border-primary focus:bg-white focus:pt-4 outline-none transition-all font-medium text-text placeholder:text-text-muted/70"
              />
            </div>

            {/* Guests (Mock) */}
            <div className="md:col-span-2 relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Users className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <select className="w-full h-16 pl-10 pr-4 bg-surface-2 rounded-lg border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium text-text appearance-none cursor-pointer">
                <option value="">Group Size</option>
                <option value="10-20">10-20 Pax</option>
                <option value="20-40">20-40 Pax</option>
                <option value="40+">40+ Pax</option>
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <Button
                className="w-full h-16 text-lg font-bold shadow-lg bg-primary hover:bg-primary-600"
                onClick={onExplore}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
