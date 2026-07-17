import type { Entry, Settings } from '../types/models';

const SCHEMA_VERSION = 1;
const KEYS = {
  VERSION: 'ancora:schemaVersion',
  SETTINGS: 'ancora:settings',
  ENTRIES: 'ancora:entries',
} as const;

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
        const parsed = JSON.parse(data) as Partial<Settings>;
        return { pazienteNome: typeof parsed.pazienteNome === 'string' ? parsed.pazienteNome : '' };
      }
    } catch {
      // fallthrough
    }
    return { pazienteNome: '' };
  },

  setSettings(settings: Settings): boolean {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
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

  exportBackup(): string {
    return JSON.stringify(
      {
        schemaVersion: SCHEMA_VERSION,
        app: 'ancora',
        exportedAt: new Date().toISOString(),
        settings: this.getSettings(),
        entries: this.getEntries(),
      },
      null,
      2,
    );
  },

  importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as {
        settings?: Partial<Settings>;
        entries?: unknown[];
      };

      if (!data || typeof data !== 'object') return false;
      if (!Array.isArray(data.entries)) return false;

      const entries = data.entries
        .map(normalizeEntry)
        .filter((e): e is Entry => e !== null);

      // Reject completely empty garbage payloads that aren't real backups
      if (data.entries.length > 0 && entries.length === 0) return false;

      const settings: Settings = {
        pazienteNome:
          data.settings && typeof data.settings.pazienteNome === 'string'
            ? data.settings.pazienteNome
            : '',
      };

      if (!this.setSettings(settings)) return false;
      if (!this.setEntries(entries)) return false;
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
      localStorage.removeItem(KEYS.VERSION);
    } catch {
      // ignore
    }
  },
};

