import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-logo">
          <Image
            src="/icon.svg"
            alt="PlantProblem Logo"
            width={32}
            height={32}
            style={{ height: "auto", width: "auto" }}
          />
          PlantProblem
        </Link>
        <nav className="site-nav">
          <Link href="/blog">All Posts</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
