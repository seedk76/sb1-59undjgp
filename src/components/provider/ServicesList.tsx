import React from 'react';
import { Check } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { ProviderProfile } from '../../types/provider';

interface ServicesListProps {
  services: string[];
  pricing: ProviderProfile['pricing'];
}

export const ServicesList: React.FC<ServicesListProps> = ({ services, pricing }) => {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-4">
      {services.map((serviceKey) => (
        <div
          key={serviceKey}
          className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary-100 p-2">
              <Check className="h-5 w-5 text-primary-600" />
            </div>
            <span className="font-medium text-gray-900">
              {translations.services[serviceKey][language]}
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-gray-900">
              {pricing.baseRate} {pricing.currency}
            </span>
            <p className="text-sm text-gray-500">{translations.provider.profile.pricePerHour[language]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};