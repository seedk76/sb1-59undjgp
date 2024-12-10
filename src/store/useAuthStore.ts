import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { AuthState, LoginFormData, SignupFormData } from '../types/auth';

interface AuthStore extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.data();
      
      set({
        user: {
          uid: result.user.uid,
          email: result.user.email,
          role: userData?.role || 'client',
          businessName: userData?.businessName,
          displayName: result.user.displayName,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signup: async (data) => {
    try {
      set({ loading: true, error: null });
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      await setDoc(doc(db, 'users', result.user.uid), {
        email: data.email,
        role: data.role,
        businessName: data.businessName,
        createdAt: new Date().toISOString(),
      });

      set({
        user: {
          uid: result.user.uid,
          email: result.user.email,
          role: data.role,
          businessName: data.businessName,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  googleSignIn: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          role: 'client',
          displayName: result.user.displayName,
          createdAt: new Date().toISOString(),
        });
      }

      const userData = userDoc.data();
      set({
        user: {
          uid: result.user.uid,
          email: result.user.email,
          role: userData?.role || 'client',
          displayName: result.user.displayName,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));