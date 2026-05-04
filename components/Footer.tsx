import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__brand">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "2px",
                background: "var(--color-accent)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            PlantProblem
          </span>
          <span
            style={{
              width: 1,
              height: 12,
              background: "var(--color-border)",
              display: "inline-block",
            }}
          />
          <p className="footer__copy">© {year} · Vol. I</p>
        </div>

        <ul className="footer__links">
          <li>
            <Link href="/blog">Articles</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li style={{ color: "var(--color-muted-2)", fontSize: "0.65rem" }}>
            Some links are affiliate links.
          </li>
        </ul>
      </div>
    </footer>
  );
}
