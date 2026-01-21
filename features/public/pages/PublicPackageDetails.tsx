import React, { useState, useEffect } from 'react';
import { useCBETPackages } from '../../../shared/data/cbetData';
import { useAuth } from '../../../app/AuthContext';
import { useTrips } from '../../../app/TripContext';
import { ProjectStatus, UserRole } from '../../../shared/types';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { Badge } from '../../../shared/atoms/Badge';
import { 
  X, MapPin, GraduationCap, ClipboardList, Check, Info, 
  ArrowLeft, Clock, ShieldCheck, Bus, Utensils, Camera, Users, Sprout
} from 'lucide-react';

interface PublicPackageDetailsProps {
  packageId: string;
}

export const PublicPackageDetails: React.FC<PublicPackageDetailsProps> = ({ packageId }) => {
  const packages = useCBETPackages();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const isFaculty = user?.role === UserRole.FACULTY;

  const pkg = packages.find(p => p.id === packageId);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');

  // Scroll to top on mount / id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageId]);

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold font-serif mb-4">Package not found</h2>
        <Button onClick={() => window.location.hash = '/'}>Back to Catalog</Button>
      </div>
    );
  }

  const getEstimatedPrice = (groupSize: number) => {
    const band = pkg.capacityBands.find(b => groupSize >= b.min && groupSize <= b.max);
    return band ? band.pricePerStudent * groupSize : 0;
  };

  const currentPrice = size ? getEstimatedPrice(Number(size)) : 0;
  const pricePerStudent = size && currentPrice > 0 ? (currentPrice / Number(size)) : 0;

  const handleLoginRedirect = () => {
      sessionStorage.setItem('returnTo', `/package/${pkg.id}`);
      window.location.hash = '/login';
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFaculty) {
        handleLoginRedirect();
        return;
    }
    setShowConfirm(true);
  };

  const handleFinalSubmit = () => {
    const newTripId = `EL-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    addTrip({
        id: newTripId,
        packageId: pkg.id,
        packageName: pkg.name,
        facultyName: user?.name || '',
        department: 'General Sciences',
        requestorContact: user?.email || '',
        date: date,
        groupSize: Number(size),
        purpose: purpose,
        status: ProjectStatus.PENDING
    });
    setShowConfirm(false);
    window.location.hash = `/faculty/trips/${newTripId}`;
  };

  const previewCards = [
    {
        title: "Wildlife Ethics Viewing",
        description: "Strict adherence to distance and noise protocols ensures non-intrusive observation of local species.",
        image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=600&auto=format&fit=crop",
        icon: <Camera className="w-4 h-4" />
    },
    {
        title: "Community Exchange",
        description: "Direct dialogue with village elders and rangers to understand the human side of conservation.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7a?q=80&w=600&auto=format&fit=crop",
        icon: <Users className="w-4 h-4" />
    },
    {
        title: "Conservation Workshop",
        description: "Participate in hands-on activities ranging from nursery care to biodiversity data collection.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
        icon: <Sprout className="w-4 h-4" />
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Detail Header Section */}
      <section className="bg-primary text-surface py-12 md:py-20">
        <div className="container mx-auto px-6">
          <Button 
            variant="ghost" 
            className="text-surface hover:bg-white/10 mb-8 pl-0"
            onClick={() => window.location.hash = '/'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {pkg.cbetSite}
                </Badge>
                <span className="text-primary-100/50">•</span>
                <span className="text-sm font-medium text-primary-100">{pkg.managingOrg}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">{pkg.name}</h1>
              <p className="text-primary-100 flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-accent" /> {pkg.location}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-eco p-4 border border-white/10 text-right">
                <span className="block text-xs uppercase font-bold tracking-widest text-primary-100">From</span>
                <span className="block text-3xl font-black text-white">${Math.min(...pkg.capacityBands.map(b => b.pricePerStudent))}</span>
                <span className="block text-[10px] uppercase font-bold text-primary-100">est. per student</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Details */}
            <div className="flex-1 space-y-12">
              <section className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="accent" size="sm" icon={<ShieldCheck className="w-4 h-4" />}>EcoLink Verified</Badge>
                  <Badge variant="surface" size="sm" icon={<Clock className="w-4 h-4" />}>{pkg.duration}</Badge>
                  <Badge variant="surface" size="sm" icon={<Bus className="w-4 h-4" />}>Transport Options</Badge>
                  <Badge variant="surface" size="sm" icon={<Utensils className="w-4 h-4" />}>Meals Included</Badge>
                </div>
                <h2 className="text-2xl font-bold font-serif text-text">About this excursion</h2>
                <p className="text-text-muted leading-relaxed text-lg">{pkg.description}</p>
              </section>

              {/* NEW Experience Preview Section */}
              <section>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                     <h3 className="font-bold text-text font-serif text-xl">Experience Preview</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-3 gap-6">
                    {previewCards.map((card, idx) => (
                        <div key={idx} className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
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

              <div className="grid md:grid-cols-2 gap-12">
                <section>
                  <h3 className="font-bold text-primary font-serif text-lg mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" /> Learning Outcomes
                  </h3>
                  <ul className="space-y-4">
                    {pkg.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-4 text-sm text-text leading-relaxed bg-surface-2/50 p-3 rounded-lg border border-border/50">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-primary font-serif text-lg mb-4 flex items-center gap-2">
                    <ClipboardList className="w-6 h-6" /> Typical Schedule
                  </h3>
                  <div className="relative border-l-2 border-primary/20 ml-3 space-y-6 py-2">
                    {pkg.scheduleOutline.map((item, i) => (
                      <div key={i} className="pl-6 relative">
                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/5"></div>
                        <span className="text-sm font-medium text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="bg-surface-2 p-8 rounded-2xl border border-border">
                <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" /> Capacity & Detailed Pricing
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-text-muted border-b border-border">
                        <th className="pb-4 font-bold uppercase tracking-wider text-xs">Group Size</th>
                        <th className="pb-4 font-bold uppercase tracking-wider text-xs">Recommended Transport</th>
                        <th className="pb-4 font-bold uppercase tracking-wider text-xs text-right">Price per Student</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {pkg.capacityBands.map((band, i) => (
                        <tr key={i} className="group hover:bg-white/50 transition-colors">
                          <td className="py-4 text-text font-medium pl-2">{band.min} - {band.max} pax</td>
                          <td className="py-4 text-text-muted">
                            {band.max <= 25 ? 'Coordinated Minibus' : 'Standard 45-Seat Coach'}
                          </td>
                          <td className="py-4 text-right font-black text-primary text-lg pr-2">${band.pricePerStudent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Sticky Booking Widget */}
            <div className="lg:w-96">
              <div className="sticky top-24">
                <Card className="shadow-2xl border-0 p-8 bg-surface-2 ring-1 ring-border">
                  <h3 className="text-xl font-bold text-text font-serif mb-6">Request this Trip</h3>
                  
                  {!isFaculty ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-text-muted">
                        Only authenticated Faculty members can submit trip requests.
                      </p>
                      <Button className="w-full h-12" onClick={handleLoginRedirect}>Sign in to Request</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleReview} className="space-y-6">
                      <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                        <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Requesting as</p>
                        <p className="text-sm font-bold text-text">{user?.name}</p>
                        <p className="text-xs text-text-muted">{user?.email}</p>
                      </div>

                      <Input 
                        label="Desired Date" 
                        type="date" 
                        required 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white"
                      />
                      
                      <div>
                        <Input 
                          label="Estimated Group Size" 
                          type="number" 
                          min={pkg.bookingConditions.minGroupSize}
                          max={pkg.bookingConditions.maxGroupSize}
                          placeholder={`${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize}`}
                          required 
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          className="bg-white"
                        />
                        {currentPrice > 0 && (
                          <div className="mt-4 p-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 animate-in zoom-in-95">
                            <span className="block text-[10px] uppercase font-bold tracking-widest opacity-80">Estimated Total</span>
                            <span className="block text-2xl font-black">${currentPrice.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <Input 
                        label="Course / Purpose" 
                        placeholder="e.g. BIO-101 Module 4"
                        required 
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="bg-white"
                      />

                      <Button type="submit" className="w-full h-14 text-base shadow-xl shadow-primary/20">
                        Review Request
                      </Button>
                      
                      <p className="text-[10px] text-center text-text-muted uppercase tracking-widest font-bold">
                        Subject to availability & admin review
                      </p>
                    </form>
                  )}
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Confirmation Overlay Modal */}
      {showConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
               <Card className="w-full max-w-lg p-0 relative shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 border-0 overflow-hidden">
                  <div className="bg-surface-2 p-6 border-b border-border">
                      <h3 className="font-bold text-text font-serif text-xl">Confirm Trip Request</h3>
                      <p className="text-sm text-text-muted mt-1">Please verify your trip details before submission.</p>
                  </div>
                  
                  <div className="p-6 space-y-6 bg-white">
                      <div className="bg-surface-2 p-5 rounded-2xl border border-border space-y-4">
                          <div className="flex justify-between items-start border-b border-border pb-4">
                              <div>
                                  <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">Package</p>
                                  <p className="font-bold text-text text-lg">{pkg.name}</p>
                              </div>
                              <div className="text-right">
                                  <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">Proposed Date</p>
                                  <p className="font-bold text-primary">{date}</p>
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">Group Size</p>
                                <p className="font-bold">{size} Students</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">Cost Per Student</p>
                                <p className="font-bold">${pricePerStudent}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border flex justify-between items-center">
                              <span className="font-bold text-text uppercase text-xs tracking-wider">Total Est. Funding Required</span>
                              <span className="font-black text-2xl text-primary">${currentPrice.toLocaleString()}</span>
                          </div>
                      </div>
                      
                      <div className="text-sm bg-surface-2 p-4 rounded-xl border border-border">
                          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Academic Purpose</p>
                          <p className="italic text-text font-medium">"{purpose}"</p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                           <Info className="w-6 h-6 text-primary shrink-0" />
                           <div className="text-xs text-text-muted leading-relaxed">
                              <p className="font-bold text-primary mb-1">EcoLink Workflow</p>
                              <p>Submitting triggers an availability check with the site. You will receive an Approval Pack and payment instructions once confirmed.</p>
                           </div>
                      </div>
                  </div>

                  <div className="p-6 bg-surface-2 border-t border-border flex gap-3 justify-end">
                      <Button variant="ghost" onClick={() => setShowConfirm(false)}>Edit Configuration</Button>
                      <Button onClick={handleFinalSubmit} className="shadow-lg shadow-primary/20 h-12 px-8">Confirm & Submit</Button>
                  </div>
               </Card>
          </div>
      )}
    </div>
  );
};