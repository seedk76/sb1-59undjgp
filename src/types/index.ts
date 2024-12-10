export type Language = 'en' | 'ro';

export interface Service {
  id: string;
  nameKey: string;
  iconName: string;
  categoryKey: string;
}

export interface Provider {
  id: string;
  name: string;
  services: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
}

export interface TranslationKey {
  en: string;
  ro: string;
}