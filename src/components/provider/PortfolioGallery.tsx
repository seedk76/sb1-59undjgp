import React from 'react';
import type { ProviderProfile } from '../../types/provider';
import { useLanguageStore } from '../../store/useLanguageStore';

interface PortfolioGalleryProps {
  items: ProviderProfile['portfolio'];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items }) => {
  const { language } = useLanguageStore();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square overflow-hidden rounded-lg"
        >
          <img
            src={item.imageUrl}
            alt={item.caption[language]}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <p className="absolute bottom-4 left-4 right-4 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.caption[language]}
          </p>
        </div>
      ))}
    </div>
  );
};