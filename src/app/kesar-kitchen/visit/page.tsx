import Link from "next/link";
import { FaqList } from "@/components/kesar-kitchen/FaqList";
import { HoursList } from "@/components/kesar-kitchen/HoursList";
import { Icon } from "@/components/kesar-kitchen/icons";
import { OpenStatus } from "@/components/kesar-kitchen/OpenStatus";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { faqs, hoursSummary, href, info, mapsDirectionsUrl, mapsEmbedUrl, whatsappLink } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  "Visit us in Koregaon Park",
  "Find Kesar Kitchen on Lane 6, North Main Road, Koregaon Park, Pune 411001. Opening hours, directions, valet parking, phone and WhatsApp.",
  "/visit",
);

export default function VisitPage() {
  return (
    <>
      <PageHero image="room-dining" crumb="Visit" label="Visit us" title={<>Lane 6, <em>Koregaon Park</em></>} lead="Open every day from 12 noon until late. Walk-ins welcome at the bar.">
        <a className="btn" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18} />Get directions</a>
        <Link className="btn ghost" href={href("/reserve")}>Reserve a table</Link>
      </PageHero>
      <section className="section" aria-labelledby="map-h">
        <div className="wrap visit">
          <div>
            <span className="label">Hours</span>
            <h2 id="map-h">Open <em>every day</em></h2>
            <OpenStatus />
            <HoursList />
            <p className="muted" style={{ marginTop: "1rem", fontSize: ".9375rem" }}>{hoursSummary[3].label}: {hoursSummary[3].value}.</p>
          </div>
          <div>
            <span className="label">Address</span>
            <h3>Find us</h3>
            <address className="addr">
              {info.addressLines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
              <span className="m">Opposite the lane&apos;s old banyan tree, two minutes from North Main Road.</span>
              <span className="m" style={{ color: "var(--kk-cream)" }}>
                <a href={info.phoneHref}>{info.phoneDisplay}</a><br />
                <a href={whatsappLink("Hi Kesar Kitchen, I have a question.")} target="_blank" rel="noopener noreferrer">WhatsApp {info.whatsappDisplay}</a><br />
                <a href={`mailto:${info.email}`}>{info.email}</a>
              </span>
            </address>
          </div>
          <div className="map tall"><iframe src={mapsEmbedUrl} title="Map showing Kesar Kitchen on North Main Road, Koregaon Park, Pune" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
        </div>
      </section>
      <section className="section bg2" aria-labelledby="gh-h">
        <div className="wrap two-col">
          <div>
            <span className="label">Getting here</span>
            <h2 className="h2" id="gh-h">Parking &amp; <em>directions</em></h2>
            <ul className="ev-list">
              <li><Icon name="car" size={18} /><span><b>Valet parking</b>From 7 pm every evening, at the restaurant door.</span></li>
              <li><Icon name="pin" size={18} /><span><b>By cab or auto</b>Ask for &ldquo;Lane 6, North Main Road, Koregaon Park&rdquo;. Ten minutes from Pune Station.</span></li>
              <li><Icon name="users" size={18} /><span><b>Step-free</b>The Main Room and restrooms are on the ground floor.</span></li>
            </ul>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  );
}
