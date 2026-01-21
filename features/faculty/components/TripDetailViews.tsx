import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Trip, ProjectStatus, PaymentProof } from '../../../shared/types';
import { CBET_PACKAGES } from '../../../shared/data/cbetData';
import { ArrowLeft, Clock, CheckCircle, FileText, FileSpreadsheet, Download, Receipt, Upload } from 'lucide-react';

export const TripDetailHeader: React.FC<{ trip: Trip; onBack: () => void }> = ({ trip, onBack }) => (
  <div className="mb-6">
    <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 pl-0 hover:bg-transparent hover:text-primary flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
    </Button>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-serif text-text">{trip.packageName}</h1>
            <p className="text-text-muted">Trip ID: {trip.id} • {trip.date}</p>
        </div>
        <StatusBadge status={trip.status} />
    </div>
  </div>
);

export const TripStatusTracker: React.FC<{ trip: Trip }> = ({ trip }) => {
    const steps = [ProjectStatus.PENDING, ProjectStatus.APPROVED, ProjectStatus.LOCKED, ProjectStatus.COMPLETED];
    const currentIndex = steps.indexOf(trip.status);

    const getDateForStep = (step: ProjectStatus) => {
        // Use actual data if available
        if (step === ProjectStatus.APPROVED && trip.approvalPack?.publishedAt) {
            return trip.approvalPack.publishedAt;
        }
        if (step === ProjectStatus.LOCKED && trip.paymentProof?.verifiedAt) {
            return new Date(trip.paymentProof.verifiedAt).toLocaleDateString();
        }
        
        // Simulation / Fallback logic based on current status and trip date
        const tripDate = new Date(trip.date);
        if (isNaN(tripDate.getTime())) return null; // Safety check

        if (step === ProjectStatus.PENDING) {
             // Simulate submission 30 days prior
             const d = new Date(tripDate);
             d.setDate(d.getDate() - 30);
             return d.toLocaleDateString();
        }

        // If we are at or past this step, but missing explicit data, simulate sensible dates
        if (steps.indexOf(step) <= currentIndex) {
            if (step === ProjectStatus.APPROVED) {
                 const d = new Date(tripDate);
                 d.setDate(d.getDate() - 25);
                 return d.toLocaleDateString();
            }
            if (step === ProjectStatus.LOCKED) {
                 const d = new Date(tripDate);
                 d.setDate(d.getDate() - 14);
                 return d.toLocaleDateString();
            }
            if (step === ProjectStatus.COMPLETED) {
                 const d = new Date(tripDate);
                 d.setDate(d.getDate() + 1);
                 return d.toLocaleDateString();
            }
        }

        return null;
    };

    return (
        <Card className="mb-8">
            <div className="flex items-center justify-between relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-0 rounded"></div>
                
                {/* Steps */}
                {steps.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const dateStr = getDateForStep(step);
                    
                    return (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-2 bg-surface px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                isCompleted ? 'bg-primary text-white' : 'bg-surface-2 text-text-muted border border-border'
                            }`}>
                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : (index + 1)}
                            </div>
                            <div className="text-center bg-surface px-2 rounded">
                                <span className={`block text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : 'text-text-muted'}`}>
                                    {step}
                                </span>
                                {isCompleted && dateStr && (
                                    <span className="block text-[10px] text-text-muted font-medium mt-0.5">
                                        {dateStr}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export const ApprovalSection: React.FC<{ trip: Trip }> = ({ trip }) => {
    if (trip.status === ProjectStatus.PENDING) {
        return (
            <Card title="Governance & Approval" className="border-l-4 border-l-status-pending mb-6 opacity-75">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-status-pending/20 flex items-center justify-center text-xl text-status-pending">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-text mb-1">Approval Pending</h4>
                        <p className="text-text-muted text-sm max-w-xl">
                            EcoLink Admin is reviewing your request. Once approved, an official <strong>Approval Pack</strong> containing your confirmation letter, itinerary, and safety documents will be available here.
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
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
                    <div key={idx} className="flex items-center justify-between bg-surface-2 p-3 rounded border border-border group hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${file.name.endsWith('.csv') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {file.name.endsWith('.csv') ? <FileSpreadsheet className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className="font-medium text-text text-sm group-hover:text-primary transition-colors">
                                    {file.name.replace(/^\d+_/, '').replace(/_/g, ' ').replace('.pdf', '').replace('.csv', '')}
                                </p>
                                <p className="text-[10px] text-text-muted uppercase tracking-wider">{file.name.split('.').pop()}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export const PaymentSection: React.FC<{ trip: Trip; onUpload: (proof: PaymentProof) => void }> = ({ trip, onUpload }) => {
    const [method, setMethod] = useState<'ABA' | 'KHQR' | 'ACLEDA'>('KHQR');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (trip.status === ProjectStatus.PENDING) return null;

    if (trip.status === ProjectStatus.LOCKED) {
        return (
             <Card title="Payment Status" className="border-l-4 border-l-status-locked mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-status-locked/10 text-status-locked flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-status-locked mb-1">Payment Verified & Trip Locked</h4>
                        <p className="text-text-muted text-sm mt-1">
                            Deposit of <strong>${trip.paymentProof?.amount.toLocaleString()}</strong> via {trip.paymentProof?.method} has been confirmed.
                            <br/>
                            Logistics booking has been triggered.
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    if (trip.paymentProof?.verificationStatus === 'Pending') {
         return (
             <Card title="Payment Status" className="border-l-4 border-l-status-pending mb-6">
                <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-full bg-status-pending/20 text-status-pending flex items-center justify-center">
                         <Clock className="w-6 h-6" />
                     </div>
                    <div>
                        <h4 className="font-bold text-text mb-1">Payment Verification Pending</h4>
                        <p className="text-text-muted text-sm mt-1">
                            You have submitted proof for <strong>${trip.paymentProof.amount.toLocaleString()}</strong>.
                            <br/>EcoLink Admin is verifying your transaction. Status will update to LOCKED shortly.
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    // --- Calculate Amount ---
    const pkg = CBET_PACKAGES.find(p => p.id === trip.packageId);
    const band = pkg?.capacityBands.find(b => trip.groupSize >= b.min && trip.groupSize <= b.max);
    const pricePerStudent = band ? band.pricePerStudent : 0;
    const totalCost = trip.groupSize * pricePerStudent;
    const depositPercent = pkg?.depositDetails.percentage || 50;
    const depositAmount = (totalCost * depositPercent) / 100;

    const handleSubmitProof = () => {
        setIsSubmitting(true);
        // Simulate upload delay
        setTimeout(() => {
            onUpload({
                tripId: trip.id,
                type: 'Deposit',
                amount: depositAmount,
                method: method,
                proofUrl: 'mock_receipt.jpg',
                verificationStatus: 'Pending'
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <Card title="Step 2: Payment Required" className="border-l-4 border-l-status-approved mb-6">
            <div className="mb-6 bg-surface-2 p-4 rounded border border-border flex justify-between items-center">
                 <div>
                    <span className="text-xs font-bold text-text-muted uppercase">Required Deposit ({depositPercent}%)</span>
                    <div className="text-2xl font-bold text-primary">${depositAmount.toLocaleString()}</div>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-text-muted block">Deadline</span>
                    <span className="font-medium text-clay">Within {pkg?.depositDetails.deadlineDays} Days</span>
                 </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Method Selection & QR */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {['KHQR', 'ABA', 'ACLEDA'].map((m) => (
                            <button 
                                key={m}
                                onClick={() => setMethod(m as any)}
                                className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
                                    method === m 
                                    ? 'bg-primary text-white border-primary' 
                                    : 'bg-surface text-text-muted border-border hover:bg-surface-2'
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                    
                    <div className="aspect-square bg-white border border-border rounded flex items-center justify-center relative overflow-hidden group">
                        <div className="text-center">
                             <div className="w-32 h-32 bg-text text-white flex items-center justify-center mx-auto mb-2">
                                 <Receipt className="w-16 h-16 opacity-50" />
                             </div>
                             <p className="text-xs text-text-muted font-mono">ID: {trip.id}</p>
                             <p className="font-bold text-primary">Scan with {method}</p>
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <div className="bg-surface-2 border-2 border-dashed border-border rounded-eco h-40 flex flex-col items-center justify-center text-center p-4">
                         <Upload className="w-8 h-8 text-text-muted opacity-50 mb-2" />
                         <p className="text-sm font-medium text-text">Upload Payment Receipt</p>
                         <p className="text-xs text-text-muted">Screenshot or PDF from banking app</p>
                    </div>
                    
                    <div className="space-y-2">
                         <div className="text-xs text-text-muted flex justify-between">
                             <span>Paying for:</span>
                             <span className="font-medium text-text">{trip.packageName}</span>
                         </div>
                         <div className="text-xs text-text-muted flex justify-between">
                             <span>Amount:</span>
                             <span className="font-medium text-text">${depositAmount.toLocaleString()}</span>
                         </div>
                    </div>

                    <Button onClick={handleSubmitProof} disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit Payment Proof'}
                    </Button>
                </div>
            </div>
        </Card>
    );
};