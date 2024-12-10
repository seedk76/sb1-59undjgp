import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Button } from '../ui/Button';
import type { ReviewFormData } from '../../types/review';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10),
});

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const { language } = useLanguageStore();
  const t = translations.reviews.form;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const rating = watch('rating');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t.rating[language]}
        </label>
        <div className="mt-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('rating', value)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.ratingRequired[language]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t.review[language]}
        </label>
        <textarea
          {...register('content')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder={t.placeholder[language]}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.reviewRequired[language]}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.submitting[language] : t.submit[language]}
        </Button>
      </div>
    </form>
  );
};