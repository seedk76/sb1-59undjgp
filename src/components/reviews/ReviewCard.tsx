import React from 'react';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ro } from 'date-fns/locale';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { Review } from '../../types/review';

interface ReviewCardProps {
  review: Review;
  onRespond?: (reviewId: string) => void;
  isProvider?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onRespond,
  isProvider = false,
}) => {
  const { language } = useLanguageStore();
  const t = translations.reviews.card;
  const locale = language === 'en' ? enUS : ro;

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{review.clientName}</p>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(review.timestamp), {
              addSuffix: true,
              locale,
            })}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-gray-600">{review.content}</p>

      {review.response && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {t.providerResponse[language]}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.response.timestamp), {
                addSuffix: true,
                locale,
              })}
            </p>
          </div>
          <p className="text-sm text-gray-600">{review.response.content}</p>
        </div>
      )}

      {isProvider && !review.response && onRespond && (
        <div className="mt-4">
          <button
            onClick={() => onRespond(review.id)}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {t.respond[language]}
          </button>
        </div>
      )}
    </div>
  );
};