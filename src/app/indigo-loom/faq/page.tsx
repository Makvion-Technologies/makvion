import Link from "next/link";
import { FaqList } from "@/components/indigo-loom/FaqList";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { faqs, href, whatsappLink } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = pageMeta("FAQ", "Answers about payment, cash on delivery, shipping times, returns, sizing and caring for handwoven, naturally dyed cloth.", "/faq");

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");

export default function Faq() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <PageHead kicker="Help" title="Questions," italic="answered" intro="Can't find what you need? We're on WhatsApp, Monday to Saturday." crumbs={[{ label: "FAQ" }]} />
      <div className="wrap prose-grid">
        <nav className="toc" aria-label="Topics">
          <p className="mono dim">Topics</p>
          {faqs.map((g) => <a key={g.group} href={`#${slug(g.group)}`}>{g.group}</a>)}
        </nav>
        <div>
          {faqs.map((g) => (
            <section key={g.group} id={slug(g.group)} className="faq-group">
              <h2>{g.group}</h2>
              <FaqList items={g.items} />
            </section>
          ))}
          <div className="note">
            <p>Still have a question?</p>
            <div className="btn-row"><a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a><Link className="btn line" href={href("/contact")}>Contact us</Link></div>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
