/** Link PayPal per donazioni volontarie (stesso destinazione del QR). */
export const PAYPAL_DONATE_URL = 'https://paypal.me/Alessandro3319';

/** Path pubblico del QR PayPal (file in /public). */
export const PAYPAL_QR_SRC = `${import.meta.env.BASE_URL}paypal_pure.svg`;

/** URL pubblico dell’app (GitHub Pages) per condivisione. */
export const APP_PUBLIC_URL = 'https://linzialessandro.github.io/Ancora/';

/**
 * Messaggio pronto da condividere con curante / chi accompagna.
 * Solo utilità: nessuna richiesta di donazione.
 */
export const APP_SHARE_MESSAGE = [
  'Ancora — diario alimentare digitale in italiano, gratuito, solo sul dispositivo (niente account, niente server).',
  'Utile per compilare il diario ed esportare un PDF da consegnare al curante. Non sostituisce il parere di un professionista.',
  APP_PUBLIC_URL,
].join('\n');

/** Importi suggeriti (€) per chip su schermata Dona — non obbligatori. */
export const DONATE_SUGGESTED_AMOUNTS_EUR = [3, 5, 10] as const;

/** Deep-link PayPal.me con importo fisso (importo libero: usa PAYPAL_DONATE_URL). */
export function paypalDonateUrlWithAmount(amountEur: number): string {
  const n = Math.round(amountEur);
  if (!Number.isFinite(n) || n <= 0) return PAYPAL_DONATE_URL;
  return `${PAYPAL_DONATE_URL}/${n}`;
}
