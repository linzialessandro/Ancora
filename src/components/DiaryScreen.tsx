import { useState } from 'react';
import type { Entry } from '../types/models';
import { getTodayStr } from '../lib/dates';
import { DayHeader } from './DayHeader';
import { DayActivity } from './DayActivity';
import { EntryList } from './EntryList';
import { EntryForm } from './EntryForm';
import { ExportModal } from './ExportModal';
import { SectionHeader } from './SectionHeader';
import { Plus, FileDown } from 'lucide-react';

type Props = {
  entries: Entry[];
  dayDataMap: Record<string, string>;
  error: string | null;
  pdfMessage: string | null;
  onClearError: () => void;
  onAddEntry: (entry: Entry) => void;
  onUpdateEntry: (entry: Entry) => void;
  onDeleteEntry: (id: string) => void;
  onSetDayData: (dateStr: string, text: string) => void;
  onExportPdf: (startDate: string, endDate: string) => Promise<void>;
  onBack: () => void;
  onInfo: () => void;
  onDonate: () => void;
};

export function DiaryScreen({
  entries,
  dayDataMap,
  error,
  pdfMessage,
  onClearError,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onSetDayData,
  onExportPdf,
  onBack,
  onInfo,
  onDonate,
}: Props) {
  const [currentDate, setCurrentDate] = useState(getTodayStr());
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>(undefined);
  const [showExportModal, setShowExportModal] = useState(false);

  const currentEntries = entries.filter((e) => e.date === currentDate);
  const currentActivity = dayDataMap[currentDate] || '';
  const banner = error || pdfMessage;

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
      onUpdateEntry(entry);
    } else {
      onAddEntry(entry);
    }
    setShowForm(false);
  };

  const handleDeleteEntry = (id: string) => {
    onDeleteEntry(id);
    setShowForm(false);
  };

  return (
    <>
      <SectionHeader
        title="Diario"
        onBack={onBack}
        onInfo={onInfo}
        onDonate={onDonate}
        extraActions={
          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
            title="Esporta PDF"
            aria-label="Esporta PDF"
          >
            <FileDown size={22} />
          </button>
        }
      />

      {banner && (
        <div
          role="alert"
          className="mx-3 mt-3 px-3 py-2.5 rounded-xl bg-lilac-100 border border-lilac-300 text-sm text-ink flex justify-between items-start gap-2"
        >
          <span>{banner}</span>
          {error && (
            <button
              type="button"
              onClick={onClearError}
              className="text-lilac-700 font-medium shrink-0"
            >
              Chiudi
            </button>
          )}
        </div>
      )}

      <DayHeader dateStr={currentDate} onChangeDate={setCurrentDate} />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40">
        <DayActivity
          dateStr={currentDate}
          activityText={currentActivity}
          onSave={(text) => onSetDayData(currentDate, text)}
        />
        <EntryList entries={currentEntries} onEditEntry={handleOpenFormEdit} />
      </div>

      <button
        type="button"
        onClick={handleOpenFormNew}
        className="fixed md:absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 w-14 h-14 bg-lilac-500 text-surface rounded-full shadow-lg shadow-lilac-600/35 flex items-center justify-center hover:bg-lilac-600 hover:scale-105 active:scale-95 transition-all z-30"
        title="Aggiungi registrazione"
        aria-label="Aggiungi registrazione"
      >
        <Plus size={30} strokeWidth={2.25} />
      </button>

      {showForm && (
        <EntryForm
          entry={editingEntry}
          dateStr={currentDate}
          onSave={handleSaveEntry}
          onCancel={() => setShowForm(false)}
          onDelete={handleDeleteEntry}
        />
      )}

      {showExportModal && (
        <ExportModal
          entries={entries}
          dayDataMap={dayDataMap}
          onClose={() => setShowExportModal(false)}
          onExport={onExportPdf}
        />
      )}
    </>
  );
}
