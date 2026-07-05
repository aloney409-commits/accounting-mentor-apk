'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { BalanceVisualization } from '@/components/visualization/BalanceVisualization';
import {
  getAllHistory,
  deleteHistoryItem,
  clearHistory,
  searchHistory,
} from '@/lib/storage';
import type { HistoryItem } from '@/lib/types';

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const all = await getAllHistory();
    setItems(all);
    setLoading(false);
  };

  const doSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      await load();
      return;
    }
    const res = await searchHistory(q);
    setItems(res);
  };

  const handleDelete = async (id: string) => {
    await deleteHistoryItem(id);
    setSelected(null);
    await load();
  };

  const handleClear = async () => {
    if (!confirm('هل تريد بالتأكيد مسح كل السجل؟ لا يمكن التراجع.')) return;
    await clearHistory();
    setSelected(null);
    await load();
  };

  return (
    <main className="min-h-screen pb-12 max-w-6xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">السجل 📜</h1>
        <BackButton />
      </div>

      <Card padding="md" className="mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="ابحث في السجل..."
              value={query}
              onChange={(e) => doSearch(e.target.value)}
            />
          </div>
          {items.length > 0 && (
            <Button variant="danger" onClick={handleClear}>
              🗑️ مسح الكل
            </Button>
          )}
        </div>
      </Card>

      {loading ? (
        <Card padding="lg" className="text-center">
          جاري التحميل...
        </Card>
      ) : items.length === 0 ? (
        <Card padding="lg" className="text-center">
          <div className="text-6xl mb-3">📭</div>
          <p className="text-on-surface-variant">لا توجد تحليلات في السجل بعد</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  interactive
                  padding="md"
                  onClick={() => setSelected(item)}
                  className={selected?.id === item.id ? 'ring-2 ring-primary' : ''}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm md:text-base flex-1 line-clamp-2">
                      {item.text}
                    </p>
                    <Badge variant="neutral" size="sm">
                      {new Date(item.timestamp).toLocaleDateString('ar-EG')}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-on-surface-variant">
                    <span>{new Date(item.timestamp).toLocaleTimeString('ar-EG')}</span>
                    <span>•</span>
                    <span>
                      {item.result.journal.lines.length} أسطر — إجمالي{' '}
                      {item.result.journal.totalDebit.toLocaleString('ar-EG')}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="sticky top-4 self-start"
              >
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">تفاصيل التحليل</h3>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-on-surface-variant hover:text-error text-xl"
                      aria-label="إغلاق"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-1">المعاملة:</p>
                  <p className="font-medium mb-4">{selected.text}</p>
                  <BalanceVisualization
                    lines={selected.result.journal.lines}
                    totalDebit={selected.result.journal.totalDebit}
                    totalCredit={selected.result.journal.totalCredit}
                    balanced={selected.result.journal.balanced}
                  />
                  <div className="mt-4 flex gap-2">
                    <Button variant="danger" onClick={() => handleDelete(selected.id)}>
                      🗑️ حذف
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
