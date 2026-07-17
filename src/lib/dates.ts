import { format, parseISO, isValid } from 'date-fns';
import { it } from 'date-fns/locale';

export function getTodayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatItalianDate(dateStr: string) {
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return dateStr;
    return format(date, 'dd MMMM yyyy', { locale: it });
  } catch {
    return dateStr;
  }
}

export function formatItalianDayOfWeek(dateStr: string) {
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return '';
    const day = format(date, 'EEEE', { locale: it });
    return day.charAt(0).toUpperCase() + day.slice(1);
  } catch {
    return '';
  }
}

/** Formato compatto per tabelle PDF: 17/07/2026 */
export function formatShortItalianDate(dateStr: string) {
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return dateStr;
    return format(date, 'dd/MM/yyyy');
  } catch {
    return dateStr;
  }
}
