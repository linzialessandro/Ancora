import { useState } from 'react';
import type { BodyPartId } from '../types/models';
import { BODY_PARTS } from '../data/bodyStereotypes';
import { BodySilhouette } from './body/BodySilhouette';
import { SectionHeader } from './SectionHeader';
import { DetailPanel } from './DetailPanel';

type Props = {
  onBack: () => void;
  onInfo: () => void;
  onDonate: () => void;
};

export function BodyScreen({ onBack, onInfo, onDonate }: Props) {
  const [selectedId, setSelectedId] = useState<BodyPartId | null>(null);
  const selected = BODY_PARTS.find((p) => p.id === selectedId) ?? null;

  return (
    <>
      <SectionHeader
        title="Il mio corpo"
        onBack={onBack}
        onInfo={onInfo}
        onDonate={onDonate}
      />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40 px-4 py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="text-sm text-ink-muted text-center leading-relaxed mb-4 px-1">
          Tocca una parte del corpo per leggere uno stereotipo comune e una risposta
          scientifica semplice.
        </p>

        <div className="section-card p-4 flex justify-center">
          <BodySilhouette selected={selectedId} onSelect={setSelectedId} />
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {BODY_PARTS.map((part) => (
            <li key={part.id}>
              <button
                type="button"
                onClick={() => setSelectedId(part.id)}
                className={`w-full text-sm px-3 py-2.5 rounded-xl border min-h-11 transition-colors ${
                  selectedId === part.id
                    ? 'border-lilac-400 bg-lilac-100 text-ink font-medium'
                    : 'border-lilac-100 bg-surface text-ink-muted hover:border-lilac-300'
                }`}
              >
                {part.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-ink-muted text-center leading-relaxed px-2">
          Informazioni generali, non sostituiscono il parere di un professionista.
        </p>
      </div>

      {selected && (
        <DetailPanel title={selected.label} onClose={() => setSelectedId(null)}>
          <div className="rounded-xl bg-lilac-50 border border-lilac-100 p-3">
            <p className="text-xs font-semibold text-lilac-700 uppercase tracking-wide mb-1">
              Stereotipo tipico
            </p>
            <p className="text-sm text-ink leading-relaxed italic whitespace-pre-line">
              {selected.stereotype}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-lilac-700 uppercase tracking-wide mb-1">
              Cosa dice la scienza
            </p>
            <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
              {selected.science}
            </p>
          </div>
        </DetailPanel>
      )}
    </>
  );
}
