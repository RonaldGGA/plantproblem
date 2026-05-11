import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import EmailSubscribe from "@/components/EmailSubscribe";
import Image from "next/image";

const TICKER_ITEMS = [
  "Pothos",
  "Monstera",
  "Snake Plant",
  "Peace Lily",
  "Fiddle Leaf Fig",
  "ZZ Plant",
  "Spider Plant",
  "Pests",
  "Root Rot",
  "Propagation",
];

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero animate-fade-up animate-fade-up-1">
        <div className="hero__inner">
          <div className="hero__left">
            <p className="hero__eyebrow">
              Houseplant Care &amp; Troubleshooting
            </p>
            <h1 className="hero__title">
              Your plant has a problem.
              <strong>We have</strong>
              <em>the answer.</em>
            </h1>
            <p className="hero__sub">
              No guesswork. No generic advice. Specific guides that tell you
              exactly what&apos;s wrong — and how to fix it today.
            </p>
            <div className="hero__cta-row">
              <Link href="/blog" className="btn-primary">
                Browse all articles →
              </Link>
              <Link href="/about" className="btn-ghost">
                About this site
              </Link>
            </div>
          </div>

          <div className="hero__right">
            <div className="stats-bar">
              <div className="stat">
                <span className="stat__value">{posts.length}</span>
                <span className="stat__label">Articles published</span>
              </div>
              <div className="stat">
                <span className="stat__value">10+</span>
                <span className="stat__label">Plants covered</span>
              </div>
              <div className="stat">
                <span className="stat__value">0</span>
                <span className="stat__label">Generic advice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="ticker">
        <span className="ticker__label">{"// Topics"}</span>
        <div className="ticker__track">
          <div className="ticker__items">
            <div className="ticker__items-inner">
              {TICKER_ITEMS.map((item, i) => (
                <span
                  key={`a-${i}`}
                  className={`ticker__item${i === 0 ? " ticker__item--active" : ""}`}
                >
                  <span className="ticker__dot" />
                  {item}
                </span>
              ))}
            </div>
            <div className="ticker__items-inner">
              {TICKER_ITEMS.map((item, i) => (
                <span key={`b-${i}`} className="ticker__item">
                  <span className="ticker__dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ─────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: "2.5rem" }}>
        {/* Featured article */}
        {featured && (
          <section
            className="animate-fade-up animate-fade-up-2"
            style={{ marginBottom: "2.5rem" }}
          >
            <p className="section-label">Featured article</p>

            <Link href={`/blog/${featured.slug}`} className="featured-card">
              {/* Banner — visible only on mobile via CSS */}
              {featured.coverImage && (
                <div
                  className="featured-cover-mobile"
                  style={{
                    gridColumn: "1 / -1",
                    position: "relative",
                    height: "220px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 900px) calc(100vw - 4rem)"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Number column */}
              <div className="featured-card__num">
                <span>01</span>
              </div>

              {/* Content column */}
              <div className="featured-card__content">
                <div className="featured-card__eyebrow">
                  {featured.tags.slice(0, 2).join(" · ")}
                </div>
                <h2 className="featured-card__title">{featured.title}</h2>
                <p className="featured-card__desc">{featured.description}</p>
                <div className="featured-card__meta">
                  <span className="featured-card__meta-text">
                    {featured.date} · {featured.readingTime}
                  </span>
                  <span className="featured-card__read">Read article →</span>
                </div>
              </div>

              {/* Side column — hidden on mobile by existing CSS */}
              <div className="featured-card__side">
                {featured.coverImage && (
                  <div
                    style={{
                      position: "relative",
                      height: "160px",
                      marginBottom: "1rem",
                      overflow: "hidden",
                      borderRadius: "4px",
                    }}
                  >
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      sizes="280px"
                      priority
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                {featured.diagnosisPreview ? (
                  <>
                    <div className="featured-card__diagnosis-label">
                      {"// Quick diagnosis"}
                    </div>
                    <div className="featured-card__diagnosis-rows">
                      {featured.diagnosisPreview.map((row, i) => (
                        <div key={i} className="featured-card__diagnosis-row">
                          <span className="featured-card__diagnosis-symptom">
                            {row.symptom}
                          </span>
                          <span className="featured-card__diagnosis-cause">
                            {row.cause}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="featured-card__side-fallback">
                    &ldquo;{featured.description}&rdquo;
                  </p>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* Latest articles grid */}
        {rest.length > 0 && (
          <section
            className="animate-fade-up animate-fade-up-3"
            style={{ marginBottom: "2.5rem" }}
          >
            <p className="section-label">Latest articles</p>

            <div className="posts-grid">
              {rest.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i + 1} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/blog" className="btn-ghost">
                View all {posts.length} articles →
              </Link>
            </div>
          </section>
        )}

        <div className="gold-rule" />

        {/* Why this site exists */}
        <section
          className="animate-fade-up animate-fade-up-4"
          style={{ padding: "0 0 3rem", maxWidth: "640px" }}
        >
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>
            Why this site exists
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: 400,
              lineHeight: 1.5,
              fontStyle: "italic",
              color: "var(--color-text)",
              marginBottom: "1.25rem",
            }}
          >
            &ldquo;Check your watering schedule&rdquo; is not an answer.
            It&apos;s a suggestion to keep guessing.
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

        {/* Email subscribe */}
        <div
          className="animate-fade-up animate-fade-up-5"
          style={{ marginBottom: "2rem" }}
        >
          <EmailSubscribe />
        </div>
      </div>
    </>
  );
}
