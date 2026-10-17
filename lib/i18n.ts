import * as uk from "@/content/site.uk";
import * as en from "@/content/site.en";
import { tEn, tUk, type Ui } from "@/content/ui";

export const langs = ["uk", "en"] as const;
export type Lang = (typeof langs)[number];
export type Site = typeof uk;

export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);

export type Dict = { lang: Lang; site: Site; t: Ui };

const dicts: Record<Lang, Dict> = {
  uk: { lang: "uk", site: uk, t: tUk },
  en: { lang: "en", site: en as unknown as Site, t: tEn },
};

export const getDict = (lang: Lang): Dict => dicts[lang];

/** Посилання всередині мовної версії: href("/privacy", "en") → "/en/privacy" */
export const href = (path: string, lang: Lang) => `/${lang}${path === "/" ? "" : path}`;

export const other = (lang: Lang): Lang => (lang === "uk" ? "en" : "uk");

/**
 * Корінь сайту: мова до першої відмальовки. Ручний вибір (localStorage) має пріоритет,
 * далі часовий пояс України → українська, решта → англійська.
 */
export const detectScript = `(function(){var l='uk';try{var s=localStorage.getItem('lang');if(s==='uk'||s==='en'){l=s}else{var tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');l=/^Europe\\/(Kyiv|Kiev|Uzhgorod|Zaporozhye|Simferopol)$/.test(tz)?'uk':'en'}}catch(e){}location.replace(l+'/'+location.search+location.hash)})()`;

export const rememberLang = (l: Lang) => {
  try {
    localStorage.setItem("lang", l);
  } catch {
    // сховище недоступне — вибір просто не запам’ятається
  }
};
