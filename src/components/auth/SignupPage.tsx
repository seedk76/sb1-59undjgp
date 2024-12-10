import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthLayout } from './AuthLayout';
import { AuthForm } from './AuthForm';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { useToastStore } from '../../store/useToastStore';
import type { SignupFormData } from '../../types/auth';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, googleSignIn } = useAuthStore();
  const { language } = useLanguageStore();
  const { addToast } = useToastStore();
  const t = translations.auth;

  const defaultRole = searchParams.get('role') as 'client' | 'provider' || 'client';

  const handleSignup = async (data: SignupFormData) => {
    try {
      await signup({ ...data, role: defaultRole });
      addToast(t.signupSuccess[language], 'success');
      navigate('/');
    } catch (error) {
      addToast(t.signupError[language], 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      addToast(t.signupSuccess[language], 'success');
      navigate('/');
    } catch (error) {
      addToast(t.signupError[language], 'error');
    }
  };

  return (
    <AuthLayout
      title={t.createAccountTitle[language]}
      subtitle={t.signupSubtitle[language]}
    >
      <AuthForm
        mode="signup"
        onSubmit={handleSignup}
        onGoogleSignIn={handleGoogleSignIn}
        defaultRole={defaultRole}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm"
      >
        <span className="text-gray-500">
          {t.haveAccount[language]}{' '}
        </span>
        <Link
          to="/auth/login"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          {t.login[language]}
        </Link>
      </motion.div>
    </AuthLayout>
  );
};