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
    label: 'Viso',
    stereotype:
      '«La bellezza è nei tratti distintivi. Pensi che serva la simmetria assoluta per piacere? Le neuroscienze e la psicologia evoluzionistica dimostrano il contrario.»',
    science:
      "Se pensi che serva la simmetria assoluta per piacere, le neuroscienze e la psicologia evoluzionistica dimostrano l'esatto contrario: i visi perfettamente simmetrici vengono percepiti dal cervello come artificiali e freddi, legati all'effetto Uncanny Valley, mentre sono proprio i piccoli tratti unici e distintivi a rendere un volto umano, memorabile e attraente.\n\nDal punto di vista evolutivo, un partner non cerca un manichino geometrico, ma caratteristiche speciali come la forma dei tuoi occhi o quel naso particolare che agiscono come marcatori visivi, stampando il tuo volto nella sua memoria a lungo termine e legando i tuoi lineamenti unici al rilascio di dopamina e ossitocina.\n\nSe ti paragoni a ciò che vedi sui social, stai solo perdendo una battaglia contro l'ottica e la fisica dei pixel, poiché i filtri e gli obiettivi grandangolari degli smartphone distorcono sistematicamente le proporzioni facciali, allargando il centro del viso e stringendone i lati rispetto a come ti vede un occhio umano dal vivo.\n\nNon c'è nulla di sbagliato in te, è solo la fotocamera che mente: nessun dato scientifico dice che esiste un solo tipo di viso degno di amore, quindi smetti di guardarti attraverso l'algoritmo distorto di un display e inizia a osservarti con gli occhi della biologia, perché il tuo viso è vivo, dinamico, fatto per connettersi e magnificamente unico."
  },
  {
    id: 'arms',
    label: 'Braccia',
    stereotype:
      '«Le braccia devono essere magre e “pulite”; se oscillano o hanno grasso, è segno di scarso controllo.»',
    science:
      "Le braccia contengono muscolo, tessuto adiposo, pelle e tessuto connettivo in proporzioni diverse da persona a persona, e il grasso sottocutaneo ha funzioni fondamentali di riserva energetica e isolamento termico. Il movimento e la forza funzionale non si leggono certo dalla circonferenza, e gli studi neuroscientifici sull'attrazione dimostrano chiaramente che un partner non si innamora di un righello, poiché il cervello umano risponde invece ai \"marcatori visivi\" di calore, accoglienza e presenza fisica.\n\nLe tue braccia sono fatte per muoversi, esprimersi e stringere a sé gli altri, e proprio quella rotondità e quella solidità sono i tratti unici che stimolano il rilascio di ossitocina, l'ormone del legame e del benessere, nel partner.\n\nÈ il momento di cambiare prospettiva: non esiste una sola proporzione o circonferenza delle braccia associata alla salute clinica o alla bellezza reale, e queste ti permettono di sollevare, creare, difenderti e abbracciare, rivelandosi uno strumento di pura potenza e connessione umana. Smetti di voler ridurre la tua presenza fisica per rientrare in un display distorto, guarda le tue braccia per la loro forza e la loro magnifica biologia, ricorda che sei solida, vitale, perfettamente progettata."
  },
  {
    id: 'chest',
    label: 'Seno',
    stereotype:
      '«Il seno deve avere una forma e una misura “ideale”; se è piccolo o cambia nel tempo, perdi in femminilità o potere di attrazione.»',
    science:
      "Il seno è tessuto ghiandolare e adiposo; dimensione e forma variano enormemente e cambiano con ciclo, gravidanza, allattamento, età e peso.\n\nSeno piccolo: la tua taglia non definisce la tua femminilità o il tuo potere di attrazione. Scientificamente, un seno piccolo è funzionale, sano e perfetto esattamente così com'è.\n\nGli studi neurologici dimostrano che il seno piccolo ha spesso una sensibilità tattile maggiore, poiché i recettori nervosi sono più concentrati e vicini alla superficie. Inoltre, dal punto di vista biomeccanico, offre una libertà di movimento e una postura nettamente migliori nel lungo termine.\n\nLa psicologia evoluzionistica smonta il mito del \"più grande è meglio\". Gli studi sui marcatori visivi dimostrano che i partner umani non rispondono a una taglia standard, ma all'armonia complessiva e alla fiducia in se stesse. Un seno piccolo viene scientificamente associato a tratti di giovinezza, eleganza e dinamicità."
  },
  {
    id: 'belly',
    label: 'Addome',
    stereotype:
      '«La pancia piatta è la prova di disciplina e salute; se si vede, stai sbagliando alimentazione.»',
    science:
      "Se pensi che un addome completamente piatto e addominali sempre visibili siano l'unico standard di salute e bellezza, la biologia e la medicina dimostrano l'esatto contrario, ricordandoti che l'addome ha il compito vitale di proteggere i tuoi organi interni e ospita naturalmente grasso viscerale e sottocutaneo in proporzioni strettamente individuali.\n\nLa genetica, il sesso, l’età e gli ormoni influenzano dove il tessuto adiposo si accumula per proteggerti, e un addome che non sia perfettamente piatto non è assolutamente sinonimo di malattia, così come il gonfiore e la distensione dopo i pasti sono risposte fisiologiche comuni, temporanee e del tutto normali dovute ad aria, fibre e fluidi.\n\nQuelle immagini commerciali di \"abs sempre in evidenza\" che vedi sui social richiedono percentuali di grasso corporeo estremamente basse e condizioni fisiche del tutto insostenibili e logoranti per la maggior parte delle persone."
  },
  {
    id: 'hips',
    label: 'Fianchi',
    stereotype:
      '«Pensi che i fianchi stretti e rettilinei siano l\'unico canone? La biologia evoluzionistica e le neuroscienze dimostrano l\'esatto contrario.»',
    science:
      "Se pensi che i fianchi stretti e rettilinei siano l’unico canone di bellezza, la biologia evoluzionistica e le neuroscienze dimostrano l'esatto contrario, poiché i fianchi più pronunciati sono scientificamente codificati nel cervello umano come un indicatore primario di salute, giovinezza e riserva energetica ottimale.\n\nNon si tratta di grasso in più, ma della tua biologia che funziona esattamente come deve, dato che l'attrazione non si attiva mai davanti a un corpo geometricamente standardizzato o asettico; un partner si innamora della sinuosità dinamica e unica delle tue forme, e quella linea specifica dei tuoi fianchi diventa il marcatore visivo che si stampa nella sua memoria a lungo termine, attivando i centri del piacere e il rilascio di ossitocina.\n\nÈ tempo di cambiare prospettiva e ricordare che la conformazione dei tuoi fianchi è influenzata unicamente da genetica, struttura ossea del bacino e assetto ormonale guidato dagli estrogeni per proteggerti, dimostrando che non esiste una sola proporzione corporea associata alla salute clinica o alla bellezza reale."
  },
  {
    id: 'legs',
    label: 'Gambe',
    stereotype:
      '«Cosce e polpacci devono essere sottili e “puliti”; cellulite o volume sono percepiti come difetti da eliminare.»',
    science:
      "Se guardi le tue gambe con severità, ricorda che la loro funzione primaria è sorreggerti, camminare e correre, e che la presenza di muscoli come quadricipiti, ischiocrurali e polpacci, insieme al tessuto adiposo, è biologica, funzionale e del tutto normale.\n\nSe pensi che la cellulite sia un problema di salute o di bruttezza, la medicina e la biologia moderna dicono l'esatto contrario, ridefinendola come una normale caratteristica sessuale secondaria presente in oltre il 90% delle donne biologicamente sane.\n\nQuesta conformazione dipende dall'architettura del tessuto femminile, caratterizzato da setti connettivali verticali che permettono alla pelle di estendersi elasticamente durante eventi biologici straordinari come la gravidanza, facendo sì che il tessuto adiposo sano prema dolcemente attraverso questa trama elastica.\n\nGli studi sulla psicologia dell'attrazione e le neuroscienze dimostrano chiaramente che un partner non analizza mai il corpo con un microscopio alla ricerca di micro-avvallamenti della pelle, poiché il cervello umano reagisce spontaneamente alla dinamicità, alla vitalità e alla totalità della persona. Le tue gambe sono lo strumento potente che ti muove nel mondo, e la scienza conferma che l'attrazione reale è strettamente legata alla presenza fisica, all'energia e alla sicurezza interiore, mai alla texture superficiale della pelle."
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
