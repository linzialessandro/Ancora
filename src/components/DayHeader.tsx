import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatItalianDate, formatItalianDayOfWeek, getTodayStr } from '../lib/dates';
import { addDays, subDays, parseISO, format } from 'date-fns';

type Props = {
  dateStr: string;
  onChangeDate: (dateStr: string) => void;
};

export function DayHeader({ dateStr, onChangeDate }: Props) {
  const dateObj = parseISO(dateStr);
  const isToday = dateStr === getTodayStr();

  const prevDay = () => onChangeDate(format(subDays(dateObj, 1), 'yyyy-MM-dd'));
  const nextDay = () => onChangeDate(format(addDays(dateObj, 1), 'yyyy-MM-dd'));

  return (
    <div className="flex items-center justify-between bg-surface/95 backdrop-blur-sm px-2 py-3 border-b border-lilac-100 sticky top-0 z-10">
      <button
        type="button"
        onClick={prevDay}
        className="btn-ghost"
        aria-label="Giorno precedente"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex flex-col items-center flex-1 min-w-0 relative">
        <span className="font-semibold text-lg text-ink truncate max-w-full">
          {formatItalianDate(dateStr)}
        </span>
        <span className="text-sm text-lilac-700 capitalize flex items-center gap-1.5">
          {formatItalianDayOfWeek(dateStr)}
          {isToday && (
            <span className="text-[10px] uppercase tracking-wide font-semibold bg-lilac-100 text-lilac-700 px-1.5 py-0.5 rounded-full">
              Oggi
            </span>
          )}
        </span>

        <label className="absolute inset-0 cursor-pointer">
          <span className="sr-only">Seleziona data</span>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => {
              if (e.target.value) onChangeDate(e.target.value);
            }}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={nextDay}
        className="btn-ghost"
        aria-label="Giorno successivo"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
