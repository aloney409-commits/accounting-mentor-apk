import type { AccountingAction, AccountType, Direction } from '../types';

export const ACTIONS: AccountingAction[] = [
  {
    action: 'purchase',
    label: 'شراء',
    keywords: ['اشتريت', 'اشترى', 'شراء', 'اقتناء', 'حصلت على', 'اقتنيت'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'expense'],
  },
  {
    action: 'sale',
    label: 'بيع',
    keywords: ['بعت', 'بيعت', 'باع', 'بيع', 'مبيعات', 'قمنا ببيع'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'revenue'],
  },
  {
    action: 'payment',
    label: 'دفع',
    keywords: ['دفعت', 'دفع', 'سدد', 'سددت', 'صرف', 'صرفت'],
    defaultEffect: 'decrease',
    affectsAccountType: ['asset', 'liability', 'expense'],
  },
  {
    action: 'receipt',
    label: 'قبض',
    keywords: ['قبضت', 'قبض', 'استلمت', 'استلم', 'حصلنا على'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'revenue'],
  },
  {
    action: 'collection',
    label: 'تحصيل',
    keywords: ['حصلت', 'حصّل', 'حصلنا', 'تحصيل', 'استلمنا من'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset'],
  },
  {
    action: 'deposit',
    label: 'إيداع',
    keywords: ['أودعت', 'اودعت', 'ايداع', 'إيداع', 'أودع'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset'],
  },
  {
    action: 'withdrawal',
    label: 'سحب',
    keywords: ['سحبت', 'سحب', 'سحبنا'],
    defaultEffect: 'decrease',
    affectsAccountType: ['asset', 'equity'],
  },
  {
    action: 'investment',
    label: 'استثمار',
    keywords: ['استثمر', 'استثمار', 'قدم رأس المال', 'زيادة رأس المال'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'equity'],
  },
  {
    action: 'loan',
    label: 'اقتراض',
    keywords: ['اقترض', 'اقتراض', 'اخذت قرض', 'أخذت قرض'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'liability'],
  },
  {
    action: 'service_provided',
    label: 'تقديم خدمة',
    keywords: ['قدمت خدمة', 'قدم خدمة', 'أنجزت خدمة'],
    defaultEffect: 'increase',
    affectsAccountType: ['asset', 'revenue'],
  },
];

export const TRANSACTION_PATTERNS = [
  { pattern: /دفعت\s+(\d+(?:[.,]\d+)?)/g, type: 'cash_payment' },
  { pattern: /(نقداً|نقدا|كاش)/g, type: 'cash_indicator' },
  { pattern: /(بالأجل|بالاجل|آجل|بالدين|علي الحساب|على الحساب)/g, type: 'credit_indicator' },
  { pattern: /(شيك|بشيك|بالشيك)/g, type: 'check_indicator' },
  { pattern: /(بنك|بالبنك|من البنك|إلى البنك|الي البنك)/g, type: 'bank_indicator' },
];

export function findAction(text: string): AccountingAction | undefined {
  const normalized = text.toLowerCase();
  return ACTIONS.find((a) => a.keywords.some((k) => normalized.includes(k)));
}

export function findAllActions(text: string): AccountingAction[] {
  const normalized = text.toLowerCase();
  return ACTIONS.filter((a) => a.keywords.some((k) => normalized.includes(k)));
}

export function inferDirection(
  action: AccountingAction | undefined,
  accountType: AccountType
): Direction {
  if (!action) return 'increase';
  if (action.affectsAccountType.includes(accountType)) {
    return action.defaultEffect;
  }
  // If we paid money, cash decreases even if action label says increase (for expense/asset)
  if (action.action === 'payment' && accountType === 'asset') return 'decrease';
  if (action.action === 'receipt' && accountType === 'asset') return 'increase';
  return action.defaultEffect;
}
