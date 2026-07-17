import { useState } from 'react';
import { useDiary } from './hooks/useDiary';
import { getTodayStr } from './lib/dates';
import type { Entry } from './types/models';

import { DayHeader } from './components/DayHeader';
import { EntryList } from './components/EntryList';
import { EntryForm } from './components/EntryForm';
import { SettingsScreen } from './components/SettingsScreen';
import { InfoScreen } from './components/InfoScreen';
import { Plus, Settings as SettingsIcon, FileDown, Info } from 'lucide-react';

function App() {
  const {
    isReady,
    entries,
    settings,
    error,
    clearError,
    saveSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    clearAll,
    importBackup,
    exportBackup,
  } = useDiary();

  const [currentDate, setCurrentDate] = useState(getTodayStr());
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>(undefined);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);

  if (!isReady) {
    return (
      <div className="min-h-dvh bg-lilac-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-lilac-600">
          <div
            className="w-10 h-10 rounded-full border-2 border-lilac-200 border-t-lilac-500 animate-spin"
            aria-hidden
          />
          <p className="text-sm text-ink-muted">Caricamento…</p>
        </div>
      </div>
    );
  }

  const currentEntries = entries.filter((e) => e.date === currentDate);

  const handleOpenFormNew = () => {
    setEditingEntry(undefined);
    setShowForm(true);
  };

  const handleOpenFormEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleSaveEntry = (entry: Entry) => {
    if (editingEntry) {
      updateEntry(entry);
    } else {
      addEntry(entry);
    }
    setShowForm(false);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
    setShowForm(false);
  };

  const handleExportPdf = async () => {
    if (entries.length === 0) {
      setPdfMessage('Nessuna registrazione da esportare.');
      window.setTimeout(() => setPdfMessage(null), 3500);
      return;
    }
    try {
      const { generateDiaryPdf } = await import('./lib/pdf');
      // Tutte le date: un unico foglio (o pochi) per il curante
      generateDiaryPdf(entries, settings);
    } catch {
      setPdfMessage('Impossibile generare il PDF. Riprova.');
      window.setTimeout(() => setPdfMessage(null), 3500);
    }
  };

  const banner = error || pdfMessage;

  return (
    <div className="min-h-dvh bg-lilac-100/80 text-ink pb-[max(6rem,env(safe-area-inset-bottom))] md:pb-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-surface min-h-dvh md:min-h-[min(100dvh,48rem)] md:my-8 md:rounded-3xl md:shadow-xl md:shadow-lilac-300/30 md:border border-lilac-200 overflow-hidden relative flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-br from-lilac-400 via-lilac-500 to-lilac-600 text-surface px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-4 flex justify-between items-center shadow-md shadow-lilac-600/20 z-20">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/20"
              aria-hidden
            >
              <LilacRibbonIcon />
            </span>
            <h1 className="text-xl font-bold tracking-tight">Ancora</h1>
          </div>
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={() => setShowInfo(true)}
              className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
              title="Informazioni"
              aria-label="Apri informazioni e donazioni"
            >
              <Info size={22} />
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
              title="Esporta PDF (tutte le registrazioni)"
              aria-label="Esporta PDF con tutte le registrazioni"
            >
              <FileDown size={22} />
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
              title="Impostazioni"
              aria-label="Apri impostazioni"
            >
              <SettingsIcon size={22} />
            </button>
          </div>
        </header>

        {banner && (
          <div
            role="alert"
            className="mx-3 mt-3 px-3 py-2.5 rounded-xl bg-lilac-100 border border-lilac-300 text-sm text-ink flex justify-between items-start gap-2"
          >
            <span>{banner}</span>
            {error && (
              <button
                type="button"
                onClick={clearError}
                className="text-lilac-700 font-medium shrink-0"
              >
                Chiudi
              </button>
            )}
          </div>
        )}

        <DayHeader dateStr={currentDate} onChangeDate={setCurrentDate} />

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40">
          <EntryList entries={currentEntries} onEditEntry={handleOpenFormEdit} />
        </div>

        {/* FAB */}
        <button
          type="button"
          onClick={handleOpenFormNew}
          className="fixed md:absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 w-14 h-14 bg-lilac-500 text-surface rounded-full shadow-lg shadow-lilac-600/35 flex items-center justify-center hover:bg-lilac-600 hover:scale-105 active:scale-95 transition-all z-30"
          title="Aggiungi registrazione"
          aria-label="Aggiungi registrazione"
        >
          <Plus size={30} strokeWidth={2.25} />
        </button>
      </div>

      {showForm && (
        <EntryForm
          entry={editingEntry}
          dateStr={currentDate}
          onSave={handleSaveEntry}
          onCancel={() => setShowForm(false)}
          onDelete={handleDeleteEntry}
        />
      )}

      {showSettings && (
        <SettingsScreen
          settings={settings}
          onSaveSettings={saveSettings}
          onExportBackup={exportBackup}
          onImportBackup={importBackup}
          onClearAll={clearAll}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showInfo && <InfoScreen onClose={() => setShowInfo(false)} />}
    </div>
  );
}

function LilacRibbonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 12 L8 21 M12 12 L16 21" />
      <path d="M12 12 C9 6 4 8 7 14" />
      <path d="M12 12 C15 6 20 8 17 14" />
    </svg>
  );
}

export default App;
