import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { clusters, href, img } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = pageMeta("The craft", "How Indigo Loom works with weaving, dyeing and block-printing families in eleven clusters across India, and why we print the cluster's name on every label.", "/craft");

export default function Craft() {
  return (
    <>
      <PageHead kicker="Our story" title="Slow cloth, made by" italic="hand." intro="Indigo Loom began in 2019 with one trunk of Akola indigo and a sewing room on Prabhat Road. Today we work with 117 families across eleven clusters." crumbs={[{ label: "The craft" }]} />

      <section className="wrap story-hero">
        <div className="im tall"><Image src={img("indigo-dye")} alt="Hands lifting cloth out of an indigo dye vat" fill sizes="(max-width: 900px) 100vw, 55vw" className="fill" preload /></div>
        <div className="tx">
          <p className="mono dim">01 — Why we started</p>
          <h2 className="h3">Cloth that knows <i>where it came from.</i></h2>
          <p>Our founder Aparna Joshi grew up in Pune watching her grandmother re-drape the same Maheshwari saree for forty years. When she went looking for clothes made that way today, she found weavers being paid late, prints copied by machine and labels that said nothing at all.</p>
          <p>So we started small. We buy cloth directly from the families who make it, pay before it leaves the loom, and cut and stitch every piece in our own Pune studio, where eleven tailors work on fair wages and fixed hours.</p>
          <dl className="nums">
            <div><dt>Families we work with</dt><dd>117</dd></div>
            <div><dt>Weaving clusters</dt><dd>11</dd></div>
            <div><dt>Paid before dispatch</dt><dd>100%</dd></div>
          </dl>
        </div>
      </section>

      <section className="sec craft-band">
        <div className="wrap">
          <div className="top"><h2>From fibre to <i>finish</i></h2><div><p className="mono dim">02 — The process</p><p>A single Indigo Loom kurta set passes through at least five pairs of hands before it reaches you. Here is how.</p></div></div>
          <div className="steps four">
            {[
              ["stripes", "Hand-spun yarn in indigo and ecru", "Step 01", "3–5 days", "Spun and dyed", "Cotton and mulberry silk are hand-spun and dyed with indigo, madder and pomegranate rind."],
              ["weaver-woman", "A weaver at a wooden handloom", "Step 02", "2–3 weeks", "Woven by hand", "Pit looms and frame looms, worked by hand and foot. Small slubs are the signature of the hand."],
              ["block-printer", "Hand block printing on cotton", "Step 03", "1–2 weeks", "Printed or embroidered", "Teak blocks carved by hand, or chikankari stitched by women working from home."],
              ["detail-sleeve", "Close-up of a finished sleeve and cuff", "Step 04", "3–4 days", "Cut and finished in Pune", "Our studio tailors cut each piece by hand, finish every seam and add the maker's label."],
            ].map(([im, alt, n, d, h, p]) => (
              <article className="step" key={n}>
                <div className="im"><Image src={img(im)} alt={alt} fill sizes="(max-width: 900px) 100vw, 25vw" className="fill" /></div>
                <p className="n mono"><span>{n}</span><span>{d}</span></p>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="clusters">
        <div className="wrap">
          <div className="shead"><div><p className="k mono">03 — Our clusters</p><h2>Eleven towns, <i>one label</i></h2></div><p className="intro">Every piece carries the name of the town it was made in.</p></div>
          <ul className="clusters">
            {clusters.map((c, i) => (
              <li key={c.name}><span className="mono dim">{String(i + 1).padStart(2, "0")}</span><b className="serif">{c.name}</b><span>{c.craft}</span><span className="muted">{c.state} · {c.families} families</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec promise">
        <div className="wrap two">
          <div className="im"><Image src={img("weaver-man")} alt="A weaver at an ikat loom in Pochampally" fill sizes="(max-width: 900px) 100vw, 50vw" className="fill" /></div>
          <div className="tx">
            <p className="mono dim">04 — Our promise</p>
            <h2 className="h3">What we <i>will always do</i></h2>
            <ul className="ticks big">
              <li>Pay makers in full before the cloth leaves the loom.</li>
              <li>Use natural fibres only: cotton, khadi, linen, silk and blends of these.</li>
              <li>Ship in reused cloth bags and recycled paper, never plastic.</li>
              <li>Repair any Indigo Loom piece for free in its first year.</li>
            </ul>
            <blockquote className="quote small"><p>“The loom remembers every hand that worked it. <i>That is what you are wearing.</i>”</p><cite className="mono">— Sunanda Gajam, Pochampally</cite></blockquote>
            <Link className="btn" href={href("/shop")}>Shop the collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
