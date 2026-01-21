import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Trip, ProjectStatus } from '../../../shared/types';

interface TripOperationsTableProps {
  trips: Trip[];
}

export const TripOperationsTable: React.FC<TripOperationsTableProps> = ({ trips }) => {
  const handleRowClick = (id: string) => {
      window.location.hash = `/admin/trips/${id}`;
  };

  return (
    <Card title="Field Trip Operations" actions={<Button size="sm" variant="outline">Schedule Transport</Button>}>
        <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="text-xs text-text-muted uppercase tracking-wider font-semibold border-b border-border">
            <tr>
                <th className="pb-3 pl-2">Destination</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
            </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
            {trips.map((trip) => (
                <tr 
                    key={trip.id} 
                    onClick={() => handleRowClick(trip.id)}
                    className="group cursor-pointer hover:bg-surface-2 transition-colors"
                >
                <td className="py-3 pl-2 font-medium text-text group-hover:text-primary">
                    {trip.packageName}
                    <div className="text-xs text-text-muted">{trip.facultyName} • {trip.groupSize} pax</div>
                </td>
                <td className="py-3 text-text-muted">{trip.date}</td>
                <td className="py-3"><StatusBadge status={trip.status} /></td>
                <td className="py-3 text-right">
                    {trip.status === ProjectStatus.PENDING && (
                        <span className="text-accent font-medium text-xs border border-accent/20 px-2 py-1 rounded bg-accent/5">Review</span>
                    )}
                    {trip.status === ProjectStatus.APPROVED && (
                        <span className="text-clay font-medium text-xs border border-clay/20 px-2 py-1 rounded bg-clay/5">Wait Payment</span>
                    )}
                    {trip.status === ProjectStatus.LOCKED && (
                        <span className="text-xs text-text-muted">Confirmed</span>
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