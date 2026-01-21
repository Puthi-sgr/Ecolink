import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { useCBETPackages } from '../data/cbetData';
import { CBETPackage } from '../../../shared/types';

export const CBETCatalog: React.FC = () => {
  const packages = useCBETPackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<CBETPackage | null>(null);

  // Form state
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleCardClick = (pkg: CBETPackage) => {
    setSelectedPackage(pkg);
    // Reset form for new selection
    setDate('');
    setSize('');
    setPurpose('');
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Trip configured for ${selectedPackage?.name}:\nDate: ${date}\nGroup: ${size} pax\n\n(In a real app, this would submit the request to Faculty Dashboard)`);
    handleCloseModal();
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Hero Search Section */}
      <div className="bg-surface-2 rounded-eco p-8 md:p-12 mb-10 text-center space-y-6 shadow-sm border border-border relative overflow-hidden">
         {/* Decorative background element */}
         <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
         
         <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary relative z-10">Find Your Next Field Trip</h1>
         <p className="text-text-muted max-w-2xl mx-auto text-lg relative z-10">
            Explore certified CBET sites, check availability, and plan your curriculum-aligned excursion.
         </p>
         
         <div className="max-w-3xl mx-auto bg-surface p-2 rounded-eco shadow-lg border border-border flex flex-col md:flex-row gap-2 relative z-10 mt-8">
            <div className="flex-1 text-left relative group">
                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                 </div>
                 <input 
                    type="text"
                    placeholder="Search by destination or activity..." 
                    className="w-full h-12 pl-10 pr-4 rounded-md border-0 bg-transparent focus:ring-0 text-text placeholder:text-text-muted/50 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
            </div>
            <div className="h-px md:h-auto md:w-px bg-border my-2 md:my-0"></div>
            <div className="flex-none w-full md:w-40">
                 <Button className="w-full h-12 text-base shadow-sm" onClick={() => {}}>Search</Button>
            </div>
         </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-xl font-bold font-serif text-text">Available Destinations</h2>
        <span className="text-sm text-text-muted">{filteredPackages.length} results found</span>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} onClick={() => handleCardClick(pkg)} className="group cursor-pointer">
              <Card className="flex flex-col h-full p-0 overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image */}
                <div className="h-56 bg-surface-2 relative overflow-hidden">
                    {pkg.imageUrl ? (
                        <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted italic bg-surface-2">
                             <span className="opacity-30 text-4xl">🏔</span>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-sm text-primary flex items-center gap-1 border border-primary/10">
                         <span>⏱</span> {pkg.duration}
                    </div>
                     <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {pkg.location}
                    </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-text font-serif leading-tight group-hover:text-primary transition-colors">{pkg.name}</h3>
                        <div className="text-right">
                             <span className="block text-lg font-bold text-accent">${pkg.capacityBands[0]?.pricePerStudent}</span>
                             <span className="text-[10px] text-text-muted uppercase tracking-wide">per student</span>
                        </div>
                    </div>
                    
                    <p className="text-text-muted text-sm mb-4 line-clamp-2">{pkg.description}</p>
                    
                    <div className="mt-auto space-y-3">
                        <div className="flex gap-2 flex-wrap">
                            {pkg.activities.slice(0, 3).map((act, i) => (
                                <span key={i} className="text-xs bg-surface-2 border border-border text-text-muted px-2 py-1 rounded-md">{act}</span>
                            ))}
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between text-sm text-text-muted">
                            <span>Max Capacity: <span className="text-text font-medium">{pkg.bookingConditions.maxGroupSize}</span></span>
                            <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                Configure Trip <span className="text-lg">→</span>
                            </span>
                        </div>
                    </div>
                </div>
              </Card>
          </div>
        ))}
      </div>

      {/* Detail/Booking Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden flex flex-col md:flex-row p-0 shadow-2xl">
             <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-surface/50 hover:bg-surface text-text-muted hover:text-text rounded-full w-8 h-8 flex items-center justify-center transition-colors z-20"
             >
                ✕
             </button>
             
             {/* Left: Details Scrollable */}
             <div className="w-full md:w-3/5 bg-surface overflow-y-auto p-6 md:p-8 max-h-[40vh] md:max-h-full border-b md:border-b-0 md:border-r border-border">
                  <div className="mb-6">
                      <span className="text-xs font-bold tracking-wider text-accent uppercase mb-2 block">{selectedPackage.cbetSite}</span>
                      <h2 className="text-3xl font-bold font-serif text-text mb-2">{selectedPackage.name}</h2>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {selectedPackage.location}</span>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span>{selectedPackage.managingOrg}</span>
                      </div>
                  </div>

                  <div className="space-y-8">
                      <section>
                          <h4 className="font-bold text-text mb-3 flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-surface-2 flex items-center justify-center text-primary text-xs">📖</span> 
                              Overview
                          </h4>
                          <p className="text-text-muted text-sm leading-relaxed">{selectedPackage.description}</p>
                      </section>

                      <section>
                          <h4 className="font-bold text-text mb-3 flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-surface-2 flex items-center justify-center text-primary text-xs">📅</span> 
                              Sample Itinerary
                          </h4>
                          <ul className="space-y-3">
                                {selectedPackage.scheduleOutline.map((item, i) => (
                                    <li key={i} className="text-sm flex gap-3">
                                        <div className="flex-none w-1.5 h-1.5 rounded-full bg-accent mt-1.5"></div>
                                        <span className="text-text-muted">{item}</span>
                                    </li>
                                ))}
                          </ul>
                      </section>

                      <section className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-text mb-2 text-sm">Includes</h4>
                            <ul className="text-xs text-text-muted space-y-1">
                                {selectedPackage.includes.map((inc, i) => <li key={i}>✓ {inc}</li>)}
                            </ul>
                          </div>
                          <div>
                             <h4 className="font-bold text-text mb-2 text-sm">Safety Level: <span className={selectedPackage.safetyInfo.activityLevel === 'High' ? 'text-clay' : 'text-accent'}>{selectedPackage.safetyInfo.activityLevel}</span></h4>
                             <p className="text-xs text-text-muted">{selectedPackage.safetyInfo.riskNotes}</p>
                          </div>
                      </section>
                  </div>
             </div>

             {/* Right: Booking Form (Sticky-ish) */}
             <div className="w-full md:w-2/5 bg-surface-2 p-6 md:p-8 flex flex-col overflow-y-auto">
                <h3 className="text-lg font-bold text-text mb-6">Configure Your Trip</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                    <div className="space-y-4">
                        <Input 
                            label="Trip Date" 
                            type="date" 
                            required 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-surface"
                        />
                        
                        <div>
                            <Input 
                                label="Group Size" 
                                type="number" 
                                min={selectedPackage.bookingConditions.minGroupSize}
                                max={selectedPackage.bookingConditions.maxGroupSize}
                                placeholder={`${selectedPackage.bookingConditions.minGroupSize} - ${selectedPackage.bookingConditions.maxGroupSize} people`}
                                required 
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="bg-surface"
                            />
                            {size && (
                                <div className="mt-2 p-3 bg-surface rounded border border-border flex justify-between items-center animate-in fade-in">
                                    <span className="text-xs text-text-muted">Estimated Total</span>
                                    <span className="font-bold text-primary">${Number(size) * selectedPackage.capacityBands[0].pricePerStudent}</span>
                                </div>
                            )}
                        </div>

                         <Input 
                            label="Academic Purpose" 
                            placeholder="e.g. Biology Field Trip"
                            required 
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="bg-surface"
                        />
                    </div>

                    <div className="mt-auto pt-6 border-t border-border/50">
                        <div className="bg-white/50 p-3 rounded mb-4 text-xs text-text-muted border border-border">
                            <p className="font-semibold mb-1">Booking Terms</p>
                            <p>• {selectedPackage.depositDetails.percentage}% deposit required within {selectedPackage.depositDetails.deadlineDays} days.</p>
                            <p>• {selectedPackage.bookingConditions.cancellationPolicy}</p>
                        </div>
                        <Button type="submit" className="w-full h-12 text-base shadow-sm">Request Approval</Button>
                        <p className="text-center text-[10px] text-text-muted mt-3">
                            Clicking Request adds this trip to your faculty dashboard for review.
                        </p>
                    </div>
                </form>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};