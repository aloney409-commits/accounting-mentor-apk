'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { AccountCard } from '@/components/visualization/AccountCard';
import { BalanceVisualization } from '@/components/visualization/BalanceVisualization';
import { Flowchart } from '@/components/visualization/Flowchart';
import { DecisionTree } from '@/components/visualization/DecisionTree';
import { analyzeTransaction } from '@/lib/engine';
import { saveToHistory } from '@/lib/storage';
import type { AnalysisResult } from '@/lib/types';

const EXAMPLES = [
  'اشتريت جهاز كمبيوتر بمبلغ 1200 دولار نقداً',
  'دفعت راتب الموظف 500 دولار نقداً',
  'قمت ببيع بضاعة بمبلغ 2000 دولار نقداً',
  'اشتريت بضاعة من مورد بالأجل بقيمة 3000 دولار',
];

export default function AnalyzePage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    // Small delay for UX
    await new Promise((r) => setTimeout(r, 300));
    const analysis = analyzeTransaction(input);
    setResult(analysis);
    setCurrentStep(0);
    try {
      await saveToHistory({
        timestamp: analysis.timestamp,
        text: analysis.originalText,
        result: analysis,
      });
    } catch {
      // ignore storage errors
    }
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setInput('');
    setCurrentStep(0);
  };

  const currentStepData = result?.steps[currentStep];
  const journalLine = currentStepData?.data?.lines?.[0] ?? result?.journal.lines[0];

  return (
    <main className="min-h-screen pb-12 max-w-6xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">تحليل معاملة محاسبية 🔍</h1>
        <BackButton />
      </div>

      {!result && (
        <Card padding="lg" className="mb-4">
          <Textarea
            label="اكتب المعاملة بالعربية"
            hint="مثال: اشتريت جهاز كمبيوتر بمبلغ 1200 دولار نقداً"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="اكتب هنا..."
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-on-surface-variant self-center">أمثلة سريعة:</span>
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setInput(ex)}
                className="text-xs px-3 py-1 rounded-full bg-primary-container text-primary hover:bg-primary-light transition-colors"
              >
                {ex.slice(0, 30)}...
              </button>
            ))}
          </div>
          <Button
            onClick={handleAnalyze}
            fullWidth
            loading={loading}
            disabled={!input.trim()}
            className="mt-6"
            size="lg"
          >
            ابدأ التحليل الذكي
          </Button>
        </Card>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Flowchart sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card padding="md">
              <h3 className="font-bold mb-3 text-center">خطوات التفكير</h3>
              <Flowchart currentStep={currentStep} />
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-4">
            <Card padding="md" className="bg-primary-container/30">
              <p className="text-sm text-on-surface-variant mb-1">المعاملة:</p>
              <p className="text-lg font-medium">{result.originalText}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.parsed.amount && (
                  <Badge variant="success">💰 المبلغ: {result.parsed.amount.toLocaleString('ar-EG')}</Badge>
                )}
                {result.parsed.paymentMethod !== 'unknown' && (
                  <Badge variant="info">
                    طريقة الدفع:{' '}
                    {result.parsed.paymentMethod === 'cash' ? 'نقداً' :
                     result.parsed.paymentMethod === 'bank' ? 'بنك' : 'آجل'}
                  </Badge>
                )}
              </div>
            </Card>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="primary" size="md">
                      الخطوة {currentStep + 1} من {result.steps.length}
                    </Badge>
                    <span className="text-sm text-on-surface-variant">
                      {Math.round(((currentStep + 1) / result.steps.length) * 100)}%
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    {currentStepData?.question}
                  </h2>

                  <div className="p-4 rounded-xl bg-surface-container-high dark:bg-[#22212B] mb-4">
                    <p className="whitespace-pre-line text-base">{currentStepData?.answer}</p>
                  </div>

                  {currentStepData?.hint && (
                    <div className="p-3 rounded-xl bg-warning-container/50 border-r-4 border-warning mb-4 flex gap-2">
                      <span className="text-xl">💡</span>
                      <p className="text-sm text-on-surface">{currentStepData.hint}</p>
                    </div>
                  )}

                  {/* Step-specific visualizations */}
                  {currentStep === 2 && result.entities.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.entities.map((e, i) => (
                        <AccountCard
                          key={e.accountId}
                          {...e}
                          delay={i * 0.1}
                          highlighted
                        />
                      ))}
                    </div>
                  )}

                  {currentStep === 3 && result.entities.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.entities.map((e, i) => (
                        <AccountCard key={e.accountId} {...e} delay={i * 0.1} />
                      ))}
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.journal.lines.map((line, i) => (
                        <AccountCard
                          key={i}
                          accountId={line.accountId}
                          accountName={line.accountName}
                          accountType={line.accountType}
                          icon={line.icon}
                          direction={line.direction}
                          amount={line.amount}
                          delay={i * 0.1}
                          highlighted
                        />
                      ))}
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      {journalLine && (
                        <DecisionTree
                          accountType={journalLine.accountType}
                          direction={journalLine.direction}
                        />
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.journal.lines.map((line, i) => (
                          <AccountCard
                            key={i}
                            accountId={line.accountId}
                            accountName={line.accountName}
                            accountType={line.accountType}
                            icon={line.icon}
                            direction={line.direction}
                            side={line.side}
                            amount={line.amount}
                            delay={i * 0.1}
                            highlighted
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {(currentStep === 6 || currentStep === 7) && (
                    <BalanceVisualization
                      lines={result.journal.lines}
                      totalDebit={result.journal.totalDebit}
                      totalCredit={result.journal.totalCredit}
                      balanced={result.journal.balanced}
                    />
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outlined"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
              >
                ← السابق
              </Button>
              <Button variant="text" onClick={handleReset}>
                🔄 تحليل جديد
              </Button>
              <Button
                onClick={() =>
                  setCurrentStep((s) => Math.min(result.steps.length - 1, s + 1))
                }
                disabled={currentStep >= result.steps.length - 1}
              >
                التالي →
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
