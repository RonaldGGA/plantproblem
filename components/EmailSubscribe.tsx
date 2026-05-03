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
      <div className="email-subscribe__left">
        <h3 className="email-subscribe__title">
          New plant problem? We&apos;ll email you the fix.
        </h3>
        <p className="email-subscribe__sub">
          No spam. One email when we publish something useful.
        </p>
      </div>
      <div className="email-subscribe__right">
        {state === "success" ? (
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 1.2rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(255,255,255,0.15)",
              width: "fit-content",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <path
                d="M5 8l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            You&apos;re in. Check your inbox.
          </p>
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
              {state === "loading" ? (
                <span style={{ opacity: 0.7 }}>Subscribing…</span>
              ) : (
                "Subscribe →"
              )}
            </button>
          </div>
        )}

        {state === "error" && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              marginTop: "0.75rem",
            }}
          >
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
