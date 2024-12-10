import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  nameKey: keyof typeof translations.services;
  Icon: LucideIcon;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ nameKey, Icon }) => {
  const { language } = useLanguageStore();
  const name = translations.services[nameKey][language];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
    >
      <div className="aspect-square rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-primary-500/20">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-primary-100 p-4 transition-colors group-hover:bg-primary-200"
          >
            <Icon className="h-8 w-8 text-primary-600" />
          </motion.div>
          <h3 className="text-center text-lg font-medium text-gray-900">{name}</h3>
        </div>
      </div>
    </motion.div>
  );
};