import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { href, img } from "@/lib/kesar-kitchen/content";

export function PageHero({ label, title, lead, image, crumb, children, plain = false }: { label: string; title: ReactNode; lead?: ReactNode; image?: string; crumb: string; children?: ReactNode; plain?: boolean }) {
  return (
    <header className={`phero${plain ? " plain" : ""}`}>
      {image && <div className="bg"><Image src={img(image)} alt="" fill preload sizes="100vw" className="fill" /></div>}
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs"><ol><li><Link href={href()}>Home</Link></li><li aria-current="page">{crumb}</li></ol></nav>
        <span className="label">{label}</span>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
        {children && <div className="btn-row" style={{ marginTop: "1.75rem" }}>{children}</div>}
      </div>
    </header>
  );
}
