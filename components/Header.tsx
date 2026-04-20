import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-logo">
          🌿 PlantProblem
        </Link>
        <nav className="site-nav">
          <Link href="/blog">All Posts</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
