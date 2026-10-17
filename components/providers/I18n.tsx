"use client";

import { createContext, useContext } from "react";
import { getDict, type Dict, type Lang } from "@/lib/i18n";

const I18nContext = createContext<Dict>(getDict("uk"));

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <I18nContext.Provider value={getDict(lang)}>{children}</I18nContext.Provider>;
}

/** Контент і рядки інтерфейсу поточної мови для клієнтських компонентів */
export const useI18n = () => useContext(I18nContext);
