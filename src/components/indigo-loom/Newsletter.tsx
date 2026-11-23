"use client";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <section className="news" aria-labelledby="il-news-h">
      <div>
        <span className="mono dim">The Loom Letter</span>
        <h2 id="il-news-h">New weaves, first. <i>Once a month,</i> never more.</h2>
      </div>
      <div>
        {state === "done" ? (
          <p className="ok" role="status">You&apos;re on the list. Your code <b>LOOM10</b> for 10% off your first order is on its way to {email}.</p>
        ) : (
          <form noValidate onSubmit={(e) => { e.preventDefault(); setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "done" : "error"); }}>
            <label htmlFor="il-news" className="sr-only">Email address</label>
            <input id="il-news" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="Your email address" aria-invalid={state === "error"} aria-describedby={state === "error" ? "il-news-err" : "il-news-hint"} />
            <button className="ulink" type="submit">Subscribe</button>
          </form>
        )}
        {state === "error" ? <p className="err" id="il-news-err" role="alert">Please enter a valid email address.</p> : state === "idle" && <small id="il-news-hint">Early access to small-batch drops, stories from the clusters and 10% off your first order. Unsubscribe anytime.</small>}
      </div>
    </section>
  );
}
