import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { href, img } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { pageMeta } from "@/lib/indigo-loom/meta";
import { bySlug } from "@/lib/indigo-loom/products";

export const metadata = pageMeta("Journal and lookbook", "The Monsoon lookbook, shot above Mulshi, and stories from the weaving and printing clusters we work with.", "/journal");

const looks = [
  { n: "01", slug: "neel-dabu-co-ord", im: "hero-indigo", cls: "tall" },
  { n: "04", slug: "shravan-ikat-saree", im: "saree-field", cls: "tall" },
  { n: "07", slug: "dhoop-linen-shirt", im: "men-linen", cls: "" },
  { n: "09", slug: "pudina-chanderi-dress", im: "mint-dress", cls: "" },
  { n: "10", slug: "rani-maheshwari-saree", im: "saree-silk", cls: "" },
  { n: "12", slug: "pista-mangalgiri-kurta", im: "men-mint", cls: "" },
];

const stories = [
  { id: "nine-dips", im: "indigo-cloth", kicker: "Akola, Rajasthan · 6 min read", title: "Nine dips of indigo", body: ["In Akola, the colour of a dabu print is counted in dips. One dip gives a pale sky blue. By the ninth, the cloth is the colour of the sky an hour after sunset.", "Saleem Chhipa's family keeps four fermented indigo vats going all year, fed with jaggery and lime. He tests each one with the back of his hand, the way his grandfather did. \u201cIf it smells sweet, it is alive,\u201d he says."] },
  { id: "eighteen-days", im: "weaver-woman", kicker: "Pochampally, Telangana · 5 min read", title: "Eighteen days on the loom", body: ["A double ikat saree is dyed before it is woven. Every thread of the warp and weft is tied and dyed in sections, so that the pattern only appears when the two meet on the loom.", "Sunanda Gajam and her husband plan each design on graph paper, then spend nearly three weeks tying, dyeing and weaving a single saree. The Shravan Ikat in our Monsoon edit is one of theirs."] },
  { id: "care", im: "detail-sleeve", kicker: "Studio notes · 3 min read", title: "How to care for handwoven cloth", body: ["Wash naturally dyed pieces separately in cold water for the first three washes, with a mild liquid detergent. Turn them inside out and dry them in the shade, never in harsh sun.", "Iron while slightly damp, on the reverse. Store silks and chanderi folded in muslin, and refold them every few months so the creases don't set. Handled this way, they will last for decades."] },
];

export default function Journal() {
  return (
    <>
      <PageHead kicker="Lookbook · Monsoon 2026" title="Monsoon" italic="stories" intro="Shot in the hills above Mulshi after the first rain. Twelve looks in indigo, ecru and wet-earth tones." crumbs={[{ label: "Journal" }]} />
      <section className="wrap">
        <div className="lookbook">
          {looks.map((l) => {
            const p = bySlug(l.slug)!;
            return (
              <figure key={l.n} className={l.cls}>
                <Link href={href(`/products/${p.slug}`)} className="im"><Image src={img(l.im)} alt={`Look ${l.n}: ${p.name}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" className="fill" /></Link>
                <figcaption><span><b>Look {l.n}</b> — {p.name}</span><span>{rupees(p.price)}</span></figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="shead"><div><p className="k mono">From the journal</p><h2>Notes from the <i>clusters</i></h2></div></div>
          <div className="stories">
            {stories.map((s) => (
              <article key={s.id} id={s.id} className="story">
                <div className="im"><Image src={img(s.im)} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" className="fill" /></div>
                <div className="tx">
                  <p className="mono dim">{s.kicker}</p>
                  <h3>{s.title}</h3>
                  {s.body.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
