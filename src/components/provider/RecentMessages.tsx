import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';

export const RecentMessages: React.FC = () => {
  const { language } = useLanguageStore();
  const t = translations.provider.dashboard.messages;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {t.title[language]}
      </h2>
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <p>{t.noMessages[language]}</p>
      </div>
    </div>
  );
};