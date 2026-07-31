/** Link PayPal per donazioni volontarie (stesso destinazione del QR). */
export const PAYPAL_DONATE_URL = 'https://paypal.me/Alessandro3319';

/** Path pubblico del QR PayPal (file in /public). */
export const PAYPAL_QR_SRC = `${import.meta.env.BASE_URL}paypal_pure.svg`;

/** Importi suggeriti (€) per chip su schermata Dona — non obbligatori. */
export const DONATE_SUGGESTED_AMOUNTS_EUR = [3, 5, 10] as const;

/** Deep-link PayPal.me con importo fisso (importo libero: usa PAYPAL_DONATE_URL). */
export function paypalDonateUrlWithAmount(amountEur: number): string {
  const n = Math.round(amountEur);
  if (!Number.isFinite(n) || n <= 0) return PAYPAL_DONATE_URL;
  return `${PAYPAL_DONATE_URL}/${n}`;
}
