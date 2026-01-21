import React from 'react';
import { ShieldCheck, Bus, Heart, BadgeCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const points = [
    { 
      icon: <Bus className="w-5 h-5" />, 
      title: "Licensed Transport",
      desc: "Only certified partners"
    },
    { 
      icon: <ShieldCheck className="w-5 h-5" />, 
      title: "Safety Protocols", 
      desc: "Emergency plans included"
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      title: "Ethical Wildlife", 
      desc: "Strict interaction guidelines"
    },
    { 
      icon: <BadgeCheck className="w-5 h-5" />, 
      title: "Organizer-of-Record", 
      desc: "EcoLink takes responsibility"
    }
  ];

  return (
    <section className="py-12 bg-primary-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors border border-white/10">
                {p.icon}
              </div>
              <div>
                <h4 className="font-bold text-base leading-tight">{p.title}</h4>
                <p className="text-xs text-primary-100 opacity-80 mt-1">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
