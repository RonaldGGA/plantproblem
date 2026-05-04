"use client";

import { useState } from "react";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setState("success");
      setEmail("");
    } else {
      setState("error");
    }
  }

  return (
    <div className="email-subscribe">
      {/* Left — dark editorial panel */}
      <div className="email-subscribe__left">
        <p className="email-subscribe__eyebrow">{"// Newsletter"}</p>
        <h3 className="email-subscribe__title">
          New plant problem? <em>We&apos;ll email you the fix.</em>
        </h3>
        <p className="email-subscribe__sub">
          No spam. One email when we publish something useful.
        </p>
      </div>

      {/* Right — form panel */}
      <div className="email-subscribe__right">
        {state === "success" ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "var(--color-accent)",
              }}
            >
              You&apos;re in.
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
              Check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <div className="email-subscribe__form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-subscribe__input"
              disabled={state === "loading"}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSubmit(e as unknown as React.FormEvent);
              }}
            />
            <button
              onClick={handleSubmit}
              className="email-subscribe__btn"
              disabled={state === "loading"}
            >
              {state === "loading" ? "Subscribing…" : "Subscribe →"}
            </button>
            {state === "error" && (
              <p style={{ fontSize: "0.72rem", color: "var(--color-muted-2)" }}>
                Something went wrong. Try again.
              </p>
            )}
            <p className="email-subscribe__note">
              No spam. Unsubscribe any time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
