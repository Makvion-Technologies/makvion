import Image from "next/image";
import Link from "next/link";
import { href, img } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import type { Product } from "@/lib/indigo-loom/products";

export function ProductCard({ p, wide = false, sizes, preload = false }: { p: Product; wide?: boolean; sizes?: string; preload?: boolean }) {
  const soldAll = p.sizes.every((s) => p.soldOut?.includes(s));
  return (
    <article className={`card${wide ? " wide" : ""}`}>
      <Link href={href(`/products/${p.slug}`)} className="cl">
        <div className="ph">
          <Image src={img(p.image)} alt={`${p.name}, ${p.colour.toLowerCase()} ${p.type.toLowerCase().replace(/s$/, "")}`} fill sizes={sizes ?? (wide ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 50vw, 25vw")} className="fill" style={p.focus ? { objectPosition: p.focus } : undefined} preload={preload} />
          <Image src={img(p.gallery[1])} alt="" fill sizes={wide ? "50vw" : "25vw"} className="fill alt" aria-hidden="true" />
          {p.tag && <span className="tag">{p.tag}</span>}
          {soldAll && <span className="tag r">Sold out</span>}
        </div>
        <div className="info">
          <div>
            <h3>{p.name}</h3>
            <p>{p.craft} · {p.cluster}</p>
          </div>
          <div className="pr">{p.mrp && <s><span className="sr-only">Was </span>{rupees(p.mrp)}</s>}{p.mrp && <span className="sr-only">, now </span>}{rupees(p.price)}</div>
        </div>
      </Link>
    </article>
  );
}
