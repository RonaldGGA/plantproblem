import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Image from "next/image";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <>
      <section className="hero">
        <svg
          className="hero__decoration"
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="210" cy="210" r="200" stroke="#2D5A3D" strokeWidth="1" />
          <circle
            cx="210"
            cy="210"
            r="150"
            stroke="#2D5A3D"
            strokeWidth="0.5"
          />
          <circle
            cx="210"
            cy="210"
            r="100"
            stroke="#C9A84C"
            strokeWidth="0.5"
          />
          <path
            d="M210 10 Q320 120 210 210 Q100 300 210 410"
            stroke="#2D5A3D"
            strokeWidth="0.8"
          />
          <path
            d="M10 210 Q120 100 210 210 Q300 320 410 210"
            stroke="#2D5A3D"
            strokeWidth="0.8"
          />
          <circle cx="210" cy="210" r="4" fill="#2D5A3D" />
        </svg>

        <div className="container">
          <p className="hero__eyebrow animate-fade-up animate-fade-up-1">
            <span className="hero__eyebrow-line" />
            Houseplant Care & Troubleshooting
          </p>

          <h1 className="hero__title animate-fade-up animate-fade-up-2">
            Your plant has a problem.
            <br />
            <em>We have the answer.</em>
          </h1>

          <p className="hero__sub animate-fade-up animate-fade-up-3">
            No guesswork. No generic advice. Practical, specific guides that
            tell you exactly what&apos;s wrong and exactly how to fix it.
          </p>

          <div
            className="animate-fade-up animate-fade-up-4"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link href="/blog" className="btn-primary">
              Browse all articles →
            </Link>
            <Link href="/about" className="btn-ghost">
              About this site
            </Link>
          </div>

          <div className="stats-bar animate-fade-up animate-fade-up-5">
            <div className="stat">
              <span className="stat__value">{posts.length}</span>
              <span className="stat__label">Articles</span>
            </div>
            <div className="stat">
              <span className="stat__value">5+</span>
              <span className="stat__label">Plants covered</span>
            </div>
            <div className="stat">
              <span className="stat__value">0</span>
              <span className="stat__label">Generic advice</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {featured && (
          <section
            className="animate-fade-up animate-fade-up-4"
            style={{ marginBottom: "4rem" }}
          >
            <p className="section-label">Featured Article</p>

            <Link href={`/blog/${featured.slug}`} className="featured-card">
              <div className="featured-card__image">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className="featured-card__image-placeholder">🪴</span>
                )}
              </div>

              <div className="featured-card__content">
                <div>
                  <div className="featured-card__tags">
                    {featured.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="featured-card__title">{featured.title}</h2>
                  <p className="featured-card__desc">{featured.description}</p>
                </div>

                <div>
                  <div className="featured-card__meta">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readingTime}</span>
                  </div>
                  <span className="featured-card__cta">
                    Read full article
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {rest.length > 0 && (
          <section
            className="animate-fade-up animate-fade-up-5"
            style={{ marginBottom: "4rem" }}
          >
            <p className="section-label">Latest Articles</p>

            <div className="posts-grid">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn-primary">
                View all {posts.length} articles →
              </Link>
            </div>
          </section>
        )}

        <div className="gold-rule" />

        <section style={{ padding: "2rem 0 5rem", maxWidth: "640px" }}>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>
            Why this site exists
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 400,
              lineHeight: 1.5,
              fontStyle: "italic",
              color: "var(--color-text)",
              marginBottom: "1.25rem",
            }}
          >
            &quot;Check your watering schedule&quot; is not an answer. It&apos;s
            a suggestion to keep guessing.
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "var(--color-muted)",
            }}
          >
            Every article here starts with a diagnosis table. Every fix is
            something you can do today. Brown tips at the edge mean something
            different from brown spots in the center. Yellow leaves at the
            bottom are not the same as yellow leaves at the top. We write about
            the difference.
          </p>
        </section>
      </div>
    </>
  );
}
