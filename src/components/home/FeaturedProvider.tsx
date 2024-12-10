import React from 'react';
import { Star } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { Provider } from '../../types';

interface FeaturedProviderProps {
  provider: Provider;
}

export const FeaturedProvider: React.FC<FeaturedProviderProps> = ({ provider }) => {
  const { language } = useLanguageStore();

  return (
    <div className="group h-full">
      <div className="h-full overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={provider.imageUrl}
            alt={provider.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-medium text-gray-900">{provider.name}</h3>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {provider.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({provider.reviewCount} {translations.common.reviews[language]})
            </span>
          </div>
          <p className="mb-4 text-sm text-gray-500">{provider.location}</p>
          <button className="w-full rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
            {translations.common.bookNow[language]}
          </button>
        </div>
      </div>
    </div>
  );
};