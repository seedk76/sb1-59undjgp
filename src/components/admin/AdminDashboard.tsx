import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { PendingProviders } from './PendingProviders';
import { FlaggedReviews } from './FlaggedReviews';
import { CategoryManagement } from './CategoryManagement';
import { FeaturedProviders } from './FeaturedProviders';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { TabView } from '../ui/TabView';

export const AdminDashboard: React.FC = () => {
  const { language } = useLanguageStore();
  const t = translations.admin.dashboard;

  const tabs = [
    {
      id: 'analytics',
      label: t.tabs.analytics[language],
      content: <AnalyticsDashboard />,
    },
    {
      id: 'providers',
      label: t.tabs.providers[language],
      content: <PendingProviders />,
    },
    {
      id: 'reviews',
      label: t.tabs.reviews[language],
      content: <FlaggedReviews />,
    },
    {
      id: 'categories',
      label: t.tabs.categories[language],
      content: <CategoryManagement />,
    },
    {
      id: 'featured',
      label: t.tabs.featured[language],
      content: <FeaturedProviders />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          {t.title[language]}
        </h1>
        <TabView tabs={tabs} />
      </div>
    </div>
  );
};