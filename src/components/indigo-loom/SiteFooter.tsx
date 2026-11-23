import Link from "next/link";
import { href, info } from "@/lib/indigo-loom/content";
import { Newsletter } from "./Newsletter";

const cols = [
  { h: "Shop", links: [["Shop all", "/shop"], ["Women", "/shop/women"], ["Men", "/shop/men"], ["Sarees", "/shop/sarees"], ["New in", "/shop?sort=new"]] },
  { h: "Help", links: [["Your bag", "/bag"], ["Shipping", "/shipping-returns"], ["Returns and exchanges", "/shipping-returns#returns"], ["Size guide", "/faq#fabric-and-care"], ["FAQ", "/faq"]] },
  { h: "About", links: [["The craft", "/craft"], ["Our clusters", "/craft#clusters"], ["Journal", "/journal"], ["Contact", "/contact"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Newsletter />
        <div className="cols">
          <div className="about">
            <p className="h5">Indigo Loom</p>
            <p>Handwoven clothing made with weaving and block-printing families across India. Small batches, natural fibres, made to be worn for years.</p>
            <ul className="pays" aria-label="Payment options">{["UPI", "Visa", "Mastercard", "RuPay", "Netbanking", "COD"].map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <p className="h5">{c.h}</p>
              <ul>{c.links.map(([l, p]) => <li key={l}><Link href={href(p)}>{l}</Link></li>)}</ul>
            </nav>
          ))}
          <div className="contact">
            <p className="h5">Studio</p>
            <address>
              <ul>
                <li>{info.addressLines[0]},<br />{info.addressLines[1]}</li>
                <li>{info.studioHours}</li>
                <li><a href={`mailto:${info.email}`}>{info.email}</a></li>
                <li><a href={`https://wa.me/${info.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp {info.whatsappDisplay}</a></li>
              </ul>
            </address>
          </div>
        </div>
        <p className="bigword" aria-hidden="true">Indigo <i>Loom</i></p>
        <div className="legal">
          <span>© {new Date().getFullYear()} {info.legalName}. Prices include GST. GSTIN {info.gstin}</span>
          <span>Website by <a href="https://makvion.com" target="_blank" rel="noopener">Makvion</a></span>
        </div>
      </div>
    </footer>
  );
}
