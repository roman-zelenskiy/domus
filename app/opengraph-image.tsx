import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Domus — ремонт квартир под ключ в Киеве с фиксированной сметой";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Генерируется при сборке — работает и в статическом экспорте
export const dynamic = "force-static";

const serif = await readFile(join(process.cwd(), "assets/Cormorant-Medium.ttf"));
const sans = await readFile(join(process.cwd(), "assets/Manrope-Medium.ttf"));

export default async function Image() {
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
          <span style={{ marginLeft: "auto", fontSize: 22, letterSpacing: 4, color: "#6f675c" }}>КИЕВ · С 2018</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Cormorant", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>Ремонт под ключ</div>
          <div style={{ display: "flex", fontFamily: "Cormorant", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>
            с&nbsp;<span style={{ color: "#a94e34" }}>фиксированной</span>&nbsp;сметой
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "#6f675c" }}>
          <span>Гарантия 3 года</span>
          <span>350+ объектов</span>
          <span>Бесплатный замер</span>
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
