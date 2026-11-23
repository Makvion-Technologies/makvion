import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { Stars } from "@/components/sahyadri-smiles/Cards";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { ReviewsBoard } from "@/components/sahyadri-smiles/ReviewsBoard";
import { href } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Patient reviews",
  "What patients from Baner, Aundh, Balewadi and Pashan say about their visits to Sahyadri Smiles Dental Clinic.",
  "/reviews",
);

export default function ReviewsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Reviews" }]} eyebrow="Patient stories" title="Kind words from our chairs." lead="Real experiences shared by patients and parents. We read every one, and we change things when you tell us to." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rating-hero ss-reveal">
            <div><span className="big">4.9</span></div>
            <div><Stars size={20} /><p className="muted" style={{ marginTop: ".375rem" }}>Average rating from 1,200+ Google reviews</p></div>
            <span className="sep" aria-hidden="true" />
            <div><b style={{ fontSize: "1.5rem", fontFamily: "var(--ss-display)" }}>6,000+</b><p className="muted">families looked after since 2016</p></div>
            <span className="sep" aria-hidden="true" />
            <div style={{ marginLeft: "auto" }}><Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book your visit</Link></div>
          </div>
          <ReviewsBoard />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
