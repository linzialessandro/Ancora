import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Entry, Settings, DayDataMap } from '../types/models';
import { formatItalianDate, formatItalianDayOfWeek } from './dates';

/** Lilla #C8A2C8 */
const LILAC: [number, number, number] = [200, 162, 200];
const LILAC_DARK: [number, number, number] = [125, 98, 128];
const INK: [number, number, number] = [61, 58, 63];

export function generatePdf(
  entries: Entry[],
  settings: Settings,
  dayDataMap: DayDataMap,
  startDate: string,
  endDate: string
) {
  // Filter entries to match the date range
  const filteredEntries = entries.filter(e => e.date >= startDate && e.date <= endDate);
  
  // Find all dates in the range that have either entries or dayData
  const allDatesSet = new Set(filteredEntries.map(e => e.date));
  for (const [date, data] of Object.entries(dayDataMap)) {
    if (data?.trim() && date >= startDate && date <= endDate) {
      allDatesSet.add(date);
    }
  }

  const allDates = Array.from(allDatesSet).sort();

  if (allDates.length === 0) {
    throw new Error('Nessun dato da esportare per il periodo selezionato');
  }

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Add global header
  const pazienteStr = settings.pazienteNome?.trim() ? `Paziente: ${settings.pazienteNome.trim()}` : '';
  const periodLabel = startDate === endDate ? formatItalianDate(startDate) : `${formatItalianDate(startDate)} – ${formatItalianDate(endDate)}`;

  doc.setFillColor(...LILAC);
  doc.rect(0, 0, 297, 4, 'F');

  doc.setTextColor(...INK);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('DIARIO ALIMENTARE', 14, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...LILAC_DARK);
  doc.text(`Periodo: ${periodLabel}`, 14, 28);

  doc.setTextColor(...INK);
  let currentY = 40;
  if (pazienteStr) {
    doc.setFontSize(11);
    doc.text(pazienteStr, 14, 34);
  }

  // Generate table for each day
  allDates.forEach((date) => {
    const dayEntries = filteredEntries.filter(e => e.date === date).sort((a, b) => a.ora.localeCompare(b.ora));
    const dayActivity = dayDataMap[date]?.trim() || '';

    const formattedDate = formatItalianDate(date);
    const dayOfWeek = formatItalianDayOfWeek(date);

    if (dayEntries.length === 0) {
      if (currentY > 180) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...INK);
      doc.text(`Data: ${dayOfWeek}, ${formattedDate}`, 14, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(...LILAC_DARK);
      doc.text('Nessuna registrazione alimentare per questo giorno.', 14, currentY);
      currentY += 15;
      return;
    }

    const hasDurata = dayEntries.some(e => e.durataMinuti !== null && e.durataMinuti !== undefined);

    const head: any[] = [
      [
        { 
          content: `Data: ${dayOfWeek}, ${formattedDate}`, 
          colSpan: 4, 
          styles: { halign: 'left', fillColor: [242, 230, 242], textColor: INK, fontStyle: 'bold', fontSize: 10 } 
        },
        { 
          content: `ATTIVITÀ FISICA: ${dayActivity || 'Nessuna registrata'}`, 
          colSpan: hasDurata ? 6 : 5, 
          styles: { halign: 'left', fillColor: [242, 230, 242], textColor: INK, fontStyle: 'normal', fontSize: 9 } 
        }
      ],
      [
        'ORA', 'DOVE', 'CON CHI', 'FAME', 'ALIMENTI E BEVANDE', 'PENSIERI', 'EMOZIONI', 'SAZIETÀ', 'SODDISF.',
        ...(hasDurata ? ['DURATA'] : [])
      ]
    ];

    const body = dayEntries.map(e => {
      const row = [
        e.ora,
        e.dove || '',
        e.conChi || '',
        e.fame !== null ? String(e.fame) : '',
        e.alimenti || '',
        e.pensieri || '',
        e.emozioni || '',
        e.sazieta !== null ? String(e.sazieta) : '',
        e.soddisfazione !== null ? String(e.soddisfazione) : ''
      ];
      if (hasDurata) {
        row.push(e.durataMinuti !== null ? `${e.durataMinuti} min` : '');
      }
      return row;
    });

    autoTable(doc, {
      startY: currentY,
      head,
      body,
      theme: 'grid',
      showHead: 'firstPage',
      headStyles: {
        fillColor: LILAC,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'center',
        valign: 'middle',
        cellPadding: { top: 2.5, right: 1.5, bottom: 2.5, left: 1.5 }
      },
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        valign: 'top',
        textColor: INK,
        lineColor: [224, 204, 224],
        lineWidth: 0.2,
        overflow: 'linebreak',
      },
      alternateRowStyles: {
        fillColor: [248, 244, 248]
      },
      columnStyles: {
        0: { cellWidth: 13, halign: 'center' },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 13, halign: 'center' },
        5: { cellWidth: 36 },
        6: { cellWidth: 36 },
        7: { cellWidth: 18, halign: 'center' },
        8: { cellWidth: 18, halign: 'center' },
        ...(hasDurata ? { 9: { cellWidth: 18, halign: 'center' as const } } : {}),
      },
      margin: { left: 10, right: 10 },
      didDrawPage: function (data) {
        // Reset currentY to after the table
        if (data.cursor) {
          currentY = data.cursor.y + 15;
        }
      }
    });
    // For single page tables, didDrawPage updates currentY.
    // If the table spans multiple pages, currentY will be set relative to the end of the table on the final page.
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...LILAC_DARK);
    doc.text(`Ancora · pagina ${i} di ${pageCount}`, 148.5, 200, { align: 'center' });
  }

  const fileSuffix = startDate === endDate ? startDate : `${startDate}_${endDate}`;
  doc.save(`ancora-diario-${fileSuffix}.pdf`);
}
