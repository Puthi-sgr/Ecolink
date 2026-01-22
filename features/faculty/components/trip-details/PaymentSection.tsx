import React, { useState } from 'react';
import { Card } from '../../../../shared/molecules/Card';
import { Button } from '../../../../shared/atoms/Button';
import { Trip, ProjectStatus, PaymentProof } from '../../../../shared/types';
import { CBET_PACKAGES } from '../../../../shared/data/cbetData';
import { Clock, CheckCircle, Receipt, Upload } from 'lucide-react';

const PAYMENT_METHODS = ['KHQR', 'ABA', 'ACLEDA'] as const;
type PaymentMethod = typeof PAYMENT_METHODS[number];

const PaymentLockedCard: React.FC<{ trip: Trip }> = ({ trip }) => (
  <Card title="Payment Status" className="border-l-4 border-l-status-locked mb-6">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-status-locked/10 text-status-locked flex items-center justify-center">
        <CheckCircle className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-status-locked mb-1">Payment Verified & Trip Locked</h4>
        <p className="text-text-muted text-sm mt-1">
          Deposit of <strong>${trip.paymentProof?.amount.toLocaleString()}</strong> via {trip.paymentProof?.method} has been confirmed.
          <br/>
          Logistics booking has been triggered.
        </p>
      </div>
    </div>
  </Card>
);

const PaymentPendingCard: React.FC<{ trip: Trip }> = ({ trip }) => (
  <Card title="Payment Status" className="border-l-4 border-l-status-pending mb-6">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-status-pending/20 text-status-pending flex items-center justify-center">
        <Clock className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-text mb-1">Payment Verification Pending</h4>
        <p className="text-text-muted text-sm mt-1">
          You have submitted proof for <strong>${trip.paymentProof?.amount.toLocaleString()}</strong>.
          <br/>EcoLink Admin is verifying your transaction. Status will update to LOCKED shortly.
        </p>
      </div>
    </div>
  </Card>
);

const DepositSummary: React.FC<{ depositPercent: number; depositAmount: number; deadlineDays?: number }> = ({
  depositPercent,
  depositAmount,
  deadlineDays
}) => (
  <div className="mb-6 bg-surface-2 p-4 rounded border border-border flex justify-between items-center">
    <div>
      <span className="text-xs font-bold text-text-muted uppercase">Required Deposit ({depositPercent}%)</span>
      <div className="text-2xl font-bold text-primary">${depositAmount.toLocaleString()}</div>
    </div>
    <div className="text-right">
      <span className="text-xs text-text-muted block">Deadline</span>
      <span className="font-medium text-clay">Within {deadlineDays} Days</span>
    </div>
  </div>
);

const PaymentMethodSelector: React.FC<{
  method: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}> = ({ method, onChange }) => (
  <div className="flex gap-2">
    {PAYMENT_METHODS.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
          method === option
            ? 'bg-primary text-white border-primary'
            : 'bg-surface text-text-muted border-border hover:bg-surface-2'
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);

const PaymentQRCode: React.FC<{ tripId: string; method: PaymentMethod }> = ({ tripId, method }) => (
  <div className="aspect-square bg-white border border-border rounded flex items-center justify-center relative overflow-hidden group">
    <div className="text-center">
      <div className="w-32 h-32 bg-text text-white flex items-center justify-center mx-auto mb-2">
        <Receipt className="w-16 h-16 opacity-50" />
      </div>
      <p className="text-xs text-text-muted font-mono">ID: {tripId}</p>
      <p className="font-bold text-primary">Scan with {method}</p>
    </div>
  </div>
);

const PaymentReceiptUpload: React.FC<{
  tripName: string;
  depositAmount: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}> = ({ tripName, depositAmount, isSubmitting, onSubmit }) => (
  <div className="flex flex-col justify-center space-y-4">
    <div className="bg-surface-2 border-2 border-dashed border-border rounded-eco h-40 flex flex-col items-center justify-center text-center p-4">
      <Upload className="w-8 h-8 text-text-muted opacity-50 mb-2" />
      <p className="text-sm font-medium text-text">Upload Payment Receipt</p>
      <p className="text-xs text-text-muted">Screenshot or PDF from banking app</p>
    </div>

    <div className="space-y-2">
      <div className="text-xs text-text-muted flex justify-between">
        <span>Paying for:</span>
        <span className="font-medium text-text">{tripName}</span>
      </div>
      <div className="text-xs text-text-muted flex justify-between">
        <span>Amount:</span>
        <span className="font-medium text-text">${depositAmount.toLocaleString()}</span>
      </div>
    </div>

    <Button onClick={onSubmit} disabled={isSubmitting} className="w-full">
      {isSubmitting ? 'Submitting...' : 'Submit Payment Proof'}
    </Button>
  </div>
);

export const PaymentSection: React.FC<{ trip: Trip; onUpload: (proof: PaymentProof) => void }> = ({ trip, onUpload }) => {
  const [method, setMethod] = useState<PaymentMethod>('KHQR');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (trip.status === ProjectStatus.PENDING) return null;

  if (trip.status === ProjectStatus.LOCKED) {
    return <PaymentLockedCard trip={trip} />;
  }

  if (trip.paymentProof?.verificationStatus === 'Pending') {
    return <PaymentPendingCard trip={trip} />;
  }

  const pkg = CBET_PACKAGES.find(p => p.id === trip.packageId);
  const band = pkg?.capacityBands.find(b => trip.groupSize >= b.min && trip.groupSize <= b.max);
  const pricePerStudent = band ? band.pricePerStudent : 0;
  const totalCost = trip.groupSize * pricePerStudent;
  const depositPercent = pkg?.depositDetails.percentage || 50;
  const depositAmount = (totalCost * depositPercent) / 100;

  const handleSubmitProof = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onUpload({
        tripId: trip.id,
        type: 'Deposit',
        amount: depositAmount,
        method: method,
        proofUrl: 'mock_receipt.jpg',
        verificationStatus: 'Pending'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card title="Step 2: Payment Required" className="border-l-4 border-l-status-approved mb-6">
      <DepositSummary
        depositPercent={depositPercent}
        depositAmount={depositAmount}
        deadlineDays={pkg?.depositDetails.deadlineDays}
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <PaymentMethodSelector method={method} onChange={setMethod} />
          <PaymentQRCode tripId={trip.id} method={method} />
        </div>

        <PaymentReceiptUpload
          tripName={trip.packageName}
          depositAmount={depositAmount}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitProof}
        />
      </div>
    </Card>
  );
};
