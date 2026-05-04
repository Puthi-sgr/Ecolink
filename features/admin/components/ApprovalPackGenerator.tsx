import React, { useState } from 'react';
import { Loader2, Check, FileText, LifeBuoy, Scale, FileSignature } from 'lucide-react';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { ApprovalPack, Trip } from '../../../shared/types';
import { DialogBody, DialogFooter, DialogHeader, DialogPanel, DialogRoot } from '../../../shared/ui/Dialog';

interface ApprovalPackGeneratorProps {
  trip: Trip;
  onGenerate: (pack: ApprovalPack) => void;
  onCancel: () => void;
}

export const ApprovalPackGenerator: React.FC<ApprovalPackGeneratorProps> = ({
  trip,
  onGenerate,
  onCancel,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [tripLead, setTripLead] = useState('Sarah Connor (EcoLink Senior Lead)');
  const [emergencyPhone, setEmergencyPhone] = useState('+855 12 999 888');
  const [hospital, setHospital] = useState('CBET First Aid Center');
  const [depositDeadline, setDepositDeadline] = useState(() => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate.toISOString().split('T')[0];
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsComplete(false);

    window.setTimeout(() => {
      const pack: ApprovalPack = {
        tripId: trip.id,
        publishedAt: new Date().toLocaleDateString(),
        files: [
          { name: `1_Trip_Confirmation_Letter_${trip.id}.pdf`, url: '#' },
          { name: `2_Official_Itinerary_${trip.packageName.replace(/\s/g, '_')}.pdf`, url: '#' },
          { name: '3_Safety_Emergency_Sheet.pdf', url: '#' },
          { name: '4_Payment_Cancellation_Policy.pdf', url: '#' },
          { name: '5_Student_Roster_Template.csv', url: '#' },
        ],
      };
      setIsComplete(true);
      window.setTimeout(() => {
        onGenerate(pack);
      }, 800);
    }, 2000);
  };

  if (isGenerating) {
    return (
      <DialogRoot isOpen={true} onClose={onCancel}>
        <DialogPanel size="sm">
          <DialogBody className="p-12 text-center">
            {isComplete ? (
              <>
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold font-serif text-text">Governance Pack Published</h3>
                <p className="text-sm text-text-muted">Approval pack is ready for {trip.id}</p>
              </>
            ) : (
              <>
                <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-primary" />
                <h3 className="mb-2 text-xl font-bold font-serif text-text">Generating Governance Pack...</h3>
                <p className="text-sm text-text-muted">Stamping liability documents for {trip.id}</p>
                <div className="mx-auto mt-6 max-w-xs space-y-2 text-left text-xs text-text-muted/70">
                  <p className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-accent" /> Verifying faculty contact
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-accent" /> Locking itinerary data
                  </p>
                  <p className="animate-pulse pl-5">... Creating safety sheet</p>
                </div>
              </>
            )}
          </DialogBody>
        </DialogPanel>
      </DialogRoot>
    );
  }

  return (
    <DialogRoot isOpen={true} onClose={onCancel}>
      <DialogPanel size="lg">
        <DialogHeader
          title="Configure Approval Pack"
          description="Finalize the governance and safety metadata before publishing the admin approval pack."
          onClose={onCancel}
        />
        <DialogBody className="space-y-6">
          <div className="rounded border border-primary/10 bg-primary/5 p-4">
            <h4 className="mb-2 text-sm font-bold text-primary">Governance Context</h4>
            <p className="mb-1 text-xs text-text-muted">
              You are about to generate the official approval pack for <strong>{trip.facultyName}</strong>.
              This set of documents defines the legal and operational boundaries of the trip.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Assigned EcoLink Trip Lead" value={tripLead} onChange={(e) => setTripLead(e.target.value)} />
            <Input label="Emergency Contact #" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
            <Input label="Nearest Hospital (Safety Sheet)" value={hospital} onChange={(e) => setHospital(e.target.value)} />
            <Input label="Deposit Deadline" type="date" value={depositDeadline} onChange={(e) => setDepositDeadline(e.target.value)} />
          </div>

          <div className="rounded border border-border bg-surface-2 p-4">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">Pack Contents Preview</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" /> 1. Trip Confirmation Letter
                <span className="text-xs text-text-muted">(Formal ID: {trip.id})</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" /> 2. Itinerary Summary
                <span className="text-xs text-text-muted">(Based on {trip.packageName})</span>
              </li>
              <li className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4 text-accent" /> 3. Safety & Emergency Sheet
                <span className="text-xs text-text-muted">(Auto-filled)</span>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-accent" /> 4. Payment & Cancellation Policy
              </li>
              <li className="flex items-center gap-2">
                <FileSignature className="h-4 w-4 text-accent" /> 5. Student Roster Template
                <span className="text-xs text-text-muted">(.csv)</span>
              </li>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleGenerate} className="shadow-lg shadow-primary/20">Generate & Publish</Button>
        </DialogFooter>
      </DialogPanel>
    </DialogRoot>
  );
};
