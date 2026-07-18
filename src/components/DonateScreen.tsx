import { X, ExternalLink, Heart } from 'lucide-react';
import { PAYPAL_DONATE_URL, PAYPAL_QR_SRC } from '../lib/constants';

type Props = {
  onClose: () => void;
};

export function DonateScreen({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-lilac-50/95 flex flex-col md:p-4">
      <div className="flex-1 md:max-w-xl w-full mx-auto bg-surface md:border border-lilac-200 md:shadow-xl md:shadow-lilac-200/40 md:rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <Heart size={18} className="text-lilac-500" fill="currentColor" aria-hidden />
            Dona
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-ink-muted"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <p className="text-sm text-ink leading-relaxed">
            Grazie di cuore se stai considerando un contributo. Qualsiasi importo — anche
            minimo — è accolto con gratitudine e rispetto. Non c&apos;è alcun obbligo: la
            tua serenità viene prima di tutto.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Alessandro utilizza strumenti di intelligenza artificiale con un costo mensile
            per creare e migliorare progetti come Ancora. Un piccolo contributo aiuta a
            continuare.
          </p>

          <div className="rounded-2xl border border-lilac-300 bg-lilac-50 px-4 py-3">
            <p className="text-sm text-ink leading-relaxed">
              Al momento del trasferimento su PayPal, se possibile{' '}
              <strong className="font-semibold">indica che si tratta di una donazione</strong>.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-lilac-200 bg-lilac-50/60 p-5">
            <img
              src={PAYPAL_QR_SRC}
              alt="Codice QR per donazione PayPal ad Alessandro Linzi"
              className="w-44 h-44 bg-white p-2 rounded-xl shadow-sm border border-lilac-100"
              width={176}
              height={176}
            />
            <p className="text-xs text-ink-muted text-center max-w-xs">
              Inquadra il codice con la fotocamera o con l&apos;app PayPal
            </p>
            <a
              href={PAYPAL_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full max-w-xs"
            >
              <ExternalLink size={18} aria-hidden />
              Apri PayPal
            </a>
            <p className="text-xs text-lilac-700/80 text-center break-all">
              {PAYPAL_DONATE_URL}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
