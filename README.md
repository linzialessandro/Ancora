# Ancora

[![License: MIT](https://img.shields.io/badge/License-MIT-C8A2C8.svg)](./LICENSE)

Diario alimentare digitale, **interamente in italiano**.  
Pensato per l’uso quotidiano su smartphone: neutro, rispettoso e **solo client-side** — i dati restano sul dispositivo, senza account e senza server.

Tema visivo ispirato al **fiocchetto lilla** (simbolo della consapevolezza sui disturbi del comportamento alimentare).

**Demo / Pages:** dopo il deploy, tipicamente  
`https://linzialessandro.github.io/Ancora/`

---

## A chi serve

A chi compila un diario alimentare (per sé o in percorso di cura) e vuole sostituire il foglio cartaceo con uno strumento semplice, esportabile in PDF da consegnare al curante.

L’interfaccia **non** include messaggi motivazionali, giudizi o gamification: è uno strumento funzionale e sobrio.

---

## Funzionalità

- Navigazione per giorno (frecce + selettore data)
- Registrazioni con i campi del diario cartaceo:
  - ora, dove, con chi
  - fame, sazietà, soddisfazione (scale 1–10)
  - alimenti e bevande, pensieri, emozioni
  - durata in minuti (opzionale)
- Salvataggio automatico in locale (`localStorage`)
- **Esportazione PDF** landscape con **tutte** le registrazioni (ordinate per data e ora), pensata per **1–2 fogli** da stampare e consegnare
- Export / import backup JSON (cambio telefono o browser)
- Nessuna telemetria, nessun cookie di tracciamento

---

## Uso consigliato (ciclo di lavoro)

1. Compila il diario giorno per giorno sull’app.
2. Quando serve, imposta il **nome** in Impostazioni (come sul diario cartaceo).
3. Tocca **Esporta PDF**: ottieni un’unica tabella con tutte le date inserite.
4. Stampa (o invia) il PDF al curante.

### Dopo la consegna

Nella pratica corrente si può **ripartire da capo**:

- dopo aver stampato e consegnato l’export, **non è necessario** conservare o reimportare il vecchio backup JSON;
- in Impostazioni puoi **Elimina tutti i dati** e ricominciare un nuovo periodo di compilazione;
- il backup JSON resta utile se cambi dispositivo *prima* della consegna, non come archivio clinico obbligatorio.

> Ancora non è un fascicolo sanitario a lungo termine: è un supporto alla compilazione e alla consegna periodica del diario.

---

## Privacy

- I dati restano **solo nel browser** del dispositivo.
- Non vengono inviati a server di terze parti.
- Cancellando i dati del sito dal browser (o usando “Elimina tutti i dati”) le registrazioni vengono rimosse.
- Su alcuni browser mobile lo storage locale può essere svuotato dal sistema: se ti serve un salvataggio intermedio, usa **Esporta backup (JSON)** prima di un cambio telefono.

---

## Sviluppo locale

Requisiti: Node.js 20+ consigliato.

```bash
git clone https://github.com/linzialessandro/Ancora.git
cd Ancora
npm install
npm run dev
```

```bash
npm run build    # output in dist/
npm run preview  # anteprima della build
npm run lint
```

---

## Deploy (GitHub Pages)

- `vite.config.ts` usa `base: '/Ancora/'` (allineato al nome del repository).
- Il workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) pubblica `dist/` su GitHub Pages al push su `main`.

Abilita **Settings → Pages → GitHub Actions** nel repository se non è già attivo.

---

## Stack

| Area        | Scelta                          |
|------------|----------------------------------|
| Build      | Vite                             |
| UI         | React + TypeScript               |
| Stili      | Tailwind CSS (palette lilla)     |
| Date       | date-fns (locale `it`)           |
| PDF        | jsPDF + jspdf-autotable          |
| Icone      | lucide-react                     |

---

## Licenza

Rilasciato sotto **[MIT License](./LICENSE)**.  
Copyright (c) 2026 Alessandro Linzi.

Puoi usare, modificare e redistribuire il software liberamente, con l’unica condizione di mantenere l’avviso di copyright e la licenza.

---

## Nota di responsabilità

Ancora è uno strumento di supporto alla compilazione di un diario alimentare.  
**Non** sostituisce indicazioni mediche, psicologiche o dietetiche professionali.
