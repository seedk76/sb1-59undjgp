import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { Appointment } from '../../types/provider';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
}) => {
  const { language } = useLanguageStore();
  const t = translations.provider.dashboard.appointments;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {t.title[language]}
      </h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {appointment.clientName}
                </span>
                <span className="text-sm text-gray-600">
                  {translations.services[appointment.service][language]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {t.status[appointment.status][language]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};