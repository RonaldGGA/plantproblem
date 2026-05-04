import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import EmailSubscribe from "@/components/EmailSubscribe";
import RelatedPosts from "@/components/RelatedPosts";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);

  const ogImage = meta.coverImage
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${meta.coverImage}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.description,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
          datePublished: meta.date,
          dateModified: meta.date,
          image: meta.coverImage
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${meta.coverImage}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
          author: {
            "@type": "Organization",
            name: "PlantProblem",
            url: process.env.NEXT_PUBLIC_BASE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: "PlantProblem",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            logo: {
              "@type": "ImageObject",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
          },
          keywords: meta.tags.join(", "),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.NEXT_PUBLIC_BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: meta.title,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
              },
            ],
          },
        }}
      />

      {/* ── ARTICLE HERO ─────────────────────────────────── */}
      <div className="article-hero">
        <div
          className={`article-hero__inner${meta.coverImage ? "" : " article-hero__inner--no-image"}`}
        >
          {/* Left column — text */}
          <div className="article-hero__left">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb__item">
                Home
              </Link>
              <span className="breadcrumb__sep">›</span>
              <Link href="/blog" className="breadcrumb__item">
                Blog
              </Link>
              <span className="breadcrumb__sep">›</span>
              <span className="breadcrumb__item breadcrumb__item--current">
                {meta.title}
              </span>
            </nav>

            <div className="article-hero__tags">
              {meta.tags.map((tag) => (
                <Link key={tag} href={`/blog?q=${tag}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>

            <h1 className="article-hero__title">{meta.title}</h1>

            <div className="article-hero__meta">
              <span className="article-hero__meta-item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="2"
                    width="11"
                    height="10"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path d="M1 5h11" stroke="currentColor" strokeWidth="1.2" />
                  <path
                    d="M4 1v2M9 1v2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {meta.date}
              </span>
              <div className="article-hero__meta-dot" />
              <span className="article-hero__meta-item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M6.5 3.5V6.5l2 1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {meta.readingTime}
              </span>
            </div>
          </div>

          {/* Right column — image (only if coverImage exists) */}
          {meta.coverImage && (
            <div className="article-hero__image">
              {meta.coverImage && (
                <div
                  className="article-hero__image"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={meta.coverImage}
                    alt={meta.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="container">
        <div className="article-layout">
          {/* Main prose */}
          <div>
            <div className="prose">
              <MDXRemote
                source={content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            <div style={{ marginTop: "4rem" }}>
              <RelatedPosts currentSlug={slug} tags={meta.tags} />
            </div>

            <div style={{ marginTop: "3rem" }}>
              <EmailSubscribe />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Quick diagnosis — real data if available, hint if not */}
            <div className="sidebar-card">
              <p className="sidebar-card__title">{"// Quick diagnosis"}</p>
              {meta.diagnosisPreview ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  {meta.diagnosisPreview.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        padding: "0.45rem 0",
                        borderBottom:
                          i < meta.diagnosisPreview!.length - 1
                            ? "1px solid var(--color-border)"
                            : "none",
                        fontSize: "0.78rem",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{ color: "var(--color-text)", fontWeight: 500 }}
                      >
                        {row.symptom}
                      </span>
                      <span
                        style={{
                          color: "var(--color-muted)",
                          textAlign: "right",
                          fontSize: "0.72rem",
                        }}
                      >
                        {row.cause}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  Scroll to the table at the top. Match your symptom to find the
                  most likely cause.
                </p>
              )}
            </div>

            {/* More on this plant */}
            <div className="sidebar-card">
              <p className="sidebar-card__title">{"// More on this plant"}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {meta.tags.slice(0, 2).map((tag) => (
                  <Link key={tag} href={`/blog?q=${tag}`} className="toc-link">
                    All {tag} articles →
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial pull quote */}
            <div
              style={{
                borderLeft: "3px solid var(--color-gold)",
                paddingLeft: "1.1rem",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "var(--color-text)",
                  lineHeight: 1.55,
                  marginBottom: "0.6rem",
                }}
              >
                &ldquo;The symptom tells you the diagnosis. You just need to
                know where to look.&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.575rem",
                  color: "var(--color-muted-2)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                PlantProblem
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
