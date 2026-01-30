import React from 'react';
import { Sun, CloudRain, Info, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

const REGIONAL_IMPACT = [
  {
    location: 'Koh Kong',
    status: 'Limited',
    statusColor: 'bg-red-500 text-white',
    icon: <XCircle className="w-5 h-5" />,
    description: 'Roads muddy, access unreliable',
    impact: 'Not Recommended'
  },
  {
    location: 'Cardamom Mountains',
    status: 'Conditional',
    statusColor: 'bg-yellow-500 text-stone-900',
    icon: <AlertTriangle className="w-5 h-5" />,
    description: 'Trekking limited, guides required',
    impact: 'Conditional'
  },
  {
    location: 'Tonle Sap',
    status: 'Ideal',
    statusColor: 'bg-green-500 text-white',
    icon: <CheckCircle2 className="w-5 h-5" />,
    description: 'Peak ecology, floating villages active',
    impact: 'Ideal'
  }
];

const SeasonalGuide: React.FC = () => {
  return (
    <section id="seasons" className="space-y-16 animate-in fade-in duration-700">
      <div className="space-y-12 bg-stone-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
        <CldImage
          assetKey="cbet.package.veunsaisiampang.hero"
          alt="Seasonal landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900/80 to-stone-900/40" />
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Sun className="w-64 h-64" />
        </div>

        <header className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4">The Natural Cycle</h2>
          <p className="text-stone-400 leading-relaxed">Timing your visit is crucial for specific educational outcomes, especially in wetland or deep jungle sites.</p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Ideal
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> Conditional
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Not Recommended
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-amber-400/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                  <Sun className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">Dry Season (Nov — May)</h4>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">Cooler weather from Nov-Feb makes trekking comfortable. Water levels in Tonle Sap are low, concentrating bird populations in the core reserves.</p>
              <ul className="text-xs space-y-2 text-stone-300">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-400" /> Best for: Mountain biking & trekking</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-400" /> Best for: Bird watching at Prek Toal</li>
              </ul>
           </div>

           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-400/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  <CloudRain className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">Monsoon (Jun — Oct)</h4>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">The landscape turns emerald green. Waterfalls are at full power. Some remote sites in Koh Kong may have restricted road access due to mud.</p>
              <ul className="text-xs space-y-2 text-stone-300">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-400" /> Best for: Waterfall photography</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-400" /> Best for: Tonle Sap aquatic studies</li>
              </ul>
           </div>
        </div>
      </div>

      {/* New Section: Season Impact by Location */}
      <div className="space-y-8">
        <header className="flex items-end justify-between border-b border-stone-200 pb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-900">Monsoon (Jun–Oct): Regional Impact</h3>
            <p className="text-stone-500 text-sm mt-1">Status and field conditions for the upcoming rainy season.</p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Current Forecast</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGIONAL_IMPACT.map((item) => (
            <div key={item.location} className="bg-white border border-stone-100 shadow-xl shadow-stone-200/50 rounded-3xl p-6 transition-transform hover:-translate-y-1">
              <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-6">
                <CldImage
                  assetKey="cbet.package.veunsaisiampang.snapshot"
                  alt={`${item.location} season`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl ${item.statusColor}`}>
                  {item.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                  {item.status}
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-stone-900 mb-2">{item.location}</h4>
              <p className="text-sm text-stone-500 leading-relaxed mb-6 font-medium">
                {item.description}
              </p>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'Ideal' ? 'bg-green-500' : item.status === 'Conditional' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-xs font-bold text-stone-900">{item.impact}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl flex items-start gap-4">
         <div className="p-2 bg-stone-900 text-white rounded-xl">
           <Info className="w-5 h-5" />
         </div>
         <div>
            <h5 className="font-bold text-stone-900 text-sm mb-1">Researcher Note: Biosafety Priority</h5>
            <p className="text-xs text-stone-600 leading-relaxed">
              Lecches and biting insects are highly active in jungle sites (Chi Phat, Areng) during the monsoon. Access roads in Koh Kong often flood; always confirm route availability with the Ministry of Environment before departure.
            </p>
         </div>
      </div>
    </section>
  );
};

export default SeasonalGuide;
