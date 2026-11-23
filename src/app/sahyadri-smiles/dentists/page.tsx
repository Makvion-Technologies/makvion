import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { DentistCard } from "@/components/sahyadri-smiles/Cards";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { dentists, href } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Our dentists",
  "Meet the dentists at Sahyadri Smiles, Baner: specialists in prosthodontics, orthodontics, children's dentistry and root canal treatment.",
  "/dentists",
);

export default function DentistsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Dentists" }]}
        eyebrow="Our dentists"
        title="Specialists who take their time with you."
        lead="Four dentists, each with a master's degree in their speciality. You'll see the same familiar face from your first visit to your final check."
      >
        <Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book with our team</Link>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="team ss-reveal">{dentists.map((d) => <DentistCard key={d.name} d={d} />)}</div>
          <div className="note-box ss-reveal" style={{ marginTop: "2rem", maxWidth: "46rem" }}>
            <Icon name="info" size={18} />
            <span>Prefer a particular dentist? Mention it in the notes when you book, and we&apos;ll match your slot to their days.</span>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
