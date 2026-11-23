import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { TreatmentCard } from "@/components/sahyadri-smiles/Cards";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { href, treatments, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Dental treatments in Baner, Pune",
  "Check-ups, tooth-coloured fillings, single-sitting root canals, braces and clear aligners, implants, kids' dentistry and teeth whitening at Sahyadri Smiles, Baner.",
  "/treatments",
);

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Treatments" }]}
        eyebrow="Treatments"
        title="Gentle care for every smile in the family."
        lead="From a six-monthly clean to replacing a missing tooth, every treatment starts with a conversation and a written plan. Here is what we do, and what to expect."
      >
        <Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book appointment</Link>
        <a className="btn btn-wa" href={whatsappLink("Hi, I have a question about a treatment.")} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Ask a question</a>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="tgrid ss-reveal">{treatments.map((t) => <TreatmentCard key={t.slug} t={t} />)}</div>
          <div className="note-box ss-reveal" style={{ marginTop: "2rem", maxWidth: "46rem" }}>
            <Icon name="info" size={18} />
            <span>Not sure what you need? Book a check-up. We&apos;ll look, explain what we see, and give you a written plan with costs. You decide what happens next.</span>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
