import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./styles.css";
import { SiteHeader } from "@/components/sahyadri-smiles/SiteHeader";
import { SiteFooter } from "@/components/sahyadri-smiles/SiteFooter";
import { MobileBar } from "@/components/sahyadri-smiles/MobileBar";
import { RevealInit } from "@/components/sahyadri-smiles/RevealInit";
import { clinic, dentists, hours, href, img } from "@/lib/sahyadri-smiles/content";
import { SITE_NAME } from "@/lib/sahyadri-smiles/meta";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-ss-display", display: "swap", weight: ["500", "600", "700"] });
const sans = Figtree({ subsets: ["latin"], variable: "--font-ss-sans", display: "swap", weight: ["400", "500", "600", "700"] });

const description = "Gentle family dental clinic on Baner Road, Pune. Check-ups, fillings, root canals, braces, implants, whitening and kids' dentistry. Evening slots till 8:30 pm. Book online in two taps.";

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} | Gentle family dentistry in Baner, Pune`, template: "%s | Sahyadri Smiles, Baner" },
  description,
  applicationName: "Sahyadri Smiles",
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: href() },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url: href(), title: `${SITE_NAME} | Baner, Pune`, description },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | Baner, Pune`, description },
};

export const viewport: Viewport = { themeColor: "#f6f8fc" };

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: SITE_NAME,
  url: `${site.url}${href()}`,
  image: `${site.url}${img("hero")}`,
  telephone: clinic.phoneIntl,
  email: clinic.email,
  priceRange: "₹₹",
  address: { "@type": "PostalAddress", streetAddress: clinic.street, addressLocality: `${clinic.locality}, ${clinic.city}`, addressRegion: clinic.region, postalCode: clinic.postcode, addressCountry: "IN" },
  openingHoursSpecification: hours.filter((h) => h.open !== undefined).map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY[h.day], opens: hhmm(h.open!), closes: hhmm(h.close!) })),
  employee: dentists.map((d) => ({ "@type": "Person", name: d.name, jobTitle: d.role })),
};

export default function SahyadriSmilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ss ${display.variable} ${sans.variable}`}>
      <SiteHeader />
      <div id="ss-content">{children}</div>
      <SiteFooter />
      <MobileBar />
      <RevealInit />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
