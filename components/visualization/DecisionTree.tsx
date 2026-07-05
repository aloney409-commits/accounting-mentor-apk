'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import type { AccountType, Direction } from '@/lib/types';

interface Props {
  accountType?: AccountType;
  direction?: Direction;
}

const TYPE_LABELS: Record<AccountType, string> = {
  asset: 'أصل',
  liability: 'التزام',
  equity: 'حقوق ملكية',
  revenue: 'إيراد',
  expense: 'مصروف',
};

export function DecisionTree({ accountType, direction }: Props) {
  const debitTypes: AccountType[] = ['asset', 'expense'];
  const isDebit =
    accountType && direction
      ? (debitTypes.includes(accountType) && direction === 'increase') ||
        (!debitTypes.includes(accountType) && direction === 'decrease')
      : false;

  return (
    <Card padding="md" className="bg-surface-container-high">
      <h4 className="text-center font-bold mb-4">شجرة القرار المحاسبي</h4>

      <div className="flex flex-col items-center gap-2">
        {/* الجذر */}
        <div className="px-4 py-2 rounded-lg bg-primary text-white font-medium">
          ما نوع الحساب؟
        </div>
        <div className="w-0.5 h-4 bg-outline-variant" />

        {/* الفروع */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Asset/Expense */}
          <motion.div
            animate={{
              scale: debitTypes.includes(accountType as AccountType) ? 1.05 : 1,
              opacity: debitTypes.includes(accountType as AccountType) ? 1 : 0.5,
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium">
              أصل / مصروف
            </div>
            <div className="text-xs text-on-surface-variant">
              زاد ⟵ مدين | نقص ⟵ دائن
            </div>
          </motion.div>

          {/* Liability/Equity/Revenue */}
          <motion.div
            animate={{
              scale:
                accountType && !debitTypes.includes(accountType as AccountType) ? 1.05 : 1,
              opacity:
                accountType && !debitTypes.includes(accountType as AccountType) ? 1 : 0.5,
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium">
              التزام / حقوق / إيراد
            </div>
            <div className="text-xs text-on-surface-variant">
              زاد ⟵ دائن | نقص ⟵ مدين
            </div>
          </motion.div>
        </div>

        {accountType && direction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-xl bg-primary-container text-primary text-center font-bold"
          >
            {TYPE_LABELS[accountType]} {direction === 'increase' ? 'زاد' : 'نقص'} ⟵{' '}
            {isDebit ? 'مدين' : 'دائن'}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
