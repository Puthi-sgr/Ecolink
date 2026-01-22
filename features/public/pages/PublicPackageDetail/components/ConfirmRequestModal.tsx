import React from 'react';
import { Card } from '../../../../../shared/molecules/Card';
import { Button } from '../../../../../shared/atoms/Button';
import { CBETPackage } from '../../../../../shared/types';
import { Info } from 'lucide-react';

interface ConfirmRequestModalProps {
  isOpen: boolean;
  pkg: CBETPackage;
  date: string;
  size: string;
  purpose: string;
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
  currentPrice,
  pricePerStudent,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg p-0 relative shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 border-0 overflow-hidden">
        <div className="bg-surface-2 p-6 border-b border-border">
          <h3 className="font-bold text-text font-serif text-xl">Confirm Trip Request</h3>
          <p className="text-sm text-text-muted mt-1">Please verify your trip details before submission.</p>
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
          <Button onClick={onSubmit} className="shadow-lg shadow-primary/20 h-12 px-8">Confirm & Submit</Button>
        </div>
      </Card>
    </div>
  );
};
