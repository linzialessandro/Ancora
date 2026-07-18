import { useState } from 'react';
import { useDiary } from './hooks/useDiary';
import type { AppSection, AppView } from './types/models';

import { HomeScreen } from './components/HomeScreen';
import { DiaryScreen } from './components/DiaryScreen';
import { PyramidScreen } from './components/PyramidScreen';
import { BodyScreen } from './components/BodyScreen';
import { PlateScreen } from './components/PlateScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { InfoScreen } from './components/InfoScreen';
import { SectionInfoScreen } from './components/SectionInfoScreen';
import { DonateScreen } from './components/DonateScreen';

function App() {
  const {
    isReady,
    entries,
    settings,
    dayDataMap,
    pyramid,
    error,
    clearError,
    saveSettings,
    setDayData,
    savePyramid,
    addEntry,
    updateEntry,
    deleteEntry,
    clearAll,
    importBackup,
    exportBackup,
  } = useDiary();

  const [view, setView] = useState<AppView>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showHomeInfo, setShowHomeInfo] = useState(false);
  const [sectionInfo, setSectionInfo] = useState<AppSection | null>(null);
  const [showDonate, setShowDonate] = useState(false);
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

  const goHome = () => setView('home');

  const handleExportPdf = async (startDate: string, endDate: string) => {
    try {
      const { generatePdf } = await import('./lib/pdf');
      generatePdf(entries, settings, dayDataMap, startDate, endDate);
    } catch (err) {
      if (err instanceof Error) {
        setPdfMessage(err.message);
      } else {
        setPdfMessage('Impossibile generare il PDF. Riprova.');
      }
      window.setTimeout(() => setPdfMessage(null), 3500);
    }
  };

  return (
    <div
      className={`min-h-dvh bg-lilac-100/80 text-ink md:pb-8 flex flex-col items-center ${
        view === 'diary'
          ? 'pb-[max(6rem,env(safe-area-inset-bottom))]'
          : 'pb-[max(1rem,env(safe-area-inset-bottom))]'
      }`}
    >
      <div className="w-full max-w-md bg-surface min-h-dvh md:min-h-[min(100dvh,48rem)] md:my-8 md:rounded-3xl md:shadow-xl md:shadow-lilac-300/30 md:border border-lilac-200 overflow-hidden relative flex flex-col">
        {view === 'home' && (
          <HomeScreen
            onOpenSection={setView}
            onOpenInfo={() => setShowHomeInfo(true)}
            onOpenDonate={() => setShowDonate(true)}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {view === 'diary' && (
          <DiaryScreen
            entries={entries}
            dayDataMap={dayDataMap}
            error={error}
            pdfMessage={pdfMessage}
            onClearError={clearError}
            onAddEntry={addEntry}
            onUpdateEntry={updateEntry}
            onDeleteEntry={deleteEntry}
            onSetDayData={setDayData}
            onExportPdf={handleExportPdf}
            onBack={goHome}
            onInfo={() => setSectionInfo('diary')}
            onDonate={() => setShowDonate(true)}
          />
        )}

        {view === 'pyramid' && (
          <PyramidScreen
            pyramid={pyramid}
            onSave={savePyramid}
            onBack={goHome}
            onInfo={() => setSectionInfo('pyramid')}
            onDonate={() => setShowDonate(true)}
          />
        )}

        {view === 'body' && (
          <BodyScreen
            onBack={goHome}
            onInfo={() => setSectionInfo('body')}
            onDonate={() => setShowDonate(true)}
          />
        )}

        {view === 'plate' && (
          <PlateScreen
            onBack={goHome}
            onInfo={() => setSectionInfo('plate')}
            onDonate={() => setShowDonate(true)}
          />
        )}
      </div>

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

      {showHomeInfo && (
        <InfoScreen
          onClose={() => setShowHomeInfo(false)}
          onOpenDonate={() => {
            setShowHomeInfo(false);
            setShowDonate(true);
          }}
        />
      )}

      {sectionInfo && (
        <SectionInfoScreen section={sectionInfo} onClose={() => setSectionInfo(null)} />
      )}

      {showDonate && <DonateScreen onClose={() => setShowDonate(false)} />}
    </div>
  );
}

export default App;
