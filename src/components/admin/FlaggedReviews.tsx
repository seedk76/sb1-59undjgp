import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Button } from '../ui/Button';

export const FlaggedReviews: React.FC = () => {
  const { flaggedReviews, loading, fetchFlaggedReviews, handleReview } = useAdminStore();
  const { language } = useLanguageStore();
  const t = translations.admin.reviews;

  useEffect(() => {
    fetchFlaggedReviews();
  }, [fetchFlaggedReviews]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {flaggedReviews.map((review) => (
        <div
          key={review.id}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              {t.flaggedReason[language]}: {review.reason}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => handleReview(review.id, 'approve')}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              {t.approve[language]}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(review.id, 'remove')}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              {t.remove[language]}
            </Button>
          </div>
        </div>
      ))}

      {flaggedReviews.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {t.noFlagged[language]}
        </div>
      )}
    </div>
  );
};