import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { href } from "@/lib/sahyadri-smiles/content";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <p className="big" aria-hidden="true">404</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.5vw, 2.5rem)", marginTop: "1rem" }}>We couldn&apos;t find that page.</h1>
        <p className="lead" style={{ marginInline: "auto", marginTop: "1rem" }}>It may have moved. Here are a few places to go instead.</p>
        <div className="actions">
          <Link className="btn btn-primary" href={href()}><Icon name="tooth" />Go to home</Link>
          <Link className="btn btn-soft" href={href("/treatments")}>See treatments</Link>
          <Link className="btn btn-soft" href={href("/book")}>Book appointment</Link>
        </div>
      </div>
    </section>
  );
}
