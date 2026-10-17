"use client";

import { useI18n } from "@/components/providers/I18n";

/** Круглая «печать» гарантии с медленно вращающимся текстом */
export function Seal({ className = "" }: { className?: string }) {
  const t = useI18n().t.seal;
  return (
    <div className={`grid aspect-square w-36 place-items-center rounded-full bg-terracotta text-paper shadow-[0_24px_50px_-20px_rgb(169_78_52/0.6)] ${className}`}>
      <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="seal-circle" d="M80 80 m-60 0 a60 60 0 1 1 120 0 a60 60 0 1 1 -120 0" />
        </defs>
        <text className="font-mono" fontSize="10" fill="currentColor">
          <textPath href="#seal-circle" textLength="370" lengthAdjust="spacing">{t.ring}</textPath>
        </text>
      </svg>
      <div className="relative text-center leading-none">
        <span className="block font-serif text-5xl">3</span>
        <span className="eyebrow mt-1 block text-[9px] text-paper/85">{t.years}</span>
      </div>
      <span className="sr-only">{t.sr}</span>
    </div>
  );
}
