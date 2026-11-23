import { Suspense } from "react";
import { FaqList } from "@/components/kesar-kitchen/FaqList";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { ReserveForm } from "@/components/kesar-kitchen/ReserveForm";
import { faqs } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  "Reserve a table",
  "Book a table at Kesar Kitchen, Koregaon Park in under a minute. Choose your party size, date and time, and get instant confirmation with a WhatsApp reminder.",
  "/reserve",
);

export default function ReservePage() {
  return (
    <>
      <PageHero plain crumb="Reserve" label="Reservations" title={<>Book your <em>table</em></>} lead="Three quick steps and you're in. No booking fee, free cancellation up to two hours before." />
      <section className="section" style={{ paddingTop: "clamp(2.5rem, 5vw, 4rem)" }}>
        <div className="wrap">
          <Suspense fallback={<div className="panel" style={{ minHeight: "24rem" }} aria-hidden="true" />}>
            <ReserveForm />
          </Suspense>
        </div>
      </section>
      <section className="section bg2" aria-labelledby="rfaq">
        <div className="wrap two-col">
          <div><span className="label">Good to know</span><h2 className="h2" id="rfaq">Before you <em>book</em></h2></div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  );
}
