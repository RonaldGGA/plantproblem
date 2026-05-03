import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  index?: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;
  const category = post.tags[0] ?? null;

  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      {num && <div className="post-card__num">{num}</div>}
      <div className="post-card__body">
        {category && <div className="post-card__cat">{category}</div>}
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__desc">{post.description}</p>
      </div>
      <div className="post-card__footer">
        <span className="post-card__meta">
          {post.date} · {post.readingTime}
        </span>
        <span className="post-card__arrow">→</span>
      </div>
    </Link>
  );
}
