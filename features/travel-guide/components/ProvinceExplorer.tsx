import React from 'react';
import { Check, X, AlertTriangle, Sun, Waves, ArrowRight, Circle } from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

const PROVINCES = [
  {
    id: 'koh-kong',
    name: 'Koh Kong Province',
    description: 'Mountains, dense rainforests, and mangrove systems. Crucial for biodiversity studies.',
    imageKey: 'cbet.package.veunsaisiampang.hero',
    idealFor: ['Biodiversity Researchers', 'Deep-Jungle Trekkers', 'Env. Science Students'],
    notIdealFor: ['Luxury Seekers', 'Casual City Tourism'],
    actionLabel: 'Explore Research Sites',
    seasonalStatus: {
      label: 'NOT RECOMMENDED (MONSOON)',
      icon: <X className="w-3.5 h-3.5" />,
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
  },
  {
    id: 'cardamom',
    name: 'Cardamom Mountains',
    description: "Rich in wildlife and indigenous communities. A biodiversity hotspot.",
    imageKey: 'cbet.package.veunsaisiampang.community.story',
    idealFor: ['Wildlife Photographers', 'Indigenous Culture Researchers'],
    notIdealFor: ['Short weekend trips', 'Elderly travelers'],
    actionLabel: 'Plan Visit',
    seasonalStatus: {
      label: 'CONDITIONAL ACCESS',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  },
  {
    id: 'tonle-sap',
    name: 'Tonle Sap Biosphere',
    description: 'UNESCO Biosphere Reserve, vital to the Mekong ecosystem.',
    imageKey: 'cbet.package.veunsaisiampang.significance',
    idealFor: ['Ornithologists (Bird Lovers)', 'Aquatic Ecosystem Students'],
    notIdealFor: ['Travelers with severe seasickness'],
    actionLabel: 'See Seasonal Data',
    seasonalStatus: {
      label: 'IDEAL: PEAK SEASON',
      icon: <Check className="w-3.5 h-3.5" />,
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }
];

export interface ProvinceCardData {
  id: string;
  name: string;
  description: string;
  imageKey?: string;
  image?: string;
  idealFor: string[];
  notIdealFor: string[];
  actionLabel: string;
  seasonalStatus: {
    label: string;
    icon: React.ReactNode;
    color: string;
  };
}

const ProvinceExplorer: React.FC<{ provinces?: ProvinceCardData[] }> = ({ provinces }) => {
  const data = provinces && provinces.length ? provinces : PROVINCES;
  return (
    <div id="provinces" className="space-y-12 py-12 animate-in fade-in duration-1000">
      <header className="text-center max-w-3xl mx-auto space-y-4 px-4 mb-16">
        <h2 className="text-6xl md:text-7xl font-bold text-stone-950 tracking-tight leading-tight">
          Regional Intelligence
        </h2>
        <p className="text-stone-500 font-medium text-lg max-w-xl mx-auto">
          The most exciting destinations, experiences, hidden gems, and traveler faves to check out now.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 max-w-7xl mx-auto min-h-[800px]">
        <div className="md:col-span-5 h-[600px] md:h-full relative rounded-3xl overflow-hidden shadow-2xl">
          <ProvinceCard province={data[0]} />
        </div>

        <div className="md:col-span-7 grid grid-rows-2 gap-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-full">
            <ProvinceCard province={data[1]} />
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-full">
            <ProvinceCard province={data[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProvinceCard: React.FC<{ province: ProvinceCardData }> = ({ province }) => {
  return (
    <>
      <CldImage
        src={province.image}
        assetKey={province.imageKey}
        alt={province.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/10" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-4">
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-[0.1em] backdrop-blur-md ${province.seasonalStatus.color}`}>
            {province.seasonalStatus.icon}
            {province.seasonalStatus.label}
          </div>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-none tracking-tight max-w-[90%]">
          {province.name}
        </h3>

        <p className="text-stone-300 text-[15px] leading-relaxed mb-6 opacity-90 font-medium max-w-lg">
          {province.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-white/10 mb-6">
          <div className="space-y-3">
            <p className="text-[11px] font-black text-green-400 uppercase tracking-[0.2em]">
              IDEAL FOR
            </p>
            <div className="space-y-2">
              {province.idealFor.map(item => (
                <div key={item} className="flex items-center gap-3 text-white text-[13px]">
                  <Check className="w-4 h-4 text-green-500 shrink-0" strokeWidth={3} />
                  <span className="font-bold text-stone-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-black text-red-400 uppercase tracking-[0.2em]">
              NOT IDEAL FOR
            </p>
            <div className="space-y-2">
              {province.notIdealFor.map(item => (
                <div key={item} className="flex items-center gap-3 text-stone-400 text-[13px]">
                  <X className="w-4 h-4 text-red-500/70 shrink-0" strokeWidth={3} />
                  <span className="font-semibold italic text-stone-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex">
          <button className="flex items-center gap-2.5 text-white/80 hover:text-white group/btn transition-all">
             <span className="text-xs font-black uppercase tracking-[0.25em] border-b border-transparent group-hover/btn:border-white transition-all pb-1">
                {province.actionLabel}
             </span>
             <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProvinceExplorer;
