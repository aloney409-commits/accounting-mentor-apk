'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type Variant = 'filled' | 'tonal' | 'outlined' | 'text' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  filled:
    'bg-primary text-white hover:bg-primary-dark shadow-elev-1 hover:shadow-elev-2',
  tonal:
    'bg-primary-container text-primary hover:bg-primary-light',
  outlined:
    'border-2 border-primary text-primary hover:bg-primary-container/40 bg-transparent',
  text: 'text-primary hover:bg-primary-container/40 bg-transparent',
  danger:
    'bg-error text-white hover:bg-error/90 shadow-elev-1',
  success:
    'bg-success text-white hover:bg-success/90 shadow-elev-1',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm min-h-[40px] rounded-lg',
  md: 'px-6 py-3 text-base min-h-[48px] rounded-xl',
  lg: 'px-8 py-4 text-lg min-h-[56px] rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      icon,
      iconPosition = 'start',
      loading = false,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'start' && <span className="flex-shrink-0">{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'end' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
