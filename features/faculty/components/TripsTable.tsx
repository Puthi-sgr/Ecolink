import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Trip } from '../../../shared/types';
import { Button } from '../../../shared/atoms/Button';

interface TripsTableProps {
  trips: Trip[];
}

export const TripsTable: React.FC<TripsTableProps> = ({ trips }) => {
  const handleRowClick = (id: string) => {
      window.location.hash = `/faculty/trips/${id}`;
  };

  return (
    <Card title="My Field Trips" className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
            <tr className="border-b border-border text-text-muted text-sm">
                <th className="py-3 px-4 font-medium">Destination</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Group Size</th>
                <th className="py-3 px-4 font-medium">Trip Status</th>
                <th className="py-3 px-4 font-medium text-right">Logistics</th>
            </tr>
            </thead>
            <tbody className="text-sm">
            {trips.map((trip) => (
                <tr 
                    key={trip.id} 
                    onClick={() => handleRowClick(trip.id)}
                    className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer group"
                >
                <td className="py-3 px-4 font-medium text-text group-hover:text-primary transition-colors">{trip.packageName}</td>
                <td className="py-3 px-4 text-text-muted">{trip.date}</td>
                <td className="py-3 px-4 text-text-muted">{trip.groupSize} pax</td>
                <td className="py-3 px-4">
                    <StatusBadge status={trip.status} />
                </td>
                <td className="py-3 px-4 text-right">
                    {trip.status === 'LOCKED' ? (
                        <span className="text-xs font-semibold text-accent flex items-center justify-end gap-1">
                            ✓ Pack Issued
                        </span>
                    ) : (
                        <Button size="sm" variant="ghost" className="text-xs">Manage →</Button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </Card>
  );
};