import { useState, useEffect, useCallback } from 'react';
import type { Entry, Settings, DayDataMap } from '../types/models';
import { storage } from '../lib/storage';

const STORAGE_ERROR =
  'Impossibile salvare i dati su questo dispositivo. Verifica di non essere in navigazione privata e di avere spazio disponibile.';

export function useDiary() {
  const [entries, setEntriesState] = useState<Entry[]>([]);
  const [settings, setSettingsState] = useState<Settings>({ pazienteNome: '' });
  const [dayDataMap, setDayDataMapState] = useState<DayDataMap>({});
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      storage.migrate();
      setEntriesState(storage.getEntries());
      setSettingsState(storage.getSettings());
      setDayDataMapState(storage.getDayData());
    } catch {
      setError(STORAGE_ERROR);
    } finally {
      setIsReady(true);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const saveSettings = useCallback((newSettings: Settings): boolean => {
    const ok = storage.setSettings(newSettings);
    if (!ok) {
      setError(STORAGE_ERROR);
      return false;
    }
    setSettingsState(newSettings);
    setError(null);
    return true;
  }, []);

  const setDayData = useCallback((dateStr: string, text: string): boolean => {
    let ok = false;
    setDayDataMapState((prev) => {
      const updated = { ...prev, [dateStr]: text };
      ok = storage.setDayData(updated);
      if (!ok) return prev;
      return updated;
    });
    if (!ok) {
      setError(STORAGE_ERROR);
      return false;
    }
    setError(null);
    return true;
  }, []);

  const addEntry = useCallback((entry: Entry): boolean => {
    let ok = false;
    setEntriesState((prev) => {
      const updated = [...prev, entry];
      ok = storage.setEntries(updated);
      if (!ok) return prev;
      return updated;
    });
    if (!ok) {
      setError(STORAGE_ERROR);
      return false;
    }
    setError(null);
    return true;
  }, []);

  const updateEntry = useCallback((updatedEntry: Entry): boolean => {
    let ok = false;
    setEntriesState((prev) => {
      const updated = prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e));
      ok = storage.setEntries(updated);
      if (!ok) return prev;
      return updated;
    });
    if (!ok) {
      setError(STORAGE_ERROR);
      return false;
    }
    setError(null);
    return true;
  }, []);

  const deleteEntry = useCallback((id: string): boolean => {
    let ok = false;
    setEntriesState((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      ok = storage.setEntries(updated);
      if (!ok) return prev;
      return updated;
    });
    if (!ok) {
      setError(STORAGE_ERROR);
      return false;
    }
    setError(null);
    return true;
  }, []);

  const clearAll = useCallback(() => {
    storage.clearAll();
    setEntriesState([]);
    setSettingsState({ pazienteNome: '' });
    setDayDataMapState({});
    setError(null);
  }, []);

  const importBackup = useCallback((jsonString: string) => {
    const success = storage.importBackup(jsonString);
    if (success) {
      setEntriesState(storage.getEntries());
      setSettingsState(storage.getSettings());
      setDayDataMapState(storage.getDayData());
      setError(null);
    } else {
      setError('Importazione non riuscita. Il file non è un backup Ancora valido.');
    }
    return success;
  }, []);

  const exportBackup = useCallback(() => {
    return storage.exportBackup();
  }, []);

  return {
    isReady,
    entries,
    settings,
    dayDataMap,
    error,
    clearError,
    saveSettings,
    setDayData,
    addEntry,
    updateEntry,
    deleteEntry,
    clearAll,
    importBackup,
    exportBackup,
  };
}
