import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { AppSettings, HistoryItem } from '../types';

interface AccountingDB extends DBSchema {
  history: {
    key: string;
    value: HistoryItem;
    indexes: {
      timestamp: number;
    };
  };
  settings: {
    key: string;
    value: any;
  };
  progress: {
    key: string;
    value: {
      id: string;
      type: 'training' | 'quiz';
      score: number;
      completed: number;
      total: number;
      lastUpdated: number;
    };
  };
}

const DB_NAME = 'accounting-mentor-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AccountingDB>> | null = null;

function getDB(): Promise<IDBPDatabase<AccountingDB>> {
  if (!dbPromise) {
    dbPromise = openDB<AccountingDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', { keyPath: 'id' });
          historyStore.createIndex('timestamp', 'timestamp');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// ============= السجل =============
export async function saveToHistory(item: Omit<HistoryItem, 'id'>): Promise<HistoryItem> {
  const db = await getDB();
  const historyItem: HistoryItem = {
    ...item,
    id: `history_${item.timestamp}_${Math.random().toString(36).slice(2, 9)}`,
  };
  await db.put('history', historyItem);
  return historyItem;
}

export async function getAllHistory(): Promise<HistoryItem[]> {
  try {
    const db = await getDB();
    const items = await db.getAllFromIndex('history', 'timestamp');
    return items.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export async function getHistoryItem(id: string): Promise<HistoryItem | undefined> {
  const db = await getDB();
  return db.get('history', id);
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('history', id);
}

export async function clearHistory(): Promise<void> {
  const db = await getDB();
  await db.clear('history');
}

export async function searchHistory(query: string): Promise<HistoryItem[]> {
  const all = await getAllHistory();
  const q = query.toLowerCase();
  return all.filter(
    (i) =>
      i.text.toLowerCase().includes(q) ||
      i.result.summary.toLowerCase().includes(q)
  );
}

// ============= الإعدادات =============
const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  fontSize: 'md',
  animationSpeed: 'normal',
  showHints: true,
  autoAdvance: false,
  language: 'ar',
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const db = await getDB();
    const s = (await db.get('settings', 'app-settings')) as AppSettings | undefined;
    return s || DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    const db = await getDB();
    await db.put('settings', settings, 'app-settings');
  } catch (e) {
    console.warn('Failed to save settings', e);
  }
}

// ============= التقدم =============
export async function saveProgress(progress: {
  id: string;
  type: 'training' | 'quiz';
  score: number;
  completed: number;
  total: number;
}): Promise<void> {
  const db = await getDB();
  await db.put('progress', { ...progress, lastUpdated: Date.now() });
}

export async function getProgress(id: string) {
  try {
    const db = await getDB();
    return await db.get('progress', id);
  } catch {
    return undefined;
  }
}

// ============= أدوات مساعدة =============
export function isIndexedDBSupported(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

export async function getStorageEstimate() {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) return null;
  const est = await navigator.storage.estimate();
  return { used: est.usage || 0, quota: est.quota || 0 };
}

export async function resetApp(): Promise<void> {
  await clearHistory();
  await saveSettings(DEFAULT_SETTINGS);
  const db = await getDB();
  await db.clear('progress');
}
