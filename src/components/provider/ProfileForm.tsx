import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { ProviderProfile } from '../../types/provider';

const profileSchema = z.object({
  businessName: z.string().min(2),
  description: z.object({
    en: z.string().min(10),
    ro: z.string().min(10),
  }),
  services: z.array(z.string()).min(1),
  location: z.string().min(5),
  pricing: z.object({
    baseRate: z.number().min(0),
    currency: z.enum(['RON', 'EUR']),
  }),
  availability: z.object({
    weekdays: z.record(
      z.object({
        start: z.string(),
        end: z.string(),
        available: z.boolean(),
      })
    ),
  }),
});

interface ProfileFormProps {
  profile?: ProviderProfile;
  onSubmit: (data: ProviderProfile) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSubmit }) => {
  const { language } = useLanguageStore();
  const t = translations.provider.profile;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t.businessName[language]}
        </label>
        <Input
          {...register('businessName')}
          error={!!errors.businessName}
          className="mt-1"
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.businessNameRequired[language]}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.description.en[language]}
          </label>
          <textarea
            {...register('description.en')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
              errors.description?.en ? 'border-red-500' : ''
            }`}
            rows={4}
          />
          {errors.description?.en && (
            <p className="mt-1 text-sm text-red-600">
              {t.errors.descriptionRequired[language]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.description.ro[language]}
          </label>
          <textarea
            {...register('description.ro')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
              errors.description?.ro ? 'border-red-500' : ''
            }`}
            rows={4}
          />
          {errors.description?.ro && (
            <p className="mt-1 text-sm text-red-600">
              {t.errors.descriptionRequired[language]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t.location[language]}
        </label>
        <Input
          {...register('location')}
          error={!!errors.location}
          className="mt-1"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.locationRequired[language]}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.pricing.baseRate[language]}
          </label>
          <Input
            type="number"
            {...register('pricing.baseRate', { valueAsNumber: true })}
            error={!!errors.pricing?.baseRate}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.pricing.currency[language]}
          </label>
          <Select
            {...register('pricing.currency')}
            error={!!errors.pricing?.currency}
            className="mt-1"
          >
            <option value="RON">RON</option>
            <option value="EUR">EUR</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting
            ? t.saving[language]
            : t.saveChanges[language]}
        </Button>
      </div>
    </form>
  );
};