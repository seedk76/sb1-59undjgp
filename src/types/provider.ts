import type { TranslationKey } from './index';

export interface ProviderProfile {
  uid: string;
  businessName: string;
  description: TranslationKey;
  services: string[];
  location: string;
  pricing: {
    baseRate: number;
    currency: 'RON' | 'EUR';
  };
  availability: {
    weekdays: {
      [key: string]: {
        start: string;
        end: string;
        available: boolean;
      };
    };
  };
  portfolio: {
    id: string;
    imageUrl: string;
    caption: TranslationKey;
  }[];
  rating: number;
  reviewCount: number;
}

export interface DashboardStats {
  upcomingAppointments: number;
  unreadMessages: number;
  totalBookings: number;
  averageRating: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}