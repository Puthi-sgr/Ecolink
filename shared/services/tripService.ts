import { ApprovalPack, PaymentProof, ProjectStatus, QuoteRequest, Trip } from '../types';

const buildTripId = (requestId: string) => `EL-${requestId.replace(/^quote-/, '').toUpperCase()}`;

export const tripService = {
  createTripFromRequest(input: {
    request: QuoteRequest;
    packageName: string;
    facultyName?: string;
    requestorContact?: string;
    department?: string;
  }): Trip {
    return {
      id: buildTripId(input.request.id),
      packageId: input.request.packageId,
      quoteRequestId: input.request.id,
      tripPlanId: input.request.tripPlanId,
      packageName: input.packageName,
      facultyName: input.facultyName || '',
      department: input.department || 'General Sciences',
      requestorContact: input.requestorContact || '',
      date: input.request.targetDate,
      groupSize: Number(input.request.groupSize || 0),
      purpose: input.request.purpose,
      status: ProjectStatus.PENDING,
    };
  },

  publishApprovalPack(trip: Trip, pack: ApprovalPack): Trip {
    return {
      ...trip,
      status: ProjectStatus.APPROVED,
      approvalPack: pack,
    };
  },

  submitPaymentProof(trip: Trip, proof: PaymentProof): Trip {
    return {
      ...trip,
      paymentProof: proof,
    };
  },

  verifyPayment(trip: Trip, amount: number, verifiedBy = 'Admin User'): Trip {
    if (!trip.paymentProof) return trip;

    return {
      ...trip,
      status: ProjectStatus.LOCKED,
      transportStatus: 'Booked',
      paymentProof: {
        ...trip.paymentProof,
        amount,
        verificationStatus: 'Verified',
        verifiedBy,
        verifiedAt: new Date().toISOString(),
      },
    };
  },

  rejectPayment(trip: Trip, reason?: string): Trip {
    if (!trip.paymentProof) return trip;

    return {
      ...trip,
      paymentProof: {
        ...trip.paymentProof,
        verificationStatus: 'Rejected',
        rejectionReason: reason,
      },
    };
  },

  lockTrip(trip: Trip): Trip {
    return {
      ...trip,
      status: ProjectStatus.LOCKED,
      transportStatus: 'Booked',
    };
  },
};
