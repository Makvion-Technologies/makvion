import Image from "next/image";
import Link from "next/link";
import { Icon, VegMark } from "@/components/kesar-kitchen/icons";
import { rupees } from "@/components/kesar-kitchen/MenuItem";
import { MenuPreview } from "@/components/kesar-kitchen/MenuPreview";
import { OpenStatus } from "@/components/kesar-kitchen/OpenStatus";
import { QuickReserve } from "@/components/kesar-kitchen/QuickReserve";
import { HoursList } from "@/components/kesar-kitchen/HoursList";
import { href, img, info, mapsEmbedUrl, press, rooms, signatures } from "@/lib/kesar-kitchen/content";
import { pageMeta, SITE_NAME } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  `${SITE_NAME} | Slow-cooked Indian classics in Koregaon Park, Pune`,
  "Slow-cooked Indian classics, a charcoal tandoor and warm rooms in Koregaon Park, Pune. Open every day till late. Reserve a table, see the menu or order online.",
  "",
  true,
);

const marquee = ["Dal Kesari", "Old Delhi Butter Chicken", "Tandoori Pomfret", "Awadhi Gosht Biryani", "Kolhapuri Mutton Sukka", "Kesar Pista Kulfi"];

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="bg"><Image src={img("hero-butter-chicken")} alt="Old Delhi butter chicken with a swirl of cream, in a dark copper bowl" fill preload sizes="100vw" /></div>
        <div className="content">
          <div className="wrap">
            <div>
              <span className="label">Koregaon Park, Pune &nbsp;·&nbsp; Since {info.since}</span>
              <h1>Slow-cooked classics, warm rooms, <em>open till late.</em></h1>
              <p className="sub">Recipes from home kitchens in Kolhapur, Lucknow and Amritsar, cooked over charcoal and served generously.</p>
            </div>
            <div className="tonight">
              <OpenStatus />
              <div className="row"><span>Kitchen</span><b>12 noon – 12:30 am</b></div>
              <div className="row"><span>Fri &amp; Sat</span><b>till 1:30 am</b></div>
              <Link className="btn" href={href("/reserve")}>Reserve a table</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}<i>✦</i></span>)}
        </div>
      </div>

      <section className="section intro">
        <div className="wrap kk-reveal">
          <div className="orn"><span className="label">The kitchen</span></div>
          <p className="big">Dals that simmer for eighteen hours. A charcoal tandoor lit at noon. Recipes carried from home kitchens in <em>Kolhapur, Lucknow and Amritsar</em>, cooked slowly and served generously.</p>
          <p className="sig">Chef Vikram &amp; the Kesar kitchen team</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="sig-h">
        <div className="wrap">
          <div className="shead kk-reveal">
            <div><span className="label">Signatures</span><h2 className="h2" id="sig-h">What everyone <em>orders twice</em></h2></div>
            <p>Four dishes that have been on the menu since our first night, and will be on it on our last.</p>
          </div>
          <div className="sigs kk-reveal">
            {signatures.map((d, i) => (
              <article className="dish" key={d.name}>
                <div className="ph"><Image src={img(d.image)} alt={d.alt} fill sizes="(max-width: 1100px) 50vw, 25vw" className="fill" /><span className="no">No. 0{i + 1}</span></div>
                <div className="meta"><h3><VegMark veg={d.veg} />{d.name}</h3><span className="price">{rupees(d.price)}</span></div>
                <p>{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg2" aria-labelledby="menu-h">
        <div className="wrap menu-grid">
          <div className="kk-reveal">
            <span className="label">The menu</span>
            <h2 className="h2" id="menu-h">Tonight&apos;s <em>menu</em></h2>
            <MenuPreview />
            <div className="btn-row" style={{ marginTop: "2.75rem" }}>
              <Link className="btn" href={href("/menu")}>See the full menu</Link>
              <Link className="btn ghost" href={href("/order")}>Order online</Link>
            </div>
          </div>
          <div className="menu-img">
            <div className="ph"><Image src={img("curry-spoon")} alt="A spoonful of slow-cooked butter chicken" fill sizes="40vw" className="fill" /></div>
            <div className="cap"><span className="serif" style={{ fontStyle: "italic", fontSize: "1.25rem", color: "var(--kk-cream)" }}>Old Delhi Butter Chicken</span><span><span className="vg nv" aria-hidden="true" />Non-veg &nbsp; <span className="vg" aria-hidden="true" />Veg</span></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="story-h">
        <div className="wrap story">
          <div className="imgs kk-reveal">
            <div className="a"><Image src={img("chef")} alt="Chef Vikram plating at the pass" fill sizes="(max-width: 900px) 72vw, 36vw" className="fill" /></div>
            <div className="b"><Image src={img("roti")} alt="Rotis being rolled by hand" fill sizes="(max-width: 900px) 48vw, 24vw" className="fill" /></div>
          </div>
          <div className="kk-reveal">
            <span className="label">Our story</span>
            <h2 className="h2" id="story-h" style={{ marginBottom: "2rem" }}>A neighbourhood kitchen, <em>since {info.since}</em></h2>
            <p>Kesar started as twelve tables on a quiet lane in Koregaon Park. The idea was simple: cook the food we grew up eating, the slow way, and keep the doors open long after the city&apos;s other kitchens have closed.</p>
            <p>Our masalas are roasted and ground in-house every morning. Rotis are made to order. Nothing on the menu comes out of a packet.</p>
            <blockquote className="quote">&ldquo;If a dish needs eighteen hours, it gets eighteen hours. That is the only rule in this kitchen.&rdquo;<cite>Chef Vikram, Head Chef</cite></blockquote>
            <div className="btn-row"><Link className="btn ghost" href={href("/story")}>Read our story</Link><Link className="btn ghost" href={href("/private-dining")}>Private dining</Link></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="rooms-h">
        <div className="wrap">
          <div className="shead kk-reveal">
            <div><span className="label">The rooms</span><h2 className="h2" id="rooms-h">Warm light, <em>long evenings</em></h2></div>
            <p>Three rooms for every kind of night: a family dinner, a quiet date, or a table of twelve that stays till closing.</p>
          </div>
          <div className="rooms kk-reveal">
            {rooms.map((r) => (
              <article className="room" key={r.id}>
                <div className="ph"><Image src={img(r.image)} alt={r.alt} fill sizes="(max-width: 900px) 100vw, 40vw" className="fill" /></div>
                <h3>{r.name}</h3><span className="seats">{r.seats}</span><p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg2" aria-labelledby="press-h">
        <div className="wrap">
          <h2 className="sr-only" id="press-h">What people say</h2>
          <div className="press kk-reveal">
            {press.map((p) => <figure key={p.source}><blockquote>&ldquo;{p.quote}&rdquo;</blockquote><figcaption>{p.source}</figcaption></figure>)}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="reserve-h">
        <div className="bg"><Image src={img("room-long")} alt="" fill sizes="100vw" className="fill" /></div>
        <div className="wrap">
          <div className="kk-reveal">
            <span className="label">Reservations</span>
            <h2 id="reserve-h">Book your <em>table</em></h2>
            <p className="note">We hold tables for 15 minutes. Walk-ins are always welcome at the bar. For groups of 10 or more, or to book the Teak Room, see <Link className="ilink" href={href("/private-dining")}>private dining</Link> or call {info.phoneDisplay}.</p>
            <div className="btn-row" style={{ marginTop: "2.5rem" }}>
              <Link className="btn ghost" href={href("/order")}><Icon name="bike" size={18} />Order delivery</Link>
              <a className="btn ghost" href={info.phoneHref}><Icon name="phone" size={18} />Call us</a>
            </div>
          </div>
          <QuickReserve />
        </div>
      </section>

      <section className="section" aria-labelledby="visit-h">
        <div className="wrap visit">
          <div>
            <span className="label">Hours</span>
            <h2 id="visit-h">Open <em>every day</em></h2>
            <HoursList />
          </div>
          <div>
            <span className="label">Find us</span>
            <h3>Koregaon Park</h3>
            <address className="addr">
              {info.addressLines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
              <span className="m">Valet parking after 7 pm. Ten minutes from Pune Station.</span>
              <span className="m" style={{ color: "var(--kk-cream)" }}><a href={info.phoneHref}>{info.phoneDisplay}</a><br /><a href={`mailto:${info.email}`}>{info.email}</a></span>
            </address>
          </div>
          <div className="map"><iframe src={mapsEmbedUrl} title="Map showing Kesar Kitchen on North Main Road, Koregaon Park, Pune" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>
    </>
  );
}
