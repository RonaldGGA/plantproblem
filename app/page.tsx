import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Image from "next/image";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <section style={{ marginBottom: "4rem", maxWidth: "640px" }}>
        <p
          className="animate-fade-up animate-fade-up-1"
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "1rem",
          }}
        >
          Houseplant Care & Troubleshooting
        </p>
        <h1
          className="animate-fade-up animate-fade-up-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
          }}
        >
          Your plant has a problem.
          <br />
          <span style={{ color: "var(--color-accent)" }}>
            We have the answer.
          </span>
        </h1>
        <p
          className="animate-fade-up animate-fade-up-3"
          style={{
            color: "var(--color-muted)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
          }}
        >
          No fluff, no guesswork. Practical guides to diagnose and fix whatever
          your houseplant is going through.
        </p>
      </section>

      {featured && (
        <section className="animate-fade-up animate-fade-up-4">
          <p className="featured-label">Featured Article</p>
          <Link href={`/blog/${featured.slug}`} className="featured-card">
            <>
              <div className="featured-card__image">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", height: "auto" }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "5rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    🪴
                  </span>
                )}
              </div>
            </>
            <div className="featured-card__content">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {featured.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="featured-card__title">{featured.title}</h2>
              <p className="featured-card__desc">{featured.description}</p>
              <div className="featured-card__meta">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
              <span className="featured-card__cta">
                Read full article
                <span className="featured-card__cta-arrow">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="animate-fade-up animate-fade-up-5">
          <p className="section-label">Latest Posts</p>
          <div className="posts-grid">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
