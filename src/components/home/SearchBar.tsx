import React from 'react';
import { Search } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';

export const SearchBar: React.FC = () => {
  const { language } = useLanguageStore();
  const placeholder = language === 'en' 
    ? 'Search for local services...'
    : 'Căutați servicii locale...';

  return (
    <div className="relative mx-auto max-w-2xl w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 bg-white pl-12 pr-4 py-3 text-lg shadow-sm transition-shadow focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
      />
      <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
    </div>
  );
};