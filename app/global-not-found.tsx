import type { Metadata } from "next";
import { Logo } from "@/components/ui/Icons";
import { fontVars } from "@/lib/fonts";
import { tEn, tUk } from "@/content/ui";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "404 — Domus",
  robots: { index: false, follow: true },
};

/**
 * Глобальна 404 (у сайту два кореневі layout — /uk/ і /en/). Мову обирає крихітний скрипт за адресою,
 * обидві версії тексту вже в HTML.
 */
const base = process.env.GITHUB_PAGES === "true" ? process.env.PAGES_BASE_PATH || "" : "";

const pickLang = `(function(){var en=/\\/en(\\/|$)/.test(location.pathname);document.documentElement.lang=en?'en':'uk';document.documentElement.dataset.nf=en?'en':'uk'})()`;

function Body({ lang }: { lang: "uk" | "en" }) {
  const t = (lang === "en" ? tEn : tUk).nf;
  return (
    <div data-nf-lang={lang} className="container-x flex flex-1 flex-col justify-center py-20">
      <p className="eyebrow text-terracotta">{t.eyebrow}</p>
      <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">
        {t.h1a} <span className="accent">{t.h1b}</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-stone">{t.text}</p>
      <a
        href={`${base}/${lang}/`}
        data-home
        className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-terracotta px-7 py-4 font-semibold text-paper transition-colors hover:bg-graphite"
      >
        {t.home}
      </a>
    </div>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="uk" className={`${fontVars} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLang }} />
        <style>{`html[data-nf=en] [data-nf-lang=uk],html:not([data-nf=en]) [data-nf-lang=en]{display:none}`}</style>
      </head>
      <body>
        <main id="main" className="blueprint-grid relative flex min-h-[100svh] flex-col">
          <div className="container-x pt-8">
            <Logo />
          </div>
          <Body lang="uk" />
          <Body lang="en" />
        </main>
      </body>
    </html>
  );
}
