import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { useTrips } from '../../../app/TripContext';
import { ApprovalPack } from '../../../shared/types';
import { AdminDetailHeader, WorkflowActions, TripInfoPanel } from '../components/AdminTripViews';
import { ApprovalPackGenerator } from '../components/ApprovalPackGenerator';
import { PaymentVerification } from '../components/PaymentVerification';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog';
import { useDisclosure } from '../../../shared/directives/useDisclosure';
import { tripService } from '../../../shared/services/tripService';

interface AdminTripDetailsProps {
  tripId: string;
}

export const AdminTripDetails: React.FC<AdminTripDetailsProps> = ({ tripId }) => {
  const { getTrip, updateTrip } = useTrips();
  const [trip, setTrip] = useState(getTrip(tripId));
  const [showGenerator, setShowGenerator] = useState(false);
  const [showPaymentVerifier, setShowPaymentVerifier] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const lockDisclosure = useDisclosure(false);

  useEffect(() => {
    setTrip(getTrip(tripId));
  }, [tripId, getTrip]);

  const handleApproveClick = () => {
    setStatusMessage(null);
    setShowGenerator(true);
  };

  const handlePackGenerated = (pack: ApprovalPack) => {
    if (!trip) return;

    const nextTrip = tripService.publishApprovalPack(trip, pack);
    updateTrip(tripId, nextTrip);
    setTrip(nextTrip);
    setStatusMessage('Approval pack published and the request is now ready for payment coordination.');
    setShowGenerator(false);
  };

  const handleManualLock = () => {
    if (!trip) return;

    const nextTrip = tripService.lockTrip(trip);
    updateTrip(tripId, nextTrip);
    setTrip(nextTrip);
    setStatusMessage('Trip manually locked. Transport coordination can proceed.');
    lockDisclosure.close();
  };

  const handleVerifyPayment = (amount: number) => {
    if (!trip) return;

    const nextTrip = tripService.verifyPayment(trip, amount);
    updateTrip(tripId, nextTrip);
    setTrip(nextTrip);
    setStatusMessage('Payment verified and trip locked for logistics execution.');
    setShowPaymentVerifier(false);
  };

  const handleRejectPayment = (reason: string) => {
    if (!trip) return;

    const nextTrip = tripService.rejectPayment(trip, reason);
    updateTrip(tripId, nextTrip);
    setTrip(nextTrip);
    setStatusMessage(`Payment proof rejected. Reason logged: ${reason}`);
    setShowPaymentVerifier(false);
  };

  const handleBack = () => {
    window.location.hash = '/admin/dashboard';
  };

  if (!trip) return <div className="p-8 text-center">Trip not found</div>;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl animate-in slide-in-from-right-4 duration-500">
        <AdminDetailHeader trip={trip} onBack={handleBack} />
        {statusMessage ? (
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-text">
            {statusMessage}
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <WorkflowActions
              trip={trip}
              onApprove={handleApproveClick}
              onLock={lockDisclosure.open}
              onVerifyPayment={() => {
                setStatusMessage(null);
                setShowPaymentVerifier(true);
              }}
            />
            <TripInfoPanel trip={trip} />
          </div>
          <div className="md:col-span-1" />
        </div>
      </div>

      {showGenerator ? (
        <ApprovalPackGenerator
          trip={trip}
          onGenerate={handlePackGenerated}
          onCancel={() => setShowGenerator(false)}
        />
      ) : null}

      {showPaymentVerifier ? (
        <PaymentVerification
          trip={trip}
          onVerify={handleVerifyPayment}
          onReject={handleRejectPayment}
          onCancel={() => setShowPaymentVerifier(false)}
        />
      ) : null}

      <ConfirmDialog
        isOpen={lockDisclosure.isOpen}
        onClose={lockDisclosure.close}
        onConfirm={handleManualLock}
        title="Lock trip manually?"
        description="Use this only when payment was collected offline and logistics should move forward without proof verification."
        confirmLabel="Lock Trip"
        cancelLabel="Cancel"
        tone="danger"
      />
    </AdminLayout>
  );
};
