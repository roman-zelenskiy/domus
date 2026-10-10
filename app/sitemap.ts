import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Нужно для статического экспорта (GitHub Pages)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified: "2026-10-10", changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/privacy`, lastModified: "2026-09-01", changeFrequency: "yearly", priority: 0.2 },
  ];
}
