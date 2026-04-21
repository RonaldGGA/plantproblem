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
        gap: "24px",
      }}
    >
      <div style={{ fontSize: 96 }}>
        <img src="/icon.svg" alt="PlantProblem" width="32" height="32" />
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-2px",
        }}
      >
        PlantProblem
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#7AAD7A",
          letterSpacing: "0px",
        }}
      >
        Houseplant Care & Troubleshooting
      </div>
    </div>,
    size
  );
}
