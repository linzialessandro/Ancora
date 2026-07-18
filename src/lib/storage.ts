import type {
  Entry,
  Settings,
  DayDataMap,
  FoodPhobiaPyramid,
  PyramidLevelId,
  PyramidItem,
} from '../types/models';
import { createEmptyPyramid } from '../types/models';

const SCHEMA_VERSION = 2;
const KEYS = {
  VERSION: 'ancora:schemaVersion',
  SETTINGS: 'ancora:settings',
  ENTRIES: 'ancora:entries',
  DAY_DATA: 'ancora:dayData',
  PYRAMID: 'ancora:foodPhobiaPyramid',
} as const;

function normalizeSettings(raw: unknown): Settings {
  if (!raw || typeof raw !== 'object') {
    return { pazienteNome: '' };
  }
  const s = raw as Record<string, unknown>;
  return {
    pazienteNome: typeof s.pazienteNome === 'string' ? s.pazienteNome : '',
  };
}

function normalizePyramidItem(raw: unknown): PyramidItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Record<string, unknown>;
  if (typeof item.id !== 'string' || typeof item.label !== 'string') return null;
  const label = item.label.trim();
  if (!label) return null;
  return { id: item.id, label };
}

function normalizePyramid(raw: unknown): FoodPhobiaPyramid {
  const empty = createEmptyPyramid();
  if (!raw || typeof raw !== 'object') return empty;
  const data = raw as { levels?: unknown };
  if (!data.levels || typeof data.levels !== 'object') return empty;

  const levels = data.levels as Record<string, unknown>;
  const result = createEmptyPyramid();
  for (const id of [1, 2, 3, 4, 5] as PyramidLevelId[]) {
    const list = levels[String(id)] ?? levels[id as unknown as string];
    if (!Array.isArray(list)) continue;
    result.levels[id] = list
      .map(normalizePyramidItem)
      .filter((item): item is PyramidItem => item !== null);
  }
  return result;
}

function normalizeEntry(raw: unknown): Entry | null {
  if (!raw || typeof raw !== 'object') return null;
  const e = raw as Record<string, unknown>;
  if (typeof e.id !== 'string' || typeof e.date !== 'string' || typeof e.ora !== 'string') {
    return null;
  }

  const clampScale = (v: unknown): number | null => {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    if (n < 1 || n > 10) return null;
    return Math.round(n);
  };

  return {
    id: e.id,
    date: e.date,
    ora: String(e.ora),
    dove: typeof e.dove === 'string' ? e.dove : '',
    conChi: typeof e.conChi === 'string' ? e.conChi : '',
    alimenti: typeof e.alimenti === 'string' ? e.alimenti : '',
    pensieri: typeof e.pensieri === 'string' ? e.pensieri : '',
    emozioni: typeof e.emozioni === 'string' ? e.emozioni : '',
    fame: clampScale(e.fame),
    sazieta: clampScale(e.sazieta),
    soddisfazione: clampScale(e.soddisfazione),
    durataMinuti:
      e.durataMinuti === null || e.durataMinuti === undefined || e.durataMinuti === ''
        ? null
        : Number.isFinite(Number(e.durataMinuti))
          ? Math.max(0, Math.round(Number(e.durataMinuti)))
          : null,
    createdAt: typeof e.createdAt === 'string' ? e.createdAt : new Date().toISOString(),
    updatedAt: typeof e.updatedAt === 'string' ? e.updatedAt : new Date().toISOString(),
  };
}

export const storage = {
  migrate() {
    try {
      const v = Number(localStorage.getItem(KEYS.VERSION) || 0);
      if (v < SCHEMA_VERSION) {
        localStorage.setItem(KEYS.VERSION, String(SCHEMA_VERSION));
      }
    } catch {
      // private mode / disabled storage
    }
  },

  getSettings(): Settings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data) {
        return normalizeSettings(JSON.parse(data));
      }
    } catch {
      // fallthrough
    }
    return { pazienteNome: '' };
  },

  setSettings(settings: Settings): boolean {
    try {
      localStorage.setItem(
        KEYS.SETTINGS,
        JSON.stringify({
          pazienteNome: settings.pazienteNome,
        }),
      );
      return true;
    } catch {
      return false;
    }
  },

  getEntries(): Entry[] {
    try {
      const data = localStorage.getItem(KEYS.ENTRIES);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(normalizeEntry)
        .filter((e): e is Entry => e !== null);
    } catch {
      return [];
    }
  },

  setEntries(entries: Entry[]): boolean {
    try {
      localStorage.setItem(KEYS.ENTRIES, JSON.stringify(entries));
      return true;
    } catch {
      return false;
    }
  },

  getDayData(): DayDataMap {
    try {
      const data = localStorage.getItem(KEYS.DAY_DATA);
      if (!data) return {};
      const parsed = JSON.parse(data);
      if (!parsed || typeof parsed !== 'object') return {};
      const result: DayDataMap = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string') {
          result[k] = v;
        }
      }
      return result;
    } catch {
      return {};
    }
  },

  setDayData(dayData: DayDataMap): boolean {
    try {
      localStorage.setItem(KEYS.DAY_DATA, JSON.stringify(dayData));
      return true;
    } catch {
      return false;
    }
  },

  getFoodPhobiaPyramid(): FoodPhobiaPyramid {
    try {
      const data = localStorage.getItem(KEYS.PYRAMID);
      if (!data) return createEmptyPyramid();
      return normalizePyramid(JSON.parse(data));
    } catch {
      return createEmptyPyramid();
    }
  },

  setFoodPhobiaPyramid(pyramid: FoodPhobiaPyramid): boolean {
    try {
      const normalized = normalizePyramid(pyramid);
      localStorage.setItem(KEYS.PYRAMID, JSON.stringify(normalized));
      return true;
    } catch {
      return false;
    }
  },

  exportBackup(): string {
    return JSON.stringify(
      {
        schemaVersion: SCHEMA_VERSION,
        app: 'ancora',
        exportedAt: new Date().toISOString(),
        settings: this.getSettings(),
        entries: this.getEntries(),
        dayData: this.getDayData(),
        foodPhobiaPyramid: this.getFoodPhobiaPyramid(),
      },
      null,
      2,
    );
  },

  importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as {
        settings?: unknown;
        entries?: unknown[];
        dayData?: Record<string, unknown>;
        foodPhobiaPyramid?: unknown;
      };

      if (!data || typeof data !== 'object') return false;
      if (!Array.isArray(data.entries)) return false;

      const entries = data.entries
        .map(normalizeEntry)
        .filter((e): e is Entry => e !== null);

      if (data.entries.length > 0 && entries.length === 0) return false;

      const settings = normalizeSettings(data.settings ?? {});

      const dayData: DayDataMap = {};
      if (data.dayData && typeof data.dayData === 'object') {
        for (const [k, v] of Object.entries(data.dayData)) {
          if (typeof v === 'string') {
            dayData[k] = v;
          }
        }
      }

      const pyramid = normalizePyramid(data.foodPhobiaPyramid);

      if (!this.setSettings(settings)) return false;
      if (!this.setEntries(entries)) return false;
      if (!this.setDayData(dayData)) return false;
      if (!this.setFoodPhobiaPyramid(pyramid)) return false;

      this.migrate();
      return true;
    } catch {
      return false;
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(KEYS.SETTINGS);
      localStorage.removeItem(KEYS.ENTRIES);
      localStorage.removeItem(KEYS.DAY_DATA);
      localStorage.removeItem(KEYS.PYRAMID);
      localStorage.removeItem(KEYS.VERSION);
    } catch {
      // ignore
    }
  },
};
