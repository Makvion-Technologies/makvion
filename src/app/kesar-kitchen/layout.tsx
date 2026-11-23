import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./styles.css";
import { MobileBar } from "@/components/kesar-kitchen/MobileBar";
import { RevealInit } from "@/components/kesar-kitchen/RevealInit";
import { SiteFooter } from "@/components/kesar-kitchen/SiteFooter";
import { SiteHeader } from "@/components/kesar-kitchen/SiteHeader";
import { hours, href, img, info } from "@/lib/kesar-kitchen/content";
import { SITE_NAME } from "@/lib/kesar-kitchen/meta";
import { site } from "@/lib/site";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-kk-serif", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-kk-sans", display: "swap" });

const description = "Slow-cooked Indian classics, a charcoal tandoor and warm rooms in Koregaon Park, Pune. Open every day till late. Reserve a table, see the menu or order online.";

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} | Slow-cooked Indian classics in Koregaon Park, Pune`, template: "%s | Kesar Kitchen, Koregaon Park" },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: info.legalName }],
  alternates: { canonical: href() },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url: href(), title: `${SITE_NAME} | Koregaon Park, Pune`, description },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | Koregaon Park, Pune`, description },
};

export const viewport: Viewport = { themeColor: "#0e0a07", colorScheme: "dark" };

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor((m % 1440) / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE_NAME,
  url: `${site.url}${href()}`,
  image: `${site.url}${img("hero-butter-chicken")}`,
  telephone: info.phoneIntl,
  email: info.email,
  servesCuisine: ["North Indian", "Maharashtrian", "Mughlai"],
  priceRange: "₹₹₹",
  acceptsReservations: true,
  menu: `${site.url}${href("/menu")}`,
  address: { "@type": "PostalAddress", streetAddress: info.street, addressLocality: `${info.locality}, ${info.city}`, addressRegion: info.region, postalCode: info.postcode, addressCountry: "IN" },
  openingHoursSpecification: hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY[h.day], opens: hhmm(h.open), closes: hhmm(h.close) })),
};

export default function KesarKitchenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`kk ${serif.variable} ${sans.variable}`}>
      <SiteHeader />
      <div id="kk-content">{children}</div>
      <SiteFooter />
      <MobileBar />
      <RevealInit />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
