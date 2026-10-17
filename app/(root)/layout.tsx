import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Domus — ремонт квартир · apartment renovation, Kyiv",
  robots: { index: false, follow: true },
  alternates: { languages: { uk: "/uk/", en: "/en/", "x-default": "/uk/" } },
};

/** Корінь сайту — лише вибір мови, без шапки й провайдерів */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${fontVars} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
