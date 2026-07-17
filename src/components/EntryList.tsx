import type { Entry } from '../types/models';
import { EntryCard } from './EntryCard';
import { EmptyState } from './EmptyState';

type Props = {
  entries: Entry[];
  onEditEntry: (entry: Entry) => void;
};

export function EntryList({ entries, onEditEntry }: Props) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  const sorted = [...entries].sort((a, b) => a.ora.localeCompare(b.ora));

  return (
    <div className="p-4 pb-28">
      {sorted.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onClick={() => onEditEntry(entry)}
        />
      ))}
    </div>
  );
}
