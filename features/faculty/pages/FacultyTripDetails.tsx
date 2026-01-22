import React, { useEffect, useState } from 'react';
import { FacultyLayout } from '../layouts/FacultyLayout';
import { useTrips } from '../../../app/TripContext';
import { TripDetailHeader } from '../components/trip-details/TripDetailHeader';
import { TripStatusTracker } from '../components/trip-details/TripStatusTracker';
import { ApprovalSection } from '../components/trip-details/ApprovalSection';
import { PaymentSection } from '../components/trip-details/PaymentSection';
import { PaymentProof } from '../../../shared/types';

interface FacultyTripDetailsProps {
    tripId: string;
}

export const FacultyTripDetails: React.FC<FacultyTripDetailsProps> = ({ tripId }) => {
    const { getTrip, updateTrip } = useTrips();
    const [trip, setTrip] = useState(getTrip(tripId));

    // Listen for updates in context
    useEffect(() => {
        setTrip(getTrip(tripId));
    }, [tripId, getTrip]);

    const handleUploadPayment = (proof: PaymentProof) => {
        updateTrip(tripId, {
            paymentProof: proof
        });
        setTrip(prev => prev ? ({ ...prev, paymentProof: proof }) : undefined);
    };

    const handleBack = () => {
        window.location.hash = '/faculty/dashboard';
    };

    if (!trip) return <div className="p-8 text-center">Trip not found</div>;

    return (
        <FacultyLayout>
            <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-12">
                <TripDetailHeader trip={trip} onBack={handleBack} />
                <TripStatusTracker trip={trip} />
                <ApprovalSection trip={trip} />
                <PaymentSection trip={trip} onUpload={handleUploadPayment} />
            </div>
        </FacultyLayout>
    );
};
