import type { TranslationKey } from './index';

export interface Review {
  id: string;
  providerId: string;
  clientId: string;
  clientName: string;
  rating: number;
  content: string;
  response?: {
    content: string;
    timestamp: string;
  };
  timestamp: string;
}

export interface ReviewFormData {
  rating: number;
  content: string;
}

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}