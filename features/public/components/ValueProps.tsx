import React from 'react';
import { Sprout, Wallet, ShieldCheck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const features = [
    {
      icon: <Sprout className="w-10 h-10 text-primary" />,
      title: "Foster Student Growth",
      bg: "bg-primary/5",
      border: "group-hover:border-primary/30"
    },
    {
      icon: <Wallet className="w-10 h-10 text-clay" />,
      title: "Budget Friendly",
      bg: "bg-clay/5",
      border: "group-hover:border-clay/30"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
      title: "Zero Admin Hassle",
      bg: "bg-accent/5",
      border: "group-hover:border-accent/30"
    }
  ];

  return (
    <section className="py-24 bg-surface border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-text tracking-tighter">Why EcoLink?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`group relative p-10 rounded-3xl border border-border bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center ${f.border}`}
            >
              {/* Background Blob Effect on Hover */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${f.bg} pointer-events-none`}></div>
              
              <div className="relative z-10 w-24 h-24 rounded-full bg-surface-2 border border-border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {f.icon}
              </div>
              
              <h3 className="relative z-10 text-2xl font-bold text-text font-serif tracking-tight group-hover:text-primary transition-colors">
                {f.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
