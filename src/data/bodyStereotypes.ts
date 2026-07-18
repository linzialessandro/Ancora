import type { BodyPartId, Gender } from '../types/models';

export type BodyPartContent = {
  id: BodyPartId;
  label: string;
  stereotype: string | Record<Gender, string>;
  science: string | Record<Gender, string>;
};

export const BODY_PARTS: BodyPartContent[] = [
  {
    id: 'head',
    label: 'Viso e testa',
    stereotype: {
      female:
        '«Un viso “perfetto” ha proporzioni da filtro: zigomi alti, mandibola fine, zero gonfiore, pelle sempre uniforme.»',
      male:
        '«Un viso “da uomo” ha mandibola netta e lineamenti duri; se è morbido o “gonfio”, manca di disciplina.»',
    },
    science:
      'La forma del viso è influenzata da genetica, età, ormoni, idratazione, sonno e composizione corporea complessiva. Ritenzione idrica e fluttuazioni ormonali possono cambiare l’aspetto da un giorno all’altro senza indicare un “fallimento”. Non esiste una sola proporzione facciale associata a salute clinica. I filtri e le angolazioni delle foto alterano sistematicamente la percezione del “normale”.',
  },
  {
    id: 'arms',
    label: 'Braccia',
    stereotype: {
      female:
        '«Le braccia devono essere magre e “pulite”; se oscillano o hanno grasso, è segno di scarso controllo.»',
      male:
        '«Le braccia devono essere grosse e venose; se non lo sono, non ti stai allenando abbastanza.»',
    },
    science:
      'Le braccia contengono muscolo, tessuto adiposo, pelle e tessuto connettivo in proporzioni diverse da persona a persona. Il grasso sottocutaneo ha funzioni di riserva energetica e isolamento termico. La “tonificazione” o l’ipertrofia visibile dipendono da genetica, allenamento e distribuzione del tessuto, non da un valore morale. Movimento e forza funzionale non si leggono solo dalla circonferenza del braccio.',
  },
  {
    id: 'chest',
    label: 'Petto / torace',
    stereotype: {
      female:
        '«Il seno deve avere una forma e una misura “ideale”; se cambia con il ciclo o l’età, c’è qualcosa che non va.»',
      male:
        '«Il petto deve essere piatto e definito; grasso o seno maschile (ginecomastia apparente) sono “da nascondere”.»',
    },
    science: {
      female:
        'Il seno è tessuto ghiandolare e adiposo; dimensione e forma variano enormemente e cambiano con ciclo, gravidanza, allattamento, età e peso. Non c’è un “taglia salute”. Variazioni di sensibilità o volume nel ciclo sono fisiologiche per molte persone. La densità mammaria e la morfologia non si traducono in un giudizio estetico utile clinicamente.',
      male:
        'Il torace maschile include muscolo pettorale e, in misura variabile, tessuto adiposo. La ginecomastia vera (tessuto ghiandolare) e l’adiposità toracica sono fenomeni noti e multifattoriali (ormoni, età, farmaci, genetica). Non equivalgono automaticamente a scarsa disciplina. La “definizione” del petto nei media spesso riflette disidratazione selettiva, luce e selezione genetica, non la media della popolazione.',
    },
  },
  {
    id: 'belly',
    label: 'Addome',
    stereotype:
      '«La pancia piatta è la prova di disciplina e salute; se si vede, stai sbagliando alimentazione.»',
    science:
      'L’addome protegge organi vitali e ospita grasso viscerale e sottocutaneo in proporzioni individuali. La genetica, il sesso, l’età e gli ormoni influenzano dove si accumula il tessuto adiposo. Un addome non “piatto” non diagnosticabile da solo come malattia. Dopo i pasti, gonfiore e distensione sono comuni (aria, fibre, fluidi). Gli “abs sempre visibili” delle immagini commerciali spesso richiedono grasso corporeo molto basso e condizioni non sostenibili per la maggior parte delle persone.',
  },
  {
    id: 'hips',
    label: 'Fianchi',
    stereotype: {
      female:
        '«I fianchi devono essere stretti o “a clessidra” perfetta; se sono larghi o stretti “troppo”, il corpo è sbagliato.»',
      male:
        '«I fianchi larghi o il punto vita poco definito “rovinano” la V del busto e vanno corretti.»',
    },
    science: {
      female:
        'Larghezza di bacino e distribuzione del grasso gluteo-femorale sono fortemente influenzate da genetica e da ormoni sessuali. Il grasso sui fianchi ha ruoli evolutivi e metabolici (riserva energetica) e non è un indicatore isolato di “fallimento”. Non esiste un rapporto vita-fianchi estetico obbligatorio per essere sani. La variabilità tra corpi adulti sani è ampia e normale.',
      male:
        'La forma del bacino e la distribuzione del tessuto adiposo intorno ai fianchi variano con genetica e composizione corporea. La “V-taper” enfatizzata in fitness media non è un criterio clinico di salute. Confrontarsi con corpi selezionati e fotografati in condizioni ideali distorce la media reale della popolazione.',
    },
  },
  {
    id: 'legs',
    label: 'Gambe',
    stereotype: {
      female:
        '«Cosce e polpacci devono essere sottili e “puliti”; cellulite, vene o volume sono difetti.»',
      male:
        '«Le gambe devono essere magre in basso e “quadricipiti da palestra” in alto; tutto il resto è sbagliato.»',
    },
    science: {
      female:
        'Le gambe reggono il peso e permettono di camminare e correre: muscoli e tessuto adiposo sono funzionali. La cellulite è un aspetto del tessuto sottocutaneo molto comune dopo la pubertà e non equivale a una patologia. Vene superficiali visibili possono essere normali. Forza ed equilibrio dicono più della funzione di quanto faccia un’estetica da catalogo.',
      male:
        'Le gambe includono grandi gruppi muscolari (quadricipiti, ischiocrurali, polpacci) con proporzioni molto variabili. L’aspetto “definito” dei media spesso riflette selezione genetica, luce e basso grasso corporeo non rappresentativo. La forza e la capacità di muoversi contano più del confronto con standard estetici maschili delle riviste fitness.',
    },
  },
  {
    id: 'overall',
    label: 'Corpo intero',
    stereotype: {
      female:
        '«Esiste un corpo femminile “giusto”: magro, curvy al punto giusto, giovane. Se non ci assomigli, stai sbagliando.»',
      male:
        '«Esiste un corpo maschile “giusto”: largo di spalle, stretto di vita, muscoloso. Se non ci assomigli, manca impegno.»',
    },
    science:
      'Salute e aspetto non coincidono in un’unica silhouette. Peso, forma e composizione dipendono da genetica, età, sesso, malattie, farmaci, accessibilità al cibo e al movimento, e storia di vita. I canoni estetici cambiano nel tempo e tra culture; i media amplificano pochi corpi selezionati. Un approccio basato su dati privilegia funzioni (energia, sonno, salute mentale, esami clinici quando indicati) rispetto al confronto estetico costante. Nessuno strumento o app sostituisce un percorso di cura personalizzato.',
  },
];

export function resolveBodyText(
  value: string | Record<Gender, string>,
  gender: Gender,
): string {
  if (typeof value === 'string') return value;
  return value[gender];
}
