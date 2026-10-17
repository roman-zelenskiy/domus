import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { langs } from "@/lib/i18n";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

const og = {
  uk: {
    city: "КИЇВ · З 2018",
    l1: "Ремонт під ключ",
    a: "з",
    accent: "фіксованим",
    b: "кошторисом",
    perks: ["Гарантія 3 роки", "350+ об’єктів", "Безкоштовний замір"],
  },
  en: {
    city: "KYIV · SINCE 2018",
    l1: "Turnkey renovation",
    a: "with a",
    accent: "fixed",
    b: "estimate",
    perks: ["3-year warranty", "350+ homes", "Free measurement"],
  },
};

export const alt = "Domus — ремонт квартир під ключ у Києві · turnkey apartment renovation in Kyiv";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Генерируется при сборке — работает и в статическом экспорте
export const dynamic = "force-static";

const serif = await readFile(join(process.cwd(), "assets/Cormorant-Medium.ttf"));
const sans = await readFile(join(process.cwd(), "assets/Manrope-Medium.ttf"));

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const t = og[(await params).lang === "en" ? "en" : "uk"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3eee5",
          backgroundImage:
            "linear-gradient(rgba(34,32,29,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,32,29,.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: "#22201d",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, border: "2.5px solid #22201d", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ width: 20, height: 28, borderTopLeftRadius: 10, borderTopRightRadius: 10, border: "2.5px solid #22201d", borderBottom: "none", marginBottom: 6 }} />
          </div>
          <span style={{ fontFamily: "Cormorant", fontSize: 48 }}>Domus</span>
          <span style={{ marginLeft: "auto", fontSize: 22, letterSpacing: 4, color: "#6f675c" }}>{t.city}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Cormorant", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>{t.l1}</div>
          <div style={{ display: "flex", fontFamily: "Cormorant", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>
            {t.a}&nbsp;<span style={{ color: "#9c4630" }}>{t.accent}</span>&nbsp;{t.b}
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "#6f675c" }}>
          {t.perks.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 500 },
        { name: "Manrope", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
