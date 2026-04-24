"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "0.85rem 1.1rem",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          fontSize: "0.95rem",
          fontFamily: "var(--font-body)",
          background: "var(--color-surface)",
          color: "var(--color-text)",
          outline: "none",
          marginBottom: "3rem",
          display: "block",
        }}
      />

      {filtered.length === 0 ? (
        <p style={{ color: "var(--color-muted)", fontSize: "0.95rem" }}>
          No articles found for &quot;{query}&quot;.
        </p>
      ) : (
        <div className="posts-grid">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
