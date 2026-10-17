import type { Metadata, Viewport } from "next";
import { lang as rootLang } from "next/root-params";
import { Providers } from "@/components/providers/Providers";
import { I18nProvider } from "@/components/providers/I18n";
import { fontVars } from "@/lib/fonts";
import { getDict, href, isLang, langs, type Lang } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

async function current(): Promise<Lang> {
  const l = await rootLang();
  return isLang(l) ? l : "uk";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await current();
  const { site, t } = getDict(lang);
  const { title, description } = site.seo;
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: title, template: "%s — Domus" },
    description,
    applicationName: "Domus",
    category: t.meta.category,
    formatDetection: { telephone: false, address: false, email: false },
    keywords: t.meta.keywords,
    alternates: {
      canonical: `${href("/", lang)}/`,
      languages: { uk: "/uk/", en: "/en/", "x-default": "/uk/" },
    },
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: lang === "uk" ? "en_US" : "uk_UA",
      url: `${href("/", lang)}/`,
      siteName: "Domus",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
      "geo.region": "UA-30",
      "geo.placename": t.meta.placename,
      "geo.position": "50.4325;30.516",
      ICBM: "50.4325, 30.516",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f3eee5",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await current();
  const { t } = getDict(lang);
  return (
    <html lang={lang} className={`${fontVars} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-graphite focus:px-5 focus:py-3 focus:text-paper"
        >
          {t.skip}
        </a>
        <I18nProvider lang={lang}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
