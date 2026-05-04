import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Trip } from '../../../shared/types';
import { setHashPath } from '../../../shared/utils/hashRoute';
import { DataTableCard } from '../../../shared/ui/DataTableCard';

interface TripsTableProps {
  trips: Trip[];
}

export const TripsTable: React.FC<TripsTableProps> = ({ trips }) => {
  const handleRowClick = (id: string) => {
    setHashPath(`/faculty/trips/${id}`);
  };

  return (
    <DataTableCard
      title="My Field Trips"
      description="Trips move from pending through approval and lock inside the shared operations flow."
      isEmpty={!trips.length}
      emptyTitle="No trips yet"
      emptyDescription="Once a request is approved or linked into operations, it will appear here."
    >
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-sm text-text-muted">
              <th className="px-4 py-3 font-medium">Destination</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Group Size</th>
              <th className="px-4 py-3 font-medium">Trip Status</th>
              <th className="px-4 py-3 text-right font-medium">Logistics</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {trips.map((trip) => (
              <tr
                key={trip.id}
                onClick={() => handleRowClick(trip.id)}
                className="group cursor-pointer border-b border-border transition-colors hover:bg-surface-2 last:border-0"
              >
                <td className="px-4 py-3 font-medium text-text transition-colors group-hover:text-primary">{trip.packageName}</td>
                <td className="px-4 py-3 text-text-muted">{trip.date}</td>
                <td className="px-4 py-3 text-text-muted">{trip.groupSize} pax</td>
                <td className="px-4 py-3">
                  <StatusBadge status={trip.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {trip.status === 'LOCKED' ? (
                    <span className="inline-flex items-center justify-end gap-1 text-xs font-semibold text-accent">Pack Issued</span>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-xs">
                      Manage
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </DataTableCard>
  );
};
