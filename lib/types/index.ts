/**
 * الأنواع العامة للتطبيق - Application-wide Types
 */

export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';

export type Direction = 'increase' | 'decrease';
export type Side = 'debit' | 'credit';
export type PaymentMethod = 'cash' | 'credit' | 'bank' | 'unknown';

export interface AccountDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  type: AccountType;
  category: string;
  icon: string;
  keywords: string[];
  synonyms: string[];
  description: string;
}

export interface AccountingAction {
  action: string;
  label: string;
  keywords: string[];
  defaultEffect: Direction;
  affectsAccountType: AccountType[];
}

export interface ParsedInput {
  originalText: string;
  normalizedText: string;
  amount: number | null;
  paymentMethod: PaymentMethod;
}

export interface EntityMatch {
  accountId: string;
  accountName: string;
  accountType: AccountType;
  icon?: string;
  confidence: number;
  isNew: boolean;
}

export interface ActionMatch {
  action: string;
  label: string;
  defaultEffect: Direction;
  confidence: number;
}

export interface JournalLine {
  accountId: string;
  accountName: string;
  accountType: AccountType;
  icon?: string;
  side: Side;
  direction: Direction;
  amount: number;
  reasoning: string;
}

export interface JournalEntry {
  id: string;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
  balanced: boolean;
}

export interface AnalysisStep {
  step: number;
  key: string;
  question: string;
  answer: string;
  hint?: string;
  data?: any;
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  originalText: string;
  parsed: ParsedInput;
  entities: EntityMatch[];
  actions: ActionMatch[];
  journal: JournalEntry;
  steps: AnalysisStep[];
  summary: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  text: string;
  result: AnalysisResult;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type AnimationSpeed = 'none' | 'fast' | 'normal' | 'slow';

export interface AppSettings {
  theme: ThemeMode;
  fontSize: FontSize;
  animationSpeed: AnimationSpeed;
  showHints: boolean;
  autoAdvance: boolean;
  language: 'ar' | 'en';
}

export interface QuizScenario {
  id: string;
  text: string;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedAccounts: string[];
  expectedLines: {
    accountId: string;
    side: Side;
    amount: number;
  }[];
  explanation: string;
}
