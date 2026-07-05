'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type Padding = 'none' | 'sm' | 'md' | 'lg';
type Variant = 'default' | 'high' | 'outlined' | 'glass';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  padding?: Padding;
  variant?: Variant;
  interactive?: boolean;
  children?: React.ReactNode;
}

const paddingStyles: Record<Padding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantStyles: Record<Variant, string> = {
  default:
    'bg-surface-container dark:bg-[#1D1B20] shadow-elev-1 border border-transparent',
  high:
    'bg-surface-container-high dark:bg-[#22212B] shadow-elev-2 border border-transparent',
  outlined:
    'bg-transparent border border-outline-variant',
  glass: 'glass',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { padding = 'md', variant = 'default', interactive = false, className = '', children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -3 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`
          rounded-2xl transition-all
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${interactive ? 'cursor-pointer hover:shadow-elev-3' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
