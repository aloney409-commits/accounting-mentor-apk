'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import type { ThemeMode } from '@/lib/types';

const THEMES: { mode: ThemeMode; icon: string; label: string }[] = [
  { mode: 'light', icon: '☀️', label: 'فاتح' },
  { mode: 'dark', icon: '🌙', label: 'داكن' },
  { mode: 'system', icon: '🖥️', label: 'النظام' },
];

export function ThemeToggle() {
  const { settings, updateSettings } = useAppStore();
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-surface-container-high shadow-elev-1">
      {THEMES.map((t) => (
        <motion.button
          key={t.mode}
          onClick={() => updateSettings({ theme: t.mode })}
          whileTap={{ scale: 0.9 }}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors
            ${settings.theme === t.mode ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-primary-container/50'}
          `}
          aria-label={t.label}
        >
          <span>{t.icon}</span>
          <span className="hidden sm:inline">{t.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
