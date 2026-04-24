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
          Most houseplant advice online tells you to &quot;check your watering
          schedule&quot; and leaves it there. That&apos;s not an answer.
          That&apos;s a suggestion to keep guessing.
        </p>
        <p>
          PlantProblem exists because plants give you specific signals and those
          signals have specific meanings. A brown tip at the edge of a leaf
          means something different from a brown spot in the center. Yellow
          leaves on the bottom mean something different from yellow leaves at
          the top. We write about the difference.
        </p>
        <p>
          Every article starts with a diagnosis table. Every fix is something
          you can do today. No filler, no vague advice, no paragraph telling you
          that plants need water and sunlight.
        </p>
      </div>
    </div>
  );
}
