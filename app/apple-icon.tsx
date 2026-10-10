import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#22201d" }}>
        <div style={{ position: "relative", width: 76, height: 98, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, borderTopLeftRadius: 38, borderTopRightRadius: 38, border: "9px solid #f3eee5", borderBottom: "none" }} />
          <div style={{ position: "absolute", right: 14, top: 52, width: 14, height: 14, borderRadius: 7, background: "#d88b69" }} />
        </div>
      </div>
    ),
    size,
  );
}
