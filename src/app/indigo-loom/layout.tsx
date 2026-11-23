import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Mono, Instrument_Sans } from "next/font/google";
import "./styles.css";
import { BagDrawer } from "@/components/indigo-loom/BagDrawer";
import { SiteFooter } from "@/components/indigo-loom/SiteFooter";
import { SiteHeader } from "@/components/indigo-loom/SiteHeader";
import { href, img, info } from "@/lib/indigo-loom/content";
import { SITE_NAME } from "@/lib/indigo-loom/meta";
import { site } from "@/lib/site";

const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-il-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-il-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-il-mono", display: "swap" });

const description = "Handwoven clothing from eleven weaving clusters across India. Kurta sets, co-ords, sarees and shirts in natural fibres. Free shipping, cash on delivery and 7-day easy returns.";

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} | Handwoven clothing, made to last`, template: "%s | Indigo Loom" },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: info.legalName }],
  alternates: { canonical: href() },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url: href(), title: `${SITE_NAME} | Handwoven clothing, made to last`, description },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | Handwoven clothing, made to last`, description },
};

export const viewport: Viewport = { themeColor: "#1E2A57", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE_NAME,
  url: `${site.url}${href()}`,
  image: `${site.url}${img("hero-indigo")}`,
  email: info.email,
  telephone: info.phoneDisplay.replace(/\s/g, "-"),
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Credit card, Debit card, Netbanking, Cash on delivery",
  address: { "@type": "PostalAddress", streetAddress: info.street, addressLocality: `${info.locality}, ${info.city}`, addressRegion: info.region, postalCode: info.postcode, addressCountry: "IN" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" }],
};

export default function IndigoLoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`il ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <SiteHeader />
      <div id="il-content">{children}</div>
      <SiteFooter />
      <BagDrawer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
