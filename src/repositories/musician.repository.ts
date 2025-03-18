// src/repositories/musician.repository.ts
import { db } from '../config/firebase';
import { Musician } from '../models/domain/musician.model';
import { 
  collection, doc, setDoc, getDoc, updateDoc, 
  query, where, getDocs, DocumentData 
} from 'firebase/firestore';

export class MusicianRepository {
  private collection = 'musicians';
  
  // Repository pattern implementation with CRUD operations
  async create(musician: Omit<Musician, 'id'>): Promise<Musician> {
    const docRef = doc(collection(db, this.collection));
    const newMusician: Musician = {
      ...musician,
      id: docRef.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(docRef, this.toFirestore(newMusician));
    return newMusician;
  }
  
  async getById(id: string): Promise<Musician | null> {
    const docSnap = await getDoc(doc(db, this.collection, id));
    return docSnap.exists() ? this.fromFirestore(docSnap) : null;
  }
  
  async getByUserId(userId: string): Promise<Musician | null> {
    const q = query(
      collection(db, this.collection), 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    return this.fromFirestore(querySnapshot.docs[0]);
  }
  
  async update(id: string, data: Partial<Musician>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await updateDoc(
      doc(db, this.collection, id), 
      this.toFirestore(updateData as Musician)
    );
  }
  
  // Adapter methods for Firestore
  private toFirestore(musician: Musician): DocumentData {
    return {
      ...musician,
      createdAt: musician.createdAt instanceof Date ? 
        musician.createdAt.toISOString() : musician.createdAt,
      updatedAt: musician.updatedAt instanceof Date ? 
        musician.updatedAt.toISOString() : musician.updatedAt,
      // Transform other date objects as needed
    };
  }
  
  private fromFirestore(snapshot: any): Musician {
    const data = snapshot.data();
    
    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      // Transform other date strings back to Date objects
    };
  }
}