// src/services/profile.service.ts
import { MusicianRepository } from '../repositories/musician.repository';
import { VenueRepository } from '../repositories/venue.repository';
import { Musician } from '../models/domain/musician.model';
import { Venue } from '../models/domain/venue.model';

export class ProfileService {
  private musicianRepo: MusicianRepository;
  private venueRepo: VenueRepository;
  
  constructor() {
    this.musicianRepo = new MusicianRepository();
    this.venueRepo = new VenueRepository();
  }
  
  async createMusicianProfile(userId: string, data: Partial<Musician>): Promise<Musician> {
    // Business logic validation
    if (!data.name) throw new Error('Name is required');
    if (!data.bio || data.bio.length < 50) {
      throw new Error('Bio must be at least 50 characters');
    }
    
    // Initialize with default values
    const defaultMusician: Omit<Musician, 'id'> = {
      userId,
      name: data.name,
      genre: data.genre || [],
      bio: data.bio || '',
      mediaUrls: data.mediaUrls || [],
      performanceHistory: data.performanceHistory || [],
      availability: data.availability || [],
      eloRating: 1000, // Default ELO rating
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Persist to repository
    return this.musicianRepo.create(defaultMusician);
  }
  
  // Additional methods for profile management
  async getMusicianProfile(userId: string): Promise<Musician | null> {
    return this.musicianRepo.getByUserId(userId);
  }
  
  async getVenueProfile(userId: string): Promise<Venue | null> {
    return this.venueRepo.getByUserId(userId);
  }
  
  async updateMusicianProfile(id: string, data: Partial<Musician>): Promise<void> {
    // Validation logic
    if (data.bio && data.bio.length < 50) {
      throw new Error('Bio must be at least 50 characters');
    }
    
    return this.musicianRepo.update(id, data);
  }
}