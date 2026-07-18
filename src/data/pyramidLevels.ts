import type { PyramidLevelId } from '../types/models';

export type PyramidLevelMeta = {
  id: PyramidLevelId;
  label: string;
  shortLabel: string;
  /** Tailwind-ish classes for the band background */
  bandClass: string;
  /** Width percentage of the pyramid band (visual) */
  widthPercent: number;
};

/** Display order: top (most feared) → base (comfort) */
export const PYRAMID_LEVELS_TOP_TO_BOTTOM: PyramidLevelMeta[] = [
  {
    id: 5,
    label: 'Spaventano di più',
    shortLabel: 'Cima',
    bandClass: 'bg-lilac-500 text-surface border-lilac-600',
    widthPercent: 42,
  },
  {
    id: 4,
    label: 'Molto spaventosi',
    shortLabel: 'Alto',
    bandClass: 'bg-lilac-400 text-surface border-lilac-500',
    widthPercent: 56,
  },
  {
    id: 3,
    label: 'Medi',
    shortLabel: 'Medio',
    bandClass: 'bg-lilac-300 text-ink border-lilac-400',
    widthPercent: 70,
  },
  {
    id: 2,
    label: 'Poco spaventosi',
    shortLabel: 'Basso',
    bandClass: 'bg-lilac-200 text-ink border-lilac-300',
    widthPercent: 84,
  },
  {
    id: 1,
    label: 'Spaventano di meno',
    shortLabel: 'Base',
    bandClass: 'bg-lilac-100 text-ink border-lilac-200',
    widthPercent: 98,
  },
];
