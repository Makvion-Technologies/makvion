import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stars } from "@/components/indigo-loom/icons";
import { ProductCard } from "@/components/indigo-loom/ProductCard";
import { ProductView } from "@/components/indigo-loom/ProductView";
import { collections, bySlug, products } from "@/lib/indigo-loom/products";
import { href, img, info, reviews } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  const m = pageMeta(p.name, `${p.short} ${p.craft} from ${p.cluster}, ${p.state}. ₹${p.price.toLocaleString("en-IN")}, free shipping and cash on delivery.`, `/products/${p.slug}`);
  const image = { url: img(p.image), alt: p.name };
  return { ...m, openGraph: { ...m.openGraph, images: [image] }, twitter: { ...m.twitter, images: [image] } };
}

const PDP_REVIEWS: Record<string, { name: string; city: string; text: string }[]> = {};
const extra = [
  { name: "Meera S.", city: "Mumbai", text: "Beautiful finish and the fit is exactly as the size guide says. You can tell it's made by hand, in the best way." },
  { name: "Kavya R.", city: "Pune", text: "Came in a cloth bag with a note about the maker. Washed it twice already, still looks new." },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const c = collections[p.collection];
  const related = products.filter((x) => x.slug !== p.slug && (x.collection === p.collection || x.fabric === p.fabric)).slice(0, 4);
  const revs = PDP_REVIEWS[p.slug] ?? [...reviews.filter((r) => r.product === p.name).map((r) => ({ name: r.name, city: r.city, text: r.text })), ...extra].slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.gallery.map((g) => `${site.url}${img(g)}`),
    description: p.description,
    sku: `IL-${p.slug.toUpperCase()}`,
    brand: { "@type": "Brand", name: info.name },
    material: p.fabric,
    color: p.colour,
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: p.sizes.every((s) => p.soldOut?.includes(s)) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", url: `${site.url}${href(`/products/${p.slug}`)}` },
  };

  return (
    <>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li><Link href={href()}>Home</Link></li>
            <li><Link href={href(`/shop/${p.collection}`)}>{c.title}</Link></li>
            <li><Link href={`${href(`/shop/${p.collection}`)}?type=${encodeURIComponent(p.type)}`}>{p.type}</Link></li>
            <li><span aria-current="page">{p.name}</span></li>
          </ol>
        </nav>
        <ProductView p={p} />
      </div>

      <section className="maker">
        <div className="im"><Image src={img(p.gallery[3])} alt={`Craft detail from ${p.cluster}`} fill sizes="(max-width: 900px) 100vw, 50vw" className="fill" /></div>
        <div className="tx">
          <p className="mono">The maker</p>
          <h2>{p.maker.name.split(" ")[0]} <i>{p.maker.name.split(" ").slice(1).join(" ") || "of " + p.cluster}</i></h2>
          <p className="role mono">{p.maker.role}</p>
          <p>{p.maker.note}</p>
          <Link className="ulink" href={href("/craft#clusters")}>Meet our clusters</Link>
        </div>
      </section>

      <section className="wrap sec-sm" id="reviews" aria-labelledby="il-rev-h">
        <div className="rsum">
          <div>
            <h2 id="il-rev-h" className="h3">Reviews</h2>
            <p className="big-rating serif">{p.rating.toFixed(1)}</p>
            <Stars rating={p.rating} count={p.reviews} />
            <p className="muted small">From verified orders</p>
          </div>
          <ul className="rlist">
            {revs.map((r) => (
              <li key={r.name} className="r">
                <div><b>{r.name}</b><span className="muted small">{r.city} · Verified buyer</span></div>
                <div><span className="s" role="img" aria-label="5 out of 5 stars">★★★★★</span><p>{r.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap sec-sm more" aria-labelledby="il-rel-h">
        <h2 id="il-rel-h" className="h3">You may also <i>like</i></h2>
        <div className="pgrid four">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
