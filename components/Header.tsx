import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-mark">
            <div className="navbar__logo-mark-inner" />
          </div>
          PlantProblem
        </Link>

        <div className="navbar__right">
          <nav>
            <ul className="navbar__links">
              <li>
                <Link href="/blog" className="navbar__link">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="navbar__link">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <span className="navbar__issue">Vol. I — 2026</span>
        </div>
      </div>
    </header>
  );
}
