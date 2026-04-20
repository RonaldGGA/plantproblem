import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

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
      </div>
    </>
  );
}
