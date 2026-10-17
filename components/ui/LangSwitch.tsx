"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/providers/I18n";
import { other, rememberLang } from "@/lib/i18n";

/** UA / EN: та сама сторінка іншою мовою; ручний вибір запам’ятовується */
export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  const to = other(lang);
  const path = usePathname().replace(/^\/(uk|en)(?=\/|$)/, `/${to}`);
  return (
    <Link
      href={path}
      hrefLang={to}
      lang={to}
      aria-label={t.header.switchLabel}
      onClick={() => rememberLang(to)}
      className={`grid h-12 min-w-12 place-items-center rounded-full border border-graphite/15 px-3 font-mono text-xs tracking-wider transition-colors hover:border-graphite hover:bg-graphite hover:text-paper ${className}`}
    >
      {to === "en" ? "EN" : "UA"}
    </Link>
  );
}
