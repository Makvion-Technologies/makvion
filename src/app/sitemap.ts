import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { treatments } from "@/lib/sahyadri-smiles/content";
import { collections, products } from "@/lib/indigo-loom/products";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
  // Sahyadri Smiles Dental (client site hosted at /sahyadri-smiles)
  { path: "/sahyadri-smiles", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/book", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/treatments", priority: 0.5, changeFrequency: "monthly" },
  ...treatments.map((t) => ({ path: `/sahyadri-smiles/treatments/${t.slug}`, priority: 0.5, changeFrequency: "monthly" as const })),
  { path: "/sahyadri-smiles/about", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/dentists", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/reviews", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/faq", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sahyadri-smiles/contact", priority: 0.5, changeFrequency: "monthly" },
  // Kesar Kitchen (client site hosted at /kesar-kitchen)
  { path: "/kesar-kitchen", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/menu", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/reserve", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/order", priority: 0.5, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/private-dining", priority: 0.5, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/story", priority: 0.4, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/gallery", priority: 0.4, changeFrequency: "monthly" },
  { path: "/kesar-kitchen/visit", priority: 0.5, changeFrequency: "monthly" },
  // Indigo Loom (client site hosted at /indigo-loom)
  { path: "/indigo-loom", priority: 0.6, changeFrequency: "weekly" },
  { path: "/indigo-loom/shop", priority: 0.6, changeFrequency: "weekly" },
  ...Object.keys(collections).map((c) => ({ path: `/indigo-loom/shop/${c}`, priority: 0.5, changeFrequency: "weekly" as const })),
  ...products.map((p) => ({ path: `/indigo-loom/products/${p.slug}`, priority: 0.5, changeFrequency: "weekly" as const })),
  { path: "/indigo-loom/craft", priority: 0.4, changeFrequency: "monthly" },
  { path: "/indigo-loom/journal", priority: 0.4, changeFrequency: "monthly" },
  { path: "/indigo-loom/shipping-returns", priority: 0.3, changeFrequency: "monthly" },
  { path: "/indigo-loom/faq", priority: 0.3, changeFrequency: "monthly" },
  { path: "/indigo-loom/contact", priority: 0.4, changeFrequency: "monthly" },
];

// Update when content changes meaningfully.
const lastModified = new Date("2026-10-30");

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: { languages: { "en-IN": `${site.url}${r.path}`, "x-default": `${site.url}${r.path}` } },
  }));
}
