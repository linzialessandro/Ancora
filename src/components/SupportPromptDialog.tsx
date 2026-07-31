import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onOpenDonate: () => void;
  onDismiss: () => void;
  onNeverShowAgain: () => void;
};

export function SupportPromptDialog({
  isOpen,
  onOpenDonate,
  onDismiss,
  onNeverShowAgain,
}: Props) {
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    primaryRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-lilac-800/40 backdrop-blur-[2px] p-4"
      role="presentation"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-prompt-title"
        aria-describedby="support-prompt-desc"
        className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl border border-lilac-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart
            size={18}
            className="text-lilac-500 shrink-0"
            fill="currentColor"
            aria-hidden
          />
          <h3 id="support-prompt-title" className="text-lg font-semibold text-ink">
            PDF pronto
          </h3>
        </div>
        <p id="support-prompt-desc" className="text-ink-muted mb-5 leading-relaxed text-sm">
          L&apos;esportazione è andata a buon fine. Se Ancora ti è utile, puoi supportare lo
          sviluppo con una donazione volontaria — senza alcun obbligo. La tua serenità viene
          prima di tutto.
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            ref={primaryRef}
            type="button"
            onClick={onOpenDonate}
            className="btn-primary w-full"
          >
            Apri Dona
          </button>
          <button type="button" onClick={onDismiss} className="btn-secondary w-full">
            Chiudi
          </button>
          <button
            type="button"
            onClick={onNeverShowAgain}
            className="text-sm text-ink-muted hover:text-ink py-2 underline-offset-2 hover:underline transition-colors"
          >
            Non mostrare di nuovo
          </button>
        </div>
      </div>
    </div>
  );
}
