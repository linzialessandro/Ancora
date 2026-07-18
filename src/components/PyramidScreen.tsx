import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { FoodPhobiaPyramid, PyramidItem, PyramidLevelId } from '../types/models';
import { PYRAMID_LEVELS_TOP_TO_BOTTOM } from '../data/pyramidLevels';
import { SectionHeader } from './SectionHeader';

type Props = {
  pyramid: FoodPhobiaPyramid;
  onSave: (pyramid: FoodPhobiaPyramid) => boolean;
  onBack: () => void;
  onInfo: () => void;
  onDonate: () => void;
};

function newId(): string {
  return crypto.randomUUID();
}

export function PyramidScreen({ pyramid, onSave, onBack, onInfo, onDonate }: Props) {
  const [addingLevel, setAddingLevel] = useState<PyramidLevelId | null>(null);
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState<{ level: PyramidLevelId; item: PyramidItem } | null>(
    null,
  );
  const [editLabel, setEditLabel] = useState('');

  const updateLevels = (
    mutator: (levels: FoodPhobiaPyramid['levels']) => FoodPhobiaPyramid['levels'],
  ) => {
    onSave({ levels: mutator({ ...pyramid.levels }) });
  };

  const handleAdd = (level: PyramidLevelId) => {
    const label = draft.trim();
    if (!label) return;
    updateLevels((levels) => ({
      ...levels,
      [level]: [...levels[level], { id: newId(), label }],
    }));
    setDraft('');
    setAddingLevel(null);
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    const label = editLabel.trim();
    if (!label) return;
    const { level, item } = editing;
    updateLevels((levels) => ({
      ...levels,
      [level]: levels[level].map((i) => (i.id === item.id ? { ...i, label } : i)),
    }));
    setEditing(null);
    setEditLabel('');
  };

  const handleDelete = (level: PyramidLevelId, id: string) => {
    updateLevels((levels) => ({
      ...levels,
      [level]: levels[level].filter((i) => i.id !== id),
    }));
    if (editing?.item.id === id) {
      setEditing(null);
    }
  };

  const moveItem = (from: PyramidLevelId, id: string, direction: 'up' | 'down') => {
    const to = (direction === 'up' ? from + 1 : from - 1) as PyramidLevelId;
    if (to < 1 || to > 5) return;
    const item = pyramid.levels[from].find((i) => i.id === id);
    if (!item) return;
    updateLevels((levels) => ({
      ...levels,
      [from]: levels[from].filter((i) => i.id !== id),
      [to]: [...levels[to], item],
    }));
    if (editing?.item.id === id) {
      setEditing({ level: to, item });
    }
  };

  return (
    <>
      <SectionHeader
        title="Piramide"
        onBack={onBack}
        onInfo={onInfo}
        onDonate={onDonate}
      />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40 px-3 py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="text-sm text-ink-muted text-center leading-relaxed mb-5 px-2">
          Alla base i cibi che spaventano di meno; in cima quelli che spaventano di più. È
          la tua mappa, non un giudizio.
        </p>

        <div className="flex flex-col items-center gap-2">
          {PYRAMID_LEVELS_TOP_TO_BOTTOM.map((meta) => {
            const items = pyramid.levels[meta.id];
            return (
              <div
                key={meta.id}
                className="flex flex-col items-center w-full"
                style={{ maxWidth: `${meta.widthPercent}%` }}
              >
                <div
                  className={`w-full rounded-xl border px-3 py-2.5 shadow-sm ${meta.bandClass}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                        {meta.shortLabel}
                      </p>
                      <p className="text-sm font-medium truncate">{meta.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingLevel(meta.id);
                        setDraft('');
                      }}
                      className="shrink-0 inline-flex items-center justify-center min-w-9 min-h-9 rounded-full bg-white/25 hover:bg-white/40 transition-colors"
                      aria-label={`Aggiungi cibo a ${meta.label}`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <p className="text-xs opacity-80 py-1">Nessun cibo qui. Tocca +</p>
                  ) : (
                    <ul className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setEditing({ level: meta.id, item });
                              setEditLabel(item.label);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/30 hover:bg-white/45 text-sm font-medium max-w-full"
                          >
                            <span className="truncate max-w-[10rem]">{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {addingLevel === meta.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="es. toast, pizza…"
                        className="input-field text-sm py-2 flex-1 bg-surface text-ink"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAdd(meta.id);
                          }
                          if (e.key === 'Escape') setAddingLevel(null);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAdd(meta.id)}
                        className="btn-primary text-sm px-3 py-2"
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddingLevel(null)}
                        className="btn-ghost text-current"
                        aria-label="Annulla"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-ink/30 flex items-end sm:items-center justify-center p-4">
          <div
            className="w-full max-w-sm bg-surface rounded-2xl border border-lilac-200 shadow-xl p-4 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-food-title"
          >
            <h2 id="edit-food-title" className="text-base font-semibold text-ink">
              Modifica cibo
            </h2>
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="input-field"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSaveEdit();
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => moveItem(editing.level, editing.item.id, 'up')}
                disabled={editing.level >= 5}
                className="btn-secondary text-sm flex-1 min-w-[7rem] disabled:opacity-40"
                title="Verso la cima (più paura)"
              >
                <ChevronUp size={16} aria-hidden />
                Più paura
              </button>
              <button
                type="button"
                onClick={() => moveItem(editing.level, editing.item.id, 'down')}
                disabled={editing.level <= 1}
                className="btn-secondary text-sm flex-1 min-w-[7rem] disabled:opacity-40"
                title="Verso la base (meno paura)"
              >
                <ChevronDown size={16} aria-hidden />
                Meno paura
              </button>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={handleSaveEdit} className="btn-primary flex-1">
                <Pencil size={16} aria-hidden />
                Salva
              </button>
              <button
                type="button"
                onClick={() => handleDelete(editing.level, editing.item.id)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-danger/30 text-danger hover:bg-danger-soft font-medium"
              >
                <Trash2 size={16} aria-hidden />
                Elimina
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn-secondary"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
