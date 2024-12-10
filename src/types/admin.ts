import type { TranslationKey, Provider } from './index';

export interface AdminState {
  pendingProviders: Provider[];
  flaggedReviews: FlaggedReview[];
  categories: Category[];
  featuredProviders: FeaturedProvider[];
  loading: boolean;
  error: string | null;
}

export interface FlaggedReview {
  id: string;
  reviewId: string;
  reason: string;
  status: 'pending' | 'approved' | 'removed';
  timestamp: string;
}

export interface Category {
  id: string;
  nameKey: string;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface FeaturedProvider extends Provider {
  startDate: string;
  endDate: string;
  promotionalText: TranslationKey;
}

export interface AdminAnalytics {
  totalBookings: number;
  userGrowth: {
    clients: number;
    providers: number;
  };
  categoryPerformance: {
    [key: string]: {
      bookings: number;
      revenue: number;
    };
  };
  revenueByPeriod: {
    date: string;
    amount: number;
  }[];
}