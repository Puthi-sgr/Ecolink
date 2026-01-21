import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { CBETPackage, UserRole } from '../../../shared/types';
import { useAuth } from '../../../app/AuthContext';
import { X, MapPin, GraduationCap, ClipboardList, Check, Info } from 'lucide-react';

interface BookingModalProps {
  pkg: CBETPackage;
  onClose: () => void;
  onSubmit: (data: { date: string; size: number; purpose: string }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ pkg, onClose, onSubmit }) => {
  const { user } = useAuth();
  const isFaculty = user?.role === UserRole.FACULTY;
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');

  // Calculate estimated price based on input size
  const getEstimatedPrice = (groupSize: number) => {
    const band = pkg.capacityBands.find(b => groupSize >= b.min && groupSize <= b.max);
    return band ? band.pricePerStudent * groupSize : 0;
  };

  const currentPrice = size ? getEstimatedPrice(Number(size)) : 0;
  const pricePerStudent = size && currentPrice > 0 ? (currentPrice / Number(size)) : 0;

  const handleLoginRedirect = () => {
      sessionStorage.setItem('returnTo', '/'); // Return to catalog
      sessionStorage.setItem('pendingPackageId', pkg.id); // Remember which package was open
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
    onSubmit({ date, size: Number(size), purpose });
    setShowConfirm(false);
  };

  return (
    <>
    {/* Main Package Detail Modal */}
    <div className="fixed inset-0 bg-primary/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-6xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col overflow-hidden p-0 shadow-2xl border-0">
            {/* Header Bar */}
            <div className="bg-primary text-surface p-6 flex justify-between items-start shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                         <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">{pkg.cbetSite}</span>
                         <span className="text-xs text-primary-200">•</span>
                         <span className="text-xs text-primary-100">{pkg.managingOrg}</span>
                    </div>
                    <h2 className="text-3xl font-bold font-serif leading-tight">{pkg.name}</h2>
                    <p className="text-primary-100 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" /> 
                        {pkg.location}
                    </p>
                </div>
                <button 
                    onClick={onClose}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row bg-surface">
                
                {/* LEFT: Context & Learning */}
                <div className="w-full lg:w-2/3 p-8 border-r border-border space-y-8">
                     <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded border border-accent/20">EcoLink Role: {pkg.ecoLinkRole}</span>
                            <span className="px-2 py-1 bg-surface-2 text-text-muted text-xs rounded border border-border">Duration: {pkg.duration}</span>
                        </div>
                        <p className="text-text leading-relaxed text-lg">{pkg.description}</p>
                     </section>

                     <div className="grid md:grid-cols-2 gap-8">
                        <section>
                            <h3 className="font-bold text-primary font-serif text-lg mb-3 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" /> Learning Outcomes
                            </h3>
                            <ul className="space-y-2">
                                {pkg.learningOutcomes.map((outcome, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-text-muted">
                                        <Check className="w-4 h-4 text-accent mt-0.5" />
                                        {outcome}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-primary font-serif text-lg mb-3 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5" /> Typical Schedule
                            </h3>
                            <div className="relative border-l-2 border-primary/20 ml-2 space-y-4 py-2">
                                {pkg.scheduleOutline.slice(0,4).map((item, i) => (
                                    <div key={i} className="pl-6 relative">
                                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary"></div>
                                        <span className="text-sm text-text-muted">{item}</span>
                                    </div>
                                ))}
                                <span className="pl-6 text-xs text-text-muted italic block">...and more</span>
                            </div>
                        </section>
                     </div>

                    {/* Capacity & Price Table */}
                    <section className="bg-surface-2/50 p-4 rounded-eco border border-border">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Capacity & Pricing</h4>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-text-muted border-b border-border">
                                    <th className="pb-2 font-medium">Group Size</th>
                                    <th className="pb-2 font-medium">Transport Est.</th>
                                    <th className="pb-2 font-medium text-right">Per Student</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {pkg.capacityBands.map((band, i) => (
                                    <tr key={i}>
                                        <td className="py-2 text-text">{band.min} - {band.max} pax</td>
                                        <td className="py-2 text-text-muted text-xs">
                                            {band.max <= 25 ? 'Minibus' : 'Coach'}
                                        </td>
                                        <td className="py-2 text-right font-bold text-primary">${band.pricePerStudent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* RIGHT: Action / Wizard Panel */}
                <div className="w-full lg:w-1/3 bg-surface-2 border-l border-border flex flex-col relative transition-all duration-300">
                    <div className="p-6 flex-1 flex-col flex animate-in slide-in-from-right-8 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-text font-serif text-lg">Configure Trip</h3>
                        </div>
                        
                        {!isFaculty ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <p className="text-sm text-text-muted">
                                    You are viewing as a guest. <br/> Faculty access is required to configure and request trips.
                                </p>
                                <Button className="w-full" onClick={handleLoginRedirect}>Faculty Login</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleReview} className="space-y-4 flex-1 flex flex-col">
                                <div className="bg-white p-4 rounded border border-border shadow-sm mb-2">
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Requestor</p>
                                    <p className="text-sm font-medium text-text">{user?.name}</p>
                                    <p className="text-xs text-text-muted">{user?.email}</p>
                                </div>

                                <Input 
                                    label="Desired Date" 
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
                                        min={pkg.bookingConditions.minGroupSize}
                                        max={pkg.bookingConditions.maxGroupSize}
                                        placeholder={`${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize}`}
                                        required 
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        className="bg-surface"
                                    />
                                    {currentPrice > 0 && (
                                        <div className="mt-2 p-3 bg-primary/5 rounded border border-primary/10 text-right">
                                            <span className="block text-xs text-text-muted">Estimated Total</span>
                                            <span className="block text-xl font-bold text-primary">${currentPrice.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <Input 
                                    label="Academic Purpose" 
                                    placeholder="e.g. BIO-101 Field Requirement"
                                    required 
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    className="bg-surface"
                                />

                                <div className="mt-auto pt-4">
                                    <Button type="submit" className="w-full h-12 text-base shadow-sm">Review Request</Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </Card>
    </div>
    
    {/* Confirmation Overlay Modal */}
    {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
             <Card className="w-full max-w-lg p-0 relative shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 border-0 overflow-hidden">
                <div className="bg-surface-2 p-6 border-b border-border">
                    <h3 className="font-bold text-text font-serif text-xl">Review & Confirm Request</h3>
                    <p className="text-sm text-text-muted mt-1">Please verify the details before submitting to EcoLink Admin.</p>
                </div>
                
                <div className="p-6 space-y-6 bg-surface">
                    <div className="bg-white p-4 rounded-eco border border-border shadow-sm space-y-3">
                        <div className="flex justify-between items-start border-b border-border pb-3">
                            <div>
                                <p className="text-xs text-text-muted uppercase">Package</p>
                                <p className="font-bold text-text">{pkg.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-text-muted uppercase">Date</p>
                                <p className="font-bold text-primary">{date}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Group Size</span>
                            <span className="font-medium">{size} Pax</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Rate per Student</span>
                            <span className="font-medium">${pricePerStudent}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                            <span className="font-bold text-text">Total Estimate</span>
                            <span className="font-bold text-xl text-primary">${currentPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-xs text-text-muted uppercase font-bold mb-2">Requestor</p>
                        <div className="text-sm bg-surface-2 p-3 rounded border border-border">
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-text-muted">{user?.email}</p>
                            <div className="mt-2 pt-2 border-t border-border/50">
                                <span className="text-xs text-text-muted uppercase block">Purpose</span>
                                <span className="italic">{purpose}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-accent/5 rounded border border-accent/20">
                         <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                         <div className="text-xs text-text-muted">
                            <p className="font-bold text-accent mb-1">Next Steps</p>
                            <p>Once submitted, this request will be <strong>PENDING</strong> until reviewed by Admin. You'll be notified when the Approval Pack is ready.</p>
                         </div>
                    </div>
                </div>

                <div className="p-6 bg-surface-2 border-t border-border flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setShowConfirm(false)}>Edit Details</Button>
                    <Button onClick={handleFinalSubmit} className="shadow-lg shadow-primary/20">Confirm Submission</Button>
                </div>
             </Card>
        </div>
    )}
    </>
  );
};