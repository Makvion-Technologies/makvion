import type { Metadata } from "next";
import { href } from "./content";

export const SITE_NAME = "Sahyadri Smiles Dental Clinic";

/** Per-page metadata with its own canonical URL, Open Graph and Twitter card. */
const ogImage = { url: href("/opengraph-image.jpg"), width: 1200, height: 630, alt: "Sahyadri Smiles Dental Clinic, Baner, Pune", type: "image/jpeg" };

export function pageMeta(title: string, description: string, path = "", absoluteTitle = false): Metadata {
  const url = href(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
