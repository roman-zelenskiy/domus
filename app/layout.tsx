import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { company } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "Domus — ремонт квартир под ключ в Киеве с фиксированной сметой";
const description =
  "Ремонт квартир под ключ в Киеве: фиксированная смета в договоре, гарантия 3 года, 350+ сданных объектов. Бесплатный замер и смета за 3 дня.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: title, template: "%s — Domus" },
  description,
  keywords: [
    "ремонт квартир Киев",
    "ремонт под ключ",
    "капитальный ремонт квартиры",
    "дизайнерский ремонт",
    "фиксированная смета",
    "ремонт новостройки Киев",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_UA",
    url: "/",
    siteName: "Domus",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3eee5",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Domus",
  description,
  url: siteUrl,
  telephone: company.phone,
  email: company.email,
  foundingDate: "2018",
  priceRange: "₴₴",
  areaServed: "Киев",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "Киев",
    postalCode: "03150",
    addressCountry: "UA",
  },
  openingHours: "Mo-Sa 09:00-20:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "212" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-graphite focus:px-5 focus:py-3 focus:text-paper"
        >
          Перейти к содержимому
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
