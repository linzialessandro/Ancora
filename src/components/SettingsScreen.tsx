import { useState, useRef } from 'react';
import type { Gender, Settings } from '../types/models';
import { ConfirmDialog } from './ConfirmDialog';
import { Upload, Download, Trash2, X } from 'lucide-react';

type Props = {
  settings: Settings;
  onSaveSettings: (s: Settings) => boolean;
  onExportBackup: () => string;
  onImportBackup: (json: string) => boolean;
  onClearAll: () => void;
  onClose: () => void;
};

export function SettingsScreen({
  settings,
  onSaveSettings,
  onExportBackup,
  onImportBackup,
  onClearAll,
  onClose,
}: Props) {
  const [nome, setNome] = useState(settings.pazienteNome);
  const [gender, setGender] = useState<Gender>(settings.gender);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [importData, setImportData] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(null), 4000);
  };

  const handleSave = () => {
    const ok = onSaveSettings({
      ...settings,
      pazienteNome: nome.trim(),
      gender,
    });
    if (ok) {
      onClose();
    } else {
      showFeedback('Impossibile salvare le impostazioni su questo dispositivo.');
    }
  };

  const handleExport = () => {
    try {
      const data = onExportBackup();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ancora-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      showFeedback('Impossibile creare il file di backup.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImportData(result);
      setShowImportConfirm(true);
    };
    reader.onerror = () => {
      showFeedback('Impossibile leggere il file selezionato.');
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const confirmImport = () => {
    if (importData) {
      const success = onImportBackup(importData);
      if (success) {
        showFeedback('Backup importato correttamente.');
      } else {
        showFeedback('Importazione non riuscita. Il file non è valido.');
      }
      setShowImportConfirm(false);
      setImportData(null);
    }
  };

  const confirmClear = () => {
    onClearAll();
    setShowClearConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-lilac-50/95 flex flex-col md:p-4">
      <div className="flex-1 md:max-w-xl w-full mx-auto bg-surface md:border border-lilac-200 md:shadow-xl md:shadow-lilac-200/40 md:rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-ink">Impostazioni</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-ink-muted"
            aria-label="Chiudi impostazioni"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {feedback && (
            <div
              role="status"
              className="px-3 py-2.5 rounded-xl bg-lilac-100 border border-lilac-300 text-sm text-ink"
            >
              {feedback}
            </div>
          )}

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Informazioni personali
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="paziente-nome" className="block text-sm font-medium text-ink">
                  Nome (come sul diario)
                </label>
                <input
                  id="paziente-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="es. Sig./ra Rossi"
                  className="input-field"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <p className="block text-sm font-medium text-ink" id="gender-label">
                  Genere (per «Il mio corpo»)
                </p>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="group"
                  aria-labelledby="gender-label"
                >
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                      gender === 'female'
                        ? 'border-lilac-500 bg-lilac-100 text-ink'
                        : 'border-lilac-200 bg-surface text-ink-muted hover:border-lilac-300'
                    }`}
                    aria-pressed={gender === 'female'}
                  >
                    Femminile
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                      gender === 'male'
                        ? 'border-lilac-500 bg-lilac-100 text-ink'
                        : 'border-lilac-200 bg-surface text-ink-muted hover:border-lilac-300'
                    }`}
                    aria-pressed={gender === 'male'}
                  >
                    Maschile
                  </button>
                </div>
              </div>

              <button type="button" onClick={handleSave} className="btn-primary mt-1">
                Salva impostazioni
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Dati e backup
            </h3>
            <p className="text-sm text-ink-muted mb-3 leading-relaxed">
              Esporta un backup periodicamente, soprattutto prima di cambiare telefono o
              cancellare i dati del browser.
            </p>
            <div className="space-y-3">
              <button type="button" onClick={handleExport} className="btn-secondary w-full">
                <Download size={20} className="text-lilac-600" aria-hidden />
                <span>Esporta backup (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary w-full"
              >
                <Upload size={20} className="text-lilac-600" aria-hidden />
                <span>Importa backup</span>
              </button>
              <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-danger uppercase tracking-wide mb-3">
              Zona pericolosa
            </h3>
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="w-full flex items-center justify-center gap-2 p-3 min-h-11 bg-surface border border-danger/30 text-danger rounded-xl hover:bg-danger-soft transition-colors font-medium"
            >
              <Trash2 size={20} aria-hidden />
              <span>Elimina tutti i dati</span>
            </button>
          </section>

          <section className="pt-4 border-t border-lilac-100 text-sm text-ink-muted">
            <h3 className="font-semibold text-ink mb-1.5">Privacy</h3>
            <p className="leading-relaxed">
              I tuoi dati sono salvati esclusivamente su questo dispositivo. Non vengono
              inviati a nessun server, non c&apos;è tracciamento e non vengono usati cookie.
              Esporta backup regolari per non perdere le registrazioni.
            </p>
          </section>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showImportConfirm}
        title="Importa backup"
        message="Importando il backup sovrascriverai i dati attuali. Questa operazione non può essere annullata. Vuoi continuare?"
        confirmText="Importa"
        isDanger
        onConfirm={confirmImport}
        onCancel={() => {
          setShowImportConfirm(false);
          setImportData(null);
        }}
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Elimina tutti i dati"
        message="Sei sicuro di voler eliminare tutte le registrazioni, la piramide dei cibifobici e le impostazioni? L'operazione non può essere annullata: senza un backup i dati andranno persi."
        confirmText="Sì, elimina tutto"
        isDanger
        onConfirm={confirmClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
