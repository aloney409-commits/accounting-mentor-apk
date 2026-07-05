'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BackButton } from '@/components/ui/BackButton';
import { useAppStore } from '@/lib/store';
import { resetApp, clearHistory, getStorageEstimate } from '@/lib/storage';
import type { AnimationSpeed, FontSize, ThemeMode } from '@/lib/types';

export default function SettingsPage() {
  const { settings, updateSettings } = useAppStore();
  const [storageInfo, setStorageInfo] = useState<string>('');

  const handleClearHistory = async () => {
    if (!confirm('مسح السجل — هل أنت متأكد؟')) return;
    await clearHistory();
    alert('تم مسح السجل بنجاح');
  };

  const handleResetApp = async () => {
    if (!confirm('سيتم مسح كل البيانات (السجل + الإعدادات + التقدم). هل أنت متأكد؟'))
      return;
    await resetApp();
    alert('تم إعادة التطبيق للحالة الأولية');
    window.location.reload();
  };

  const showStorage = async () => {
    const est = await getStorageEstimate();
    if (!est) {
      setStorageInfo('لا يمكن قياس التخزين على هذا المتصفح');
      return;
    }
    const usedMb = (est.used / (1024 * 1024)).toFixed(2);
    const quotaMb = (est.quota / (1024 * 1024)).toFixed(2);
    setStorageInfo(`المستخدم: ${usedMb} MB من ${quotaMb} MB متاحة`);
  };

  return (
    <main className="min-h-screen pb-12 max-w-2xl mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">الإعدادات ⚙️</h1>
        <BackButton />
      </div>

      {/* Theme */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">المظهر</h2>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'system'] as ThemeMode[]).map((t) => (
            <button
              key={t}
              onClick={() => updateSettings({ theme: t })}
              className={`
                p-3 rounded-xl text-sm font-medium transition-all
                ${settings.theme === t ? 'bg-primary text-white shadow-elev-2' : 'bg-surface-container-high'}
              `}
            >
              {t === 'light' ? '☀️ فاتح' : t === 'dark' ? '🌙 داكن' : '🖥️ النظام'}
            </button>
          ))}
        </div>
      </Card>

      {/* Font Size */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">حجم الخط</h2>
        <div className="grid grid-cols-4 gap-2">
          {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((s) => (
            <button
              key={s}
              onClick={() => updateSettings({ fontSize: s })}
              className={`
                p-3 rounded-xl font-medium transition-all
                ${settings.fontSize === s ? 'bg-primary text-white shadow-elev-2' : 'bg-surface-container-high'}
              `}
            >
              {s === 'sm' ? 'صغير' : s === 'md' ? 'متوسط' : s === 'lg' ? 'كبير' : 'كبير جداً'}
            </button>
          ))}
        </div>
      </Card>

      {/* Animation */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">سرعة الحركة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(['none', 'fast', 'normal', 'slow'] as AnimationSpeed[]).map((a) => (
            <button
              key={a}
              onClick={() => updateSettings({ animationSpeed: a })}
              className={`
                p-3 rounded-xl text-sm font-medium transition-all
                ${settings.animationSpeed === a ? 'bg-primary text-white shadow-elev-2' : 'bg-surface-container-high'}
              `}
            >
              {a === 'none' ? 'إيقاف' : a === 'fast' ? 'سريعة' : a === 'normal' ? 'عادية' : 'بطيئة'}
            </button>
          ))}
        </div>
      </Card>

      {/* Toggles */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">التفضيلات</h2>
        <div className="space-y-3">
          <ToggleRow
            label="عرض التلميحات في التحليل"
            value={settings.showHints}
            onChange={(v) => updateSettings({ showHints: v })}
          />
          <ToggleRow
            label="الانتقال التلقائي للخطوة التالية"
            value={settings.autoAdvance}
            onChange={(v) => updateSettings({ autoAdvance: v })}
          />
        </div>
      </Card>

      {/* Data Management */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">البيانات</h2>
        <div className="space-y-3">
          <div>
            <Button variant="tonal" onClick={showStorage}>
              📊 مساحة التخزين
            </Button>
            {storageInfo && (
              <p className="mt-2 text-sm text-on-surface-variant">{storageInfo}</p>
            )}
          </div>
          <Button variant="outlined" onClick={handleClearHistory}>
            🗑️ مسح السجل
          </Button>
          <Button variant="danger" onClick={handleResetApp}>
            ⚠️ إعادة تعيين التطبيق بالكامل
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card padding="lg" className="mb-4">
        <h2 className="font-bold text-lg mb-3">حول التطبيق</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">الإصدار:</span>
            <Badge variant="info">1.0.0</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">النوع:</span>
            <span>تطبيق تعليمي محاسبي</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">التقنية:</span>
            <span>Next.js + Capacitor</span>
          </div>
          <p className="text-xs text-on-surface-variant pt-2 leading-relaxed">
            يعمل التطبيق بالكامل بدون إنترنت. جميع بياناتك محفوظة محلياً على جهازك ولا تُرسل لأي خادم.
          </p>
        </div>
      </Card>
    </main>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`
          w-12 h-7 rounded-full relative transition-colors
          ${value ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}
        `}
      >
        <span
          className={`
            absolute top-1 w-5 h-5 rounded-full bg-white transition-all
            ${value ? 'right-1' : 'right-6'}
          `}
        />
      </button>
    </div>
  );
}
