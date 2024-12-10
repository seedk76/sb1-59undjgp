import React from 'react';
import { BarChart, Calendar, Users, DollarSign } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import type { AdminAnalytics } from '../../types/admin';

const MOCK_ANALYTICS: AdminAnalytics = {
  totalBookings: 1234,
  userGrowth: {
    clients: 567,
    providers: 89,
  },
  categoryPerformance: {
    plumbers: {
      bookings: 234,
      revenue: 12500,
    },
    electricians: {
      bookings: 189,
      revenue: 9800,
    },
  },
  revenueByPeriod: [
    { date: '2024-03-01', amount: 5600 },
    { date: '2024-03-02', amount: 4800 },
    { date: '2024-03-03', amount: 6200 },
  ],
};

export const AnalyticsDashboard: React.FC = () => {
  const { language } = useLanguageStore();
  const t = translations.admin.analytics;

  const stats = [
    {
      icon: Calendar,
      label: t.totalBookings[language],
      value: MOCK_ANALYTICS.totalBookings,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Users,
      label: t.totalUsers[language],
      value: MOCK_ANALYTICS.userGrowth.clients + MOCK_ANALYTICS.userGrowth.providers,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: BarChart,
      label: t.activeProviders[language],
      value: MOCK_ANALYTICS.userGrowth.providers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: DollarSign,
      label: t.totalRevenue[language],
      value: `$${Object.values(MOCK_ANALYTICS.categoryPerformance).reduce(
        (acc, curr) => acc + curr.revenue,
        0
      )}`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, color, bgColor }) => (
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

      {/* Add charts and detailed analytics here */}
    </div>
  );
};