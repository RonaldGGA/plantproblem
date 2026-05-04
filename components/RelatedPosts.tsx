import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export default function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const all = getAllPosts();

  // Score each post by how many tags it shares
  const scored = all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p) => p.post);

  if (scored.length === 0) return null;

  return (
    <section style={{ marginTop: "4rem" }}>
      <p className="section-label">Keep reading</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {scored.map((post, i) => (
          <RelatedCard
            key={post.slug}
            post={post}
            index={i}
            total={scored.length}
          />
        ))}
      </div>
    </section>
  );
}

function RelatedCard({
  post,
  index,
  total,
}: {
  post: PostMeta;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr auto",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1rem 0",
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
        textDecoration: "none",
      }}
      className="related-card"
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.75rem",
          fontWeight: 300,
          color: "rgba(28,28,26,0.1)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          userSelect: "none",
          transition: "color 0.22s",
        }}
        className="related-card__num"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title only */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.575rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}
        >
          {post.tags[0]}
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--color-text)",
            transition: "color 0.22s",
          }}
          className="related-card__title"
        >
          {post.title}
        </p>
      </div>

      {/* Arrow */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--color-accent)",
          flexShrink: 0,
          transition: "transform 0.22s",
        }}
        className="related-card__arrow"
      >
        →
      </span>
    </Link>
  );
}
