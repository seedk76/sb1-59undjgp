import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguageStore();
  const { user, signOut } = useAuthStore();
  const t = translations.auth;

  const isAdmin = user?.role === 'admin';

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-xl"
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              {user ? (
                <div className="space-y-4">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <Shield className="w-4 h-4" />
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/messages"
                    className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    Messages
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link to="/auth/login" onClick={onClose}>
                    <Button variant="ghost" className="w-full">
                      {t.login[language]}
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={onClose}>
                    <Button className="w-full">
                      {t.signup[language]}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};