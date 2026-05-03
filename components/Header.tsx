import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <span className="navbar__logo-dot" />
          <Image
            src="/icon.svg"
            alt="PlantProblem Logo"
            width={22}
            height={22}
            style={{ height: "auto", width: "auto" }}
            loading="eager"
            priority
          />
          PlantProblem
        </Link>

        <nav>
          <ul className="navbar__links">
            <li>
              <Link href="/blog" className="navbar__link">
                All articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="navbar__link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
