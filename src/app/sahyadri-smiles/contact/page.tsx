import Link from "next/link";
import { HoursTable } from "@/components/sahyadri-smiles/HoursTable";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { OpenStatus } from "@/components/sahyadri-smiles/OpenStatus";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { clinic, href, mapsDirectionsUrl, mapsEmbedUrl, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Visit us in Baner, Pune",
  "Find Sahyadri Smiles Dental Clinic on Baner Road, near Mahabaleshwar Hotel, Pune 411045. Opening hours, directions, parking, phone and WhatsApp.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Visit us" }]} eyebrow="Visit us" title="Come and say hello in Baner." lead="Two minutes off Baner Road, with easy parking and a lift to the second floor. Walk-ins welcome for emergencies, but a quick call first helps us fit you in faster." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact-grid ss-reveal">
            <div className="c-card">
              <span className="ic"><Icon name="phone" size={22} /></span>
              <h2>Call the front desk</h2>
              <a className="big" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              <p>For bookings, changes and emergencies.</p>
            </div>
            <div className="c-card wa">
              <span className="ic"><Icon name="whatsapp" size={22} /></span>
              <h2>WhatsApp</h2>
              <a className="big" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{clinic.whatsappDisplay}</a>
              <p>We usually reply within 10 minutes.</p>
            </div>
            <div className="c-card">
              <span className="ic"><Icon name="mail" size={22} /></span>
              <h2>Email</h2>
              <a className="big email" href={`mailto:${clinic.email}`}>{clinic.email.split("@")[0]}@<wbr />{clinic.email.split("@")[1]}</a>
              <p>For reports, insurance and invoices.</p>
            </div>
            <div className="c-card">
              <span className="ic"><Icon name="pin" size={22} /></span>
              <h2>Address</h2>
              <address>{clinic.addressLines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}</address>
              <a className="link-arrow" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions <Icon name="right" size={18} /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="map-title">
        <div className="wrap visit-grid">
          <div className="map-frame ss-reveal">
            <iframe src={mapsEmbedUrl} title="Map showing Sahyadri Smiles Dental Clinic on Baner Road, Pune" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="panel ss-reveal">
            <h2 id="map-title" style={{ fontSize: "1.625rem", marginBottom: ".5rem" }}>Opening hours</h2>
            <p className="muted" style={{ marginBottom: "1rem" }}><OpenStatus /></p>
            <HoursTable />
            <h3 style={{ fontSize: "1.25rem", margin: "1.75rem 0 1rem" }}>Getting here</h3>
            <ul className="ways">
              <li><span className="ic"><Icon name="car" size={20} /></span><span><b>Parking</b><span>Free basement parking at Shreeji Arcade. Tell the guard you&apos;re visiting the clinic.</span></span></li>
              <li><span className="ic"><Icon name="pin" size={20} /></span><span><b>Landmark</b><span>Opposite side of Baner Road from Mahabaleshwar Hotel, above the pharmacy.</span></span></li>
              <li><span className="ic"><Icon name="wheelchair" size={20} /></span><span><b>Step-free access</b><span>Ramp at the entrance and a lift to the 2nd floor.</span></span></li>
            </ul>
            <div className="hero-ctas" style={{ margin: "1.75rem 0 0" }}>
              <Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book appointment</Link>
              <a className="btn btn-soft" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18} />Directions</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
