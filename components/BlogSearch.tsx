"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

const ALL_TAG = "All";

export default function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;

    const decoded = decodeURIComponent(q).toLowerCase();

    const matchingTag = posts
      .flatMap((p) => p.tags)
      .find((t) => t.toLowerCase() === decoded);

    if (matchingTag) {
      const setActiveTagChange = () => {
        setActiveTag(matchingTag);
      };
      setActiveTagChange();
    } else {
      const setQueryChange = () => {
        setQuery(decoded);
      };
      setQueryChange();
    }
  }, [searchParams, posts]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return [ALL_TAG, ...Array.from(tags).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((post) => {
      const matchesTag = activeTag === ALL_TAG || post.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);
  return (
    <>
      <div
        style={{
          position: "relative",
          maxWidth: "480px",
          marginBottom: "1.75rem",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-muted-2)",
            pointerEvents: "none",
          }}
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M10.5 10.5L14 14"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search articles…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.85rem 1rem 0.85rem 2.5rem",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.9rem",
            fontFamily: "var(--font-body)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
        />
      </div>

      {/* Tag filter pills */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: "999px",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "var(--font-body)",
              background:
                activeTag === tag ? "var(--color-accent)" : "transparent",
              color: activeTag === tag ? "white" : "var(--color-muted)",
              borderColor:
                activeTag === tag
                  ? "var(--color-accent)"
                  : "var(--color-border)",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(query || activeTag !== ALL_TAG) && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--color-muted-2)",
            marginBottom: "1.5rem",
          }}
        >
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}{" "}
          found
        </p>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            color: "var(--color-muted)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontStyle: "italic",
              marginBottom: "0.5rem",
            }}
          >
            No articles found.
          </p>
          <p style={{ fontSize: "0.85rem" }}>
            Try a different search term or clear the filter.
          </p>
        </div>
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
