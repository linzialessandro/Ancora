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
    'cursor-pointer transition-[fill,opacity,stroke] duration-150 outline-none',
    isActive ? 'fill-lilac-400 stroke-lilac-700' : 'fill-lilac-200 stroke-lilac-500',
    dimmed ? 'opacity-45' : 'opacity-100',
    'hover:fill-lilac-300 focus-visible:stroke-lilac-800 focus-visible:stroke-2',
  ].join(' ');
}

function usePartHandlers(onSelect: (part: BodyPartId) => void) {
  const handle = (part: BodyPartId) => () => onSelect(part);
  const onKey =
    (part: BodyPartId) => (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(part);
      }
    };
  return { handle, onKey };
}

type FigureProps = {
  selected: BodyPartId | null;
  onSelect: (part: BodyPartId) => void;
};

/** Clearly feminine silhouette: softer head, hair, narrower shoulders, waist, wider hips. */
function FemaleFigure({ selected, onSelect }: FigureProps) {
  const { handle, onKey } = usePartHandlers(onSelect);
  const sw = 1.6;

  return (
    <g>
      {/* Soft ground shadow */}
      <ellipse cx="100" cy="398" rx="42" ry="6" className="fill-lilac-100" pointerEvents="none" />

      {/* Hair (decorative, behind head hit area) */}
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

      {/* Head + neck */}
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

      {/* Left arm */}
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
      {/* Right arm */}
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

      {/* Chest / bust */}
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

      {/* Belly / waist */}
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

      {/* Hips */}
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

      {/* Left leg */}
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
      {/* Right leg */}
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

      {/* Overall control */}
      <OverallChip selected={selected} onSelect={onSelect} />
    </g>
  );
}

/** Clearly masculine silhouette: broader shoulders, straighter torso, narrower hips, short hair. */
function MaleFigure({ selected, onSelect }: FigureProps) {
  const { handle, onKey } = usePartHandlers(onSelect);
  const sw = 1.6;

  return (
    <g>
      <ellipse cx="100" cy="398" rx="44" ry="6" className="fill-lilac-100" pointerEvents="none" />

      {/* Short hair cap */}
      <path
        d="M78 40
           C78 22 88 14 100 14
           C112 14 122 22 122 40
           C122 48 118 52 114 50
           C110 36 104 32 100 32
           C96 32 90 36 86 50
           C82 52 78 48 78 40 Z"
        className="fill-lilac-300 stroke-lilac-500"
        strokeWidth={1.2}
        pointerEvents="none"
      />

      {/* Head + neck (slightly more angular) */}
      <path
        d="M82 40
           C82 26 90 18 100 18
           C110 18 118 26 118 40
           C118 52 112 60 100 62
           C88 60 82 52 82 40 Z
           M94 62 L94 78 L106 78 L106 62 Z"
        className={partClass('head', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.head}
        onClick={handle('head')}
        onKeyDown={onKey('head')}
      />

      {/* Left arm — broader, more vertical */}
      <path
        d="M68 90
           C52 100 44 124 40 156
           C38 166 42 172 48 168
           C54 160 58 132 66 112
           C68 104 70 96 68 90 Z"
        className={partClass('arms', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.arms}
        onClick={handle('arms')}
        onKeyDown={onKey('arms')}
      />
      {/* Right arm */}
      <path
        d="M132 90
           C148 100 156 124 160 156
           C162 166 158 172 152 168
           C146 160 142 132 134 112
           C132 104 130 96 132 90 Z"
        className={partClass('arms', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={`${PART_LABELS.arms} destra`}
        onClick={handle('arms')}
        onKeyDown={onKey('arms')}
      />

      {/* Chest / broad shoulders, flat */}
      <path
        d="M68 82
           C80 76 90 74 100 74
           C110 74 120 76 132 82
           L136 96
           C134 118 122 132 100 134
           C78 132 66 118 64 96 Z"
        className={partClass('chest', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.chest}
        onClick={handle('chest')}
        onKeyDown={onKey('chest')}
      />

      {/* Belly — straighter sides */}
      <path
        d="M66 130
           C78 134 88 136 100 136
           C112 136 122 134 134 130
           L130 176
           C120 180 110 182 100 182
           C90 182 80 180 70 176 Z"
        className={partClass('belly', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.belly}
        onClick={handle('belly')}
        onKeyDown={onKey('belly')}
      />

      {/* Hips — narrower than female */}
      <path
        d="M72 174
           C84 182 92 184 100 184
           C108 184 116 182 128 174
           L132 200
           C122 208 112 210 100 210
           C88 210 78 208 68 200 Z"
        className={partClass('hips', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.hips}
        onClick={handle('hips')}
        onKeyDown={onKey('hips')}
      />

      {/* Left leg — straighter, thicker */}
      <path
        d="M70 198
           C68 240 66 282 68 322
           C69 344 72 362 76 374
           C80 380 88 380 90 372
           C92 350 92 318 94 278
           C96 238 96 214 94 204
           C88 198 78 196 70 198 Z"
        className={partClass('legs', selected)}
        strokeWidth={sw}
        strokeLinejoin="round"
        tabIndex={0}
        role="button"
        aria-label={PART_LABELS.legs}
        onClick={handle('legs')}
        onKeyDown={onKey('legs')}
      />
      {/* Right leg */}
      <path
        d="M130 198
           C132 240 134 282 132 322
           C131 344 128 362 124 374
           C120 380 112 380 110 372
           C108 350 108 318 106 278
           C104 238 104 214 106 204
           C112 198 122 196 130 198 Z"
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
  );
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

export function BodySilhouette({ gender, selected, onSelect }: Props) {
  return (
    <svg
      viewBox="0 0 200 420"
      className="w-full max-w-[15rem] mx-auto"
      role="img"
      aria-label={`Figura stilizzata ${gender === 'female' ? 'femminile' : 'maschile'}. Tocca una parte del corpo.`}
    >
      {gender === 'female' ? (
        <FemaleFigure selected={selected} onSelect={onSelect} />
      ) : (
        <MaleFigure selected={selected} onSelect={onSelect} />
      )}
    </svg>
  );
}
