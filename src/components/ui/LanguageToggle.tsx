import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  );
};