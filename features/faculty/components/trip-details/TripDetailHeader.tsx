import React from 'react';
import { Button } from '../../../../shared/atoms/Button';
import { StatusBadge } from '../../../../shared/atoms/StatusBadge';
import { Trip } from '../../../../shared/types';
import { ArrowLeft } from 'lucide-react';

interface TripDetailHeaderProps {
  trip: Trip;
  onBack: () => void;
}

export const TripDetailHeader: React.FC<TripDetailHeaderProps> = ({ trip, onBack }) => (
  <div className="mb-6">
    <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 pl-0 hover:bg-transparent hover:text-primary flex items-center gap-1">
      <ArrowLeft className="w-4 h-4" /> Back to Dashboard
    </Button>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-serif text-text">{trip.packageName}</h1>
        <p className="text-text-muted">Trip ID: {trip.id} › {trip.date}</p>
      </div>
      <StatusBadge status={trip.status} />
    </div>
  </div>
);
