'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const settings = useAppStore((s) => s.settings);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);

    // Font size
    root.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');
    root.classList.add(`font-size-${settings.fontSize}`);

    // Animation speed
    root.classList.remove('anim-slow', 'anim-fast', 'anim-none');
    if (settings.animationSpeed === 'slow') root.classList.add('anim-slow');
    else if (settings.animationSpeed === 'fast') root.classList.add('anim-fast');
    else if (settings.animationSpeed === 'none') root.classList.add('anim-none');
  }, [settings.theme, settings.fontSize, settings.animationSpeed]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (settings.theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.classList.toggle('dark', mq.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [settings.theme]);

  return <>{children}</>;
}
