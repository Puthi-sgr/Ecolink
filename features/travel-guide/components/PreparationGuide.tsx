import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Package, 
  FileText, 
  Handshake, 
  Leaf, 
  Binoculars, 
  PlusCircle, 
  MessageCircle 
} from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

const PreparationGuide: React.FC = () => {
  return (
    <section id="prep" className="space-y-16 py-10">
      <header className="text-center space-y-4">
        <h2 className="text-6xl font-serif font-bold text-[#1a3a32] tracking-tight">Preparation & Ethics</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto font-medium">
          Traveling to community-owned sites requires a higher level of sensitivity and planning.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Cultural Respect - Large Image Card */}
          <div className="relative h-64 rounded-[2.5rem] overflow-hidden group shadow-lg">
            <CldImage
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Cultural Respect"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-2">Cultural Respect</h3>
              <p className="text-stone-200 text-sm leading-relaxed max-w-sm">
                Dress modestly (shoulders/knees covered), especially in villages. Always ask for permission before photographing individuals or sacred sites.
              </p>
            </div>
          </div>

          {/* Community Engagement - Horizontal Icon Card */}
          <div className="flex items-center gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm transition-all hover:shadow-md hover:bg-white">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-[#1a3a32]">
              <Handshake className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-stone-900 mb-1">Community Engagement</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Support local businesses and guides. Purchase handmade crafts directly from artisans to ensure fair compensation.
              </p>
            </div>
          </div>

          {/* Sustainable Transport - Horizontal Icon Card */}
          <div className="flex items-center gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm transition-all hover:shadow-md hover:bg-white">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-[#2a5a3a]">
              <Leaf className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-stone-900 mb-1">Sustainable Transport</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Opt for eco-friendly transport options like bicycles or walking when possible. Reduce carbon footprint during travel.
              </p>
            </div>
          </div>

          {/* Wildlife Interaction - Horizontal Icon Card */}
          <div className="flex items-center gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm transition-all hover:shadow-md hover:bg-white">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-stone-600">
              <Binoculars className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-stone-900 mb-1">Wildlife Interaction</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Observe wildlife from a distance. Do not feed or disturb animals. Follow guides' instructions for responsible viewing.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Research Permits - Image + Text Card */}
          <div className="flex gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-md hover:bg-white">
            <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
               <CldImage
                 src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 alt="Permits"
               />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-[#2a5a3a]" />
                <h4 className="font-bold text-lg text-stone-900">Research Permits</h4>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                If collecting biological or social data, ensure you have the necessary MOE (Ministry of Environment) permissions or university approvals.
              </p>
            </div>
          </div>

          {/* Health & Safety - Image + Text Card */}
          <div className="flex gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-md hover:bg-white">
            <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
               <CldImage
                 src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 alt="Health"
               />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <PlusCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-lg text-stone-900">Health & Safety</h4>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Carry a basic first aid kit. Antimalarials may be recommended for deep jungle sites in Koh Kong; consult your university clinic.
              </p>
            </div>
          </div>

          {/* Language & Communication - Image + Text Card */}
          <div className="flex gap-6 p-6 bg-[#f9f9f7] rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-md hover:bg-white">
            <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
               <CldImage
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 alt="Communication"
               />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-lg text-stone-900">Language & Communication</h4>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Learn basic phrases in the local language. Simple greetings can go a long way in building rapport and showing respect.
              </p>
            </div>
          </div>

          {/* Eco-Packing - Large Image Card Bottom */}
          <div className="relative h-64 rounded-[2.5rem] overflow-hidden group shadow-lg">
            <CldImage
              src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Eco-Packing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-2">Eco-Packing</h3>
              <p className="text-stone-200 text-sm leading-relaxed max-w-sm">
                Minimize single-use plastics. Communities have limited waste management. Bring bio-degradable soap and reusable water bottles.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PreparationGuide;
