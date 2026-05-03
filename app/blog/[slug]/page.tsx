import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import EmailSubscribe from "@/components/EmailSubscribe";
import remarkGfm from "remark-gfm";

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
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
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

      <div className="article-hero">
        <div className="container">
          <Link href="/blog" className="article-hero__back">
            ← Back to all articles
          </Link>

          <div className="article-hero__tags">
            {meta.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
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
      </div>

      <div className="container">
        <div className="article-layout">
          <div>
            <div className="prose">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            <div style={{ marginTop: "4rem" }}>
              <EmailSubscribe />
            </div>
          </div>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__title">Quick diagnosis</p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.6,
                }}
              >
                Scroll to the table at the top of the article. Match your
                symptom to find the most likely cause.
              </p>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__title">More on this plant</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {meta.tags.slice(0, 1).map((tag) => (
                  <Link key={tag} href={`/blog?q=${tag}`} className="toc-link">
                    All {tag} articles →
                  </Link>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "var(--color-accent-mist)",
                border: "1px solid rgba(45,90,61,0.12)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                }}
              >
                &ldquo;The symptom tells you the diagnosis. You just need to
                know where to look.&rdquo;
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-muted-2)" }}>
                PlantProblem
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
