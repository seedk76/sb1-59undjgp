import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthLayout } from './AuthLayout';
import { AuthForm } from './AuthForm';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { useToastStore } from '../../store/useToastStore';
import type { LoginFormData } from '../../types/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuthStore();
  const { language } = useLanguageStore();
  const { addToast } = useToastStore();
  const t = translations.auth;

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      addToast(t.loginSuccess[language], 'success');
      navigate('/');
    } catch (error) {
      addToast(t.loginError[language], 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      addToast(t.loginSuccess[language], 'success');
      navigate('/');
    } catch (error) {
      addToast(t.loginError[language], 'error');
    }
  };

  return (
    <AuthLayout
      title={t.welcomeBack[language]}
      subtitle={t.loginSubtitle[language]}
    >
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        onGoogleSignIn={handleGoogleSignIn}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm"
      >
        <span className="text-gray-500">
          {t.noAccount[language]}{' '}
        </span>
        <Link
          to="/auth/signup"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          {t.createAccount[language]}
        </Link>
      </motion.div>
    </AuthLayout>
  );
};