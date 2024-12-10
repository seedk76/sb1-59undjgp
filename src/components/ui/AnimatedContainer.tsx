import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};