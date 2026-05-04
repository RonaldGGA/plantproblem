import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <Image
            src="/icon.svg"
            alt="PlantProblem Logo"
            width={20}
            height={20}
            style={{ height: "auto", width: "auto" }}
            loading="eager"
            priority
          />
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
