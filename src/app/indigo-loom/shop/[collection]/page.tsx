import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { ShopGrid } from "@/components/indigo-loom/ShopGrid";
import { href, img } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";
import { collections, type Collection } from "@/lib/indigo-loom/products";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  const c = collections[collection as Collection];
  return c ? pageMeta(`${c.title}'s collection`.replace("Sarees's collection", "Handwoven sarees"), c.blurb, `/shop/${collection}`) : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const c = collections[collection as Collection];
  if (!c) notFound();
  return (
    <>
      <PageHead kicker="Collection" title={c.title} italic={c.italic} intro={c.blurb} crumbs={[{ label: "Shop", href: href("/shop") }, { label: c.title }]} />
      <div className="wrap">
        <div className="col-banner"><Image src={img(c.image)} alt="" fill sizes="100vw" className="fill" preload /></div>
        <Suspense fallback={<p className="muted loading">Loading the collection…</p>}>
          <ShopGrid collection={collection as Collection} />
        </Suspense>
      </div>
    </>
  );
}
