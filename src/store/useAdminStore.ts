import { create } from 'zustand';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { AdminState, FlaggedReview, Category, FeaturedProvider } from '../types/admin';

interface AdminStore extends AdminState {
  fetchPendingProviders: () => Promise<void>;
  approveProvider: (providerId: string) => Promise<void>;
  rejectProvider: (providerId: string) => Promise<void>;
  fetchFlaggedReviews: () => Promise<void>;
  handleReview: (reviewId: string, action: 'approve' | 'remove') => Promise<void>;
  updateCategory: (categoryId: string, updates: Partial<Category>) => Promise<void>;
  updateFeaturedProvider: (providerId: string, data: Partial<FeaturedProvider>) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  pendingProviders: [],
  flaggedReviews: [],
  categories: [],
  featuredProviders: [],
  loading: false,
  error: null,

  fetchPendingProviders: async () => {
    try {
      set({ loading: true });
      const q = query(
        collection(db, 'providers'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const providers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ pendingProviders: providers, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  approveProvider: async (providerId: string) => {
    try {
      const providerRef = doc(db, 'providers', providerId);
      await updateDoc(providerRef, {
        status: 'approved',
        approvedAt: new Date().toISOString()
      });
      get().fetchPendingProviders();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  rejectProvider: async (providerId: string) => {
    try {
      const providerRef = doc(db, 'providers', providerId);
      await updateDoc(providerRef, {
        status: 'rejected',
        rejectedAt: new Date().toISOString()
      });
      get().fetchPendingProviders();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchFlaggedReviews: async () => {
    try {
      set({ loading: true });
      const q = query(
        collection(db, 'flaggedReviews'),
        where('status', '==', 'pending'),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ flaggedReviews: reviews, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  handleReview: async (reviewId: string, action: 'approve' | 'remove') => {
    try {
      const reviewRef = doc(db, 'flaggedReviews', reviewId);
      if (action === 'remove') {
        await deleteDoc(doc(db, 'reviews', reviewId));
      }
      await updateDoc(reviewRef, {
        status: action === 'approve' ? 'approved' : 'removed',
        handledAt: new Date().toISOString()
      });
      get().fetchFlaggedReviews();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateCategory: async (categoryId: string, updates: Partial<Category>) => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await updateDoc(categoryRef, updates);
      // Refresh categories list
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateFeaturedProvider: async (providerId: string, data: Partial<FeaturedProvider>) => {
    try {
      const providerRef = doc(db, 'featuredProviders', providerId);
      await updateDoc(providerRef, data);
      // Refresh featured providers list
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));