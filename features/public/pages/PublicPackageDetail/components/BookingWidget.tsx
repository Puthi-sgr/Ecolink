import React from 'react';
import { Card } from '../../../../../shared/molecules/Card';
import { Button } from '../../../../../shared/atoms/Button';
import { Input } from '../../../../../shared/atoms/Input';
import { CBETPackage, User } from '../../../../../shared/types';
import { ShieldCheck } from 'lucide-react';

interface BookingWidgetProps {
  pkg: CBETPackage;
  user: User | null;
  isFaculty: boolean;
  date: string;
  size: string;
  purpose: string;
  currentPrice: number;
  onDateChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
  onReview: (event: React.FormEvent) => void;
  onLoginRedirect: () => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  pkg,
  user,
  isFaculty,
  date,
  size,
  purpose,
  currentPrice,
  onDateChange,
  onSizeChange,
  onPurposeChange,
  onReview,
  onLoginRedirect
}) => {
  const minPrice = Math.min(...pkg.capacityBands.map((band) => band.pricePerStudent));

  return (
    <div className="sticky top-24">
      <Card className="shadow-2xl border-0 bg-surface-2 ring-1 ring-border">
        <div className="mb-6 border-b border-border pb-4">
          <span className="block text-xs uppercase font-bold tracking-widest text-text-muted">From</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-black text-text">${minPrice}</span>
            <span className="text-[10px] uppercase font-bold text-text-muted">est. per student</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-text font-serif mb-6">Request this Trip</h3>

        {!isFaculty ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-text-muted">
              Only authenticated Faculty members can submit trip requests.
            </p>
            <Button className="w-full h-12" onClick={onLoginRedirect}>Sign in to Request</Button>
          </div>
        ) : (
          <form onSubmit={onReview} className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Requesting as</p>
              <p className="text-sm font-bold text-text">{user?.name}</p>
              <p className="text-xs text-text-muted">{user?.email}</p>
            </div>

            <Input
              label="Desired Date"
              type="date"
              required
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-white"
            />

            <div>
              <Input
                label="Estimated Group Size"
                type="number"
                min={pkg.bookingConditions.minGroupSize}
                max={pkg.bookingConditions.maxGroupSize}
                placeholder={`${pkg.bookingConditions.minGroupSize}-${pkg.bookingConditions.maxGroupSize}`}
                required
                value={size}
                onChange={(e) => onSizeChange(e.target.value)}
                className="bg-white"
              />
              {currentPrice > 0 && (
                <div className="mt-4 p-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 animate-in zoom-in-95">
                  <span className="block text-[10px] uppercase font-bold tracking-widest opacity-80">Estimated Total</span>
                  <span className="block text-2xl font-black">${currentPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            <Input
              label="Course / Purpose"
              placeholder="e.g. BIO-101 Module 4"
              required
              value={purpose}
              onChange={(e) => onPurposeChange(e.target.value)}
              className="bg-white"
            />

            <Button type="submit" className="w-full h-14 text-base shadow-xl shadow-primary/20">
              Review Request
            </Button>

            <p className="text-[10px] text-center text-text-muted uppercase tracking-widest font-bold">
              Subject to availability & admin review
            </p>
          </form>
        )}
      </Card>
    </div>
  );
};
