import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);

  const fontSize =
    meta.title.length > 60 ? 46 : meta.title.length > 40 ? 54 : 64;

  return new ImageResponse(
    <div
      style={{
        background: "#F7F6F2",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <div style={{ width: 16, background: "#2D5A3D", flexShrink: 0 }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            color: "#2D5A3D",
          }}
        >
          🌿 PlantProblem
        </div>
        <div
          style={{
            fontSize,
            fontWeight: 700,
            color: "#1C1C1A",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            maxWidth: 960,
          }}
        >
          {meta.title}
        </div>
        <div style={{ fontSize: 22, color: "#6E6D68" }}>plantproblem.com</div>
      </div>
    </div>,
    size
  );
}
