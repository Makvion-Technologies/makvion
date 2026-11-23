import Link from "next/link";
import { MenuBoard } from "@/components/kesar-kitchen/MenuBoard";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { href } from "@/lib/kesar-kitchen/content";
import { menu } from "@/lib/kesar-kitchen/menu";
import { pageMeta } from "@/lib/kesar-kitchen/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Menu",
  "The full Kesar Kitchen menu: small plates, charcoal tandoor, slow-cooked curries, biryani, desserts and drinks. Veg and non-veg, with prices in rupees.",
  "/menu",
);

const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Kesar Kitchen menu",
  url: `${site.url}${href("/menu")}`,
  hasMenuSection: menu.map((c) => ({
    "@type": "MenuSection",
    name: c.name,
    hasMenuItem: c.items.map((d) => ({ "@type": "MenuItem", name: d.name, description: d.desc, offers: { "@type": "Offer", price: d.price, priceCurrency: "INR" }, ...(d.veg ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}) })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <PageHero image="spices" crumb="Menu" label="Lunch & dinner · Updated November 2026" title={<>The <em>menu</em></>} lead="Everything is cooked to order. Tell us about allergies and we'll adapt the dish. Jain options on request." />
      <MenuBoard />
      <div className="wrap mfoot">
        <p>All prices in ₹ and exclusive of GST. A service charge is never added to your bill. Please tell us about any allergies.</p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: "1.75rem" }}>
          <Link className="btn" href={href("/reserve")}>Reserve a table</Link>
          <Link className="btn ghost" href={href("/order")}>Order online</Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
