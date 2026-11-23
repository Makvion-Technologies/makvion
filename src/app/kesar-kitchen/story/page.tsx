import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { href, img, info, reviews } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  "Our story",
  "How Kesar Kitchen grew from twelve tables on a quiet Koregaon Park lane into one of Pune's best-loved late-night kitchens. Meet Chef Vikram and the team.",
  "/story",
);

const timeline = [
  { y: "2011", t: "Twelve tables on Lane 6", d: "Vikram and Neha open Kesar with a borrowed tandoor, a menu of fourteen dishes and family recipes from Kolhapur and Lucknow." },
  { y: "2014", t: "The dal that made our name", d: "Dal Kesari, simmered for eighteen hours and finished with saffron butter, becomes the dish people cross the city for." },
  { y: "2018", t: "The Lantern Bar and Teak Room", d: "We take over the building next door, adding a late-night bar for chai and small plates, and a private room for eighteen." },
  { y: "Today", t: "Same lane, same rules", d: "A team of forty-two, masalas still ground every morning, and a kitchen that stays open long after the rest of the city sleeps." },
];

const people = [
  { name: "Chef Vikram Jadhav", role: "Head chef & co-founder", image: "chef", alt: "Chef Vikram plating at the pass", text: "Trained in Lucknow's kitchens, raised on his grandmother's Kolhapuri cooking. Still tastes every dal before service." },
  { name: "Neha Jadhav", role: "Co-founder & host", image: "room-dining", alt: "The main dining room, set by Neha", text: "The reason the rooms feel like home. Chooses every lamp, every plate and most of the music." },
  { name: "Ustad Salim", role: "Tandoor master", image: "kulcha", alt: "Kulcha fresh from Ustad Salim's tandoor", text: "Has lit the charcoal tandoor at noon every day since 2011. His kulchas sell out by nine." },
];

export default function StoryPage() {
  return (
    <>
      <PageHero image="chef" crumb="Our story" label={`Since ${info.since}`} title={<>A neighbourhood kitchen, <em>cooked slowly</em></>} lead="Fifteen years on the same Koregaon Park lane, and the same simple rule: if a dish needs eighteen hours, it gets eighteen hours." />
      <section className="section">
        <div className="wrap story">
          <div className="imgs kk-reveal">
            <div className="a"><Image src={img("spices")} alt="Whole spices roasted and ground in-house each morning" fill sizes="(max-width: 900px) 72vw, 36vw" className="fill" /></div>
            <div className="b"><Image src={img("tawa")} alt="Kebabs on a hot tawa" fill sizes="(max-width: 900px) 48vw, 24vw" className="fill" /></div>
          </div>
          <div className="kk-reveal">
            <span className="label">How we cook</span>
            <h2 className="h2" style={{ marginBottom: "2rem" }}>Nothing from a <em>packet</em></h2>
            <p>Our masalas are roasted and ground in-house every morning. Paneer is made in the kitchen, curd is set overnight, and rotis are rolled to order.</p>
            <p>The black urad for Dal Kesari goes on the fire at four in the afternoon and comes off at ten the next morning. The tandoor is fed charcoal, never gas.</p>
            <p>It takes longer. We think you can taste it.</p>
            <blockquote className="quote">&ldquo;Cook it the way your nani would, and serve it the way she would too: generously.&rdquo;<cite>Neha Jadhav, Co-founder</cite></blockquote>
          </div>
        </div>
      </section>
      <section className="stats-wrap" aria-label="Kesar Kitchen in numbers">
        <div className="wrap"><div className="stats kk-reveal">
          <div><b>18 hrs</b><span>for every pot of dal</span></div>
          <div><b>2011</b><span>first night on Lane 6</span></div>
          <div><b>42</b><span>people in the team</span></div>
          <div><b>1:30 am</b><span>last orders on weekends</span></div>
        </div></div>
      </section>
      <section className="section" aria-labelledby="tl-h">
        <div className="wrap two-col">
          <div className="kk-reveal"><span className="label">Fifteen years</span><h2 className="h2" id="tl-h">From twelve tables to <em>three rooms</em></h2></div>
          <ol className="timeline kk-reveal">{timeline.map((t) => <li key={t.y}><b>{t.y}</b><h3>{t.t}</h3><p>{t.d}</p></li>)}</ol>
        </div>
      </section>
      <section className="section bg2" aria-labelledby="ppl-h">
        <div className="wrap">
          <div className="shead kk-reveal"><div><span className="label">The people</span><h2 className="h2" id="ppl-h">The hands behind <em>the food</em></h2></div></div>
          <div className="people kk-reveal">{people.map((p) => <article className="person" key={p.name}><div className="ph"><Image src={img(p.image)} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 33vw" className="fill" /></div><h3>{p.name}</h3><span>{p.role}</span><p>{p.text}</p></article>)}</div>
        </div>
      </section>
      <section className="section" aria-labelledby="rev-h">
        <div className="wrap">
          <div className="shead kk-reveal"><div><span className="label">Guests</span><h2 className="h2" id="rev-h">Kind words from <em>our tables</em></h2></div><p>Rated 4.7 from more than 3,800 Google reviews.</p></div>
          <div className="press kk-reveal">{reviews.map((r) => <figure key={r.name}><blockquote style={{ fontSize: "1.5rem" }}>&ldquo;{r.text}&rdquo;</blockquote><figcaption>{r.name}<span>{r.meta}</span></figcaption></figure>)}</div>
          <div className="btn-row" style={{ marginTop: "3rem" }}><Link className="btn" href={href("/reserve")}>Reserve a table</Link><Link className="btn ghost" href={href("/menu")}>See the menu</Link></div>
        </div>
      </section>
    </>
  );
}
