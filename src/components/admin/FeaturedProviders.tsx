import React from 'react';
import { Calendar } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Button } from '../ui/Button';

export const FeaturedProviders: React.FC = () => {
  const { featuredProviders } = useAdminStore();
  const { language } = useLanguageStore();
  const t = translations.admin.featured;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.schedule[language]}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProviders.map((provider) => (
          <div
            key={provider.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="mb-4 aspect-video w-full rounded-lg object-cover"
            />
            <h3 className="mb-2 font-medium">{provider.name}</h3>
            <p className="mb-4 text-sm text-gray-500">
              {provider.promotionalText[language]}
            </p>
            <div className="flex justify-end">
              <Button variant="outline">
                {t.edit[language]}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};