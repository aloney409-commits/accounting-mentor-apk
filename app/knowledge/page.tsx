'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { AccountCard } from '@/components/visualization/AccountCard';
import { ACCOUNTS, searchAccounts } from '@/lib/knowledge/accounts';
import { ACTIONS } from '@/lib/knowledge/actions';
import { RULES } from '@/lib/knowledge/rules';

type Tab = 'accounts' | 'rules' | 'actions';

export default function KnowledgePage() {
  const [tab, setTab] = useState<Tab>('accounts');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAccounts = useMemo(() => {
    let list = search ? searchAccounts(search) : ACCOUNTS;
    if (filterType !== 'all') {
      list = list.filter((a) => a.type === filterType);
    }
    return list;
  }, [search, filterType]);

  return (
    <main className="min-h-screen pb-12 max-w-6xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">قاعدة المعرفة 📚</h1>
        <BackButton />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'accounts', label: 'دليل الحسابات', icon: '📊' },
          { key: 'rules', label: 'القواعد الذهبية', icon: '⚖️' },
          { key: 'actions', label: 'الأفعال المحاسبية', icon: '🎯' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as Tab)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
              ${tab === t.key ? 'bg-primary text-white shadow-elev-2' : 'bg-surface-container-high text-on-surface-variant'}
            `}
          >
            <span>{t.icon}</span>
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      {tab === 'accounts' && (
        <>
          <Card padding="md" className="mb-4">
            <Input
              placeholder="ابحث عن حساب..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'الكل' },
                { key: 'asset', label: 'أصول' },
                { key: 'liability', label: 'التزامات' },
                { key: 'equity', label: 'حقوق ملكية' },
                { key: 'revenue', label: 'إيرادات' },
                { key: 'expense', label: 'مصروفات' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all
                    ${filterType === f.key ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAccounts.map((acc, i) => (
              <AccountCard
                key={acc.id}
                accountId={acc.id}
                accountName={acc.nameAr}
                accountType={acc.type}
                icon={acc.icon}
                delay={i * 0.03}
              />
            ))}
          </div>
          {filteredAccounts.length === 0 && (
            <Card padding="lg" className="text-center text-on-surface-variant">
              لم يتم العثور على حسابات مطابقة
            </Card>
          )}
        </>
      )}

      {tab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {RULES.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card padding="md">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant={rule.accountType === 'asset' || rule.accountType === 'expense' ? 'info' : 'primary'}>
                    {rule.accountType === 'asset'
                      ? 'أصل'
                      : rule.accountType === 'liability'
                      ? 'التزام'
                      : rule.accountType === 'equity'
                      ? 'حقوق ملكية'
                      : rule.accountType === 'revenue'
                      ? 'إيراد'
                      : 'مصروف'}
                  </Badge>
                  <Badge variant={rule.direction === 'increase' ? 'success' : 'error'}>
                    {rule.direction === 'increase' ? '↑ زاد' : '↓ نقص'}
                  </Badge>
                  <span>⟵</span>
                  <Badge variant={rule.side === 'debit' ? 'info' : 'primary'}>
                    {rule.side === 'debit' ? 'مدين' : 'دائن'}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-2">{rule.explanation}</p>
                <div className="p-2 rounded-lg bg-surface-container text-xs text-on-surface-variant">
                  <b>مثال:</b> {rule.example}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'actions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ACTIONS.map((action, i) => (
            <motion.div
              key={action.action}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card padding="md">
                <h4 className="font-bold text-lg mb-1">{action.label}</h4>
                <p className="text-xs text-on-surface-variant mb-2">
                  الأثر الافتراضي:{' '}
                  <Badge variant={action.defaultEffect === 'increase' ? 'success' : 'error'} size="sm">
                    {action.defaultEffect === 'increase' ? 'زيادة' : 'نقصان'}
                  </Badge>
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {action.keywords.slice(0, 5).map((k, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 rounded-full bg-surface-container text-xs"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
