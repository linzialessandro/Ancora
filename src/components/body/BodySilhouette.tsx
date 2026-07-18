import type { KeyboardEvent } from 'react';
import type { BodyPartId, Gender } from '../../types/models';

type Props = {
  gender: Gender;
  selected: BodyPartId | null;
  onSelect: (part: BodyPartId) => void;
};

const PART_LABELS: Record<BodyPartId, string> = {
  head: 'Viso e testa',
  arms: 'Braccia',
  chest: 'Petto / torace',
  belly: 'Addome',
  hips: 'Fianchi',
  legs: 'Gambe',
  overall: 'Corpo intero',
};

function partClass(part: BodyPartId, selected: BodyPartId | null): string {
  const isActive = selected === part;
  const dimmed = selected && !isActive;
  return [
    'cursor-pointer transition-all outline-none',
    isActive ? 'fill-lilac-400 stroke-lilac-700' : 'fill-lilac-200 stroke-lilac-500',
    dimmed ? 'opacity-50' : 'opacity-100',
    'hover:fill-lilac-300 focus-visible:stroke-lilac-800',
  ].join(' ');
}

/** Stylized interactive body — female proportions slightly wider hips / softer chest */
export function BodySilhouette({ gender, selected, onSelect }: Props) {
  const hipScale = gender === 'female' ? 1 : 0.92;
  const chestW = gender === 'female' ? 28 : 30;
  const shoulderY = 72;

  const handle = (part: BodyPartId) => () => onSelect(part);
  const onKey =
    (part: BodyPartId) => (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(part);
      }
    };

  // Shared geometry (viewBox 0 0 120 280)
  const hipLeft = 60 - 22 * hipScale;
  const hipRight = 60 + 22 * hipScale;

  return (
    <svg
      viewBox="0 0 120 280"
      className="w-full max-w-[14rem] mx-auto"
      role="img"
      aria-label={`Figura stilizzata ${gender === 'female' ? 'femminile' : 'maschile'}. Tocca una parte del corpo.`}
    >
      {/* Overall outline hint (not interactive primary) */}
      <ellipse
        cx="60"
        cy="140"
        rx="38"
        ry="100"
        className="fill-none stroke-lilac-100"
        strokeWidth="1"
        strokeDasharray="4 3"
        pointerEvents="none"
      />

      {/* Head */}
      <ellipse
        cx="60"
        cy="32"
        rx="18"
        ry="20"
        className={partClass('head', selected)}
        strokeWidth="1.75"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.head}
        onClick={handle('head')}
        onKeyDown={onKey('head')}
      />

      {/* Neck (visual only) */}
      <rect x="54" y="50" width="12" height="12" fill="#e8d8e8" pointerEvents="none" />

      {/* Arms — left */}
      <path
        d={`M ${60 - chestW} ${shoulderY + 8}
            Q ${28} ${110} 24 150
            Q 26 158 32 154
            Q 36 120 ${60 - chestW + 4} ${shoulderY + 28} Z`}
        className={partClass('arms', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.arms}
        onClick={handle('arms')}
        onKeyDown={onKey('arms')}
      />
      {/* Arms — right */}
      <path
        d={`M ${60 + chestW} ${shoulderY + 8}
            Q ${92} ${110} 96 150
            Q 94 158 88 154
            Q 84 120 ${60 + chestW - 4} ${shoulderY + 28} Z`}
        className={partClass('arms', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={`${PART_LABELS.arms} destra`}
        onClick={handle('arms')}
        onKeyDown={onKey('arms')}
      />

      {/* Chest / torso upper */}
      <path
        d={
          gender === 'female'
            ? `M ${60 - chestW} ${shoulderY}
               Q 60 ${shoulderY - 4} ${60 + chestW} ${shoulderY}
               L ${60 + chestW - 2} 115
               Q 60 128 ${60 - chestW + 2} 115 Z`
            : `M ${60 - chestW} ${shoulderY}
               L ${60 + chestW} ${shoulderY}
               L ${60 + chestW - 2} 118
               L ${60 - chestW + 2} 118 Z`
        }
        className={partClass('chest', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.chest}
        onClick={handle('chest')}
        onKeyDown={onKey('chest')}
      />

      {/* Belly */}
      <path
        d={`M ${60 - chestW + 2} 115
            Q 60 122 ${60 + chestW - 2} 115
            L ${hipRight - 2} 155
            Q 60 162 ${hipLeft + 2} 155 Z`}
        className={partClass('belly', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.belly}
        onClick={handle('belly')}
        onKeyDown={onKey('belly')}
      />

      {/* Hips */}
      <path
        d={`M ${hipLeft + 2} 155
            Q 60 168 ${hipRight - 2} 155
            L ${hipRight + 2} 178
            Q 60 188 ${hipLeft - 2} 178 Z`}
        className={partClass('hips', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.hips}
        onClick={handle('hips')}
        onKeyDown={onKey('hips')}
      />

      {/* Legs left */}
      <path
        d={`M ${hipLeft} 178
            L ${hipLeft + 4} 250
            Q ${hipLeft + 10} 262 ${hipLeft + 16} 250
            L ${58} 178 Z`}
        className={partClass('legs', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.legs}
        onClick={handle('legs')}
        onKeyDown={onKey('legs')}
      />
      {/* Legs right */}
      <path
        d={`M ${hipRight} 178
            L ${hipRight - 4} 250
            Q ${hipRight - 10} 262 ${hipRight - 16} 250
            L ${62} 178 Z`}
        className={partClass('legs', selected)}
        strokeWidth="1.5"
        tabIndex={0}
        role="button"
        aria-label={`${PART_LABELS.legs} destra`}
        onClick={handle('legs')}
        onKeyDown={onKey('legs')}
      />

      {/* Overall — small chip at bottom of SVG as alternate entry */}
      <g
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.overall}
        onClick={handle('overall')}
        onKeyDown={onKey('overall')}
        className="cursor-pointer outline-none"
      >
        <rect
          x="30"
          y="266"
          width="60"
          height="12"
          rx="6"
          className={
            selected === 'overall'
              ? 'fill-lilac-400 stroke-lilac-700'
              : 'fill-lilac-100 stroke-lilac-300'
          }
          strokeWidth="1"
        />
        <text
          x="60"
          y="274"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 7, fontWeight: 600 }}
          className="fill-ink pointer-events-none"
        >
          Corpo intero
        </text>
      </g>
    </svg>
  );
}
