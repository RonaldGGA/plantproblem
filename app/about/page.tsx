import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About PlantProblem — who we are and why we write about houseplants.",
};

export default function AboutPage() {
  return (
    <div className="container">
      <div className="about-hero">
        <p className="about-hero__label animate-fade-up animate-fade-up-1">
          <span
            style={{
              width: 24,
              height: 1,
              background: "var(--color-accent)",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
          About
        </p>

        <h1 className="about-hero__title animate-fade-up animate-fade-up-2">
          We write about
          <br />
          <span
            style={{
              fontStyle: "italic",
              color: "var(--color-accent)",
            }}
          >
            the difference.
          </span>
        </h1>
      </div>

      <div className="about-divider" />

      <div className="about-prose animate-fade-up animate-fade-up-3">
        <p>
          Most houseplant advice tells you to &quot;check your watering
          schedule.&quot; That&apos;s not an answer. It&apos;s a suggestion to
          keep guessing.
        </p>

        <p>
          PlantProblem exists because plants give you specific signals and those
          signals have specific meanings. A brown tip at the edge of a leaf
          means something different from a brown spot in the center. Yellow
          leaves on the bottom mean something different from yellow leaves at
          the top.
        </p>

        <p>
          Every article here starts with a diagnosis table. Every fix is
          something you can do today. No filler, no vague advice, no paragraph
          telling you that plants need water and sunlight.
        </p>

        <div className="about-divider" />

        <p>
          The approach is simple: read the symptom, find the cause, fix it. We
          do the research so you can skip straight to the answer.
        </p>
      </div>

      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "5rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 500,
              marginBottom: "0.25rem",
            }}
          >
            Got a question about your plant?
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)" }}>
            Browse the full article library.
          </p>
        </div>
        <Link href="/blog" className="btn-primary">
          See all articles →
        </Link>
      </div>
    </div>
  );
}
