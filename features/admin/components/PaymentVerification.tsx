import React, { useState } from 'react';
import { AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { Trip } from '../../../shared/types';
import { Textarea } from '../../../shared/ui/Textarea';
import { DialogBody, DialogFooter, DialogHeader, DialogPanel, DialogRoot } from '../../../shared/ui/Dialog';

interface PaymentVerificationProps {
  trip: Trip;
  onVerify: (amount: number) => void;
  onReject: (reason: string) => void;
  onCancel: () => void;
}

export const PaymentVerification: React.FC<PaymentVerificationProps> = ({
  trip,
  onVerify,
  onReject,
  onCancel,
}) => {
  const paymentProof = trip.paymentProof;
  const [verifiedAmount, setVerifiedAmount] = useState(paymentProof?.amount.toString() || '');
  const [rejectReason, setRejectReason] = useState('');
  const [mode, setMode] = useState<'VIEW' | 'REJECT'>('VIEW');

  if (!paymentProof) return null;

  return (
    <DialogRoot isOpen={true} onClose={onCancel}>
      <DialogPanel size="xl" className="overflow-hidden p-0">
        <DialogHeader
          title="Verify Payment"
          description="Confirm received funds against trip requirements."
          onClose={onCancel}
        />
        <DialogBody className="flex flex-col p-0 md:flex-row">
          <div className="flex w-full items-center justify-center border-b border-border bg-surface-2 p-8 md:w-1/2 md:border-b-0 md:border-r">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-64 w-48 flex-col items-center justify-center gap-2 border border-border bg-white text-xs text-text-muted shadow-sm">
                <ImageIcon className="h-8 w-8 opacity-20" />
                {paymentProof.proofUrl}
              </div>
              <p className="text-xs text-text-muted">Uploaded on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex w-full flex-col p-6 md:w-1/2">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded border border-border bg-surface-2 p-3">
                  <span className="block text-xs uppercase text-text-muted">Method</span>
                  <span className="font-bold text-primary">{paymentProof.method}</span>
                </div>
                <div className="rounded border border-border bg-surface-2 p-3">
                  <span className="block text-xs uppercase text-text-muted">Claimed</span>
                  <span className="font-bold text-primary">${paymentProof.amount.toLocaleString()}</span>
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
                  <div className="flex items-start gap-2 rounded border border-yellow-100 bg-yellow-50 p-3 text-xs text-yellow-800">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>Locking this trip will confirm the booking and trigger bus/site notifications.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  <Textarea
                    id="payment-rejection-reason"
                    label="Rejection Reason"
                    placeholder="e.g. Image unreadable, amount mismatch..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>

          {mode === 'VIEW' ? (
            <>
              <Button
                variant="outline"
                className="text-status-cancelled hover:border-red-200 hover:bg-red-50"
                onClick={() => setMode('REJECT')}
              >
                Reject
              </Button>
              <Button onClick={() => onVerify(Number(verifiedAmount))} className="bg-status-locked hover:bg-status-locked/90">
                Verify & Lock
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setMode('VIEW')}>Back</Button>
              <Button onClick={() => onReject(rejectReason)} className="bg-status-cancelled text-white hover:bg-status-cancelled/90">
                Confirm Rejection
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogPanel>
    </DialogRoot>
  );
};
