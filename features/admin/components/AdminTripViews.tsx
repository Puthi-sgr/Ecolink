import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Trip, ProjectStatus } from '../../../shared/types';
import { ArrowLeft, Bell, CheckCircle } from 'lucide-react';

export const AdminDetailHeader: React.FC<{ trip: Trip; onBack: () => void }> = ({ trip, onBack }) => (
  <div className="mb-6">
    <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 pl-0 hover:bg-transparent hover:text-white/80 text-text-muted flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
    </Button>
    <div className="flex items-start justify-between">
        <div>
            <h1 className="text-3xl font-bold font-serif text-text">{trip.packageName}</h1>
            <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
                <span>{trip.id}</span>
                <span>•</span>
                <span>{trip.facultyName}</span>
                <span>•</span>
                <span>{trip.groupSize} Pax</span>
            </div>
        </div>
        <StatusBadge status={trip.status} />
    </div>
  </div>
);

export const WorkflowActions: React.FC<{ trip: Trip; onApprove: () => void; onLock: () => void; onVerifyPayment: () => void }> = ({ trip, onApprove, onLock, onVerifyPayment }) => {
    return (
        <Card title="Workflow Actions" className="mb-6">
            <div className="flex gap-4">
                {trip.status === ProjectStatus.PENDING && (
                    <div className="bg-surface-2 p-4 rounded-eco w-full">
                        <h4 className="font-bold text-sm mb-2">Step 1: Review & Approve</h4>
                        <p className="text-xs text-text-muted mb-4">Generate approval pack and notify faculty.</p>
                        <Button onClick={onApprove} className="w-full">Approve Request</Button>
                    </div>
                )}

                {trip.status === ProjectStatus.APPROVED && (
                    <div className="bg-surface-2 p-4 rounded-eco w-full">
                        <h4 className="font-bold text-sm mb-2">Step 2: Payment & Logistics</h4>
                        
                        {trip.paymentProof?.verificationStatus === 'Pending' ? (
                             <>
                                <div className="flex items-center gap-2 mb-3 bg-yellow-50 text-yellow-800 p-2 rounded text-xs border border-yellow-200">
                                    <Bell className="w-3 h-3" /> Payment proof submitted!
                                </div>
                                <Button onClick={onVerifyPayment} className="w-full bg-clay hover:bg-clay/90">Review Payment Proof</Button>
                             </>
                        ) : (
                             <>
                                <p className="text-xs text-text-muted mb-4">Waiting for faculty to upload deposit proof.</p>
                                <Button disabled className="w-full bg-surface-2 text-text-muted border border-border flex items-center justify-center gap-2">
                                    Waiting Payment
                                    <span className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:-0.2s]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:-0.1s]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"></span>
                                    </span>
                                </Button>
                                {/* Fallback manual lock if payment happens offline */}
                                <button onClick={onLock} className="text-[10px] text-text-muted underline mt-2 w-full text-center">Manual Lock (Offline Payment)</button>
                             </>
                        )}
                    </div>
                )}
                
                {trip.status === ProjectStatus.LOCKED && (
                     <div className="bg-surface-2 p-4 rounded-eco w-full opacity-70">
                        <h4 className="font-bold text-sm mb-2">Trip Locked</h4>
                        <p className="text-xs text-text-muted mb-4">Logistics phase initiated. Transport booked.</p>
                        <Button disabled className="w-full" variant="outline">View Logistics</Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

export const TripInfoPanel: React.FC<{ trip: Trip }> = ({ trip }) => (
    <Card title="Trip Details" className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <span className="block text-text-muted text-xs uppercase tracking-wide">Purpose</span>
                <span className="font-medium">{trip.purpose}</span>
            </div>
            <div>
                <span className="block text-text-muted text-xs uppercase tracking-wide">Contact</span>
                <span className="font-medium">{trip.requestorContact}</span>
            </div>
             <div>
                <span className="block text-text-muted text-xs uppercase tracking-wide">Date</span>
                <span className="font-medium">{new Date().toISOString().split('T')[0]}</span>
            </div>
             <div>
                <span className="block text-text-muted text-xs uppercase tracking-wide">Department</span>
                <span className="font-medium">{trip.department}</span>
            </div>
        </div>
    </Card>
);
