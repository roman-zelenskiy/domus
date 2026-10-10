import type { NextConfig } from "next";

// Сборка для GitHub Pages: статический экспорт без Node.js-сервера
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH || "" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  ...(isPages && { output: "export", trailingSlash: true, basePath }),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
    ...(isPages && { loader: "custom", loaderFile: "./lib/unsplash-loader.ts" }),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
