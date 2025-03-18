// src/repositories/venue.repository.ts
import { db } from '../config/firebase';
import { Venue } from '../models/domain/venue.model';
import { 
  collection, doc, setDoc, getDoc, updateDoc, 
  query, where, getDocs, DocumentData, 
  QueryConstraint, orderBy, limit,
  DocumentSnapshot
} from 'firebase/firestore';

/**
 * Repository for Venue domain entities
 * Implements data access patterns with Firebase Firestore persistence
 */
export class VenueRepository {
  private readonly collectionRef = collection(db, 'venues');
  
  /**
   * Persists a new venue entity to the data store
   * @param venue The venue data to persist (without ID)
   * @returns The complete venue entity with generated ID
   * @throws {Error} On persistence failure
   */
  async create(venue: Omit<Venue, 'id'>): Promise<Venue> {
    try {
      // Generate document reference with auto-ID
      const docRef = doc(this.collectionRef);
      
      // Construct the complete entity with metadata
      const newVenue: Venue = {
        ...venue,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Persist to Firestore with adapter transformation
      await setDoc(docRef, this.toFirestore(newVenue));
      return newVenue;
    } catch (error) {
      console.error('Error creating venue:', error);
      throw new Error(`Failed to create venue: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Retrieves a venue by its primary identifier
   * @param id The venue's unique identifier
   * @returns The venue entity or null if not found
   * @throws {Error} On retrieval failure
   */
  async getById(id: string): Promise<Venue | null> {
    try {
      const docSnap = await getDoc(doc(this.collectionRef, id));
      return docSnap.exists() ? this.fromFirestore(docSnap) : null;
    } catch (error) {
      console.error(`Error retrieving venue with id ${id}:`, error);
      throw new Error(`Failed to retrieve venue: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Retrieves a venue by associated user ID
   * @param userId The Firebase Auth user ID
   * @returns The venue entity or null if not found
   * @throws {Error} On retrieval failure
   */
  async getByUserId(userId: string): Promise<Venue | null> {
    try {
      // Construct query against userId field
      const q = query(this.collectionRef, where('userId', '==', userId));
      
      // Execute query
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      // Transform and return first matching document
      return this.fromFirestore(querySnapshot.docs[0]);
    } catch (error) {
      console.error(`Error retrieving venue for user ${userId}:`, error);
      throw new Error(`Failed to retrieve venue by user ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Updates an existing venue entity
   * @param id The venue's unique identifier
   * @param data Partial venue data to update
   * @throws {Error} On update failure or if venue doesn't exist
   */
  async update(id: string, data: Partial<Venue>): Promise<void> {
    try {
      // Verify entity exists
      const exists = await this.entityExists(id);
      if (!exists) {
        throw new Error(`Venue with ID ${id} does not exist`);
      }
      
      // Always include metadata updates
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      // Update document with adapter transformation
      await updateDoc(
        doc(this.collectionRef, id), 
        this.toFirestore(updateData as Venue)
      );
    } catch (error) {
      console.error(`Error updating venue ${id}:`, error);
      throw new Error(`Failed to update venue: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Search for venues by specified criteria with optimized query execution
   * @param criteria Search parameters for filtering venues
   * @returns Array of matching venue entities
   * @throws {Error} On search failure
   */
  async search(criteria: {
    city?: string;
    state?: string;
    capacity?: { min?: number; max?: number };
    amenities?: string[];
    sortBy?: 'capacity' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
    maxResults?: number;
  } = {}): Promise<Venue[]> {
    try {
      // Build query constraints dynamically
      const constraints: QueryConstraint[] = [];
      
      // Apply equality filters
      if (criteria.city) {
        constraints.push(where('location.city', '==', criteria.city));
      }
      
      if (criteria.state) {
        constraints.push(where('location.state', '==', criteria.state));
      }
      
      // Apply range filters directly to query
      if (criteria.capacity?.min !== undefined) {
        constraints.push(where('capacity', '>=', criteria.capacity.min));
      }
      
      if (criteria.capacity?.max !== undefined) {
        constraints.push(where('capacity', '<=', criteria.capacity.max));
      }
      
      // Apply sorting
      if (criteria.sortBy) {
        const direction = criteria.sortDirection === 'desc' ? 'desc' : 'asc';
        constraints.push(orderBy(criteria.sortBy, direction));
      }
      
      // Apply result limit if specified
      if (criteria.maxResults && criteria.maxResults > 0) {
        constraints.push(limit(criteria.maxResults));
      }
      
      // Construct and execute query with all constraints
      const q = query(this.collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      // Transform documents to domain entities
      let venues = querySnapshot.docs.map(doc => this.fromFirestore(doc));
      
      // Handle array-contains filtering for amenities
      // Note: Firestore only allows one array-contains clause per query
      if (criteria.amenities && criteria.amenities.length > 0) {
        venues = venues.filter(venue => 
          criteria.amenities!.every(amenity => 
            venue.amenities.includes(amenity)
          )
        );
      }
      
      return venues;
    } catch (error) {
      console.error('Error searching venues:', error);
      throw new Error(`Failed to search venues: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Checks if a venue entity exists by ID
   * @param id The venue's unique identifier
   * @returns Boolean indicating existence
   * @private Utility method
   */
  private async entityExists(id: string): Promise<boolean> {
    const docSnap = await getDoc(doc(this.collectionRef, id));
    return docSnap.exists();
  }
  
  /**
   * Transforms a Venue domain entity to Firestore-compatible format
   * Handles date serialization and complex object transformations
   * @param venue The venue domain entity to transform
   * @returns Firestore-compatible document data
   * @private Adapter method
   */
  private toFirestore(venue: Partial<Venue>): DocumentData {
    const result: DocumentData = { ...venue };
    
    // Handle date transformations
    if (venue.createdAt instanceof Date) {
      result.createdAt = venue.createdAt.toISOString();
    }
    
    if (venue.updatedAt instanceof Date) {
      result.updatedAt = venue.updatedAt.toISOString();
    }
    
    // Handle availability date array
    if (venue.availability) {
      result.availability = venue.availability.map(slot => ({
        ...slot,
        date: slot.date instanceof Date ? slot.date.toISOString() : slot.date
      }));
    }
    
    return result;
  }
  
  /**
   * Transforms Firestore document data to domain Venue entity
   * Handles date deserialization and complex object transformations
   * @param snapshot Firestore document snapshot
   * @returns Domain Venue entity
   * @private Adapter method
   */
  private fromFirestore(snapshot: DocumentSnapshot): Venue {
    const data = snapshot.data() as DocumentData;
    
    // Construct base entity
    const venue: Venue = {
      id: snapshot.id,
      userId: data.userId,
      name: data.name,
      description: data.description,
      location: data.location,
      capacity: data.capacity,
      amenities: data.amenities || [],
      mediaUrls: data.mediaUrls || [],
      paymentTerms: data.paymentTerms || {},
      availability: [],
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
    };
    
    // Handle availability date array
    if (Array.isArray(data.availability)) {
      venue.availability = data.availability.map((slot: any) => ({
        ...slot,
        date: slot.date ? new Date(slot.date) : new Date()
      }));
    }
    
    return venue;
  }
}