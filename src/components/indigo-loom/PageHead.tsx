import Link from "next/link";
import { href } from "@/lib/indigo-loom/content";

export function PageHead({ kicker, title, italic, intro, crumbs = [] }: { kicker: string; title: string; italic?: string; intro?: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <section className="phead">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li><Link href={href()}>Home</Link></li>
            {crumbs.map((c) => <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
          </ol>
        </nav>
        <div className="ph-row">
          <div>
            <p className="mono dim">{kicker}</p>
            <h1>{title}{italic && <> <i>{italic}</i></>}</h1>
          </div>
          {intro && <p className="intro">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
