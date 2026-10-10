import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { seo } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Предзагружаем только то, что нужно для первого экрана; курсив и моно догружаются по мере надобности
const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-cormorant",
  display: "swap",
});

const serifItalic = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  style: "italic",
  variable: "--font-cormorant-italic",
  display: "swap",
  preload: false,
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

const { title, description } = seo;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: title, template: "%s — Domus" },
  description,
  applicationName: "Domus",
  category: "Ремонт і будівництво",
  formatDetection: { telephone: false, address: false, email: false },
  keywords: [
    "ремонт квартир Київ",
    "ремонт під ключ",
    "капітальний ремонт квартири",
    "дизайнерський ремонт",
    "фіксований кошторис",
    "ремонт новобудови Київ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
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
    "geo.placename": "Київ",
    "geo.position": "50.4325;30.516",
    ICBM: "50.4325, 30.516",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${serif.variable} ${serifItalic.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-graphite focus:px-5 focus:py-3 focus:text-paper"
        >
          Перейти до вмісту
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
