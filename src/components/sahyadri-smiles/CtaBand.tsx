import Link from "next/link";
import { clinic, href, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";

export function CtaBand() {
  return (
    <section className="section-sm">
      <div className="wrap">
        <div className="band ss-reveal">
          <div>
            <h2 className="h2">Tooth pain can&apos;t wait. Neither should you.</h2>
            <p>We keep same-day slots free for emergencies every day we&apos;re open. Call, message or book, whichever is easiest.</p>
          </div>
          <div className="band-actions">
            <Link href={href("/book")}><span className="ic" style={{ background: "#e8eefc", color: "#2e5bd8" }}><Icon name="cal" /></span><span><b>Book online</b><span>Choose a time in under a minute</span></span><Icon name="right" size={18} /></Link>
            <a href={whatsappLink("Hi, I have tooth pain and need an appointment today.")} target="_blank" rel="noopener noreferrer"><span className="ic" style={{ background: "#e7f8ee", color: "#127a45" }}><Icon name="whatsapp" /></span><span><b>WhatsApp</b><span>We usually reply in 10 minutes</span></span><Icon name="right" size={18} /></a>
            <a href={clinic.phoneHref}><span className="ic" style={{ background: "#ffede5", color: "#a8431d" }}><Icon name="phone" /></span><span><b>{clinic.phoneDisplay}</b><span>Mon to Fri till 8:30 pm, Sat till 6 pm</span></span><Icon name="right" size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
