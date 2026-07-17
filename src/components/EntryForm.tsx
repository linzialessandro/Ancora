import { useState } from 'react';
import type { Entry } from '../types/models';
import { ScaleField } from './ScaleField';
import { ConfirmDialog } from './ConfirmDialog';

type Props = {
  entry?: Entry;
  dateStr: string;
  onSave: (entry: Entry) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
};

function currentTimeHHMM(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function EntryForm({ entry, dateStr, onSave, onCancel, onDelete }: Props) {
  const [ora, setOra] = useState(entry?.ora || currentTimeHHMM());
  const [dove, setDove] = useState(entry?.dove || '');
  const [conChi, setConChi] = useState(entry?.conChi || '');
  const [alimenti, setAlimenti] = useState(entry?.alimenti || '');
  const [pensieri, setPensieri] = useState(entry?.pensieri || '');
  const [emozioni, setEmozioni] = useState(entry?.emozioni || '');
  const [fame, setFame] = useState<number | null>(entry?.fame ?? null);
  const [sazieta, setSazieta] = useState<number | null>(entry?.sazieta ?? null);
  const [soddisfazione, setSoddisfazione] = useState<number | null>(
    entry?.soddisfazione ?? null,
  );
  const [durataMinuti, setDurataMinuti] = useState<string>(
    entry?.durataMinuti != null ? String(entry.durataMinuti) : '',
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ora) return;

    const now = new Date().toISOString();
    const parsedDurata = durataMinuti.trim()
      ? parseInt(durataMinuti, 10)
      : null;

    const newEntry: Entry = {
      id: entry?.id || crypto.randomUUID(),
      date: dateStr,
      ora,
      dove: dove.trim(),
      conChi: conChi.trim(),
      alimenti: alimenti.trim(),
      pensieri: pensieri.trim(),
      emozioni: emozioni.trim(),
      fame,
      sazieta,
      soddisfazione,
      durataMinuti:
        parsedDurata !== null && !Number.isNaN(parsedDurata) && parsedDurata > 0
          ? parsedDurata
          : null,
      createdAt: entry?.createdAt || now,
      updatedAt: now,
    };
    onSave(newEntry);
  };

  return (
    <div className="fixed inset-0 z-40 bg-lilac-50/95 flex flex-col md:p-4">
      <div className="flex-1 md:max-w-xl w-full mx-auto bg-surface md:border border-lilac-200 md:shadow-xl md:shadow-lilac-200/40 md:rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface sticky top-0 z-10">
          <button
            type="button"
            onClick={onCancel}
            className="text-lilac-700 font-medium min-h-11 px-1"
          >
            Annulla
          </button>
          <h2 className="text-lg font-semibold text-ink">
            {entry ? 'Modifica' : 'Nuova registrazione'}
          </h2>
          <button
            type="submit"
            form="entry-form"
            className="text-lilac-600 font-semibold min-h-11 px-1"
          >
            Salva
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-[max(6rem,env(safe-area-inset-bottom))]">
          <form id="entry-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ora" className="block text-sm font-medium text-ink mb-1.5">
                  Ora *
                </label>
                <input
                  id="ora"
                  type="time"
                  required
                  value={ora}
                  onChange={(e) => setOra(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label
                  htmlFor="durata"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Durata (min)
                </label>
                <input
                  id="durata"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={durataMinuti}
                  onChange={(e) => setDurataMinuti(e.target.value)}
                  className="input-field"
                  placeholder="Opzionale"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="alimenti"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Alimenti e bevande
              </label>
              <textarea
                id="alimenti"
                rows={3}
                value={alimenti}
                onChange={(e) => setAlimenti(e.target.value)}
                className="input-field resize-y min-h-[5rem]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dove" className="block text-sm font-medium text-ink mb-1.5">
                  Dove
                </label>
                <input
                  id="dove"
                  type="text"
                  value={dove}
                  onChange={(e) => setDove(e.target.value)}
                  className="input-field"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="conChi"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Con chi
                </label>
                <input
                  id="conChi"
                  type="text"
                  value={conChi}
                  onChange={(e) => setConChi(e.target.value)}
                  className="input-field"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-lilac-100">
              <p className="text-xs font-medium uppercase tracking-wide text-lilac-600 mb-3">
                Scale da 1 a 10
              </p>
              <ScaleField label="Fame" value={fame} onChange={setFame} />
              <ScaleField label="Sazietà" value={sazieta} onChange={setSazieta} />
              <ScaleField
                label="Soddisfazione"
                value={soddisfazione}
                onChange={setSoddisfazione}
              />
            </div>

            <div>
              <label
                htmlFor="pensieri"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Pensieri
              </label>
              <textarea
                id="pensieri"
                rows={2}
                value={pensieri}
                onChange={(e) => setPensieri(e.target.value)}
                className="input-field resize-y"
              />
            </div>

            <div>
              <label
                htmlFor="emozioni"
                className="block text-sm font-medium text-ink mb-1.5"
              >
                Emozioni
              </label>
              <textarea
                id="emozioni"
                rows={2}
                value={emozioni}
                onChange={(e) => setEmozioni(e.target.value)}
                className="input-field resize-y"
              />
            </div>

            {entry && onDelete && (
              <div className="pt-6 border-t border-lilac-100">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-3 min-h-11 text-danger font-medium border border-danger/25 rounded-xl hover:bg-danger-soft transition-colors"
                >
                  Elimina registrazione
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Elimina registrazione"
        message="Sei sicuro di voler eliminare questa registrazione? L'azione non può essere annullata."
        confirmText="Elimina"
        isDanger
        onConfirm={() => {
          if (entry?.id && onDelete) onDelete(entry.id);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
