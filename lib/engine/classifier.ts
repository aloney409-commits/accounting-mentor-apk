import { ACCOUNTS } from '../knowledge/accounts';
import { findAllActions } from '../knowledge/actions';
import { normalizeArabic } from './parser';
import type { ActionMatch, EntityMatch, ParsedInput } from '../types';

/**
 * استخراج الحسابات المذكورة في النص
 */
export function extractEntities(parsed: ParsedInput): EntityMatch[] {
  const text = parsed.normalizedText.toLowerCase();
  const matches: EntityMatch[] = [];
  const seen = new Set<string>();

  for (const account of ACCOUNTS) {
    const allTerms = [
      ...account.keywords.map(normalizeArabic),
      ...account.synonyms.map(normalizeArabic),
      normalizeArabic(account.nameAr),
    ];
    let matched = false;
    let bestConfidence = 0;
    for (const term of allTerms) {
      const t = term.toLowerCase();
      if (t.length >= 3 && text.includes(t)) {
        matched = true;
        // longer term = higher confidence
        const conf = Math.min(0.95, 0.5 + t.length * 0.03);
        if (conf > bestConfidence) bestConfidence = conf;
      }
    }
    if (matched && !seen.has(account.id)) {
      seen.add(account.id);
      matches.push({
        accountId: account.id,
        accountName: account.nameAr,
        accountType: account.type,
        icon: account.icon,
        confidence: bestConfidence,
        isNew: false,
      });
    }
  }
  return matches;
}

/**
 * استخراج جميع الأفعال المحاسبية
 */
export function extractActions(parsed: ParsedInput): ActionMatch[] {
  const actions = findAllActions(parsed.normalizedText);
  return actions.map((a) => ({
    action: a.action,
    label: a.label,
    defaultEffect: a.defaultEffect,
    confidence: 0.85,
  }));
}
