// src/models/domain/booking.model.ts
export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  musicianId: string;
  venueId: string;
  status: BookingStatus;
  proposedDates: Date[];
  confirmedDate?: Date;
  startTime?: string;
  endTime?: string;
  paymentTerms: {
    guaranteedAmount?: number;
    revenueSplit?: number;
    other?: string;
  };
  initiatedBy: 'musician' | 'venue';
  messageHistory: {
    senderId: string;
    message: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}