import { create } from 'zustand';
import type { AppSettings } from './types';
import { getSettings, saveSettings } from './storage';

interface AppState {
  hydrated: boolean;
  settings: AppSettings;
  setHydrated: (v: boolean) => void;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  fontSize: 'md',
  animationSpeed: 'normal',
  showHints: true,
  autoAdvance: false,
  language: 'ar',
};

export const useAppStore = create<AppState>((set, get) => ({
  hydrated: false,
  settings: DEFAULT_SETTINGS,
  setHydrated: (v) => set({ hydrated: v }),
  updateSettings: async (partial) => {
    const next = { ...get().settings, ...partial };
    set({ settings: next });
    await saveSettings(next);
  },
  loadSettings: async () => {
    try {
      const s = await getSettings();
      set({ settings: s });
    } catch {
      // ignore
    }
  },
}));
