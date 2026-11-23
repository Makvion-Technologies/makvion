import { Suspense } from "react";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { ShopGrid } from "@/components/indigo-loom/ShopGrid";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = pageMeta("Shop all", "Shop handwoven kurta sets, co-ords, dresses, sarees, shirts and kurtas in cotton, khadi, chanderi, linen and silk-cotton. Filter by size, fabric and price.", "/shop");

export default function ShopPage() {
  return (
    <>
      <PageHead kicker="The Winter Edit" title="Shop" italic="everything" intro="Small batches from eleven clusters. Every piece names the town it was made in." crumbs={[{ label: "Shop" }]} />
      <div className="wrap">
        <Suspense fallback={<p className="muted loading">Loading the collection…</p>}>
          <ShopGrid />
        </Suspense>
      </div>
    </>
  );
}
