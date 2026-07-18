import type { ReactNode } from 'react';
import { ArrowLeft, Heart, Info } from 'lucide-react';

type Props = {
  title: string;
  onBack?: () => void;
  onInfo?: () => void;
  onDonate?: () => void;
  extraActions?: ReactNode;
  /** When true, use home-style branding instead of back+title */
  homeBrand?: boolean;
  brandIcon?: ReactNode;
};

export function SectionHeader({
  title,
  onBack,
  onInfo,
  onDonate,
  extraActions,
  homeBrand = false,
  brandIcon,
}: Props) {
  return (
    <header className="bg-gradient-to-br from-lilac-400 via-lilac-500 to-lilac-600 text-surface px-3 pt-[max(1rem,env(safe-area-inset-top))] pb-3 flex justify-between items-center gap-1 shadow-md shadow-lilac-600/20 z-20 shrink-0">
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors shrink-0"
            aria-label="Torna alla home"
          >
            <ArrowLeft size={22} />
          </button>
        )}
        {homeBrand ? (
          <div className="flex items-center gap-2.5 min-w-0">
            {brandIcon && (
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/20 shrink-0"
                aria-hidden
              >
                {brandIcon}
              </span>
            )}
            <h1 className="text-xl font-bold tracking-tight truncate">{title}</h1>
          </div>
        ) : (
          <h1 className="text-lg font-bold tracking-tight truncate pr-1">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        {extraActions}
        {onInfo && (
          <button
            type="button"
            onClick={onInfo}
            className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
            title="Informazioni"
            aria-label="Apri informazioni"
          >
            <Info size={22} />
          </button>
        )}
        {onDonate && (
          <button
            type="button"
            onClick={onDonate}
            className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
            title="Dona"
            aria-label="Dona"
          >
            <Heart size={22} />
          </button>
        )}
      </div>
    </header>
  );
}
