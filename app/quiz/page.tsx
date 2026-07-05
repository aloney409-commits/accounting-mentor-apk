'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { BalanceVisualization } from '@/components/visualization/BalanceVisualization';
import { QUIZ_SCENARIOS } from '@/lib/knowledge/scenarios';
import { ACCOUNTS_BY_ID } from '@/lib/knowledge/accounts';
import { saveProgress } from '@/lib/storage';
import { analyzeTransaction } from '@/lib/engine';
import type { QuizScenario, Side } from '@/lib/types';

type Phase = 'idle' | 'playing' | 'review' | 'finished';

interface Choice {
  accountId: string;
  side: Side;
}

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<QuizScenario[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoices, setUserChoices] = useState<Choice[]>([]);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const startQuiz = (n: number) => {
    const shuffled = [...QUIZ_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, n);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setUserChoices([]);
    setScore(0);
    setShowAnswer(false);
    setPhase('playing');
  };

  const currentQ = questions[currentIdx];
  const analysis = currentQ ? analyzeTransaction(currentQ.text) : null;

  // Options for the current question — accounts detected + a few distractors
  const options = analysis
    ? Array.from(
        new Set([
          ...analysis.entities.map((e) => e.accountId),
          ...currentQ.expectedAccounts,
        ])
      )
        .map((id) => ACCOUNTS_BY_ID[id])
        .filter(Boolean)
    : [];

  const toggleChoice = (accountId: string, side: Side) => {
    setUserChoices((prev) => {
      const existing = prev.find((c) => c.accountId === accountId);
      if (existing) {
        if (existing.side === side) {
          return prev.filter((c) => c.accountId !== accountId);
        }
        return prev.map((c) => (c.accountId === accountId ? { ...c, side } : c));
      }
      return [...prev, { accountId, side }];
    });
  };

  const getChoice = (accountId: string): Side | undefined =>
    userChoices.find((c) => c.accountId === accountId)?.side;

  const checkAnswer = () => {
    const expected = currentQ.expectedLines;
    let correct = true;
    if (userChoices.length !== expected.length) correct = false;
    for (const exp of expected) {
      const uc = userChoices.find((c) => c.accountId === exp.accountId);
      if (!uc || uc.side !== exp.side) {
        correct = false;
        break;
      }
    }
    if (correct) setScore((s) => s + 1);
    setShowAnswer(true);
  };

  const nextQuestion = async () => {
    if (currentIdx + 1 >= questions.length) {
      // finish
      try {
        await saveProgress({
          id: 'quiz-general',
          type: 'quiz',
          score,
          completed: questions.length,
          total: questions.length,
        });
      } catch {
        // ignore
      }
      setPhase('finished');
      return;
    }
    setCurrentIdx((i) => i + 1);
    setUserChoices([]);
    setShowAnswer(false);
  };

  // ============= UI =============
  if (phase === 'idle') {
    return (
      <main className="min-h-screen pb-12 max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">وضع الاختبار 📝</h1>
          <BackButton />
        </div>
        <Card padding="lg">
          <h2 className="text-xl font-bold mb-4">اختبر فهمك المحاسبي</h2>
          <p className="text-on-surface-variant mb-6">
            سيتم اختيار أسئلة عشوائية من قاعدة السيناريوهات — حدد لكل حساب هل هو مدين أم دائن.
          </p>
          <label className="block text-sm font-medium mb-2">عدد الأسئلة:</label>
          <div className="flex gap-2 mb-6 flex-wrap">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`
                  px-4 py-2 rounded-full text-sm
                  ${count === n ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}
                `}
              >
                {n} سؤال
              </button>
            ))}
          </div>
          <Button onClick={() => startQuiz(count)} fullWidth size="lg">
            🚀 ابدأ الاختبار
          </Button>
        </Card>
      </main>
    );
  }

  if (phase === 'finished') {
    const percent = Math.round((score / questions.length) * 100);
    const grade =
      percent >= 90 ? '🏆 ممتاز!' : percent >= 70 ? '🎉 جيد جداً' : percent >= 50 ? '👍 جيد' : '📚 يحتاج مراجعة';
    return (
      <main className="min-h-screen pb-12 max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">النتيجة</h1>
          <BackButton />
        </div>
        <Card padding="lg" className="text-center">
          <div className="text-6xl mb-4">{grade.split(' ')[0]}</div>
          <h2 className="text-3xl font-bold mb-2">
            {score} / {questions.length}
          </h2>
          <p className="text-xl mb-2">{percent}%</p>
          <p className="text-on-surface-variant mb-6">{grade}</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button onClick={() => setPhase('idle')}>اختبار جديد</Button>
            <Button variant="outlined" onClick={() => (window.location.href = '/')}>
              العودة للرئيسية
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  // Playing phase
  return (
    <main className="min-h-screen pb-12 max-w-4xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">اختبار 📝</h1>
        <BackButton />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Badge variant="primary" size="md">
          سؤال {currentIdx + 1} / {questions.length}
        </Badge>
        <Badge variant="success" size="md">
          النتيجة: {score}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-surface-container-high rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card padding="lg" className="mb-4">
            <p className="text-sm text-on-surface-variant mb-2">المعاملة:</p>
            <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
              {currentQ.text}
            </h2>
          </Card>

          {!showAnswer && (
            <Card padding="lg" className="mb-4">
              <h3 className="font-bold mb-3">حدّد جانب كل حساب:</h3>
              <div className="space-y-3">
                {options.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-2xl">{acc.icon}</span>
                      <span className="font-medium truncate">{acc.nameAr}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleChoice(acc.id, 'debit')}
                        className={`
                          px-3 py-1.5 rounded-full text-sm font-medium transition-all
                          ${getChoice(acc.id) === 'debit' ? 'bg-blue-500 text-white' : 'bg-white/50 dark:bg-white/10'}
                        `}
                      >
                        مدين
                      </button>
                      <button
                        onClick={() => toggleChoice(acc.id, 'credit')}
                        className={`
                          px-3 py-1.5 rounded-full text-sm font-medium transition-all
                          ${getChoice(acc.id) === 'credit' ? 'bg-purple-500 text-white' : 'bg-white/50 dark:bg-white/10'}
                        `}
                      >
                        دائن
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={checkAnswer}
                fullWidth
                className="mt-6"
                size="lg"
                disabled={userChoices.length === 0}
              >
                تحقّق من إجابتي
              </Button>
            </Card>
          )}

          {showAnswer && analysis && (
            <div className="space-y-4">
              <Card padding="lg" className="bg-success-container/40">
                <h3 className="font-bold mb-3 text-lg">✅ الإجابة الصحيحة</h3>
                <BalanceVisualization
                  lines={analysis.journal.lines}
                  totalDebit={analysis.journal.totalDebit}
                  totalCredit={analysis.journal.totalCredit}
                  balanced={analysis.journal.balanced}
                />
              </Card>
              <Card padding="md">
                <h4 className="font-bold mb-2">📖 التفسير</h4>
                <p>{currentQ.explanation}</p>
              </Card>
              <Button onClick={nextQuestion} fullWidth size="lg">
                {currentIdx + 1 >= questions.length ? 'إنهاء' : 'السؤال التالي →'}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
