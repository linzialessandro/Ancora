import type { PlateComponentId } from '../types/models';

export type PlateComponent = {
  id: PlateComponentId;
  label: string;
  percent: number;
  color: string;
  why: string;
  science: string;
};

/** Percentages sum to 100. Educational model, not a clinical prescription. */
export const PLATE_COMPONENTS: PlateComponent[] = [
  {
    id: 'vegetables',
    label: 'Ortaggi',
    percent: 30,
    color: '#7d9b7a',
    why: 'Portano volume, fibre, acqua e molti micronutrienti con densità calorica spesso moderata.',
    science:
      'Le fibre (solubili e insolubili) sostengono la regolarità intestinale e modulano l’assorbimento dei nutrienti. Verdura e frutta sono tra le principali fonti di potassio, vitamina C, folati e fitocomposti. Linee guida di salute pubblica raccomandano porzioni abbondanti di vegetali nella giornata alimentare.',
  },
  {
    id: 'carbs',
    label: 'Carboidrati',
    percent: 25,
    color: '#c8a2c8',
    why: 'Sono la fonte energetica preferita di cervello e muscoli durante molte attività quotidiane.',
    science:
      'Il glucosio è il substrato principale del sistema nervoso centrale in condizioni normali. Amidi e cereali (pane, pasta, riso, patate, legumi) forniscono energia e, se integrali, anche fibre del gruppo B. Escluderli in modo rigido non è un requisito di “salute” e può ridurre l’energia disponibile e la varietà della dieta.',
  },
  {
    id: 'proteins',
    label: 'Proteine',
    percent: 20,
    color: '#9b7a9b',
    why: 'Servono a costruire e riparare tessuti, enzimi, ormoni e a sostenere la sazietà.',
    science:
      'Le proteine forniscono aminoacidi essenziali che il corpo non produce da solo. Fonti tipiche: carne, pesce, uova, latticini, legumi, tofu e alcune alternative vegetali. Il fabbisogno varia con età, massa magra e stato di salute; un apporto adeguato è parte di un’alimentazione completa, non un “supplemento estetico”.',
  },
  {
    id: 'fats',
    label: 'Grassi',
    percent: 12,
    color: '#d4a574',
    why: 'Servono all’assorbimento di vitamine liposolubili, alla struttura delle membrane e a diversi ormoni.',
    science:
      'Acidi grassi essenziali (omega-3 e omega-6) non sono sintetizzati in quantità sufficienti e vanno assunti con il cibo (es. olio d’oliva, frutta secca, semi, pesce grasso). Le vitamine A, D, E e K richiedono grassi per essere assorbite bene. I grassi non sono “il nemico”: la qualità e il contesto del pasto contano più del moralismo sul singolo alimento.',
  },
  {
    id: 'sugars',
    label: 'Zuccheri',
    percent: 8,
    color: '#b48bb4',
    why: 'Forniscono energia rapida; in un pasto bilanciato possono comparire in quantità contenute, non come “proibizione assoluta”.',
    science:
      'Gli zuccheri semplici (glucosio, fruttosio, saccarosio) sono carboidrati a rapido assorbimento. Sono presenti naturalmente in frutta e latticini e aggiunti in molti prodotti. In termini fisiologici non esiste un alimento “intrinsecamente immorale”: ciò che conta nel tempo è il pattern complessivo di alimentazione, l’energia e il benessere. In contesti di paura del cibo, etichettare gli zuccheri come “veleno” non è supportato dalla scienza nutrizionale generale.',
  },
  {
    id: 'micronutrients',
    label: 'Micronutrienti',
    percent: 5,
    color: '#6b9bb8',
    why: 'Vitamine e minerali regolano metabolismo, ossa, sangue, sistema immunitario e tanti processi cellulari.',
    science:
      'I micronutrienti non occupano un “posto a volume” nel piatto: si trovano sparsi negli alimenti (verdura, frutta, cereali, proteine, grassi). Esempi: ferro e B12 in alimenti di origine animale o fortificati; calcio in latticini e alcune alternative; iodio, selenio, zinco in quantità piccole ma essenziali. La varietà alimentare è il modo più concreto di coprirli senza inseguire un singolo “supercibo”.',
  },
];
