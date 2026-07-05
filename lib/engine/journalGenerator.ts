import { ACTIONS } from '../knowledge/actions';
import { getEntrySide, getRuleExplanation } from '../knowledge/rules';
import type {
  AccountType,
  ActionMatch,
  Direction,
  EntityMatch,
  JournalEntry,
  JournalLine,
  ParsedInput,
  Side,
} from '../types';

/**
 * تحديد اتجاه التغيير لكل حساب بناءً على السياق (فعل + طريقة دفع)
 */
function determineDirection(
  entity: EntityMatch,
  parsed: ParsedInput,
  actions: ActionMatch[]
): Direction {
  const primaryAction = actions[0];

  // النقدية والبنك — إذا كان الفعل دفع/شراء/سداد فهي تقل، وإذا كان قبض/بيع فهي تزيد
  if (entity.accountId === 'cash' || entity.accountId === 'bank') {
    if (!primaryAction) return 'decrease';
    if (['payment', 'purchase', 'withdrawal'].includes(primaryAction.action)) {
      return 'decrease';
    }
    if (['receipt', 'collection', 'sale', 'deposit', 'loan', 'investment', 'service_provided'].includes(primaryAction.action)) {
      return 'increase';
    }
    return 'decrease';
  }

  // المدينون — تزيد بالبيع الآجل، وتنقص بالتحصيل
  if (entity.accountId === 'accounts_receivable') {
    if (primaryAction?.action === 'collection' || primaryAction?.action === 'receipt') return 'decrease';
    return 'increase';
  }

  // الدائنون — تزيد بالشراء الآجل، وتنقص بالسداد
  if (entity.accountId === 'accounts_payable') {
    if (primaryAction?.action === 'payment') return 'decrease';
    return 'increase';
  }

  // القروض — تزيد بالاقتراض، وتنقص بالسداد
  if (entity.accountId === 'loans') {
    if (primaryAction?.action === 'payment') return 'decrease';
    return 'increase';
  }

  // المسحوبات دائماً تزيد (نقص حقوق ملكية)
  if (entity.accountId === 'drawings') return 'increase';

  // رأس المال يزيد بالإيداع
  if (entity.accountId === 'capital') return 'increase';

  // الإيرادات دائماً تزيد في السياق العادي
  if (entity.accountType === 'revenue') return 'increase';

  // المصروفات دائماً تزيد
  if (entity.accountType === 'expense') return 'increase';

  // الأصول الأخرى — الفعل الافتراضي
  if (primaryAction?.action === 'purchase') return 'increase';
  if (primaryAction?.action === 'sale') return 'decrease';

  return 'increase';
}

/**
 * توليد قيد يومية متوازن
 */
export function generateJournalEntry(
  parsed: ParsedInput,
  entities: EntityMatch[],
  actions: ActionMatch[]
): JournalEntry {
  const amount = parsed.amount ?? 0;

  const lines: JournalLine[] = entities.map((entity) => {
    const direction = determineDirection(entity, parsed, actions);
    const side: Side = getEntrySide(entity.accountType as AccountType, direction);
    return {
      accountId: entity.accountId,
      accountName: entity.accountName,
      accountType: entity.accountType,
      icon: entity.icon,
      side,
      direction,
      amount,
      reasoning: getRuleExplanation(entity.accountType as AccountType, direction),
    };
  });

  const totalDebit = lines.filter((l) => l.side === 'debit').reduce((s, l) => s + l.amount, 0);
  const totalCredit = lines.filter((l) => l.side === 'credit').reduce((s, l) => s + l.amount, 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.01 && lines.length >= 2;

  return {
    id: `journal_${Date.now()}`,
    lines,
    totalDebit,
    totalCredit,
    balanced,
  };
}
