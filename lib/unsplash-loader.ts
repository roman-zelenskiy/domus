/** Загрузчик next/image для статического экспорта: размер и качество подбирает CDN Unsplash */
export default function unsplashLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.toString();
}
