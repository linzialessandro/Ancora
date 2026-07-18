import { X, Heart } from 'lucide-react';

type Props = {
  onClose: () => void;
  onOpenDonate?: () => void;
};

export function InfoScreen({ onClose, onOpenDonate }: Props) {
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

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Cos&apos;è Ancora
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              App client-side in italiano per accompagnare un percorso di consapevolezza
              alimentare. I dati restano solo sul tuo dispositivo: niente account, niente
              server, niente tracciamento.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-3">
              Gli strumenti
            </h3>
            <ul className="space-y-3 text-sm text-ink leading-relaxed">
              <li>
                <strong className="font-semibold text-lilac-700">Diario alimentare</strong>
                {' — '}
                registrazioni quotidiane (ora, fame, alimenti, pensieri…) ed export PDF per
                il curante.
              </li>
              <li>
                <strong className="font-semibold text-lilac-700">Piramide dei cibifobici</strong>
                {' — '}
                ordina i tuoi cibi dalla base (meno paura) alla cima (più paura).
              </li>
              <li>
                <strong className="font-semibold text-lilac-700">Il mio corpo</strong>
                {' — '}
                tocca parti del corpo per confrontare stereotipi e spiegazioni scientifiche.
              </li>
              <li>
                <strong className="font-semibold text-lilac-700">Il piatto</strong>
                {' — '}
                diagramma dei componenti di un pasto, con perché contano.
              </li>
            </ul>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              In ogni sezione il pulsante <strong className="font-medium text-ink">ⓘ</strong>{' '}
              spiega solo come usarla.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-2">
              Privacy e backup
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Tutto è salvato in locale. Nelle Impostazioni puoi esportare/importare un
              backup JSON (utile se cambi telefono) o eliminare i dati. Il PDF del diario è
              pensato per la consegna al curante.
            </p>
          </section>

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
              <strong className="font-semibold">Alessandro Linzi</strong> per amore: uno
              strumento discreto e senza giudizi, pensato per accompagnare con rispetto e
              semplicità.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-lilac-700 uppercase tracking-wide mb-2">
              Un contributo volontario
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-3">
              Se Ancora ti è utile e desideri supportare lo sviluppo (anche per i costi
              degli strumenti usati per crearla), puoi fare una donazione volontaria. Nessun
              obbligo.
            </p>
            {onOpenDonate ? (
              <button type="button" onClick={onOpenDonate} className="btn-primary w-full">
                <Heart size={18} aria-hidden />
                Apri la pagina Dona
              </button>
            ) : null}
          </section>

          <p className="text-xs text-center text-ink-muted pt-1 pb-2">
            Ancora non sostituisce il parere di un professionista della salute.
          </p>
        </div>
      </div>
    </div>
  );
}
