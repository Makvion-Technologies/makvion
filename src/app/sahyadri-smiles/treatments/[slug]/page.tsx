import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { TreatmentCard } from "@/components/sahyadri-smiles/Cards";
import { FaqList } from "@/components/sahyadri-smiles/FaqList";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { Crumbs } from "@/components/sahyadri-smiles/PageHero";
import { clinic, dentists, href, img, treatments, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return {};
  return pageMeta(`${t.name} in Baner, Pune`, `${t.short} ${t.intro.split(". ")[0]}.`, `/treatments/${t.slug}`);
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) notFound();
  const doc = dentists.find((d) => d.name === t.dentist) ?? dentists[0];
  const related = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: "Treatments", path: "/treatments" }, { label: t.name }]} />
          <div className="td-hero">
            <div>
              <p className="eyebrow">Treatment</p>
              <h1>{t.name}</h1>
              <p className="lead">{t.intro}</p>
              <dl className="facts">
                <div><dt><Icon name="clock" size={15} />Time in the chair</dt><dd>{t.duration}</dd></div>
                <div><dt><Icon name="cal" size={15} />Visits</dt><dd>{t.visits}</dd></div>
                <div><dt><Icon name="users" size={15} />Good for</dt><dd>{t.bestFor}</dd></div>
              </dl>
              <div className="hero-ctas" style={{ marginBottom: 0 }}>
                <Link className="btn btn-primary" href={href(`/book?treatment=${t.slug}`)}><Icon name="cal" />Book this treatment</Link>
                <a className="btn btn-wa" href={whatsappLink(`Hi, I'd like to know more about ${t.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Ask on WhatsApp</a>
              </div>
            </div>
            <div className="ph"><Image src={img(t.image)} alt={t.imageAlt} fill preload sizes="(max-width: 1000px) 100vw, 45vw" className="fill" /></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap td-layout">
          <div className="td-main">
            <section className="ss-reveal" aria-labelledby="signs">
              <h2 id="signs">When you might need it</h2>
              <ul className="checklist">{t.signs.map((s) => <li key={s}><Icon name="check" size={18} strokeWidth={2.4} />{s}</li>)}</ul>
            </section>
            <section className="ss-reveal" aria-labelledby="steps">
              <h2 id="steps">What happens at your visit</h2>
              <ol className="steps">{t.steps.map((s) => <li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>)}</ol>
            </section>
            <div className="two-box ss-reveal">
              <section className="soft-box blue" aria-labelledby="comfort">
                <h2 id="comfort">For your comfort</h2>
                <ul>{t.comfort.map((c) => <li key={c}><Icon name="heart" size={17} style={{ color: "#2e5bd8" }} />{c}</li>)}</ul>
              </section>
              <section className="soft-box" aria-labelledby="after">
                <h2 id="after">Aftercare</h2>
                <ul>{t.aftercare.map((c) => <li key={c}><Icon name="check" size={17} strokeWidth={2.4} style={{ color: "#a8431d" }} />{c}</li>)}</ul>
              </section>
            </div>
            <section className="ss-reveal" aria-labelledby="tfaq">
              <h2 id="tfaq">Common questions</h2>
              <FaqList items={t.faqs} openFirst />
            </section>
          </div>
          <aside className="aside-card" aria-label="Book this treatment">
            <h2>Ready when you are</h2>
            <p className="muted" style={{ fontSize: ".9375rem" }}>Pick a time online and we&apos;ll call to confirm within 15 minutes. Written estimate before any treatment.</p>
            <Link className="btn btn-primary" href={href(`/book?treatment=${t.slug}`)}><Icon name="cal" />Book appointment</Link>
            <a className="btn btn-soft" href={clinic.phoneHref}><Icon name="phone" size={18} />{clinic.phoneDisplay}</a>
            <div className="who">
              <span className="ph"><Image src={img(doc.image)} alt="" fill sizes="56px" className="fill" style={{ objectPosition: "50% 20%" }} /></span>
              <span>Usually with<b>{doc.name}</b>{doc.role}</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="rel">
        <div className="wrap">
          <div className="sec-head"><h2 className="h2" id="rel" style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.2vw, 2.25rem)" }}>Other treatments</h2><Link className="link-arrow" href={href("/treatments")}>All treatments <Icon name="right" size={18} /></Link></div>
          <div className="related">{related.map((x) => <TreatmentCard key={x.slug} t={x} />)}</div>
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
