import type { Metadata } from "next";
import Link from "next/link";
import { href } from "@/lib/indigo-loom/content";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf wrap">
      <p className="big" aria-hidden="true">4<i>0</i>4</p>
      <h1>A loose <i>thread.</i></h1>
      <p>The page you were looking for has moved or is no longer here. The rest of the collection is just where we left it.</p>
      <div className="btn-row center">
        <Link className="btn" href={href("/shop")}>Shop the collection</Link>
        <Link className="btn line" href={href()}>Back to home</Link>
      </div>
    </section>
  );
}
