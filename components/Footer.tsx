import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          <span className="footer__brand">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-accent)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            PlantProblem
          </span>
          <p className="footer__copy">
            © {new Date().getFullYear()} PlantProblem · Practical advice for
            happy plants.
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--color-muted-2)",
              maxWidth: "340px",
              lineHeight: 1.6,
            }}
          >
            Some links are affiliate links. If you purchase through them, we may
            earn a small commission at no extra cost to you.
          </p>
        </div>

        <ul className="footer__links">
          <li>
            <Link href="/blog">All articles</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
