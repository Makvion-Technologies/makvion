import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/indigo-loom/icons";
import { ProductCard } from "@/components/indigo-loom/ProductCard";
import { href, img, reviews } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { pageMeta } from "@/lib/indigo-loom/meta";
import { bySlug, products } from "@/lib/indigo-loom/products";

export const metadata = pageMeta("Indigo Loom | Handwoven clothing, made to last", "Handwoven clothing from eleven weaving clusters across India. Kurta sets, co-ords, sarees and shirts in natural fibres. Free shipping, cash on delivery and 7-day easy returns.", "", true);

const edit = ["kattha-bagru-set", "chandni-kurta-set", "rani-maheshwari-saree", "neel-khadi-shirt", "mul-chikankari-dress", "haldi-khadi-kurta", "pista-mangalgiri-kurta", "pudina-chanderi-dress", "shravan-ikat-saree"].map((s) => bySlug(s)!);
const feat = bySlug("raat-rani-tunic")!;
const hero = bySlug("neel-dabu-co-ord")!;
const look = [
  { p: bySlug("shravan-ikat-saree")!, n: "04", img: "saree-field" },
  { p: bySlug("dhoop-linen-shirt")!, n: "07", img: "men-linen" },
  { p: bySlug("pudina-chanderi-dress")!, n: "09", img: "mint-dress" },
];

export default function Home() {
  return (
    <>
      <section className="wrap hero">
        <div className="copy">
          <div className="meta mono"><span>Collection Nº 07</span><span>Winter 2026</span></div>
          <h1>Handwoven,<br /><i>made to</i> last.</h1>
          <div className="intro"><span className="mono">01 —</span><p>Natural fibres, hand-block prints and slow weaves from eleven clusters across India. Cut in Pune, made to be worn for years and passed on after.</p></div>
          <div className="ctas"><Link className="btn" href={href("/shop")}>Shop the collection <Icon name="arrow" size={16} /></Link><Link className="ulink" href={href("/craft")}>Our craft</Link></div>
          <div className="foot">
            <div className="sw"><Image src={img("indigo-cloth")} alt="Indigo dabu printed fabric" fill sizes="120px" className="fill" /></div>
            <p><b>Dabu, from Akola</b>Mud-resist printed, dipped in indigo up to nine times for that deep, uneven blue.</p>
          </div>
        </div>
        <div className="pics">
          <figure className="big">
            <div className="im">
              <Image src={img(hero.image)} alt="Model in the Neel Dabu Co-ord, an indigo printed shirt and trouser set" fill sizes="(max-width: 900px) 100vw, 40vw" className="fill" preload style={{ objectPosition: "50% 30%" }} />
              <Link className="shopdot" style={{ left: "44%", top: "46%" }} href={href(`/products/${hero.slug}`)}><i aria-hidden="true" /><span><b>{hero.name}</b>{rupees(hero.price)}</span></Link>
            </div>
            <figcaption><span>Look 01 — {hero.name}</span><span>{hero.cluster}, {hero.state}</span></figcaption>
          </figure>
          <div className="side">
            <figure className="a"><div className="im"><Image src={img("embroidery")} alt="Hand-embroidered floral yoke in coral thread on indigo" fill sizes="(max-width: 900px) 50vw, 20vw" className="fill" /></div><figcaption><span>Detail</span><span>Hand-embroidered yoke</span></figcaption></figure>
            <figure className="b"><div className="im"><Image src={img("weaver-man")} alt="Weaver working an ikat handloom" fill sizes="(max-width: 900px) 50vw, 20vw" className="fill" style={{ objectPosition: "40% 50%" }} /></div><figcaption><span>On the loom</span><span>Pochampally</span></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Why shop with us">
        <div className="wrap">
          <div className="t"><Icon name="truck" size={30} /><div><b>Free shipping across India</b><span>Dispatched in 24 hours</span></div></div>
          <div className="t"><Icon name="cash" size={30} /><div><b>Cash on delivery</b><span>Pay when it arrives</span></div></div>
          <div className="t"><Icon name="returns" size={30} /><div><b>7-day easy returns</b><span>Free pickup from your door</span></div></div>
          <div className="t"><Icon name="phone" size={30} /><div><b>UPI, cards and netbanking</b><span>Secure checkout</span></div></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="shead">
            <div><p className="k mono">02 — Shop</p><h2>The Winter <i>Edit</i></h2></div>
            <nav className="chips" aria-label="Shop by collection">
              <Link className="chip on" href={href("/shop")}>All</Link>
              <Link className="chip" href={href("/shop/women")}>Women</Link>
              <Link className="chip" href={href("/shop/men")}>Men</Link>
              <Link className="chip" href={href("/shop/sarees")}>Sarees</Link>
              <Link className="chip" href={`${href("/shop")}?sort=new`}>New in</Link>
            </nav>
          </div>
          <div className="hgrid">
            {edit.map((p, i) => <ProductCard key={p.slug} p={p} wide={i === 0} />)}
          </div>
          <div className="center mt"><Link className="btn line" href={href("/shop")}>View all {products.length} pieces</Link></div>
        </div>
      </section>

      <section className="sec feat">
        <div className="wrap">
          <div className="gal">
            <div className="main"><Image src={img(feat.image)} alt={`${feat.name} in ${feat.colour.toLowerCase()}`} fill sizes="(max-width: 900px) 100vw, 50vw" className="fill" style={{ objectPosition: "50% 30%" }} /><span className="tag">{feat.tag}</span></div>
            <div className="thumbs" aria-hidden="true">{feat.gallery.slice(1).map((g) => <div key={g}><Image src={img(g)} alt="" fill sizes="160px" className="fill" /></div>)}</div>
          </div>
          <div className="pinfo2">
            <p className="mono dim">03 — Featured</p>
            <h2>Raat Rani <i>Tunic</i></h2>
            <p className="stars"><span className="s" aria-hidden="true">★★★★★</span> {feat.rating} · {feat.reviews} reviews</p>
            <p className="price">{rupees(feat.price)} <small>Inclusive of all taxes</small></p>
            <p className="desc">{feat.description}</p>
            <ul className="ticks">
              <li><Icon name="check" size={16} />Handloom cotton, natural-dye block print</li>
              <li><Icon name="check" size={16} />Sizes XS to XXL, relaxed fit</li>
              <li><Icon name="check" size={16} />Made by Kamla Devi&apos;s group of printers in Bagru</li>
            </ul>
            <Link className="btn" href={href(`/products/${feat.slug}`)}>Choose your size <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="sec craft-band">
        <div className="wrap">
          <div className="top"><h2>Slow cloth,<br />made by <i>hand.</i></h2><div><p className="mono dim">04 — The craft</p><p>Every Indigo Loom piece starts with a family of makers. We work directly with weavers, printers and embroiderers, pay before the cloth leaves the loom, and print the cluster&apos;s name on every label.</p><Link className="ulink" href={href("/craft")}>Read our story</Link></div></div>
          <div className="steps">
            {[
              ["stripes", "Handspun yarn in indigo and ecru", "Step 01", "3–5 days", "Spun and dyed", "Cotton and mulberry silk are hand-spun and dyed with indigo, madder and pomegranate rind, never synthetic fixers."],
              ["weaver-woman", "A weaver at a wooden handloom", "Step 02", "2–3 weeks", "Woven on a pit loom", "A single saree takes up to eighteen days on a wooden pit loom. Small slubs are the signature of the hand, not a flaw."],
              ["block-printer", "Hand block printing on cotton", "Step 03", "1–2 weeks", "Printed by hand", "Teak blocks, carved by hand, are pressed one by one. A kurta set can carry over 1,400 impressions."],
            ].map(([im, alt, n, d, h, p]) => (
              <article className="step" key={n}>
                <div className="im"><Image src={img(im)} alt={alt} fill sizes="(max-width: 900px) 100vw, 33vw" className="fill" /></div>
                <p className="n mono"><span>{n}</span><span>{d}</span></p>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <blockquote className="quote"><p>“The loom remembers every hand that worked it. <i>That is what you are wearing.</i>”</p><cite className="mono">— Sunanda Gajam, master weaver, Pochampally</cite></blockquote>
        </div>
      </section>

      <section className="sec look">
        <div className="wrap">
          <div className="shead"><div><p className="k mono">05 — Lookbook</p><h2>Monsoon <i>stories</i></h2></div><Link className="ulink" href={href("/journal")}>See the full lookbook</Link></div>
          <div className="lgrid">
            {look.map((l, i) => (
              <figure key={l.n} className={`l${i + 1}`}>
                <Link href={href(`/products/${l.p.slug}`)} className="im"><Image src={img(l.img)} alt={`${l.p.name}, look ${l.n}`} fill sizes="(max-width: 900px) 100vw, 33vw" className="fill" /></Link>
                <figcaption><span><b>Look {l.n}</b> — {l.p.name}</span><span>{rupees(l.p.price)}</span></figcaption>
              </figure>
            ))}
            <div className="ltext"><h3>Shot in the hills above <i>Mulshi,</i> after the first rain.</h3><p>Twelve looks in indigo, ecru and wet-earth tones, made for the season when everything turns green.</p><Link className="btn" href={href("/journal")}>Shop the looks</Link></div>
          </div>
        </div>
      </section>

      <section className="sec revs-sec">
        <div className="wrap">
          <div className="shead"><div><p className="k mono">06 — Worn and loved</p><h2>In your <i>words</i></h2></div><p className="stars"><span className="s" aria-hidden="true">★★★★★</span> 4.8 average from 3,100+ verified orders</p></div>
          <div className="revs">
            {reviews.map((r) => (
              <figure className="rev" key={r.name}>
                <span className="s" role="img" aria-label="5 out of 5 stars">★★★★★</span>
                <blockquote><p>“{r.text}”</p></blockquote>
                <figcaption><b>{r.name}</b><span>{r.city} · {r.product}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
