import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About PlantProblem — who we are and why we write about houseplants.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: "4rem" }}>
      <div className="prose">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.8rem",
            marginBottom: "2rem",
          }}
        >
          About PlantProblem
        </h1>
        <p>
          PlantProblem was created for one simple reason: most houseplant advice
          online is vague, generic, or buried under ads. We write practical,
          specific guides that actually help you figure out what&apos;s wrong,
          and fix it.
        </p>
        <p>
          Every article is researched carefully and written in plain language.
          No fluff, no filler.
        </p>
      </div>
    </div>
  );
}
