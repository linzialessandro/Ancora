import { X } from 'lucide-react';
import type { AppSection } from '../types/models';
import { SECTION_INFO } from '../data/sectionInfo';

type Props = {
  section: AppSection;
  onClose: () => void;
};

export function SectionInfoScreen({ section, onClose }: Props) {
  const content = SECTION_INFO[section];

  return (
    <div className="fixed inset-0 z-50 bg-lilac-50/95 flex flex-col md:p-4">
      <div className="flex-1 md:max-w-xl w-full mx-auto bg-surface md:border border-lilac-200 md:shadow-xl md:shadow-lilac-200/40 md:rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-ink">{content.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-ink-muted"
            aria-label="Chiudi informazioni"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <p className="text-sm text-ink leading-relaxed">{content.intro}</p>

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Come usarla
            </h3>
            <ol className="space-y-2.5 text-sm text-ink leading-relaxed list-decimal list-outside pl-5">
              {content.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          {content.note && (
            <p className="text-sm text-ink-muted leading-relaxed rounded-2xl border border-lilac-100 bg-lilac-50/50 p-4">
              {content.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
