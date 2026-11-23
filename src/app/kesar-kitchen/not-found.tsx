import type { Metadata } from "next";
import Link from "next/link";
import { href } from "@/lib/kesar-kitchen/content";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <p className="big" aria-hidden="true">404</p>
        <h1>This table <em>doesn&apos;t exist</em></h1>
        <p>The page you were looking for has moved or never was. The kitchen, happily, is still open.</p>
        <div className="btn-row">
          <Link className="btn" href={href()}>Back to home</Link>
          <Link className="btn ghost" href={href("/menu")}>See the menu</Link>
          <Link className="btn ghost" href={href("/reserve")}>Reserve a table</Link>
        </div>
      </div>
    </section>
  );
}
