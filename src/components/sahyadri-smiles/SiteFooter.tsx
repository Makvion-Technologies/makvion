import Link from "next/link";
import { clinic, href, mapsDirectionsUrl, treatments } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Logo />
            <address>{clinic.addressLines.map((l) => <span key={l}>{l}<br /></span>)}</address>
            <ul>
              <li><a href={clinic.phoneHref}>{clinic.phoneDisplay}</a></li>
              <li><a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
            </ul>
          </div>
          <nav aria-label="Treatments">
            <h2>Treatments</h2>
            <ul>
              {treatments.slice(0, 6).map((t) => <li key={t.slug}><Link href={href(`/treatments/${t.slug}`)}>{t.name}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2>Clinic timings</h2>
            <div className="hours-mini">
              <div><span>Mon – Fri</span><b>9:30 am – 8:30 pm</b></div>
              <div><span>Saturday</span><b>9:30 am – 6:00 pm</b></div>
              <div><span>Sunday</span><b>Emergencies only</b></div>
              <div><span>Lunch break</span><b>1:15 – 2:30 pm</b></div>
            </div>
          </div>
          <div>
            <h2>Find us</h2>
            <a className="fmap" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions to Sahyadri Smiles on Google Maps">
              <svg className="bg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="260" fill="#E9EEF7" /><path d="M-10 190 C80 170 160 180 230 140 S350 70 420 60" stroke="#fff" strokeWidth="18" fill="none" /><path d="M120 -10 L170 280" stroke="#fff" strokeWidth="12" /><path d="M-10 70 L420 110" stroke="#fff" strokeWidth="8" /><path d="M290 -10 L250 280" stroke="#fff" strokeWidth="8" /><rect x="20" y="96" width="80" height="60" rx="8" fill="#DCE4F3" /><rect x="190" y="160" width="50" height="70" rx="8" fill="#DCE4F3" /><circle cx="330" cy="190" r="36" fill="#D6EBDD" /><rect x="300" y="20" width="80" height="34" rx="8" fill="#DCE4F3" />
              </svg>
              <svg className="pin" width="40" height="48" viewBox="0 0 40 48" aria-hidden="true"><path d="M20 47S38 30 38 18A18 18 0 0 0 2 18c0 12 18 29 18 29Z" fill="#2E5BD8" /><circle cx="20" cy="18" r="7" fill="#fff" /></svg>
              <span className="lbl">Get directions <Icon name="arrow" size={14} style={{ display: "inline", verticalAlign: "-2px" }} /></span>
            </a>
          </div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} {clinic.legalName}, Pune</span>
          <nav aria-label="Footer">
            <Link href={href("/about")}>About</Link>
            <Link href={href("/dentists")}>Dentists</Link>
            <Link href={href("/faq")}>FAQ</Link>
            <Link href={href("/contact")}>Contact</Link>
            <a href="https://makvion.com" rel="noopener">Website by Makvion</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
