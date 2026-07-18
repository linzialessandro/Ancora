import type { ReactNode } from 'react';
import { X } from 'lucide-react';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function DetailPanel({ title, onClose, children }: Props) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:inset-0 md:flex md:items-end md:justify-center md:bg-ink/20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-panel-title"
    >
      <div className="w-full max-w-md mx-auto bg-surface border-t border-lilac-200 md:border md:rounded-t-2xl md:shadow-xl max-h-[min(70dvh,32rem)] flex flex-col animate-[slideUp_0.2s_ease-out]">
        <div className="px-4 py-3 border-b border-lilac-100 flex justify-between items-center shrink-0">
          <h2 id="detail-panel-title" className="text-base font-semibold text-ink pr-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-ink-muted"
            aria-label="Chiudi"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}
