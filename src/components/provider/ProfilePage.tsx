import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { ProfileForm } from './ProfileForm';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/useAuthStore';
import type { ProviderProfile } from '../../types/provider';

export const ProfilePage: React.FC = () => {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const t = translations.provider.profile;

  const handleSubmit = async (data: ProviderProfile) => {
    if (!user) return;

    try {
      const profileRef = doc(db, 'providers', user.uid);
      await updateDoc(profileRef, data);
      // Show success toast
    } catch (error) {
      // Show error toast
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          {t.title[language]}
        </h1>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <ProfileForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};