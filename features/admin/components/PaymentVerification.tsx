import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { Trip, PaymentProof } from '../../../shared/types';
import { AlertTriangle, Image as ImageIcon } from 'lucide-react';

interface PaymentVerificationProps {
  trip: Trip;
  onVerify: (amount: number) => void;
  onReject: (reason: string) => void;
  onCancel: () => void;
}

export const PaymentVerification: React.FC<PaymentVerificationProps> = ({ trip, onVerify, onReject, onCancel }) => {
  if (!trip.paymentProof) return null;

  const [verifiedAmount, setVerifiedAmount] = useState(trip.paymentProof.amount.toString());
  const [rejectReason, setRejectReason] = useState('');
  const [mode, setMode] = useState<'VIEW' | 'REJECT'>('VIEW');

  const handleVerify = () => {
    onVerify(Number(verifiedAmount));
  };

  const handleReject = () => {
      onReject(rejectReason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl overflow-hidden flex flex-col md:flex-row p-0" title="">
        {/* Left: Proof Image */}
        <div className="w-full md:w-1/2 bg-surface-2 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
             <div className="text-center">
                 <div className="w-48 h-64 bg-white shadow-sm border border-border mx-auto mb-4 flex items-center justify-center text-text-muted text-xs flex-col gap-2">
                     <ImageIcon className="w-8 h-8 opacity-20" />
                     {trip.paymentProof.proofUrl}
                 </div>
                 <p className="text-xs text-text-muted">Uploaded on {new Date().toLocaleDateString()}</p>
             </div>
        </div>

        {/* Right: Verification Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
            <h3 className="font-bold font-serif text-lg text-text mb-1">Verify Payment</h3>
            <p className="text-xs text-text-muted mb-6">Confirm received funds against trip requirements.</p>

            <div className="space-y-4 flex-1">
                 <div className="grid grid-cols-2 gap-4 text-sm">
                     <div className="p-3 bg-surface-2 rounded border border-border">
                         <span className="block text-xs text-text-muted uppercase">Method</span>
                         <span className="font-bold text-primary">{trip.paymentProof.method}</span>
                     </div>
                     <div className="p-3 bg-surface-2 rounded border border-border">
                         <span className="block text-xs text-text-muted uppercase">Claimed</span>
                         <span className="font-bold text-primary">${trip.paymentProof.amount.toLocaleString()}</span>
                     </div>
                 </div>

                 {mode === 'VIEW' ? (
                     <div className="space-y-4 pt-4">
                         <Input 
                            label="Verified Amount Received ($)" 
                            type="number"
                            value={verifiedAmount}
                            onChange={(e) => setVerifiedAmount(e.target.value)}
                         />
                         <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-xs border border-yellow-100 flex items-start gap-2">
                             <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                             <span>Locking this trip will confirm the booking and trigger bus/site notifications.</span>
                         </div>
                     </div>
                 ) : (
                     <div className="space-y-4 pt-4">
                         <Input 
                            label="Rejection Reason" 
                            placeholder="e.g. Image unreadable, amount mismatch..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                         />
                     </div>
                 )}
            </div>

            <div className="mt-8 pt-4 border-t border-border flex justify-end gap-3">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                
                {mode === 'VIEW' ? (
                    <>
                        <Button variant="outline" className="text-status-cancelled hover:bg-red-50 hover:border-red-200" onClick={() => setMode('REJECT')}>Reject</Button>
                        <Button onClick={handleVerify} className="bg-status-locked hover:bg-status-locked/90">Verify & Lock</Button>
                    </>
                ) : (
                    <>
                        <Button variant="ghost" onClick={() => setMode('VIEW')}>Back</Button>
                        <Button onClick={handleReject} className="bg-status-cancelled hover:bg-status-cancelled/90 text-white">Confirm Rejection</Button>
                    </>
                )}
            </div>
        </div>
      </Card>
    </div>
  );
};