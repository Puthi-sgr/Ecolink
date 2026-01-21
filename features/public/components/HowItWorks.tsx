import React from 'react';
import { Search, FileCheck, Truck, Tent } from 'lucide-react';

interface HowItWorksProps {
    id?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ id }) => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "1. Select Trip",
      desc: "Faculty browses curriculum-aligned packages and requests a date."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-primary" />,
      title: "2. Admin Approves",
      desc: "EcoLink verifies availability and issues an official Approval Pack."
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "3. Coordination",
      desc: "We book the vetted transport, guides, and handle payment flow."
    },
    {
      icon: <Tent className="w-6 h-6 text-primary" />,
      title: "4. Preparation",
      desc: "The CBET site prepares specifically for your student group's arrival."
    }
  ];

  return (
    <section id={id} className="py-24 bg-surface border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-serif text-text mb-4 tracking-tight">Your Journey, Simplified</h2>
          <p className="text-text-muted leading-relaxed">
            From the moment you click "Request" to the moment the bus returns to campus, we have a structured process to ensure safety and quality.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-border -z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-border flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300 mb-6">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-text mb-2 font-serif">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
