import { ContactForm } from "@/components/indigo-loom/ContactForm";
import { Icon } from "@/components/indigo-loom/icons";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { info, mapsDirectionsUrl, mapsEmbedUrl, whatsappLink } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = pageMeta("Contact", "Write to Indigo Loom about an order, sizing or returns, message us on WhatsApp, or visit our studio on Prabhat Road, Pune.", "/contact");

export default function Contact() {
  return (
    <>
      <PageHead kicker="We reply within a day" title="Get in" italic="touch" intro="Questions about an order, sizing or a gift? Write to us, or come and see the cloth at our Pune studio." crumbs={[{ label: "Contact" }]} />
      <div className="wrap contact-grid">
        <section aria-labelledby="ct-h"><h2 id="ct-h" className="h3">Send us a <i>message</i></h2><ContactForm /></section>
        <aside className="contact-side">
          <div className="cbox">
            <p className="mono dim">Quickest</p>
            <a className="btn block" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />WhatsApp {info.whatsappDisplay}</a>
            <ul className="clist">
              <li><Icon name="mail" size={18} /><span>Orders and returns<br /><a href={`mailto:${info.careEmail}`}>{info.careEmail}</a></span></li>
              <li><Icon name="mail" size={18} /><span>Everything else<br /><a href={`mailto:${info.email}`}>{info.email}</a></span></li>
              <li><Icon name="phone" size={18} /><span>Studio phone<br /><a href={info.phoneHref}>{info.phoneDisplay}</a></span></li>
            </ul>
          </div>
          <div className="cbox">
            <p className="mono dim">Studio</p>
            <address><b>{info.addressLines[0]}</b><br />{info.addressLines[1]}</address>
            <p className="muted">{info.studioHours}. Come by to see and try the cloth; call ahead for sarees.</p>
            <div className="map"><iframe src={mapsEmbedUrl} title="Map of the Indigo Loom studio on Prabhat Road, Pune" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <a className="ulink" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
        </aside>
      </div>
    </>
  );
}
