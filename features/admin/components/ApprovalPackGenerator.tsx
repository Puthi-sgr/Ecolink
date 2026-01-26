import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { Trip, ApprovalPack } from '../../../shared/types';
import { Loader2, Check, FileText, LifeBuoy, Scale, FileSignature } from 'lucide-react';

interface ApprovalPackGeneratorProps {
  trip: Trip;
  onGenerate: (pack: ApprovalPack) => void;
  onCancel: () => void;
}

export const ApprovalPackGenerator: React.FC<ApprovalPackGeneratorProps> = ({ trip, onGenerate, onCancel }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form State for Governance Details
  const [tripLead, setTripLead] = useState('Sarah Connor (EcoLink Senior Lead)');
  const [emergencyPhone, setEmergencyPhone] = useState('+855 12 999 888');
  const [hospital, setHospital] = useState('CBET First Aid Center');
  const [depositDeadline, setDepositDeadline] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsComplete(false);
    
    // Simulate API generation time
    setTimeout(() => {
      const pack: ApprovalPack = {
        tripId: trip.id,
        publishedAt: new Date().toLocaleDateString(),
        files: [
          { name: `1_Trip_Confirmation_Letter_${trip.id}.pdf`, url: '#' },
          { name: `2_Official_Itinerary_${trip.packageName.replace(/\s/g, '_')}.pdf`, url: '#' },
          { name: `3_Safety_Emergency_Sheet.pdf`, url: '#' },
          { name: `4_Payment_Cancellation_Policy.pdf`, url: '#' },
          { name: `5_Student_Roster_Template.csv`, url: '#' },
        ]
      };
      setIsComplete(true);
      setTimeout(() => {
        onGenerate(pack);
      }, 800);
    }, 2000);
  };

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-12">
           {isComplete ? (
             <>
               <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                 <Check className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold font-serif text-text mb-2">Governance Pack Published</h3>
               <p className="text-text-muted text-sm">Approval Pack is ready for {trip.id}</p>
             </>
           ) : (
             <>
               <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
               <h3 className="text-xl font-bold font-serif text-text mb-2">Generating Governance Pack...</h3>
               <p className="text-text-muted text-sm">Stamping liability documents for {trip.id}</p>
               <div className="mt-6 space-y-2 text-xs text-text-muted/70 text-left max-w-xs mx-auto">
                  <p className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> Verifying Faculty Contact</p>
                  <p className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> Locking Itinerary Data</p>
                  <p className="animate-pulse pl-5">... Creating Safety Sheet</p>
               </div>
             </>
           )}
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl" title="Configure Approval Pack">
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded border border-primary/10">
            <h4 className="text-sm font-bold text-primary mb-2">Governance Context</h4>
            <p className="text-xs text-text-muted mb-1">
              You are about to generate the official Approval Pack for <strong>{trip.facultyName}</strong>. 
              This set of documents defines the legal and operational boundaries of the trip.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              label="Assigned EcoLink Trip Lead" 
              value={tripLead} 
              onChange={(e) => setTripLead(e.target.value)}
            />
            <Input 
              label="Emergency Contact #" 
              value={emergencyPhone} 
              onChange={(e) => setEmergencyPhone(e.target.value)}
            />
            <Input 
              label="Nearest Hospital (Safety Sheet)" 
              value={hospital} 
              onChange={(e) => setHospital(e.target.value)}
            />
            <Input 
              label="Deposit Deadline" 
              type="date"
              value={depositDeadline} 
              onChange={(e) => setDepositDeadline(e.target.value)}
            />
          </div>

          <div className="bg-surface-2 p-4 rounded border border-border">
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Pack Contents Preview</h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" /> 1. Trip Confirmation Letter <span className="text-xs text-text-muted">(Formal ID: {trip.id})</span>
                </li>
                <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" /> 2. Itinerary Summary <span className="text-xs text-text-muted">(Based on {trip.packageName})</span>
                </li>
                <li className="flex items-center gap-2">
                    <LifeBuoy className="w-4 h-4 text-accent" /> 3. Safety & Emergency Sheet <span className="text-xs text-text-muted">(Auto-filled)</span>
                </li>
                <li className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-accent" /> 4. Payment & Cancellation Policy
                </li>
                <li className="flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-accent" /> 5. Student Roster Template <span className="text-xs text-text-muted">(.csv)</span>
                </li>
            </ul>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={handleGenerate} className="shadow-lg shadow-primary/20">Generate & Publish</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
