import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { useReviewsStore } from '../../store/useReviewsStore';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import type { ReviewFormData } from '../../types/review';

interface ReviewsListProps {
  providerId: string;
  rating: number;
  reviewCount: number;
  canReview?: boolean;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({
  providerId,
  rating,
  reviewCount,
  canReview = false,
}) => {
  const { language } = useLanguageStore();
  const { reviews, loading, fetchReviews, submitReview } = useReviewsStore();
  const t = translations.reviews;

  useEffect(() => {
    const unsubscribe = fetchReviews(providerId);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [providerId, fetchReviews]);

  const handleSubmitReview = async (data: ReviewFormData) => {
    await submitReview(providerId, data);
  };

  if (loading) {
    return <div className="text-center">{t.loading[language]}</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
          <span className="text-3xl font-bold text-gray-900">{rating}</span>
        </div>
        <div className="text-gray-500">
          {reviewCount} {t.totalReviews[language]}
        </div>
      </div>

      {canReview && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t.writeReview[language]}
          </h3>
          <ReviewForm onSubmit={handleSubmitReview} />
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};