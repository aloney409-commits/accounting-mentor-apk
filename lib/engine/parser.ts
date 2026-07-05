import type { ParsedInput, PaymentMethod } from '../types';

/**
 * تطبيع النص العربي - Normalize Arabic text
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[إأآا]/g, 'ا')
    .replace(/[ىي]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u0652]/g, '') // remove diacritics
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * استخراج المبلغ من النص
 */
export function extractAmount(text: string): number | null {
  const patterns = [
    /(\d+(?:[.,]\d+)?)\s*(?:دولار|جنيه|ريال|درهم|دينار)/i,
    /(?:بمبلغ|بقيمة|بقدر)\s*(\d+(?:[.,]\d+)?)/i,
    /(\d+(?:[.,]\d+)?)/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const cleaned = m[1].replace(',', '.');
      const n = parseFloat(cleaned);
      if (!isNaN(n) && n > 0) return n;
    }
  }
  return null;
}

/**
 * استنتاج طريقة الدفع من النص
 */
export function detectPaymentMethod(normalized: string): PaymentMethod {
  if (/نقدا|كاش|نقدي/.test(normalized)) return 'cash';
  if (/بنك|شيك|تحويل|ايداع/.test(normalized)) return 'bank';
  if (/اجل|دين|علي الحساب/.test(normalized)) return 'credit';
  return 'unknown';
}

/**
 * الدالة الرئيسية للتحليل النصي
 */
export function parseArabicText(text: string): ParsedInput {
  const normalized = normalizeArabic(text);
  const amount = extractAmount(normalized);
  const paymentMethod = detectPaymentMethod(normalized);
  return {
    originalText: text,
    normalizedText: normalized,
    amount,
    paymentMethod,
  };
}
