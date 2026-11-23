import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { FaqList } from "@/components/sahyadri-smiles/FaqList";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { clinic, faqs, href, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Frequently asked questions",
  "Answers to common questions about visiting Sahyadri Smiles in Baner: comfort and safety, costs, insurance, EMI and children's dentistry.",
  "/faq",
);

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "FAQ" }]} eyebrow="Good to know" title="Questions we hear every day." lead="Straight answers about visits, comfort, costs and children. Still unsure? Just ask us.">
        <a className="btn btn-wa" href={whatsappLink("Hi, I have a question.")} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Ask on WhatsApp</a>
        <a className="btn btn-soft" href={clinic.phoneHref}><Icon name="phone" size={18} />{clinic.phoneDisplay}</a>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap wrap-narrow" style={{ marginInline: "auto" }}>
          {faqs.map((g) => (
            <div className="faq-group ss-reveal" key={g.group}>
              <h2>{g.group}</h2>
              <FaqList items={g.items} />
            </div>
          ))}
          <p style={{ marginTop: "2.5rem" }}><Link className="link-arrow" href={href("/contact")}>Opening hours and directions <Icon name="right" size={18} /></Link></p>
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
