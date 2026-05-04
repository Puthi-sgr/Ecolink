import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { ProjectStatus, Trip } from '../../../shared/types';

export const AdminDetailHeader: React.FC<{ trip: Trip; onBack: () => void }> = ({ trip, onBack }) => (
  <div className="mb-6">
    <Button
      variant="ghost"
      size="sm"
      onClick={onBack}
      className="mb-2 flex items-center gap-1 pl-0 text-text-muted hover:bg-transparent hover:text-white/80"
    >
      <ArrowLeft className="h-4 w-4" /> Back to Dashboard
    </Button>
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold font-serif text-text">{trip.packageName}</h1>
        <div className="mt-1 flex items-center gap-3 text-sm text-text-muted">
          <span>{trip.id}</span>
          <span>|</span>
          <span>{trip.facultyName}</span>
          <span>|</span>
          <span>{trip.groupSize} Pax</span>
        </div>
      </div>
      <StatusBadge status={trip.status} />
    </div>
  </div>
);

export const WorkflowActions: React.FC<{
  trip: Trip;
  onApprove: () => void;
  onLock: () => void;
  onVerifyPayment: () => void;
}> = ({ trip, onApprove, onLock, onVerifyPayment }) => (
  <Card title="Workflow Actions" className="mb-6">
    <div className="flex gap-4">
      {trip.status === ProjectStatus.PENDING ? (
        <div className="w-full rounded-eco bg-surface-2 p-4">
          <h4 className="mb-2 text-sm font-bold">Step 1: Review & Approve</h4>
          <p className="mb-4 text-xs text-text-muted">Generate approval pack and notify faculty.</p>
          <Button onClick={onApprove} className="w-full">Approve Request</Button>
        </div>
      ) : null}

      {trip.status === ProjectStatus.APPROVED ? (
        <div className="w-full rounded-eco bg-surface-2 p-4">
          <h4 className="mb-2 text-sm font-bold">Step 2: Payment & Logistics</h4>

          {trip.paymentProof?.verificationStatus === 'Pending' ? (
            <>
              <div className="mb-3 flex items-center gap-2 rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-800">
                <Bell className="h-3 w-3" /> Payment proof submitted.
              </div>
              <Button onClick={onVerifyPayment} className="w-full bg-clay hover:bg-clay/90">
                Review Payment Proof
              </Button>
            </>
          ) : (
            <>
              <p className="mb-4 text-xs text-text-muted">Waiting for faculty to upload deposit proof.</p>
              <Button
                disabled
                className="flex w-full items-center justify-center gap-2 border border-border bg-surface-2 text-text-muted"
              >
                Waiting Payment
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" />
                </span>
              </Button>
              <button onClick={onLock} className="mt-2 w-full text-center text-[10px] text-text-muted underline">
                Manual Lock (Offline Payment)
              </button>
            </>
          )}
        </div>
      ) : null}

      {trip.status === ProjectStatus.LOCKED ? (
        <div className="w-full rounded-eco bg-surface-2 p-4 opacity-70">
          <h4 className="mb-2 text-sm font-bold">Trip Locked</h4>
          <p className="mb-4 text-xs text-text-muted">Logistics phase initiated. Transport booked.</p>
          <Button disabled className="w-full" variant="outline">View Logistics</Button>
        </div>
      ) : null}
    </div>
  </Card>
);

export const TripInfoPanel: React.FC<{ trip: Trip }> = ({ trip }) => (
  <Card title="Trip Details" className="mb-6">
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="block text-xs uppercase tracking-wide text-text-muted">Purpose</span>
        <span className="font-medium">{trip.purpose}</span>
      </div>
      <div>
        <span className="block text-xs uppercase tracking-wide text-text-muted">Contact</span>
        <span className="font-medium">{trip.requestorContact}</span>
      </div>
      <div>
        <span className="block text-xs uppercase tracking-wide text-text-muted">Date</span>
        <span className="font-medium">{new Date().toISOString().split('T')[0]}</span>
      </div>
      <div>
        <span className="block text-xs uppercase tracking-wide text-text-muted">Department</span>
        <span className="font-medium">{trip.department}</span>
      </div>
    </div>
  </Card>
);
