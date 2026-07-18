import type { PlateComponentId } from '../types/models';

export type PlateComponent = {
  id: PlateComponentId;
  label: string;
  color: string;
  why: string;
  science: string;
};

/** Percentages sum to 100. Educational model, not a clinical prescription. */
export const PLATE_COMPONENTS: PlateComponent[] = [
  {
    id: 'vegetables',
    label: 'Ortaggi',
    color: '#7d9b7a',
    why: 'Portano volume, fibre, acqua e molti micronutrienti con densità calorica spesso moderata.',
    science:
      'Le fibre (solubili e insolubili) sostengono la regolarità intestinale e modulano l’assorbimento dei nutrienti. Verdura e frutta sono tra le principali fonti di potassio, vitamina C, folati e fitocomposti. Linee guida di salute pubblica raccomandano porzioni abbondanti di vegetali nella giornata alimentare.',
  },
  {
    id: 'carbs',
    label: 'Carboidrati',
    color: '#c8a2c8',
    why: 'Sono la fonte energetica preferita di cervello e muscoli durante molte attività quotidiane.',
    science:
      'Il glucosio è il carburante principale e insostituibile per il tuo cervello, che senza di esso non può funzionare correttamente ed entra in uno stato di forte stress. Pane, pasta, riso, patate e legumi forniscono questa energia vitale e, soprattutto se integrali, apportano fibre e vitamine essenziali per il sistema nervoso e il metabolismo. Eliminare rigidamente i carboidrati non fa bene alla salute, ma spegne letteralmente le tue energie, causando stanchezza cronica, difficoltà di concentrazione e perdita di massa muscolare, poiché il corpo è costretto a "smontare" i muscoli per sopravvivere. Inoltre, la privazione altera gli ormoni della fame, costringendo il cervello a mandarti pensieri ossessivi sul cibo solo per difendersi dalla carenza energetica. Nutrire il tuo corpo con i carboidrati è una necessità biologica fondamentale per ritrovare la lucidità mentale, proteggere i tuoi muscoli e permetterti di guarire.',
  },
  {
    id: 'proteins',
    label: 'Proteine',
    color: '#9b7a9b',
    why: 'Servono a costruire e riparare tessuti, enzimi, ormoni e a sostenere la sazietà.',
    science:
      'Le proteine sono i mattoni fondamentali del tuo corpo, indispensabili per riparare i tessuti, far funzionare gli ormoni e mantenere forte il sistema immunitario. Fonti come legumi, uova, pesce, carne e derivati del latte forniscono gli aminoacidi essenziali che l\'organismo non è in grado di produrre da solo e che deve necessariamente assumere dal cibo. Eliminare rigidamente le proteine o ridurle drasticamente non fa bene alla salute, ma costringe il corpo ad attivare il catabolismo, un processo in cui l\'organismo "smonta" i tuoi stessi muscoli e intacca gli organi vitali pur di recuperare gli aminoacidi mancanti. Questa carenza spegne le tue energie, indebolisce i capelli, la pelle e le unghie, e altera i segnali biologici della sazietà, aumentando l\'ansia e i pensieri ossessivi legati al cibo come risposta di pura sopravvivenza del cervello.',
  },
  {
    id: 'fats',
    label: 'Grassi',
    color: '#d4a574',
    why: 'Servono all’assorbimento di vitamine liposolubili, alla struttura delle membrane e a diversi ormoni.',
    science:
      'I grassi sono nutrienti essenziali e indispensabili per la tua sopravvivenza, poiché costituiscono la struttura di tutte le tue cellule e sono i mattoni fondamentali per produrre gli ormoni, compresi quelli che regolano il ciclo, l\'umore e l\'energia. Fonti sane come l\'olio d\'oliva, la frutta secca, l\'avocado e i grassi presenti in pesci e uova permettono inoltre al tuo corpo di assorbire le vitamine vitali (come la A, la D, la E e la K) che altrimenti andrebbero perse. Eliminare rigidamente i grassi dalla dieta non protegge la salute, ma danneggia il sistema ormonale, spegne l\'efficienza del cervello — che è fatto per il 60% di grasso —, rende la pelle secca e i capelli fragili, e priva il corpo dell\'isolamento termico necessario per non sentire sempre freddo. Inoltre, la loro restrizione manda il cervello in uno stato di allarme biochimico, scatenando pensieri ossessivi sul cibo e attacchi di fame improvvisi proprio come disperato tentativo di autodifesa.',
  },
  {
    id: 'sugars',
    label: 'Zuccheri',
    color: '#b48bb4',
    why: 'Forniscono energia rapida; in un pasto bilanciato possono comparire in quantità contenute, non come “proibizione assoluta”.',
    science:
      'Gli zuccheri semplici, come il glucosio, il fruttosio e il saccarosio, sono carboidrati a rapido assorbimento presenti naturalmente nella frutta e nei latticini, oltre che aggiunti in altri prodotti, e rappresentano una fonte di energia immediata per il tuo organismo. In termini fisiologici non esiste un alimento o uno zucchero intrinsecamente "cattivo" o "immorale", e la scienza nutrizionale dimostra chiaramente che etichettare gli zuccheri come un veleno è un falso mito privo di fondamento scientifico. Gli zuccheri semplici non fanno assolutamente ingrassare se inseriti nel giusto modo all\'interno di un pattern complessivo di alimentazione, poiché ciò che conta davvero nel tempo è l\'equilibrio totale, l\'energia e il benessere psicofisico, non il singolo ingrediente. Quando soffri di un disturbo alimentare, la paura del cibo e le regole rigide cercano di farti credere che questi nutrienti siano pericolosi, ma la realtà biochimica è che il tuo corpo sa esattamente come metabolizzarli per trasformarli in calore, vitalità e prontezza mentale. Nutrire il tuo corpo includendo anche gli zuccheri senza colpevolizzarti è un passo fondamentale per abbattere l\'ansia, normalizzare il rapporto con il cibo e disinnescare i pensieri ossessivi generati dalla privazione.',
  },
  {
    id: 'micronutrients',
    label: 'Micronutrienti',
    color: '#6b9bb8',
    why: 'Vitamine e minerali regolano metabolismo, ossa, sangue, sistema immunitario e tanti processi cellulari.',
    science:
      'I micronutrienti non occupano un “posto a volume” nel piatto: si trovano sparsi negli alimenti (verdura, frutta, cereali, proteine, grassi). Esempi: ferro e B12 in alimenti di origine animale o fortificati; calcio in latticini e alcune alternative; iodio, selenio, zinco in quantità piccole ma essenziali. La varietà alimentare è il modo più concreto di coprirli senza inseguire un singolo “supercibo”.',
  },
];
