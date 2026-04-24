import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PlantProblem — Houseplant Care & Troubleshooting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#2D5A3D",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#7AAD7A",
          letterSpacing: "0.15em",
        }}
      >
        🌿 plantproblem.com
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-2px",
          lineHeight: 1,
        }}
      >
        PlantProblem
      </div>
      <div
        style={{ width: 48, height: 4, background: "#7AAD7A", borderRadius: 2 }}
      />
      <div
        style={{
          fontSize: 24,
          color: "#A8C8A8",
          textAlign: "center",
          maxWidth: 560,
          lineHeight: 1.4,
        }}
      >
        When your plant looks wrong, here&apos;s exactly what&apos;s wrong.
      </div>
    </div>,
    size
  );
}
