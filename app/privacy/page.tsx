import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for PlantProblem.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p>
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2>Information We Collect</h2>
        <p>
          PlantProblem uses Google AdSense to display advertisements. Google may
          use cookies to serve ads based on your visits to this and other
          websites.
        </p>
        <h2>Cookies</h2>
        <p>
          We use cookies through Google AdSense and Google Analytics to improve
          your experience and analyze site traffic. You can opt out of
          personalized advertising by visiting Google&apos;s Ads Settings.
        </p>
        <h2>Contact</h2>
        <p>
          For any privacy questions, contact us at: plant.problemweb@gmail.com
        </p>
      </div>
    </div>
  );
}
