import { X, ExternalLink, Heart } from 'lucide-react';
import { PAYPAL_DONATE_URL, PAYPAL_QR_SRC } from '../lib/constants';

type Props = {
  onClose: () => void;
};

export function InfoScreen({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-lilac-50/95 flex flex-col md:p-4">
      <div className="flex-1 md:max-w-xl w-full mx-auto bg-surface md:border border-lilac-200 md:shadow-xl md:shadow-lilac-200/40 md:rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-lilac-100 flex justify-between items-center bg-gradient-to-r from-lilac-50 to-surface sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-ink">Informazioni</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-ink-muted"
            aria-label="Chiudi informazioni"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {/* Come usare */}
          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Come usare Ancora
            </h3>
            <ol className="space-y-2.5 text-sm text-ink leading-relaxed list-decimal list-outside pl-5">
              <li>Scegli il giorno con le frecce o toccando la data.</li>
              <li>
                Tocca <strong className="font-semibold text-lilac-700">+</strong> per
                aggiungere una registrazione (pasto o spuntino).
              </li>
              <li>
                Compila i campi che ti servono: non è obbligatorio riempire tutto.
              </li>
              <li>
                I dati restano <strong className="font-semibold">solo su questo
                dispositivo</strong> (non su un server).
              </li>
              <li>
                Quando serve, esporta il <strong className="font-semibold">PDF</strong>{' '}
                con tutte le registrazioni da stampare o consegnare al curante.
              </li>
              <li>
                Dopo la consegna puoi svuotare i dati nelle Impostazioni e
                ricominciare con serenità: in quel caso{' '}
                <strong className="font-semibold">non serve</strong> salvare o
                reimportare il file JSON.
              </li>
            </ol>

            <div className="mt-5 rounded-2xl border border-lilac-100 bg-lilac-50/50 p-4">
              <h4 className="text-sm font-semibold text-ink mb-2">
                Backup JSON: a cosa serve
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">
                Nelle <strong className="font-medium text-ink">Impostazioni</strong>{' '}
                trovi <em>Esporta backup</em> e <em>Importa backup</em>. Creano o
                leggono un file <strong className="font-medium text-ink">.json</strong>{' '}
                con tutte le registrazioni e il nome impostato.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">
                <strong className="font-medium text-ink">Serve</strong> soprattutto se
                cambi telefono o browser e vuoi portare con te i dati{' '}
                <em>prima</em> di averli consegnati: esporta il JSON sul vecchio
                dispositivo, poi importalo su quello nuovo (l’importazione
                sostituisce i dati presenti).
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                <strong className="font-medium text-ink">Non è necessario</strong>{' '}
                per il curante (a lui basta il PDF) né, di solito, dopo aver
                stampato e consegnato il diario: puoi semplicemente eliminare i
                dati e iniziare un nuovo periodo.
              </p>
            </div>
          </section>

          {/* Chi ha creato */}
          <section className="rounded-2xl bg-lilac-50 border border-lilac-100 p-4">
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Heart
                size={14}
                className="text-lilac-500"
                fill="currentColor"
                aria-hidden
              />
              Chi ha creato Ancora
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              Ancora è stata sviluppata da{' '}
              <strong className="font-semibold">Alessandro Linzi</strong> per amore. Un diario discreto e senza
              giudizi, pensato per accompagnare con rispetto e semplicità.
            </p>
          </section>

          {/* Donazioni */}
          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Un contributo volontario
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              Se Ancora ti è stata utile e desideri supportare lo sviluppo,
              qualsiasi importo — anche minimo — sarebbe accolto con gratitudine
              e rispetto. Non c&apos;è alcun obbligo: la tua serenità viene prima
              di tutto.
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              Alessandro utilizza strumenti di intelligenza artificiale con un
              costo mensile per creare e migliorare progetti come questo. Un
              piccolo contributo aiuta a continuare a farlo.
            </p>
            <p className="text-sm text-ink leading-relaxed mb-4">
              Al momento del pagamento su PayPal, se possibile{' '}
              <strong className="font-medium">
                indica che si tratta di una donazione
              </strong>
              .
            </p>

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
          </section>

          <p className="text-xs text-center text-ink-muted pt-2 pb-4">
            Ancora non sostituisce il parere di un professionista della salute.
          </p>
        </div>
      </div>
    </div>
  );
}
