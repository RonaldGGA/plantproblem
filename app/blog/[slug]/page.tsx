import JsonLd from "@/components/JsonLd";

import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import EmailSubscribe from "@/components/EmailSubscribe";

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
      <div className="container">
        <header className="article-header">
          <Link href="/blog" className="article-header__back">
            ← Back to all posts
          </Link>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {meta.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="article-header__title">{meta.title}</h1>
          <div className="article-header__meta">
            <span>{meta.date}</span>
            <span>·</span>
            <span>{meta.readingTime}</span>
          </div>
        </header>

        <div className="prose">
          <MDXRemote source={content} />
        </div>
        <div style={{ marginTop: "4rem" }}>
          <EmailSubscribe />
        </div>
      </div>
    </>
  );
}
