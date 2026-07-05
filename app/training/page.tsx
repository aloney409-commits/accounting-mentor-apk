'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { BalanceVisualization } from '@/components/visualization/BalanceVisualization';
import { TRAINING_SCENARIOS } from '@/lib/knowledge/scenarios';
import { analyzeTransaction } from '@/lib/engine';

export default function TrainingPage() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'question' | 'thinking' | 'answer'>('question');

  const scenario = TRAINING_SCENARIOS[idx];
  const analysis = analyzeTransaction(scenario.text);

  const goNext = () => {
    setIdx((i) => (i + 1) % TRAINING_SCENARIOS.length);
    setPhase('question');
  };

  const goPrev = () => {
    setIdx((i) => (i - 1 + TRAINING_SCENARIOS.length) % TRAINING_SCENARIOS.length);
    setPhase('question');
  };

  return (
    <main className="min-h-screen pb-12 max-w-4xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">وضع التدريب 👨‍🏫</h1>
        <BackButton />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="info">
          سيناريو {idx + 1} من {TRAINING_SCENARIOS.length}
        </Badge>
        <Badge variant="primary">{scenario.domain}</Badge>
        <Badge
          variant={
            scenario.difficulty === 'easy' ? 'success' : scenario.difficulty === 'medium' ? 'warning' : 'error'
          }
        >
          {scenario.difficulty === 'easy' ? 'سهل' : scenario.difficulty === 'medium' ? 'متوسط' : 'صعب'}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${idx}-${phase}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <Card padding="lg" className="mb-4">
            <p className="text-sm text-on-surface-variant mb-2">المعاملة:</p>
            <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
              {scenario.text}
            </h2>
          </Card>

          {phase === 'question' && (
            <Card padding="lg" className="bg-primary-container/40">
              <h3 className="font-bold mb-2 text-lg">🤔 فكّر بهدوء</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li>• ما الحسابات المتأثرة؟</li>
                <li>• ما نوع كل حساب؟ (أصل/مصروف/إيراد/التزام)</li>
                <li>• هل زاد أم نقص؟</li>
                <li>• من المدين ومن الدائن؟</li>
              </ul>
              <Button onClick={() => setPhase('thinking')} fullWidth className="mt-4" size="lg">
                عندي جواب — أرني التلميحات
              </Button>
            </Card>
          )}

          {phase === 'thinking' && (
            <Card padding="lg" className="bg-warning-container/40">
              <h3 className="font-bold mb-3 text-lg">💡 التلميحات</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/70 dark:bg-white/10">
                  <p className="text-sm font-medium mb-1">الحسابات المتأثرة:</p>
                  <p className="text-sm">
                    {analysis.entities.map((e) => `${e.icon} ${e.accountName}`).join(' & ')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/70 dark:bg-white/10">
                  <p className="text-sm font-medium mb-1">النوع:</p>
                  <p className="text-sm">
                    {analysis.entities
                      .map(
                        (e) =>
                          `${e.accountName} = ${
                            e.accountType === 'asset'
                              ? 'أصل'
                              : e.accountType === 'liability'
                              ? 'التزام'
                              : e.accountType === 'equity'
                              ? 'حقوق ملكية'
                              : e.accountType === 'revenue'
                              ? 'إيراد'
                              : 'مصروف'
                          }`
                      )
                      .join(' | ')}
                  </p>
                </div>
              </div>
              <Button onClick={() => setPhase('answer')} fullWidth className="mt-4" size="lg">
                اكشف الإجابة الكاملة
              </Button>
            </Card>
          )}

          {phase === 'answer' && (
            <div className="space-y-4">
              <Card padding="lg" className="bg-success-container/40">
                <h3 className="font-bold mb-3 text-lg">✅ القيد المحاسبي</h3>
                <BalanceVisualization
                  lines={analysis.journal.lines}
                  totalDebit={analysis.journal.totalDebit}
                  totalCredit={analysis.journal.totalCredit}
                  balanced={analysis.journal.balanced}
                />
              </Card>

              <Card padding="lg">
                <h3 className="font-bold mb-2 text-lg">📖 الشرح</h3>
                <p className="text-base leading-relaxed">{scenario.explanation}</p>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 mt-6">
        <Button variant="outlined" onClick={goPrev}>
          ← السابق
        </Button>
        <Button onClick={goNext}>التالي →</Button>
      </div>
    </main>
  );
}
