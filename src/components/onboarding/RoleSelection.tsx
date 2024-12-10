import React from 'react';
import { UserCircle, Briefcase } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { UserProfile } from '../../types/auth';

interface RoleSelectionProps {
  onSelect: (role: UserProfile['role']) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  const { language } = useLanguageStore();
  const t = translations.onboarding.roleSelection;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t.title[language]}
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => onSelect('client')}
            className="w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <UserCircle className="w-6 h-6 text-primary-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  {t.client.title[language]}
                </h3>
                <p className="text-gray-600">
                  {t.client.description[language]}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('provider')}
            className="w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-primary-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  {t.provider.title[language]}
                </h3>
                <p className="text-gray-600">
                  {t.provider.description[language]}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};