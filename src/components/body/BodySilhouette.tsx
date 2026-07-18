import type { KeyboardEvent } from 'react';
import type { BodyPartId } from '../../types/models';
import { BODY_PARTS } from '../../data/bodyStereotypes';

type Props = {
  selected: BodyPartId | null;
  onSelect: (part: BodyPartId) => void;
};

const PART_LABELS: Record<BodyPartId, string> = Object.fromEntries(
  BODY_PARTS.map((p) => [p.id, p.label]),
) as Record<BodyPartId, string>;

function partClass(part: BodyPartId, selected: BodyPartId | null): string {
  const isActive = selected === part;
  const dimmed = selected && !isActive;
  return [
    'cursor-pointer transition-[fill,opacity,stroke] duration-150 outline-none',
    isActive ? 'fill-lilac-400 stroke-lilac-700' : 'fill-lilac-200 stroke-lilac-500',
    dimmed ? 'opacity-45' : 'opacity-100',
    'hover:fill-lilac-300 focus-visible:stroke-lilac-800 focus-visible:stroke-2',
  ].join(' ');
}

function OverallChip({
  selected,
  onSelect,
}: {
  selected: BodyPartId | null;
  onSelect: (part: BodyPartId) => void;
}) {
  const active = selected === 'overall';
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect('overall');
    }
  };

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={PART_LABELS.overall}
      onClick={() => onSelect('overall')}
      onKeyDown={onKey}
      className="cursor-pointer outline-none"
    >
      <rect
        x="52"
        y="388"
        width="96"
        height="18"
        rx="9"
        className={
          active
            ? 'fill-lilac-400 stroke-lilac-700'
            : 'fill-lilac-100 stroke-lilac-300'
        }
        strokeWidth={1.2}
      />
      <text
        x="100"
        y="399"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 9, fontWeight: 600 }}
        className="fill-ink pointer-events-none"
      >
        Corpo intero
      </text>
    </g>
  );
}

/** Silhouette femminile stilizzata, interattiva. */
export function BodySilhouette({ selected, onSelect }: Props) {
  const sw = 1.6;

  const handle = (part: BodyPartId) => () => onSelect(part);
  const onKey =
    (part: BodyPartId) => (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(part);
      }
    };

  return (
    <svg
      viewBox="0 0 200 420"
      className="w-full max-w-[15rem] mx-auto"
      role="img"
      aria-label="Figura stilizzata. Tocca una parte del corpo."
    >
      <g>
        <ellipse cx="100" cy="398" rx="42" ry="6" className="fill-lilac-100" pointerEvents="none" />

        {/* Capelli (decorativi) */}
        <path
          d="M72 48
             C68 28 78 14 100 12
             C122 14 132 28 128 48
             C130 62 126 78 118 88
             L112 82
             C116 70 118 58 116 48
             C114 34 106 28 100 28
             C94 28 86 34 84 48
             C82 58 84 70 88 82
             L82 88
             C74 78 70 62 72 48 Z"
          className="fill-lilac-300 stroke-lilac-500"
          strokeWidth={1.2}
          pointerEvents="none"
        />

        {/* Viso + collo */}
        <path
          d="M84 42
             C84 28 91 20 100 20
             C109 20 116 28 116 42
             C116 54 110 62 100 64
             C90 62 84 54 84 42 Z
             M95 64 L95 76 L105 76 L105 64 Z"
          className={partClass('head', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.head}
          onClick={handle('head')}
          onKeyDown={onKey('head')}
        />

        {/* Braccio sinistro */}
        <path
          d="M74 88
             C58 96 48 118 44 148
             C42 158 46 164 52 160
             C58 152 64 128 72 108
             C74 102 76 94 74 88 Z"
          className={partClass('arms', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.arms}
          onClick={handle('arms')}
          onKeyDown={onKey('arms')}
        />
        {/* Braccio destro */}
        <path
          d="M126 88
             C142 96 152 118 156 148
             C158 158 154 164 148 160
             C142 152 136 128 128 108
             C126 102 124 94 126 88 Z"
          className={partClass('arms', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={`${PART_LABELS.arms} destra`}
          onClick={handle('arms')}
          onKeyDown={onKey('arms')}
        />

        {/* Seno */}
        <path
          d="M76 80
             C84 76 92 74 100 74
             C108 74 116 76 124 80
             L128 92
             C126 108 118 122 100 126
             C82 122 74 108 72 92 Z"
          className={partClass('chest', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.chest}
          onClick={handle('chest')}
          onKeyDown={onKey('chest')}
        />

        {/* Addome */}
        <path
          d="M74 124
             C82 128 90 130 100 130
             C110 130 118 128 126 124
             L122 168
             C114 174 106 176 100 176
             C94 176 86 174 78 168 Z"
          className={partClass('belly', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.belly}
          onClick={handle('belly')}
          onKeyDown={onKey('belly')}
        />

        {/* Fianchi */}
        <path
          d="M76 166
             C86 176 94 180 100 180
             C106 180 114 176 124 166
             L132 198
             C122 210 110 214 100 214
             C90 214 78 210 68 198 Z"
          className={partClass('hips', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.hips}
          onClick={handle('hips')}
          onKeyDown={onKey('hips')}
        />

        {/* Gamba sinistra */}
        <path
          d="M72 200
             C70 240 68 280 70 320
             C71 340 74 358 78 372
             C82 378 90 378 92 370
             C94 350 94 320 96 280
             C98 240 96 214 92 204
             C86 200 78 198 72 200 Z"
          className={partClass('legs', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={PART_LABELS.legs}
          onClick={handle('legs')}
          onKeyDown={onKey('legs')}
        />
        {/* Gamba destra */}
        <path
          d="M128 200
             C130 240 132 280 130 320
             C129 340 126 358 122 372
             C118 378 110 378 108 370
             C106 350 106 320 104 280
             C102 240 104 214 108 204
             C114 200 122 198 128 200 Z"
          className={partClass('legs', selected)}
          strokeWidth={sw}
          strokeLinejoin="round"
          tabIndex={0}
          role="button"
          aria-label={`${PART_LABELS.legs} destra`}
          onClick={handle('legs')}
          onKeyDown={onKey('legs')}
        />

        <OverallChip selected={selected} onSelect={onSelect} />
      </g>
    </svg>
  );
}
