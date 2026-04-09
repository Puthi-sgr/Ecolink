import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Card } from '../../../shared/molecules/Card';
import { ProjectStatus, Trip } from '../../../shared/types';
import { setHashPath } from '../../../shared/utils/hashRoute';

interface TripOperationsTableProps {
  trips: Trip[];
}

export const TripOperationsTable: React.FC<TripOperationsTableProps> = ({ trips }) => {
  const handleRowClick = (id: string) => {
    setHashPath(`/admin/trips/${id}`);
  };

  return (
    <Card title="Field Trip Operations" actions={<Button size="sm" variant="outline">Schedule Transport</Button>}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-border text-xs font-semibold uppercase tracking-wider text-text-muted">
            <tr>
              <th className="pb-3 pl-2">Destination</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {trips.map((trip) => (
              <tr
                key={trip.id}
                onClick={() => handleRowClick(trip.id)}
                className="group cursor-pointer transition-colors hover:bg-surface-2"
              >
                <td className="py-3 pl-2 font-medium text-text group-hover:text-primary">
                  {trip.packageName}
                  <div className="text-xs text-text-muted">
                    {trip.facultyName} · {trip.groupSize} pax
                  </div>
                </td>
                <td className="py-3 text-text-muted">{trip.date}</td>
                <td className="py-3">
                  <StatusBadge status={trip.status} />
                </td>
                <td className="py-3 text-right">
                  {trip.status === ProjectStatus.PENDING ? (
                    <span className="rounded border border-accent/20 bg-accent/5 px-2 py-1 text-xs font-medium text-accent">Review</span>
                  ) : null}
                  {trip.status === ProjectStatus.APPROVED ? (
                    <span className="rounded border border-clay/20 bg-clay/5 px-2 py-1 text-xs font-medium text-clay">Wait Payment</span>
                  ) : null}
                  {trip.status === ProjectStatus.LOCKED ? <span className="text-xs text-text-muted">Confirmed</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
