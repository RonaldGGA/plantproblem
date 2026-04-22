import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="site-footer__logo">
          <Image
            src="/icon.svg"
            alt="PlantProblem Logo"
            width={32}
            height={32}
            style={{ height: "auto", width: "auto" }}
          />
          <p>PlantProblem</p>
        </span>
        <nav className="site-footer__nav">
          <Link href="/blog">All Posts</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} PlantProblem · Practical advice for happy
          plants.
        </p>
      </div>
    </footer>
  );
}
