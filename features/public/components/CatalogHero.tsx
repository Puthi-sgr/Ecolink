import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { Search, MapPin } from 'lucide-react';

interface CatalogHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onBrowseClick: () => void;
}

export const CatalogHero: React.FC<CatalogHeroProps> = ({ searchTerm, onSearchChange, onBrowseClick }) => {
  return (
    <section className="relative bg-surface py-20 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold uppercase tracking-wider border border-primary/10">
          <MapPin className="w-3 h-3" /> Certified CBET Network
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-text leading-tight max-w-4xl mx-auto">
          University-ready CBET trips, coordinated by <span className="text-primary italic">EcoLink</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-xl leading-relaxed">
          Clear safety, pricing, and accountability — request field trips in minutes with pre-vetted packages and logistics support.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="px-10 h-14 text-lg shadow-lg shadow-primary/20" onClick={onBrowseClick}>Browse Packages</Button>
          <Button variant="outline" size="lg" className="px-10 h-14 text-lg">How it works</Button>
        </div>

        <div className="max-w-3xl mx-auto bg-surface p-2 rounded-2xl shadow-xl border border-border flex flex-col md:flex-row gap-2 mt-12">
          <div className="flex-1 text-left relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Destination, CBET name, or province..." 
              className="w-full h-14 pl-12 pr-4 rounded-xl border-0 bg-transparent focus:ring-0 text-text placeholder:text-text-muted/50 outline-none text-lg"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="hidden md:block w-px h-10 bg-border self-center"></div>
          <div className="flex-none w-full md:w-32">
            <Button className="w-full h-14 text-base rounded-xl" onClick={() => {}}>Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
