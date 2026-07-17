type Props = {
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
};

export function ScaleField({ label, value, onChange }: Props) {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-ink" id={`scale-${label}`}>
          {label} <span className="text-ink-muted font-normal">(1–10)</span>
        </span>
        {value !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-lilac-600 hover:text-lilac-700 font-medium px-2 py-1 rounded-md hover:bg-lilac-50"
          >
            Azzera
          </button>
        )}
      </div>
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2"
        role="group"
        aria-labelledby={`scale-${label}`}
      >
        {options.map((num) => {
          const selected = value === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              aria-pressed={selected}
              className={`min-h-11 py-2.5 text-sm rounded-xl transition-all ${
                selected
                  ? 'bg-lilac-500 text-surface font-semibold shadow-sm shadow-lilac-400/40 ring-2 ring-lilac-300 ring-offset-1'
                  : 'bg-lilac-50/80 border border-lilac-200 text-ink hover:border-lilac-400 hover:bg-lilac-100'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
