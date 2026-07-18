import { useMemo, useState } from 'react';
import { PLATE_COMPONENTS } from '../data/plateComponents';
import type { PlateComponentId } from '../types/models';
import { buildPieSlices } from '../lib/pie';
import { SectionHeader } from './SectionHeader';
import { DetailPanel } from './DetailPanel';

type Props = {
  onBack: () => void;
  onInfo: () => void;
  onDonate: () => void;
};

const CX = 100;
const CY = 100;
const R = 88;

export function PlateScreen({ onBack, onInfo, onDonate }: Props) {
  const [selectedId, setSelectedId] = useState<PlateComponentId | null>(null);

  const slices = useMemo(
    () =>
      buildPieSlices(
        PLATE_COMPONENTS.map((c) => ({ id: c.id, value: 1 })),
        CX,
        CY,
        R,
      ),
    [],
  );

  const selected = PLATE_COMPONENTS.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <SectionHeader title="Il piatto" onBack={onBack} onInfo={onInfo} onDonate={onDonate} />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40 px-4 py-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="text-sm text-ink-muted text-center leading-relaxed mb-4 px-1">
          Tocca una fetta per capire perché conta. In questa visualizzazione tutte le sezioni
          sono rappresentate in misura uguale per ricordarti che non ci sono cibi più importanti di altri.
        </p>

        <div className="flex justify-center mb-5">
          <svg
            viewBox="0 0 200 200"
            className="w-full max-w-[17rem] drop-shadow-sm"
            role="img"
            aria-label="Diagramma a torta dei componenti del pasto"
          >
            <circle cx={CX} cy={CY} r={R + 2} fill="#f0e8f0" />
            {slices.map((slice) => {
              const comp = PLATE_COMPONENTS.find((c) => c.id === slice.id)!;
              const isActive = selectedId === comp.id;
              return (
                <path
                  key={slice.id}
                  d={slice.path}
                  fill={comp.color}
                  stroke="#fff"
                  strokeWidth={isActive ? 2.5 : 1.5}
                  opacity={selectedId && !isActive ? 0.55 : 1}
                  className="cursor-pointer transition-opacity outline-none focus-visible:stroke-lilac-700"
                  tabIndex={0}
                  role="button"
                  aria-label={comp.label}
                  onClick={() => setSelectedId(comp.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(comp.id);
                    }
                  }}
                />
              );
            })}
            <circle cx={CX} cy={CY} r={28} fill="#ffffff" stroke="#e0cce0" strokeWidth={1} />
            <text
              x={CX}
              y={CY + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink-muted"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              Pasto
            </text>
          </svg>
        </div>

        <ul className="space-y-2">
          {PLATE_COMPONENTS.map((comp) => (
            <li key={comp.id}>
              <button
                type="button"
                onClick={() => setSelectedId(comp.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-colors min-h-11 ${
                  selectedId === comp.id
                    ? 'border-lilac-400 bg-lilac-50'
                    : 'border-lilac-100 bg-surface hover:border-lilac-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-black/5"
                  style={{ backgroundColor: comp.color }}
                  aria-hidden
                />
                <span className="flex-1 font-medium text-ink text-sm">{comp.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-ink-muted leading-relaxed text-center px-2">
          I micronutrienti non sono un “ingrediente a parte”: si trovano negli alimenti.
          Questo diagramma serve a ragionare su un pasto completo.
        </p>
      </div>

      {selected && (
        <DetailPanel title={selected.label} onClose={() => setSelectedId(null)}>
          <div className="rounded-xl bg-lilac-50 border border-lilac-100 p-3">
            <p className="text-xs font-semibold text-lilac-700 uppercase tracking-wide mb-1">
              Perché
            </p>
            <p className="text-sm text-ink leading-relaxed">{selected.why}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-lilac-700 uppercase tracking-wide mb-1">
              Cosa dice la scienza
            </p>
            <p className="text-sm text-ink leading-relaxed">{selected.science}</p>
          </div>
        </DetailPanel>
      )}
    </>
  );
}
