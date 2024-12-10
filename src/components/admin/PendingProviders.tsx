import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Button } from '../ui/Button';

export const PendingProviders: React.FC = () => {
  const { pendingProviders, loading, fetchPendingProviders, approveProvider, rejectProvider } = useAdminStore();
  const { language } = useLanguageStore();
  const t = translations.admin.providers;

  useEffect(() => {
    fetchPendingProviders();
  }, [fetchPendingProviders]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingProviders.map((provider) => (
        <div
          key={provider.id}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {provider.businessName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {provider.location}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => approveProvider(provider.id)}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                {t.approve[language]}
              </Button>
              <Button
                variant="outline"
                onClick={() => rejectProvider(provider.id)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                {t.reject[language]}
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {pendingProviders.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {t.noPending[language]}
        </div>
      )}
    </div>
  );
};