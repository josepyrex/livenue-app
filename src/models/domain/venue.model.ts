// src/models/domain/venue.model.ts
export interface Venue {
    id: string;
    userId: string;
    name: string;
    description: string;
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    capacity: number;
    amenities: string[];
    mediaUrls: {
      type: 'image';
      url: string;
      caption?: string;
    }[];
    paymentTerms: {
      guaranteedAmount?: number;
      revenueSplit?: number;
      other?: string;
    };
    availability: {
      date: Date;
      startTime: string;
      endTime: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }