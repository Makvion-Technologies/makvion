import Link from "next/link";
import { deliveryApps, href, info, mapsDirectionsUrl } from "@/lib/kesar-kitchen/content";
import { Brand } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fcols">
          <div>
            <Brand className="brand" />
            <p style={{ marginTop: "1.375rem", maxWidth: "22.5rem" }}>Slow-cooked Indian classics and a charcoal tandoor, in warm rooms that stay open till late.</p>
          </div>
          <div>
            <h2>Visit</h2>
            <address>{info.addressLines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}</address>
            <a href={info.phoneHref}>{info.phoneDisplay}</a>
            <a href={`mailto:${info.email}`}>{info.email}</a>
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href={href("/menu")}>Full menu</Link>
            <Link href={href("/reserve")}>Reservations</Link>
            <Link href={href("/private-dining")}>Private dining</Link>
            <Link href={href("/story")}>Our story</Link>
            <Link href={href("/gallery")}>Gallery</Link>
          </div>
          <div>
            <h2>Order</h2>
            <Link href={href("/order")}>Order online</Link>
            {deliveryApps.map((a) => <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer">{a.name}</a>)}
            <Link href={href("/visit")}>Hours &amp; location</Link>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 {info.legalName}, Pune</span>
          <span>Prices in ₹, exclusive of GST · No service charge</span>
          <a href="https://makvion.com" rel="noopener">Website by Makvion</a>
        </div>
      </div>
    </footer>
  );
}
