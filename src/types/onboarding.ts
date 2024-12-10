export interface OnboardingSlide {
  id: string;
  titleKey: keyof typeof import('../lib/translations').translations.onboarding.slides;
  descriptionKey: keyof typeof import('../lib/translations').translations.onboarding.slides;
  image: string;
}

export type OnboardingStep = 'slides' | 'role-selection';