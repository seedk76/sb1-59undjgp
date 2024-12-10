import React from 'react';
import { GripVertical, Edit2, Power } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Button } from '../ui/Button';

export const CategoryManagement: React.FC = () => {
  const { categories, updateCategory } = useAdminStore();
  const { language } = useLanguageStore();
  const t = translations.admin.categories;

  const handleToggleCategory = (categoryId: string, enabled: boolean) => {
    updateCategory(categoryId, { enabled });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <button className="cursor-move text-gray-400">
                <GripVertical className="h-5 w-5" />
              </button>
              <span className="font-medium">
                {translations.services[category.nameKey][language]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => handleToggleCategory(category.id, !category.enabled)}
                className={`${
                  category.enabled ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <Power className="h-5 w-5" />
              </Button>
              <Button variant="ghost">
                <Edit2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};