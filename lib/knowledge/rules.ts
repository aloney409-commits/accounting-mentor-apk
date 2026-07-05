import type { AccountType, Direction, Side } from '../types';

/**
 * القواعد الذهبية للمحاسبة - Golden Accounting Rules
 *
 * الأصول (Assets): زاد ? مدين | نقص ? دائن
 * المصروفات (Expenses): زاد ? مدين | نقص ? دائن
 * الالتزامات (Liabilities): زاد ? دائن | نقص ? مدين
 * حقوق الملكية (Equity): زاد ? دائن | نقص ? مدين
 * الإيرادات (Revenues): زاد ? دائن | نقص ? مدين
 */
export function getEntrySide(accountType: AccountType, direction: Direction): Side {
  if (accountType === 'asset' || accountType === 'expense') {
    return direction === 'increase' ? 'debit' : 'credit';
  }
  return direction === 'increase' ? 'credit' : 'debit';
}

const TYPE_AR: Record<AccountType, string> = {
  asset: 'الأصل',
  liability: 'الالتزام',
  expense: 'المصروف',
  revenue: 'الإيراد',
  equity: 'حقوق الملكية',
};

const DIR_AR: Record<Direction, string> = {
  increase: 'زاد',
  decrease: 'نقص',
};

const SIDE_AR: Record<Side, string> = {
  debit: 'مديناً',
  credit: 'دائناً',
};

export function getRuleExplanation(accountType: AccountType, direction: Direction): string {
  const side = getEntrySide(accountType, direction);
  return `${TYPE_AR[accountType]} ${DIR_AR[direction]}، إذن يكون ${SIDE_AR[side]}`;
}

export interface Rule {
  accountType: AccountType;
  direction: Direction;
  side: Side;
  explanation: string;
  example: string;
}

export const RULES: Rule[] = [
  {
    accountType: 'asset',
    direction: 'increase',
    side: 'debit',
    explanation: 'زيادة الأصل تُسجَّل في الجانب المدين',
    example: 'شراء جهاز كمبيوتر: المعدات (أصل زاد) ⟵ مدين',
  },
  {
    accountType: 'asset',
    direction: 'decrease',
    side: 'credit',
    explanation: 'نقص الأصل يُسجَّل في الجانب الدائن',
    example: 'دفع مبلغ نقدي: النقدية (أصل نقص) ⟵ دائن',
  },
  {
    accountType: 'expense',
    direction: 'increase',
    side: 'debit',
    explanation: 'زيادة المصروف تُسجَّل في الجانب المدين',
    example: 'دفع الإيجار: مصروف الإيجار (مصروف زاد) ⟵ مدين',
  },
  {
    accountType: 'expense',
    direction: 'decrease',
    side: 'credit',
    explanation: 'نقص المصروف يُسجَّل في الجانب الدائن (نادر)',
    example: 'استرداد مصروف مدفوع سابقاً',
  },
  {
    accountType: 'liability',
    direction: 'increase',
    side: 'credit',
    explanation: 'زيادة الالتزام تُسجَّل في الجانب الدائن',
    example: 'شراء بضاعة بالأجل: الدائنون (التزام زاد) ⟵ دائن',
  },
  {
    accountType: 'liability',
    direction: 'decrease',
    side: 'debit',
    explanation: 'نقص الالتزام يُسجَّل في الجانب المدين',
    example: 'سداد للمورد: الدائنون (التزام نقص) ⟵ مدين',
  },
  {
    accountType: 'equity',
    direction: 'increase',
    side: 'credit',
    explanation: 'زيادة رأس المال تُسجَّل في الجانب الدائن',
    example: 'إيداع المالك مالاً: رأس المال (حقوق ملكية زاد) ⟵ دائن',
  },
  {
    accountType: 'equity',
    direction: 'decrease',
    side: 'debit',
    explanation: 'نقص حقوق الملكية يُسجَّل في الجانب المدين',
    example: 'مسحوبات شخصية للمالك: المسحوبات ⟵ مدين',
  },
  {
    accountType: 'revenue',
    direction: 'increase',
    side: 'credit',
    explanation: 'زيادة الإيراد تُسجَّل في الجانب الدائن',
    example: 'بيع بضاعة: إيراد المبيعات (إيراد زاد) ⟵ دائن',
  },
  {
    accountType: 'revenue',
    direction: 'decrease',
    side: 'debit',
    explanation: 'نقص الإيراد يُسجَّل في الجانب المدين (نادر)',
    example: 'مردودات المبيعات',
  },
];
