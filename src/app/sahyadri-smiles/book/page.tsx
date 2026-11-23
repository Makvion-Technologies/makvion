import { Suspense } from "react";
import { BookingForm } from "@/components/sahyadri-smiles/BookingForm";
import { Crumbs } from "@/components/sahyadri-smiles/PageHero";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Book an appointment",
  "Book a dental appointment at Sahyadri Smiles, Baner in under a minute. Pick a treatment, choose a time and we'll call to confirm.",
  "/book",
);

export default function BookPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="wrap">
        <Crumbs items={[{ label: "Book" }]} />
        <h1 style={{ fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem)" }}>Book your appointment</h1>
        <p className="lead" style={{ marginBottom: "2rem" }}>Three quick steps. We&apos;ll call to confirm within 15 minutes during opening hours.</p>
        <Suspense fallback={<div className="skel-block" aria-hidden="true" />}>
          <BookingForm />
        </Suspense>
      </div>
    </section>
  );
}
