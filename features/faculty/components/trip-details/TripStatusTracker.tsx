import React from 'react';
import { Card } from '../../../../shared/molecules/Card';
import { Trip, ProjectStatus } from '../../../../shared/types';
import { CheckCircle } from 'lucide-react';

const STATUS_STEPS = [
  ProjectStatus.PENDING,
  ProjectStatus.APPROVED,
  ProjectStatus.LOCKED,
  ProjectStatus.COMPLETED
];

const getDateForStep = (trip: Trip, step: ProjectStatus, stepIndex: number, currentIndex: number) => {
  if (step === ProjectStatus.APPROVED && trip.approvalPack?.publishedAt) {
    return trip.approvalPack.publishedAt;
  }
  if (step === ProjectStatus.LOCKED && trip.paymentProof?.verifiedAt) {
    return new Date(trip.paymentProof.verifiedAt).toLocaleDateString();
  }

  const tripDate = new Date(trip.date);
  if (isNaN(tripDate.getTime())) return null;

  if (step === ProjectStatus.PENDING) {
    const d = new Date(tripDate);
    d.setDate(d.getDate() - 30);
    return d.toLocaleDateString();
  }

  if (stepIndex <= currentIndex) {
    if (step === ProjectStatus.APPROVED) {
      const d = new Date(tripDate);
      d.setDate(d.getDate() - 25);
      return d.toLocaleDateString();
    }
    if (step === ProjectStatus.LOCKED) {
      const d = new Date(tripDate);
      d.setDate(d.getDate() - 14);
      return d.toLocaleDateString();
    }
    if (step === ProjectStatus.COMPLETED) {
      const d = new Date(tripDate);
      d.setDate(d.getDate() + 1);
      return d.toLocaleDateString();
    }
  }

  return null;
};

interface StatusStepProps {
  step: ProjectStatus;
  index: number;
  currentIndex: number;
  dateStr: string | null;
}

const StatusStep: React.FC<StatusStepProps> = ({ step, index, currentIndex, dateStr }) => {
  const isCompleted = index <= currentIndex;
  const isCurrent = index === currentIndex;

  return (
    <div className="relative z-10 flex flex-col items-center gap-2 bg-surface px-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isCompleted ? 'bg-primary text-white' : 'bg-surface-2 text-text-muted border border-border'
          }`}
      >
        {isCompleted ? <CheckCircle className="w-4 h-4" /> : (index + 1)}
      </div>
      <div className="text-center bg-surface px-2 rounded">
        <span className={`block text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : 'text-text-muted'}`}>
          {step}
        </span>
        {isCompleted && dateStr && (
          <span className="block text-[10px] text-text-muted font-medium mt-0.5">
            {dateStr}
          </span>
        )}
      </div>
    </div>
  );
};

export const TripStatusTracker: React.FC<{ trip: Trip }> = ({ trip }) => {
  const currentIndex = STATUS_STEPS.indexOf(trip.status);

  return (
    <Card className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-0 rounded"></div>

        {STATUS_STEPS.map((step, index) => {
          const dateStr = getDateForStep(trip, step, index, currentIndex);
          return (
            <StatusStep
              key={step}
              step={step}
              index={index}
              currentIndex={currentIndex}
              dateStr={dateStr}
            />
          );
        })}
      </div>
    </Card>
  );
};
