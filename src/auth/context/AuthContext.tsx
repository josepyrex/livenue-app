// src/auth/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Define user types
export type UserType = 'musician' | 'venue';

// Extended user interface with our custom fields
export interface AuthUser extends User {
  userType?: UserType;
}

// Define context value interface
interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  registerUser: (email: string, password: string, userType: UserType) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Register new user
  const registerUser = async (email: string, password: string, userType: UserType) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      userType,
      createdAt: new Date().toISOString(),
    });
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    
    return userCredential.user;
  };

  // Login user
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  // Logout user
  const logout = () => signOut(auth);

  // Reset password
  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  // Verify email
  const verifyEmail = async () => {
    if (currentUser) {
      return sendEmailVerification(currentUser);
    }
    throw new Error("No user is currently logged in");
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (user: User) => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await fetchUserProfile(user);
        const extendedUser = user as AuthUser;
        if (profile) {
          extendedUser.userType = profile.userType;
        }
        setCurrentUser(extendedUser);
        setUserProfile(profile);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    registerUser,
    logout,
    resetPassword,
    verifyEmail
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};