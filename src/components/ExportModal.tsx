import { useState, useEffect } from 'react';
import { X, FileDown, Calendar } from 'lucide-react';
import type { Entry, DayDataMap } from '../types/models';
import { formatItalianDate } from '../lib/dates';

type Props = {
  entries: Entry[];
  dayDataMap: DayDataMap;
  onClose: () => void;
  onExport: (startDate: string, endDate: string) => void;
};

export function ExportModal({ entries, dayDataMap, onClose, onExport }: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Find min and max dates on mount
  useEffect(() => {
    const allDates = [
      ...entries.map(e => e.date),
      ...Object.keys(dayDataMap).filter(k => dayDataMap[k]?.trim() !== '')
    ];

    if (allDates.length > 0) {
      const sorted = allDates.sort();
      setStartDate(sorted[0]);
      setEndDate(sorted[sorted.length - 1]);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      setEndDate(today);
    }
  }, [entries, dayDataMap]);

  const handleExport = () => {
    if (startDate && endDate) {
      onExport(startDate, endDate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-lilac-50/95 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-surface border border-lilac-200 shadow-xl shadow-lilac-200/40 rounded-2xl overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface">
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <FileDown size={20} className="text-lilac-600" />
            Esporta PDF
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-muted hover:text-ink transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-sm text-ink-muted leading-relaxed">
            Seleziona il periodo che desideri esportare. Verranno inclusi tutti i pasti e le attività fisiche registrate nell'intervallo.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-lilac-600" />
                Data di inizio
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-surface border border-lilac-200 rounded-lg focus:border-lilac-400 focus:ring-1 focus:ring-lilac-400 outline-none text-ink text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-lilac-600" />
                Data di fine
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="w-full p-2.5 bg-surface border border-lilac-200 rounded-lg focus:border-lilac-400 focus:ring-1 focus:ring-lilac-400 outline-none text-ink text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleExport}
              disabled={!startDate || !endDate || startDate > endDate}
              className="w-full py-3 bg-lilac-400 text-surface hover:bg-lilac-600 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FileDown size={18} />
              Genera PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
