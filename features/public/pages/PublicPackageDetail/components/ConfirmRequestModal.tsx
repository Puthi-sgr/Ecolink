import React, { useRef } from 'react';
import { Card } from '../../../../../shared/molecules/Card';
import { Button } from '../../../../../shared/atoms/Button';
import { CBETPackage } from '../../../../../shared/types';
import { useDialogA11y } from '../../../../../shared/hooks/useDialogA11y';
import { Info, X } from 'lucide-react';

interface ConfirmRequestModalProps {
  isOpen: boolean;
  pkg: CBETPackage;
  date: string;
  size: string;
  purpose: string;
  transportPreference: string;
  accessibilityNotes: string;
  missingFields: string[];
  currentPrice: number;
  pricePerStudent: number;
  onClose: () => void;
  onSubmit: () => void;
}

export const ConfirmRequestModal: React.FC<ConfirmRequestModalProps> = ({
  isOpen,
  pkg,
  date,
  size,
  purpose,
  transportPreference,
  accessibilityNotes,
  missingFields,
  currentPrice,
  pricePerStudent,
  onClose,
  onSubmit
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  useDialogA11y(isOpen, dialogRef, initialFocusRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Card
        className="relative w-full max-w-lg overflow-hidden border-0 p-0 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        padding="none"
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-request-title"
          className="outline-none"
        >
        <div className="border-b border-border bg-surface-2 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 id="confirm-request-title" className="font-bold text-text font-serif text-xl">Confirm Trip Request</h3>
              <p className="text-sm text-text-muted mt-1">Please verify your trip details before submission.</p>
            </div>
            <button
              ref={initialFocusRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Close request confirmation"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm">
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Transport Preference</p>
              <p className="text-text font-medium">{transportPreference || 'Pending'}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm">
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Access Notes</p>
              <p className="text-text font-medium">{accessibilityNotes || 'No additional access notes'}</p>
            </div>
          </div>

          {missingFields.length ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-bold mb-2">Readiness check flagged missing details</p>
              <p>The request will still be created, but it will enter the workflow as <span className="font-semibold">Needs Info</span>.</p>
              <p className="mt-2">{missingFields.join(', ')}</p>
            </div>
          ) : null}

          <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <div className="text-xs text-text-muted leading-relaxed">
              <p className="font-bold text-primary mb-1">EcoLink Workflow</p>
              <p>Submitting triggers an availability check with the site. You will receive an Approval Pack and payment instructions once confirmed.</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface-2 border-t border-border flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose}>Edit Configuration</Button>
          <Button onClick={onSubmit} className="shadow-lg shadow-primary/20 h-12 px-8">Request Quote</Button>
        </div>
        </div>
      </Card>
    </div>
  );
};
