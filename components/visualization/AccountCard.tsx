'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { AccountType, Direction, Side } from '@/lib/types';

interface AccountCardProps {
  accountId: string;
  accountName: string;
  accountType: AccountType;
  icon?: string;
  amount?: number;
  side?: Side;
  direction?: Direction;
  highlighted?: boolean;
  delay?: number;
  compact?: boolean;
}

const TYPE_LABELS: Record<AccountType, string> = {
  asset: 'أصل',
  liability: 'التزام',
  equity: 'حقوق ملكية',
  revenue: 'إيراد',
  expense: 'مصروف',
};

const TYPE_COLORS: Record<AccountType, 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  asset: 'info',
  liability: 'error',
  equity: 'primary',
  revenue: 'success',
  expense: 'warning',
};

export function AccountCard({
  accountName,
  accountType,
  icon,
  amount,
  side,
  direction,
  highlighted = false,
  delay = 0,
  compact = false,
}: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.03, y: -3 }}
      className={`
        account-card ${accountType} ${compact ? 'p-3' : 'p-4'}
        ${highlighted ? 'ring-2 ring-primary shadow-elev-3' : 'shadow-elev-1'}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 ${compact ? 'text-2xl' : 'text-3xl'}`}>
          {icon || '📊'}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold ${compact ? 'text-sm' : 'text-base'} truncate`}>
            {accountName}
          </h4>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <Badge variant={TYPE_COLORS[accountType]} size="sm">
              {TYPE_LABELS[accountType]}
            </Badge>
            {direction && (
              <Badge variant={direction === 'increase' ? 'success' : 'error'} size="sm">
                {direction === 'increase' ? '↑ زيادة' : '↓ نقص'}
              </Badge>
            )}
            {side && (
              <Badge variant={side === 'debit' ? 'info' : 'primary'} size="sm">
                {side === 'debit' ? 'مدين' : 'دائن'}
              </Badge>
            )}
          </div>
          {typeof amount === 'number' && amount > 0 && (
            <div className="mt-2 text-sm font-bold text-primary">
              {amount.toLocaleString('ar-EG')}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
