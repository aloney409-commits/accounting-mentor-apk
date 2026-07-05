import { parseArabicText } from './parser';
import { extractActions, extractEntities } from './classifier';
import { generateJournalEntry } from './journalGenerator';
import type { AnalysisResult, AnalysisStep } from '../types';

/**
 * التحليل الرئيسي — 8 خطوات
 */
export function analyzeTransaction(text: string): AnalysisResult {
  const parsed = parseArabicText(text);
  const entities = extractEntities(parsed);
  const actions = extractActions(parsed);
  const journal = generateJournalEntry(parsed, entities, actions);

  const steps: AnalysisStep[] = [
    {
      step: 1,
      key: 'what_happened',
      question: 'ما الذي حدث في هذه العملية؟',
      answer: parsed.originalText,
      hint: 'نقرأ النص جيداً ونفهم الحدث دون الاستعجال بالحكم',
    },
    {
      step: 2,
      key: 'what_changed',
      question: 'ما الذي تغيّر في المنشأة؟',
      answer: actions.length
        ? `تم رصد الأفعال التالية: ${actions.map((a) => a.label).join(', ')}`
        : 'لم يتم التعرف على فعل واضح — قد تكون هذه معاملة جديدة.',
      hint: 'كل معاملة محاسبية تُغيّر شيئاً — إما زيادة أو نقصان في حساب.',
      data: { actions },
    },
    {
      step: 3,
      key: 'accounts_affected',
      question: 'ما الحسابات المتأثرة؟',
      answer: entities.length
        ? entities.map((e) => `${e.icon || ''} ${e.accountName}`).join(' — ')
        : 'لم يتم العثور على حسابات معروفة في النص',
      hint: 'كل معاملة تؤثر في حسابين على الأقل (مبدأ القيد المزدوج)',
      data: { entities },
    },
    {
      step: 4,
      key: 'classify_accounts',
      question: 'ما نوع كل حساب؟ (أصل / التزام / حقوق ملكية / إيراد / مصروف)',
      answer: entities.length
        ? entities
            .map((e) => `${e.accountName} ⟵ ${TYPE_LABEL[e.accountType]}`)
            .join(' | ')
        : '—',
      hint: 'التصنيف يحدد القاعدة التي سنطبقها',
      data: { entities },
    },
    {
      step: 5,
      key: 'direction',
      question: 'هل زاد الحساب أم نقص؟',
      answer: journal.lines.length
        ? journal.lines
            .map((l) => `${l.accountName}: ${l.direction === 'increase' ? 'زاد' : 'نقص'}`)
            .join(' | ')
        : '—',
      hint: 'اسأل نفسك: هل هذا الحساب أصبح أكبر أم أصغر بعد المعاملة؟',
      data: { lines: journal.lines },
    },
    {
      step: 6,
      key: 'debit_or_credit',
      question: 'إذن، أي حساب مدين وأي حساب دائن؟',
      answer: journal.lines
        .map((l) => `${l.accountName}: ${l.side === 'debit' ? 'مدين' : 'دائن'} (${l.reasoning})`)
        .join(' | '),
      hint: 'استخدم القواعد الذهبية: الأصل/المصروف يزيد مديناً؛ الالتزام/حقوق الملكية/الإيراد يزيد دائناً',
      data: { lines: journal.lines },
    },
    {
      step: 7,
      key: 'balance_check',
      question: 'هل القيد متوازن؟',
      answer: journal.balanced
        ? `نعم، مجموع المدين = مجموع الدائن = ${journal.totalDebit.toLocaleString('ar-EG')}`
        : `تحذير: المدين (${journal.totalDebit}) ≠ الدائن (${journal.totalCredit})`,
      hint: 'كل قيد صحيح يجب أن يكون متوازناً — إن لم يكن، فهناك خطأ',
      data: {
        totalDebit: journal.totalDebit,
        totalCredit: journal.totalCredit,
        balanced: journal.balanced,
      },
    },
    {
      step: 8,
      key: 'journal_entry',
      question: 'القيد المحاسبي النهائي',
      answer: formatJournal(journal),
      hint: 'هذا هو القيد جاهزاً للتسجيل في دفتر اليومية',
      data: { journal },
    },
  ];

  const summary = journal.balanced
    ? `تم تحليل المعاملة إلى قيد متوازن يشمل ${journal.lines.length} أسطر بقيمة ${journal.totalDebit.toLocaleString('ar-EG')}`
    : 'تم تحليل المعاملة، ولكن هناك حاجة لمراجعة المعلومات لضمان توازن القيد';

  return {
    id: `analysis_${Date.now()}`,
    timestamp: Date.now(),
    originalText: text,
    parsed,
    entities,
    actions,
    journal,
    steps,
    summary,
  };
}

const TYPE_LABEL: Record<string, string> = {
  asset: 'أصل',
  liability: 'التزام',
  equity: 'حقوق ملكية',
  revenue: 'إيراد',
  expense: 'مصروف',
};

function formatJournal(journal: { lines: any[]; totalDebit: number; totalCredit: number }) {
  const debits = journal.lines.filter((l) => l.side === 'debit');
  const credits = journal.lines.filter((l) => l.side === 'credit');
  const parts: string[] = [];
  debits.forEach((l) => parts.push(`من حـ/ ${l.accountName} ${l.amount.toLocaleString('ar-EG')}`));
  credits.forEach((l) =>
    parts.push(`  إلى حـ/ ${l.accountName} ${l.amount.toLocaleString('ar-EG')}`)
  );
  return parts.join('\n');
}
