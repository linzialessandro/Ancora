import type { AppSection } from '../types/models';

export type SectionInfoContent = {
  title: string;
  intro: string;
  steps: string[];
  note?: string;
};

export const SECTION_INFO: Record<AppSection, SectionInfoContent> = {
  diary: {
    title: 'Diario alimentare',
    intro: 'Registra pasti e spuntini giorno per giorno, in modo sobrio e senza giudizi.',
    steps: [
      'Scegli il giorno con le frecce o toccando la data.',
      'Tocca + per aggiungere una registrazione.',
      'Compila solo i campi che ti servono: non è obbligatorio riempire tutto.',
      'I dati restano solo su questo dispositivo.',
      'Quando serve, esporta il PDF con le registrazioni da consegnare al curante.',
      'Se cambi telefono prima della consegna, usa Esporta backup (JSON) nelle Impostazioni (dalla home).',
    ],
    note: 'Dopo la consegna del PDF puoi eliminare i dati e ricominciare un nuovo periodo.',
  },
  pyramid: {
    title: 'Piramide dei cibifobici',
    intro:
      'Costruisci la tua mappa personale dei cibi in base a quanto ti spaventano. Non è un giudizio di valore.',
    steps: [
      'Base: i cibi che ti spaventano di meno (comfort food).',
      'Basso e Medio: paura intermedia.',
      'Alto e Cima: i cibi che ti spaventano di più.',
      'Aggiungi liberamente i nomi dei cibi (es. toast, pizza, bistecca).',
      'Puoi spostare un cibo di un livello con le frecce, modificarlo o rimuoverlo.',
      'La piramide si salva da sola su questo dispositivo.',
    ],
    note: 'È uno strumento di consapevolezza, non una classifica di cibi “giusti” o “sbagliati”.',
  },
  body: {
    title: 'Il mio corpo',
    intro:
      'Esplora stereotipi comuni su parti del corpo e una risposta scientifica breve e concreta.',
    steps: [
      'Imposta il genere (maschile o femminile) nelle Impostazioni dalla home: sceglie la silhouette.',
      'Tocca una parte del corpo sulla figura.',
      'Leggi lo stereotipo tipico e la spiegazione scientifica che lo mette in prospettiva.',
      'Puoi chiudere il pannello e provarne un’altra.',
    ],
    note: 'Informazioni generali: non sostituiscono il parere di un professionista della salute.',
  },
  plate: {
    title: 'Il piatto',
    intro:
      'Un diagramma educativo dei componenti di un pasto. Le percentuali sono indicative, non una dieta prescritta.',
    steps: [
      'Guarda le sei fette: ortaggi, carboidrati, proteine, grassi, zuccheri, micronutrienti.',
      'Tocca una fetta o la voce in legenda.',
      'Leggi perché quel componente conta, con una spiegazione semplice e basata su dati generali.',
      'I micronutrienti non sono un “ingrediente a parte”: sono presenti negli alimenti.',
    ],
    note: 'Serve a ragionare su un pasto completo, non a contare calorie o porzioni obbligatorie.',
  },
};
