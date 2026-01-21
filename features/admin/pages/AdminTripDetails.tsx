import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { useTrips } from '../../../app/TripContext';
import { ProjectStatus, ApprovalPack } from '../../../shared/types';
import { AdminDetailHeader, WorkflowActions, TripInfoPanel } from '../components/AdminTripViews';
import { ApprovalPackGenerator } from '../components/ApprovalPackGenerator';
import { PaymentVerification } from '../components/PaymentVerification';

interface AdminTripDetailsProps {
    tripId: string;
}

export const AdminTripDetails: React.FC<AdminTripDetailsProps> = ({ tripId }) => {
    const { getTrip, updateTrip } = useTrips();
    const [trip, setTrip] = useState(getTrip(tripId));
    const [showGenerator, setShowGenerator] = useState(false);
    const [showPaymentVerifier, setShowPaymentVerifier] = useState(false);

    useEffect(() => {
        setTrip(getTrip(tripId));
    }, [tripId, getTrip]);

    const handleApproveClick = () => {
        setShowGenerator(true);
    };

    const handlePackGenerated = (pack: ApprovalPack) => {
        updateTrip(tripId, {
            status: ProjectStatus.APPROVED,
            approvalPack: pack
        });
        setTrip(prev => prev ? ({ ...prev, status: ProjectStatus.APPROVED, approvalPack: pack }) : undefined);
        setShowGenerator(false);
    };

    const handleLock = () => {
        if(confirm("Confirm payment receipt and Lock this trip manually?")) {
            updateTrip(tripId, {
                status: ProjectStatus.LOCKED,
                transportStatus: 'Booked'
            });
            setTrip(prev => prev ? ({ ...prev, status: ProjectStatus.LOCKED }) : undefined);
        }
    };
    
    const handleVerifyPayment = (amount: number) => {
        if (!trip?.paymentProof) return;
        
        updateTrip(tripId, {
            status: ProjectStatus.LOCKED,
            transportStatus: 'Booked',
            paymentProof: {
                ...trip.paymentProof,
                amount: amount, // update with verified amount
                verificationStatus: 'Verified',
                verifiedBy: 'Admin User',
                verifiedAt: new Date().toISOString()
            }
        });
        setTrip(prev => prev ? ({ ...prev, status: ProjectStatus.LOCKED }) : undefined);
        setShowPaymentVerifier(false);
    };

    const handleRejectPayment = (reason: string) => {
        if (!trip?.paymentProof) return;

         updateTrip(tripId, {
            paymentProof: {
                ...trip.paymentProof,
                verificationStatus: 'Rejected'
                // In real app, we might want to store the rejection reason
            }
        });
        // We do NOT change trip status back to PENDING, it stays APPROVED but payment is rejected.
        setTrip(prev => prev ? ({ ...prev, paymentProof: { ...prev.paymentProof!, verificationStatus: 'Rejected' } }) : undefined);
        setShowPaymentVerifier(false);
        alert(`Payment rejected: ${reason}`);
    };

    const handleBack = () => {
        window.location.hash = '/admin/dashboard';
    };

    if (!trip) return <div className="p-8 text-center">Trip not found</div>;

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4 duration-500">
                <AdminDetailHeader trip={trip} onBack={handleBack} />
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <WorkflowActions 
                            trip={trip} 
                            onApprove={handleApproveClick} 
                            onLock={handleLock}
                            onVerifyPayment={() => setShowPaymentVerifier(true)}
                        />
                        <TripInfoPanel trip={trip} />
                    </div>
                    <div className="md:col-span-1">
                        {/* Sidebar info could go here */}
                    </div>
                </div>
            </div>

            {showGenerator && (
                <ApprovalPackGenerator 
                    trip={trip} 
                    onGenerate={handlePackGenerated} 
                    onCancel={() => setShowGenerator(false)} 
                />
            )}

            {showPaymentVerifier && (
                <PaymentVerification 
                    trip={trip}
                    onVerify={handleVerifyPayment}
                    onReject={handleRejectPayment}
                    onCancel={() => setShowPaymentVerifier(false)}
                />
            )}
        </AdminLayout>
    );
};