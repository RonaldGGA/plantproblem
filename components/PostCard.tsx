import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card-link">
      <article className="post-card">
        <div className="post-card__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__desc">{post.description}</p>
        <div className="post-card__meta">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <span className="post-card__read">Read article →</span>
      </article>
    </Link>
  );
}
