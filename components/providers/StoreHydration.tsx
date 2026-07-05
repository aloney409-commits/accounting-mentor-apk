'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function StoreHydration() {
  const setHydrated = useAppStore((s) => s.setHydrated);
  const loadSettings = useAppStore((s) => s.loadSettings);

  useEffect(() => {
    (async () => {
      await loadSettings();
      setHydrated(true);
    })();
  }, [loadSettings, setHydrated]);

  return null;
}
