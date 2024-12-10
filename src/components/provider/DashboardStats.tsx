import React from 'react';
import { Calendar, MessageSquare, Star, Users } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { DashboardStats as Stats } from '../../types/provider';

interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const { language } = useLanguageStore();
  const t = translations.provider.dashboard.stats;

  const statCards = [
    {
      icon: Calendar,
      label: t.upcomingAppointments[language],
      value: stats.upcomingAppointments,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: MessageSquare,
      label: t.unreadMessages[language],
      value: stats.unreadMessages,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Users,
      label: t.totalBookings[language],
      value: stats.totalBookings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Star,
      label: t.averageRating[language],
      value: stats.averageRating.toFixed(1),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map(({ icon: Icon, label, value, color, bgColor }) => (
        <div
          key={label}
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-full ${bgColor} p-3`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};