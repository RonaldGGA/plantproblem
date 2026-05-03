import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import BlogSearch from "@/components/BlogSearch";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all houseplant care guides and troubleshooting articles.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "PlantProblem — All Posts",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
          description:
            "Browse all houseplant care guides and troubleshooting articles.",
          publisher: {
            "@type": "Organization",
            name: "PlantProblem",
            url: process.env.NEXT_PUBLIC_BASE_URL,
          },
        }}
      />

      <div className="blog-header">
        <div className="container">
          <p className="hero__eyebrow animate-fade-up animate-fade-up-1">
            <span className="hero__eyebrow-line" />
            Library
          </p>
          <h1 className="blog-header__title animate-fade-up animate-fade-up-2">
            Every plant problem,
            <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              answered specifically.
            </span>
          </h1>
          <p
            className="blog-header__count animate-fade-up animate-fade-up-3"
            style={{ marginTop: "0.75rem" }}
          >
            {posts.length} articles on houseplant care & troubleshooting
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "5rem" }}>
        <Suspense fallback={<div style={{ height: "200px" }} />}>
          <BlogSearch posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
