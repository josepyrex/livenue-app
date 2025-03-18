// src/models/domain/musician.model.ts
export interface Musician {
    id: string;
    userId: string;
    name: string;
    genre: string[];
    bio: string;
    mediaUrls: {
      type: 'image' | 'video' | 'audio';
      url: string;
      caption?: string;
    }[];
    performanceHistory: {
      venueId: string;
      date: Date;
      attendance: number;
    }[];
    availability: {
      startDate: Date;
      endDate: Date;
      recurring?: boolean;
      recurrencePattern?: string;
    }[];
    eloRating: number;
    createdAt: Date;
    updatedAt: Date;
  }