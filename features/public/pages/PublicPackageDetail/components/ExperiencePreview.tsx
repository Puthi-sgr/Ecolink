import React from 'react';
import { Camera, Users, Sprout } from 'lucide-react';

const PREVIEW_CARDS = [
  {
    title: 'Wildlife Ethics Viewing',
    description: 'Strict adherence to distance and noise protocols ensures non-intrusive observation of local species.',
    image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=600&auto=format&fit=crop',
    icon: <Camera className="w-4 h-4" />
  },
  {
    title: 'Community Exchange',
    description: 'Direct dialogue with village elders and rangers to understand the human side of conservation.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7a?q=80&w=600&auto=format&fit=crop',
    icon: <Users className="w-4 h-4" />
  },
  {
    title: 'Conservation Workshop',
    description: 'Participate in hands-on activities ranging from nursery care to biodiversity data collection.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    icon: <Sprout className="w-4 h-4" />
  }
];

export const ExperiencePreview: React.FC = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
        <h3 className="font-bold text-text font-serif text-xl">Experience Preview</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PREVIEW_CARDS.map((card) => (
          <div
            key={card.title}
            className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-primary shadow-sm">
                {card.icon}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-text mb-2 font-serif group-hover:text-primary transition-colors">{card.title}</h4>
              <p className="text-xs text-text-muted leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
