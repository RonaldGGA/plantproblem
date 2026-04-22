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
      <p className="email-subscribe__eyebrow">Stay updated</p>
      <h3 className="email-subscribe__title">
        New plant problem? We&apos;ll email you the fix.
      </h3>
      <p className="email-subscribe__desc">
        No spam. Just one email when we publish something useful.
      </p>

      {state === "success" ? (
        <p className="email-subscribe__success">
          ✓ You&apos;re in. Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="email-subscribe__form">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-subscribe__input"
            disabled={state === "loading"}
          />
          <button
            type="submit"
            className="email-subscribe__btn"
            disabled={state === "loading"}
          >
            {state === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p className="email-subscribe__error">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
