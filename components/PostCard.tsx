import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <div className="post-card__accent" />
      <div className="post-card__body">
        <div className="post-card__tags">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__desc">{post.description}</p>
        <div className="post-card__footer">
          <div className="post-card__meta">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <span className="post-card__arrow">→</span>
        </div>
      </div>
    </Link>
  );
}
