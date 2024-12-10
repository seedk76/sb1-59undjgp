import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Shield } from 'lucide-react';
import { LanguageToggle } from '../ui/LanguageToggle';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { translations } from '../../lib/translations';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguageStore();
  const { user, signOut } = useAuthStore();
  const t = translations.auth;

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              ServiceHub
            </Link>
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-[300px] pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/auth/login">
                  <Button variant="ghost">
                    {t.login[language]}
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button>
                    {t.signup[language]}
                  </Button>
                </Link>
              </div>
            )}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};