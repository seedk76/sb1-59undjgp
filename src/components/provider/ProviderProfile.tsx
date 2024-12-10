import React, { useState } from 'react';
import { Star, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { BookingModal } from './BookingModal';
import { TabView } from '../ui/TabView';
import { ServicesList } from './ServicesList';
import { PortfolioGallery } from './PortfolioGallery';
import { ReviewsList } from './ReviewsList';
import { AboutSection } from './AboutSection';
import type { ProviderProfile as Profile } from '../../types/provider';

interface ProviderProfileProps {
  profile: Profile;
}

export const ProviderProfile: React.FC<ProviderProfileProps> = ({ profile }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { language } = useLanguageStore();
  const t = translations.provider.profile;

  const tabs = [
    {
      id: 'services',
      label: t.tabs.services[language],
      content: <ServicesList services={profile.services} pricing={profile.pricing} />,
    },
    {
      id: 'portfolio',
      label: t.tabs.portfolio[language],
      content: <PortfolioGallery items={profile.portfolio} />,
    },
    {
      id: 'reviews',
      label: t.tabs.reviews[language],
      content: <ReviewsList rating={profile.rating} reviewCount={profile.reviewCount} />,
    },
    {
      id: 'about',
      label: t.tabs.about[language],
      content: <AboutSection description={profile.description} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-80">
        <img
          src={profile.portfolio[0]?.imageUrl || 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1200'}
          alt={profile.businessName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-24 rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {profile.businessName}
              </h1>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">{profile.rating}</span>
                  <span className="text-gray-500">
                    ({profile.reviewCount} {translations.common.reviews[language]})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-5 w-5" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="rounded-lg border border-gray-300 p-3 text-gray-600 hover:bg-gray-50">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white hover:bg-primary-600"
              >
                {translations.common.bookNow[language]}
              </button>
            </div>
          </div>

          <TabView tabs={tabs} />
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        provider={profile}
      />
    </div>
  );
};