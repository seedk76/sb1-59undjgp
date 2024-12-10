import { create } from 'zustand';
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ReviewsState, Review, ReviewFormData } from '../types/review';
import { useAuthStore } from './useAuthStore';

interface ReviewsStore extends ReviewsState {
  fetchReviews: (providerId: string) => void;
  submitReview: (providerId: string, data: ReviewFormData) => Promise<void>;
  respondToReview: (reviewId: string, content: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsStore>((set) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviews: (providerId: string) => {
    set({ loading: true });

    const q = query(
      collection(db, 'reviews'),
      where('providerId', '==', providerId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reviews: Review[] = [];
        snapshot.forEach((doc) => {
          reviews.push({ id: doc.id, ...doc.data() } as Review);
        });
        set({ reviews, loading: false });
      },
      (error) => {
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  },

  submitReview: async (providerId: string, data: ReviewFormData) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      const reviewData = {
        providerId,
        clientId: user.uid,
        clientName: user.displayName || user.email,
        rating: data.rating,
        content: data.content,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'reviews'), reviewData);

      // Update provider's average rating
      const providerRef = doc(db, 'providers', providerId);
      // You would typically calculate the new average here
      await updateDoc(providerRef, {
        rating: data.rating,
        reviewCount: increment(1),
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  respondToReview: async (reviewId: string, content: string) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        response: {
          content,
          timestamp: serverTimestamp(),
        },
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));