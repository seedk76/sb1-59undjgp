import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Button } from '../ui/Button';
import type { ProviderProfile } from '../../types/provider';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ProviderProfile;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  provider,
}) => {
  const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');
  const { language } = useLanguageStore();
  const t = translations.provider.booking;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {t.title[language]}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          {step === 'date' && (
            <div className="space-y-4">
              <p className="text-gray-600">{t.selectDate[language]}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {/* Placeholder for date selection */}
                <Button
                  onClick={() => setStep('time')}
                  className="flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>2024-03-25</span>
                </Button>
              </div>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-4">
              <p className="text-gray-600">{t.selectTime[language]}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {/* Placeholder for time selection */}
                <Button
                  onClick={() => setStep('confirm')}
                  className="flex items-center justify-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>14:00</span>
                </Button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 font-medium text-gray-900">
                  {t.confirmDetails[language]}
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.service[language]}</dt>
                    <dd className="font-medium text-gray-900">
                      {translations.services[provider.services[0]][language]}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.date[language]}</dt>
                    <dd className="font-medium text-gray-900">2024-03-25</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.time[language]}</dt>
                    <dd className="font-medium text-gray-900">14:00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">{t.price[language]}</dt>
                    <dd className="font-medium text-gray-900">
                      {provider.pricing.baseRate} {provider.pricing.currency}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            {t.cancel[language]}
          </Button>
          {step === 'confirm' ? (
            <Button onClick={onClose}>
              {t.confirmBooking[language]}
            </Button>
          ) : (
            <Button onClick={() => setStep(step === 'date' ? 'time' : 'confirm')}>
              {t.next[language]}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};