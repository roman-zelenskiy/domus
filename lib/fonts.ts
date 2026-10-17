import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";

// Предзагружаем только то, что нужно для первого экрана; курсив и моно догружаются по мере надобности
export const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-cormorant",
  display: "swap",
});

export const serifItalic = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  style: "italic",
  variable: "--font-cormorant-italic",
  display: "swap",
  preload: false,
});

export const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const fontVars = `${serif.variable} ${serifItalic.variable} ${sans.variable} ${mono.variable}`;
