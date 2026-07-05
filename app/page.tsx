'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getAllHistory, getProgress } from '@/lib/storage';

const MENU_ITEMS = [
  {
    href: '/analyze',
    title: 'تحليل معاملة',
    subtitle: 'حلل معاملة محاسبية بذكاء',
    icon: '🔍',
    description: 'أدخل معاملة بالعربية واتبع خطوات التفكير الثمانية',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    href: '/training',
    title: 'وضع التدريب',
    subtitle: 'تعلّم خطوة بخطوة مع التوجيه',
    icon: '👨‍🏫',
    description: 'سيناريوهات مع تلميحات وإرشادات تفاعلية',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/quiz',
    title: 'وضع الاختبار',
    subtitle: 'اختبر فهمك بأسئلة متنوعة',
    icon: '📝',
    description: 'سيناريوهات عشوائية مع تفسير الإجابة',
    color: 'from-green-500 to-emerald-500',
  },
  {
    href: '/knowledge',
    title: 'قاعدة المعرفة',
    subtitle: 'دليل الحسابات والقواعد',
    icon: '📚',
    description: 'مرجع شامل للحسابات والقواعد المحاسبية',
    color: 'from-orange-500 to-amber-500',
  },
  {
    href: '/history',
    title: 'السجل',
    subtitle: 'مراجعة تحليلاتك السابقة',
    icon: '📜',
    description: 'البحث والاستئناف من حيث توقفت',
    color: 'from-pink-500 to-rose-500',
  },
  {
    href: '/settings',
    title: 'الإعدادات',
    subtitle: 'خصّص تجربتك',
    icon: '⚙️',
    description: 'الثيم، حجم الخط، سرعة الحركة',
    color: 'from-slate-500 to-gray-500',
  },
];

export default function Home() {
  const [historyCount, setHistoryCount] = useState(0);
  const [quizProgress, setQuizProgress] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const history = await getAllHistory();
        setHistoryCount(history.length);
        const progress = await getProgress('quiz-general');
        if (progress) setQuizProgress({ score: progress.score, total: progress.total });
      } catch {
        // ignore
      }
    })();
  }, []);

  const quizPercent =
    quizProgress && quizProgress.total > 0
      ? Math.round((quizProgress.score / quizProgress.total) * 100)
      : 0;

  return (
    <main className="min-h-screen pb-12">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute top-4 left-4 z-10">
          <ThemeToggle />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-3"
          >
            مساعد <span className="text-gradient">المحاسبة</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant dark:text-gray-300"
          >
            تعلّم كيف تفكّر كمحاسب محترف — لا حفظاً بل فهماً
          </motion.p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            <StatCard value={historyCount.toString()} label="تحليل سابق" icon="📊" />
            <StatCard value="8" label="خطوات تعليمية" icon="🛤️" />
            <StatCard value={`${quizPercent}%`} label="نتيجة الاختبارات" icon="🏆" />
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {MENU_ITEMS.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={item.href}>
              <Card interactive padding="lg" className="h-full">
                <div className={`text-5xl mb-3`}>{item.icon}</div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-primary mb-2 font-medium">{item.subtitle}</p>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">
                  {item.description}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </section>

      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-sm text-on-surface-variant dark:text-gray-400">
        <p>يعمل بالكامل بدون إنترنت — بياناتك محفوظة على جهازك فقط</p>
      </footer>
    </main>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      className="bg-surface-container dark:bg-[#1D1B20] rounded-2xl p-3 text-center shadow-elev-1"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="text-xs text-on-surface-variant dark:text-gray-400">{label}</div>
    </motion.div>
  );
}
