import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { OnboardingSlide } from '../../types/onboarding';

const slides: OnboardingSlide[] = [
  {
    id: 'welcome',
    titleKey: 'welcome',
    descriptionKey: 'welcome',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'discover',
    titleKey: 'discover',
    descriptionKey: 'discover',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'book',
    titleKey: 'book',
    descriptionKey: 'book',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
  },
];

interface OnboardingSliderProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguageStore();

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const slide = slides[currentSlide];
  const t = translations.onboarding.slides[slide.titleKey];

  return (
    <div className="h-screen flex flex-col">
      <div className="relative flex-1">
        <img
          src={slide.image}
          alt={t.title[language]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">{t.title[language]}</h2>
          <p className="text-lg">{t.description[language]}</p>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            {translations.onboarding.actions.skip[language]}
          </button>
        </div>

        <div className="flex gap-4">
          {currentSlide > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
              {translations.onboarding.actions.next[language]}
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            {currentSlide === slides.length - 1
              ? translations.onboarding.actions.getStarted[language]
              : translations.onboarding.actions.next[language]}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};