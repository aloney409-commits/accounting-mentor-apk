'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { JournalLine } from '@/lib/types';

interface Props {
  lines: JournalLine[];
  totalDebit?: number;
  totalCredit?: number;
  balanced?: boolean;
}

export function BalanceVisualization({ lines, totalDebit, totalCredit, balanced }: Props) {
  const debits = lines.filter((l) => l.side === 'debit');
  const credits = lines.filter((l) => l.side === 'credit');
  const sumDebit = totalDebit ?? debits.reduce((s, l) => s + l.amount, 0);
  const sumCredit = totalCredit ?? credits.reduce((s, l) => s + l.amount, 0);
  const isBalanced = balanced ?? Math.abs(sumDebit - sumCredit) < 0.01;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* المدين */}
        <Card padding="md" className="bg-blue-50 dark:bg-blue-950/30 border-t-4 border-blue-500">
          <h4 className="text-center font-bold text-blue-700 dark:text-blue-300 mb-3">
            مدين (من حـ/)
          </h4>
          <div className="space-y-2">
            {debits.length === 0 && (
              <div className="text-center text-sm text-on-surface-variant">لا يوجد</div>
            )}
            {debits.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 dark:bg-white/10 p-3 rounded-lg flex justify-between items-center"
              >
                <span className="flex items-center gap-2 text-sm">
                  <span>{line.icon || '📊'}</span>
                  <span>{line.accountName}</span>
                </span>
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  {line.amount.toLocaleString('ar-EG')}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800 flex justify-between font-bold">
            <span>الإجمالي:</span>
            <span>{sumDebit.toLocaleString('ar-EG')}</span>
          </div>
        </Card>

        {/* الدائن */}
        <Card padding="md" className="bg-purple-50 dark:bg-purple-950/30 border-t-4 border-purple-500">
          <h4 className="text-center font-bold text-purple-700 dark:text-purple-300 mb-3">
            دائن (إلى حـ/)
          </h4>
          <div className="space-y-2">
            {credits.length === 0 && (
              <div className="text-center text-sm text-on-surface-variant">لا يوجد</div>
            )}
            {credits.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 dark:bg-white/10 p-3 rounded-lg flex justify-between items-center"
              >
                <span className="flex items-center gap-2 text-sm">
                  <span>{line.icon || '📊'}</span>
                  <span>{line.accountName}</span>
                </span>
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {line.amount.toLocaleString('ar-EG')}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-purple-200 dark:border-purple-800 flex justify-between font-bold">
            <span>الإجمالي:</span>
            <span>{sumCredit.toLocaleString('ar-EG')}</span>
          </div>
        </Card>
      </div>

      {/* حالة التوازن */}
      <div className="flex justify-center">
        <Badge variant={isBalanced ? 'success' : 'error'} size="md">
          {isBalanced ? '✓ القيد متوازن' : '✗ القيد غير متوازن'}
        </Badge>
      </div>
    </div>
  );
}
