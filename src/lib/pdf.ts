import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Entry, Settings } from '../types/models';
import { formatItalianDate, formatShortItalianDate } from './dates';

/** Lilla #C8A2C8 */
const LILAC: [number, number, number] = [200, 162, 200];
const LILAC_DARK: [number, number, number] = [125, 98, 128];
const INK: [number, number, number] = [61, 58, 63];

/**
 * Esporta tutte le registrazioni in un unico PDF landscape,
 * ordinate per data e ora — adatto alla consegna al curante
 * (poche pagine anche per un mese di diari).
 */
export function generateDiaryPdf(entries: Entry[], settings: Settings) {
  if (entries.length === 0) {
    throw new Error('Nessuna registrazione da esportare');
  }

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const sorted = [...entries].sort((a, b) => {
    const byDate = a.date.localeCompare(b.date);
    if (byDate !== 0) return byDate;
    return a.ora.localeCompare(b.ora);
  });

  const firstDate = sorted[0].date;
  const lastDate = sorted[sorted.length - 1].date;
  const periodLabel =
    firstDate === lastDate
      ? formatItalianDate(firstDate)
      : `${formatItalianDate(firstDate)} – ${formatItalianDate(lastDate)}`;

  const pazienteStr = settings.pazienteNome?.trim()
    ? `Paziente: ${settings.pazienteNome.trim()}`
    : '';

  const hasDurata = sorted.some(
    (e) => e.durataMinuti !== null && e.durataMinuti !== undefined,
  );

  // Accent bar
  doc.setFillColor(...LILAC);
  doc.rect(0, 0, 297, 3.5, 'F');

  doc.setTextColor(...INK);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Diario alimentare', 10, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...LILAC_DARK);
  doc.text(`Periodo: ${periodLabel}`, 10, 18);

  doc.setTextColor(...INK);
  let metaY = 18;
  if (pazienteStr) {
    doc.text(pazienteStr, 10, 23);
    metaY = 23;
  }
  doc.setFontSize(8);
  doc.setTextColor(...LILAC_DARK);
  doc.text(
    `${sorted.length} registrazion${sorted.length === 1 ? 'e' : 'i'}`,
    287,
    12,
    { align: 'right' },
  );

  const head = [
    [
      'DATA',
      'ORA',
      'DOVE',
      'CON CHI',
      'FAME',
      'ALIMENTI E BEVANDE',
      'PENSIERI',
      'EMOZIONI',
      'SAZIETÀ',
      'SODDISF.',
      ...(hasDurata ? ['DURATA'] : []),
    ],
  ];

  const body = sorted.map((e) => {
    const row = [
      formatShortItalianDate(e.date),
      e.ora,
      e.dove || '',
      e.conChi || '',
      e.fame !== null ? String(e.fame) : '',
      e.alimenti || '',
      e.pensieri || '',
      e.emozioni || '',
      e.sazieta !== null ? String(e.sazieta) : '',
      e.soddisfazione !== null ? String(e.soddisfazione) : '',
    ];
    if (hasDurata) {
      row.push(e.durataMinuti !== null ? `${e.durataMinuti}'` : '');
    }
    return row;
  });

  // Font compatto: ~3 pasti/giorno × 30 giorni ≈ 90 righe → tipicamente 1–2 pagine A4 landscape
  autoTable(doc, {
    startY: metaY + 4,
    head,
    body,
    theme: 'grid',
    headStyles: {
      fillColor: LILAC,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7,
      halign: 'center',
      valign: 'middle',
      cellPadding: 1.2,
    },
    styles: {
      fontSize: 7,
      cellPadding: 1.4,
      valign: 'top',
      textColor: INK,
      lineColor: [224, 204, 224],
      lineWidth: 0.15,
      overflow: 'linebreak',
      minCellHeight: 5,
    },
    alternateRowStyles: {
      fillColor: [248, 244, 248],
    },
    columnStyles: {
      0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' }, // DATA
      1: { cellWidth: 11, halign: 'center' }, // ORA
      2: { cellWidth: 18 }, // DOVE
      3: { cellWidth: 16 }, // CON CHI
      4: { cellWidth: 10, halign: 'center' }, // FAME
      // 5 alimenti: auto (resto dello spazio)
      6: { cellWidth: 32 }, // PENSIERI
      7: { cellWidth: 32 }, // EMOZIONI
      8: { cellWidth: 12, halign: 'center' }, // SAZIETÀ
      9: { cellWidth: 12, halign: 'center' }, // SODDISF
      ...(hasDurata ? { 10: { cellWidth: 12, halign: 'center' as const } } : {}),
    },
    margin: { left: 8, right: 8, bottom: 12 },
    // Evidenzia il cambio giorno legando le righe alla stessa data
    didParseCell(data) {
      if (data.section !== 'body' || data.column.index !== 0) return;
      const rowIndex = data.row.index;
      if (rowIndex === 0) return;
      const prevDate = sorted[rowIndex - 1]?.date;
      const currDate = sorted[rowIndex]?.date;
      if (prevDate && currDate && prevDate !== currDate) {
        data.cell.styles.fontStyle = 'bold';
      }
    },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...LILAC_DARK);
    doc.text(`Ancora · pagina ${i} di ${pageCount}`, 148.5, 203, {
      align: 'center',
    });
  }

  const fileSuffix =
    firstDate === lastDate ? firstDate : `${firstDate}_${lastDate}`;
  doc.save(`ancora-diario-${fileSuffix}.pdf`);
}

/** @deprecated alias — prefer generateDiaryPdf */
export function generateDayPdf(
  entries: Entry[],
  settings: Settings,
  _dateStr?: string,
) {
  return generateDiaryPdf(entries, settings);
}
