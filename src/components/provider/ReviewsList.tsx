import React from 'react';
import { Star } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';

interface ReviewsListProps {
  rating: number;
  reviewCount: number;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ rating, reviewCount }) => {
  const { language } = useLanguageStore();
  const t = translations.provider.profile.reviews;

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

      <div className="space-y-6">
        {/* Placeholder for actual reviews */}
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">5.0</span>
            </div>
          </div>
          <p className="text-gray-600">
            {t.sampleReview[language]}
          </p>
        </div>
      </div>
    </div>
  );
};