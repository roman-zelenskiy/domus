/** 1248000 → «1 248 000» (uk, нерозривні пробіли) або «1,248,000» (en) */
export const formatNumber = (n: number, locale = "uk-UA") =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, locale.startsWith("uk") ? "\u00a0" : ",");

export const formatUAH = (n: number, locale = "uk-UA") =>
  locale.startsWith("uk") ? `${formatNumber(n, locale)} ₴` : `${formatNumber(n, locale)} UAH`;

/** Маска украинского номера: +380 (XX) XXX-XX-XX */
export function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("80")) digits = digits.slice(2);
  // вставили полный номер поверх префикса: «+380 (» + «+380671234567»
  while (digits.length > 9 && /^(380|80)/.test(digits)) digits = digits.replace(/^3?80/, "");
  // украинский номер после кода страны не начинается с 0: «067…» → «67…»
  digits = digits.replace(/^0/, "").slice(0, 9);

  if (!digits.length) return raw.startsWith("+380") ? "+380 (" : "";
  let out = "+380 (" + digits.slice(0, 2);
  if (digits.length >= 2) out += ") ";
  if (digits.length > 2) out += digits.slice(2, 5);
  if (digits.length > 5) out += "-" + digits.slice(5, 7);
  if (digits.length > 7) out += "-" + digits.slice(7, 9);
  return out;
}

export const phoneDigits = (formatted: string) => formatted.replace(/\D/g, "");

export const isValidPhone = (formatted: string) => /^380\d{9}$/.test(phoneDigits(formatted));
