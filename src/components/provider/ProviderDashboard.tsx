import React from 'react';
import { Calendar, MessageSquare, Settings, Users } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { DashboardStats } from './DashboardStats';
import { UpcomingAppointments } from './UpcomingAppointments';
import { RecentMessages } from './RecentMessages';
import type { DashboardStats as Stats, Appointment } from '../../types/provider';

const MOCK_STATS: Stats = {
  upcomingAppointments: 5,
  unreadMessages: 3,
  totalBookings: 128,
  averageRating: 4.8,
};

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'Maria Popescu',
    service: 'hairSalons',
    date: '2024-03-20',
    time: '14:00',
    status: 'confirmed',
  },
  {
    id: '2',
    clientId: 'client2',
    clientName: 'Ion Ionescu',
    service: 'hairSalons',
    date: '2024-03-21',
    time: '10:00',
    status: 'pending',
  },
];

export const ProviderDashboard: React.FC = () => {
  const { language } = useLanguageStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {translations.provider.dashboard.title[language]}
          </h1>
          <div className="flex gap-4">
            <button className="rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <DashboardStats stats={MOCK_STATS} />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <UpcomingAppointments appointments={MOCK_APPOINTMENTS} />
          <RecentMessages />
        </div>
      </div>
    </div>
  );
};