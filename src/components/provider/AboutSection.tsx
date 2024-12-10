import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import type { TranslationKey } from '../../types';

interface AboutSectionProps {
  description: TranslationKey;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ description }) => {
  const { language } = useLanguageStore();

  return (
    <div className="prose prose-gray max-w-none">
      <p className="text-gray-600 whitespace-pre-line">{description[language]}</p>
    </div>
  );
};