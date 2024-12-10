import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../lib/translations';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginFormData, SignupFormData } from '../../types/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = loginSchema.extend({
  businessName: z.string().optional(),
});

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: LoginFormData | SignupFormData) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  defaultRole?: 'client' | 'provider';
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onGoogleSignIn,
  defaultRole = 'client',
}) => {
  const { language } = useLanguageStore();
  const t = translations.auth;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : signupSchema),
    defaultValues: {
      email: '',
      password: '',
      businessName: '',
    },
  });

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700">
          {t.email[language]}
        </label>
        <div className="mt-1 relative">
          <Input
            {...register('email')}
            type="email"
            error={!!errors.email}
            className="pl-10"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.emailRequired[language]}
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700">
          {t.password[language]}
        </label>
        <div className="mt-1 relative">
          <Input
            {...register('password')}
            type="password"
            error={!!errors.password}
            className="pl-10"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {t.errors.passwordRequired[language]}
          </p>
        )}
      </motion.div>

      {mode === 'signup' && defaultRole === 'provider' && (
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700">
            {t.businessName[language]}
          </label>
          <div className="mt-1 relative">
            <Input
              {...register('businessName')}
              error={!!errors.businessName}
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-600">
              {t.errors.businessNameRequired[language]}
            </p>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            t.submitting[language]
          ) : (
            t[mode === 'login' ? 'login' : 'signup'][language]
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {t.orContinueWith[language]}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onGoogleSignIn}
          className="w-full"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="mr-2 h-5 w-5"
          />
          {t.googleSignIn[language]}
        </Button>
      </motion.div>
    </motion.form>
  );
};