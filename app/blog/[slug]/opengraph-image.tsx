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

  return new ImageResponse(
    <div
      style={{
        background: "#F7F6F2",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", fontSize: 36 }}>🌿</div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#2D5A3D",
          }}
        >
          PlantProblem
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {meta.tags.slice(0, 3).map((tag: string) => (
            <div
              key={tag}
              style={{
                display: "flex",
                background: "#EBF2ED",
                color: "#2D5A3D",
                fontSize: 18,
                fontWeight: 700,
                padding: "4px 16px",
                borderRadius: "999px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: meta.title.length > 50 ? 52 : 64,
            fontWeight: 700,
            color: "#1C1C1A",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {meta.title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#6E6D68",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {meta.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "2px solid #E2E0D8",
          paddingTop: "28px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#6E6D68" }}>
          {meta.date} · {meta.readingTime}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#2D5A3D",
            fontWeight: 700,
          }}
        >
          plantproblem.com
        </div>
      </div>
    </div>,
    size
  );
}
