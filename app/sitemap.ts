import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Нужно для статического экспорта (GitHub Pages)
export const dynamic = "force-static";

const alt = (path: string) => ({ languages: { uk: `${siteUrl}/uk${path}`, en: `${siteUrl}/en${path}` } });

export default function sitemap(): MetadataRoute.Sitemap {
  return (["uk", "en"] as const).flatMap((l) => [
    { url: `${siteUrl}/${l}/`, lastModified: "2026-10-17", changeFrequency: "monthly", priority: l === "uk" ? 1 : 0.9, alternates: alt("/") },
    { url: `${siteUrl}/${l}/privacy/`, lastModified: "2026-09-01", changeFrequency: "yearly", priority: 0.2, alternates: alt("/privacy/") },
  ]);
}
