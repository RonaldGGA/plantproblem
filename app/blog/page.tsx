import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "All Posts",
  description:
    "Browse all houseplant care guides and troubleshooting articles.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}
      >
        All Posts
      </h1>
      <p
        style={{
          color: "var(--color-muted)",
          marginBottom: "3rem",
          fontSize: "1rem",
        }}
      >
        {posts.length} articles on houseplant care & troubleshooting
      </p>
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
