import type { Entry } from '../types/models';
import { Clock } from 'lucide-react';

type Props = {
  entry: Entry;
  onClick: () => void;
};

export function EntryCard({ entry, onClick }: Props) {
  const hasScales =
    entry.fame !== null || entry.sazieta !== null || entry.soddisfazione !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-surface p-4 rounded-2xl shadow-sm border border-lilac-100 hover:border-lilac-400 hover:shadow-md hover:shadow-lilac-200/40 transition-all mb-3 focus-visible:ring-2 focus-visible:ring-lilac-400"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5 text-lilac-600 font-semibold">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lilac-50">
            <Clock size={14} aria-hidden />
          </span>
          <span>{entry.ora}</span>
        </div>
        {entry.durataMinuti != null && (
          <span className="text-xs font-medium text-lilac-700 bg-lilac-50 px-2 py-0.5 rounded-full">
            {entry.durataMinuti} min
          </span>
        )}
      </div>

      <p className="text-ink font-medium line-clamp-2 mb-1">
        {entry.alimenti?.trim() || 'Nessun alimento inserito'}
      </p>

      {(entry.dove || entry.conChi) && (
        <p className="text-sm text-ink-muted line-clamp-1">
          {[entry.dove, entry.conChi].filter(Boolean).join(' · ')}
        </p>
      )}

      {hasScales && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted mt-2.5 pt-2.5 border-t border-lilac-50">
          {entry.fame !== null && (
            <span>
              Fame <strong className="text-lilac-700 font-semibold">{entry.fame}</strong>
            </span>
          )}
          {entry.sazieta !== null && (
            <span>
              Sazietà{' '}
              <strong className="text-lilac-700 font-semibold">{entry.sazieta}</strong>
            </span>
          )}
          {entry.soddisfazione !== null && (
            <span>
              Soddisf.{' '}
              <strong className="text-lilac-700 font-semibold">
                {entry.soddisfazione}
              </strong>
            </span>
          )}
        </div>
      )}
    </button>
  );
}
