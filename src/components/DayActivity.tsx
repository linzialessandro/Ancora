import { useState } from 'react';
import { Activity, Edit2, Check, X } from 'lucide-react';

type Props = {
  dateStr: string;
  activityText: string;
  onSave: (text: string) => void;
};

export function DayActivity({ dateStr, activityText, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(activityText);

  // Update local text if date changes or external activity changes
  // Not strictly needed if we reset when editing, but good for safety.

  const handleEdit = () => {
    setText(activityText);
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(activityText);
    setIsEditing(false);
  };

  return (
    <div className="bg-surface m-4 p-4 rounded-xl shadow-sm border border-lilac-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-lilac-700 flex items-center gap-1.5 uppercase tracking-wide">
          <Activity size={16} />
          Attività Fisica
        </h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-lilac-600 hover:text-lilac-400 p-1"
            title="Modifica attività fisica"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Descrivi l'attività fisica di oggi (es. Camminata 30 min, Yoga...)"
            rows={3}
            className="w-full p-3 bg-lilac-50/50 border border-lilac-200 rounded-lg focus:border-lilac-400 focus:ring-1 focus:ring-lilac-400 outline-none text-ink text-sm mb-3"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-ink-muted hover:bg-lilac-50 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <X size={16} />
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-lilac-400 text-surface hover:bg-lilac-600 rounded-lg font-medium transition-colors flex items-center gap-1 shadow-sm"
            >
              <Check size={16} />
              Salva
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-1">
          {activityText ? (
            <p className="text-ink text-sm leading-relaxed whitespace-pre-wrap">
              {activityText}
            </p>
          ) : (
            <p className="text-ink-muted text-sm italic">
              Nessuna attività registrata.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
