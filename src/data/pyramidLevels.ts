import type { PyramidLevelId } from '../types/models';

export type PyramidLevelMeta = {
  id: PyramidLevelId;
  /** Only shown on the pyramid bands: Cima, Alto, Medio, Basso, Base */
  label: string;
  /** Tailwind-ish classes for the band background */
  bandClass: string;
  /** Width percentage of the pyramid band (visual) */
  widthPercent: number;
};

/** Display order: top (most feared) → base (comfort). Fear meaning is only in instructions. */
export const PYRAMID_LEVELS_TOP_TO_BOTTOM: PyramidLevelMeta[] = [
  {
    id: 5,
    label: 'Cima',
    bandClass: 'bg-lilac-500 text-surface border-lilac-600',
    widthPercent: 42,
  },
  {
    id: 4,
    label: 'Alto',
    bandClass: 'bg-lilac-400 text-surface border-lilac-500',
    widthPercent: 56,
  },
  {
    id: 3,
    label: 'Medio',
    bandClass: 'bg-lilac-300 text-ink border-lilac-400',
    widthPercent: 70,
  },
  {
    id: 2,
    label: 'Basso',
    bandClass: 'bg-lilac-200 text-ink border-lilac-300',
    widthPercent: 84,
  },
  {
    id: 1,
    label: 'Base',
    bandClass: 'bg-lilac-100 text-ink border-lilac-200',
    widthPercent: 98,
  },
];
