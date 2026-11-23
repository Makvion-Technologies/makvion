import type { Metadata } from "next";
import { href } from "./content";

export const SITE_NAME = "Kesar Kitchen";

const ogImage = { url: href("/opengraph-image.jpg"), width: 1200, height: 630, alt: "Kesar Kitchen, Koregaon Park, Pune", type: "image/jpeg" };

export function pageMeta(title: string, description: string, path = "", absoluteTitle = false): Metadata {
  const url = href(path);
  const social = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url, title: social, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title: social, description, images: [ogImage] },
  };
}
