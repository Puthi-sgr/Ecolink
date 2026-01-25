import React from 'react';
import { Card } from '../../../../shared/molecules/Card';
import { Button } from '../../../../shared/atoms/Button';
import { Trip, ProjectStatus } from '../../../../shared/types';
import { Clock, FileText, FileSpreadsheet, Download } from 'lucide-react';

const ApprovalPendingCard: React.FC = () => (
  <Card title="Governance & Approval" className="border-l-4 border-l-status-pending mb-6">
    <div className="flex gap-4">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-status-pending/30 animate-ping"></span>
        <div className="relative w-12 h-12 rounded-full bg-status-pending/20 flex items-center justify-center text-xl text-status-pending">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-text">Approval Pending</h4>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-status-pending animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-status-pending animate-bounce" style={{ animationDelay: '120ms' }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-status-pending animate-bounce" style={{ animationDelay: '240ms' }}></span>
          </div>
        </div>
        <p className="text-text-muted text-sm max-w-xl">
          EcoLink Admin is reviewing your request. Once approved, an official <strong>Approval Pack</strong> containing your confirmation letter, itinerary, and safety documents will be available here.
        </p>
      </div>
    </div>
  </Card>
);

const ApprovalFileRow: React.FC<{ name: string }> = ({ name }) => {
  const isCsv = name.endsWith('.csv');
  const displayName = name
    .replace(/^\d+_/, '')
    .replace(/_/g, ' ')
    .replace('.pdf', '')
    .replace('.csv', '');

  return (
    <div className="flex items-center justify-between bg-surface-2 p-3 rounded border border-border group hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center ${isCsv ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isCsv ? <FileSpreadsheet className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
        </div>
        <div>
          <p className="font-medium text-text text-sm group-hover:text-primary transition-colors">
            {displayName}
          </p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider">{name.split('.').pop()}</p>
        </div>
      </div>
      <Button size="sm" variant="ghost" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

const ApprovalPackCard: React.FC<{ trip: Trip }> = ({ trip }) => (
  <Card title="Official Approval Pack" className="mb-6 border-l-4 border-l-status-approved">
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm text-text-muted">
        Issued on <span className="font-medium text-text">{trip.approvalPack?.publishedAt}</span>. 
        Please download and review all documents.
      </p>
      <Button size="sm" variant="primary">Download All (.zip)</Button>
    </div>
    
    <div className="grid md:grid-cols-1 gap-3">
      {trip.approvalPack?.files.map((file, idx) => (
        <ApprovalFileRow key={idx} name={file.name} />
      ))}
    </div>
  </Card>
);

export const ApprovalSection: React.FC<{ trip: Trip }> = ({ trip }) => {
  if (trip.status === ProjectStatus.PENDING) {
    return <ApprovalPendingCard />;
  }

  return <ApprovalPackCard trip={trip} />;
};
