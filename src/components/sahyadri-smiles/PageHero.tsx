import Link from "next/link";
import type { ReactNode } from "react";
import { href } from "@/lib/sahyadri-smiles/content";

export function Crumbs({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        <li><Link href={href()}>Home</Link></li>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.path && i < items.length - 1 ? <Link href={href(c.path)}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, eyebrow, title, lead, children }: { crumbs: { label: string; path?: string }[]; eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <Crumbs items={crumbs} />
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children && <div className="actions">{children}</div>}
      </div>
    </section>
  );
}
