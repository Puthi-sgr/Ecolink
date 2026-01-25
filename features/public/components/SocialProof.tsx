import React from 'react';
import { MapPin, GraduationCap, Search } from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

export const SocialProof: React.FC = () => {
  const expeditions = [
    {
      label: "Recent Expedition",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop",
      destination: "Prek Toal Biosphere",
      university: "Royal University of Phnom Penh",
      topic: "Ornithology",
      students: "30 Students"
    },
    {
      label: "Past Expedition 1",
      image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=800&auto=format&fit=crop",
      destination: "Cardamom Mountains",
      university: "Panha Chiet University",
      topic: "Sustainability",
      students: "15 Students"
    },
    {
      label: "Past Expedition 2",
      image: "https://images.unsplash.com/photo-1596386461350-326ea759276f?q=80&w=800&auto=format&fit=crop",
      destination: "Kirirom National Park",
      university: "Liger Leadership Academy",
      topic: "Ecology",
      students: "45 Students"
    }
  ];

  return (
    <section className="py-20 bg-surface border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-serif text-text mb-4">Coordinated by EcoLink</h2>
          <p className="text-text-muted">Join the network of universities transforming field education.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
           {/* Center Timeline Line */}
           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 transform -translate-x-1/2 hidden md:block"></div>

           <div className="space-y-8">
             {expeditions.map((trip, idx) => (
               <div key={idx} className="flex flex-col md:flex-row items-center relative group">
                  
                  {/* Left Side: Image */}
                  <div className="w-full md:w-1/2 md:pr-8 mb-4 md:mb-0 flex justify-end">
                     <div className="h-32 w-full max-w-lg relative overflow-hidden rounded-2xl md:rounded-l-full md:rounded-r-none shadow-md group-hover:shadow-lg transition-all duration-500">
                        <CldImage
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/5"></div>
                     </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                     <div className="w-3 h-3 bg-surface border-[2px] border-primary rounded-full ring-4 ring-surface"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="w-full md:w-1/2 md:pl-8 flex justify-start">
                     <div className="h-32 w-full max-w-lg bg-surface-2/50 hover:bg-white border border-border/60 hover:border-primary/20 transition-all duration-300 px-6 md:px-8 rounded-2xl md:rounded-r-full md:rounded-l-none flex flex-col justify-center shadow-sm hover:shadow-md relative overflow-hidden">
                        
                        {/* Header: Label & University */}
                        <div className="flex justify-between items-center mb-3 border-b border-border/40 pb-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{trip.label}</span>
                             <div className="flex items-center gap-1.5 text-text-muted">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold truncate max-w-[150px]">{trip.university}</span>
                             </div>
                        </div>

                        {/* Horizontal Info Row: Dest - Students - Topic */}
                        <div className="flex items-center justify-between">
                             {/* 1. Destination */}
                             <div className="flex flex-col items-start gap-0.5">
                                 <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold flex items-center gap-1">
                                     <MapPin className="w-3 h-3 text-accent" /> Dest
                                 </span>
                                 <span className="text-xs font-bold text-text truncate max-w-[110px]">{trip.destination}</span>
                             </div>

                             {/* 2. Students Pill (Middle) */}
                             <div className="px-3 py-1 bg-white border border-primary/10 rounded-full shadow-sm text-[10px] font-bold text-primary flex items-center justify-center mx-2 shrink-0 z-10">
                                 {trip.students}
                             </div>

                             {/* 3. Topic */}
                             <div className="flex flex-col items-end gap-0.5 text-right">
                                 <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold flex items-center gap-1">
                                     Topic <Search className="w-3 h-3 text-accent" />
                                 </span>
                                 <span className="text-xs font-bold text-text truncate max-w-[110px]">{trip.topic}</span>
                             </div>
                        </div>

                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};
