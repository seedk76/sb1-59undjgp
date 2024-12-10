import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingSlider } from './OnboardingSlider';
import { RoleSelection } from './RoleSelection';
import type { OnboardingStep } from '../../types/onboarding';
import type { UserProfile } from '../../types/auth';

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>('slides');
  const navigate = useNavigate();

  const handleComplete = () => {
    setStep('role-selection');
  };

  const handleSkip = () => {
    setStep('role-selection');
  };

  const handleRoleSelect = (role: UserProfile['role']) => {
    navigate(`/auth/signup?role=${role}`);
  };

  if (step === 'role-selection') {
    return <RoleSelection onSelect={handleRoleSelect} />;
  }

  return <OnboardingSlider onComplete={handleComplete} onSkip={handleSkip} />;
};