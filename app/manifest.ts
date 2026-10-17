import type { MetadataRoute } from "next";
import { seo } from "@/content/site.uk";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Domus — ремонт квартир під ключ у Києві",
    short_name: "Domus",
    description: seo.description,
    lang: "uk",
    start_url: ".",
    display: "standalone",
    background_color: "#f3eee5",
    theme_color: "#f3eee5",
    icons: [
      { src: "icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
