import Image from "next/image";
import { EventEnquiry } from "@/components/kesar-kitchen/EventEnquiry";
import { Icon } from "@/components/kesar-kitchen/icons";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { eventPackages, img } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  "Private dining & events",
  "Host birthdays, anniversaries, sangeets and company dinners at Kesar Kitchen, Koregaon Park. The Teak Room seats 18; the full restaurant takes up to 90.",
  "/private-dining",
);

const includes = [
  ["A dedicated host", "One person looks after your event from first call to last guest."],
  ["Menus built with Chef Vikram", "Start from our set menus or build your own, with Jain and vegan options."],
  ["Live tandoor and chaat counters", "Add a live counter for bigger celebrations."],
  ["Cakes, flowers and decor", "We work with trusted Pune partners, or bring your own."],
];

export default function PrivateDiningPage() {
  return (
    <>
      <PageHero image="room-wood" crumb="Private dining" label="Private dining & events" title={<>Gather around <em>our table</em></>} lead="From a family dinner of ten in the Teak Room to a sangeet for ninety, we'll cook it, host it and clear up after." />
      <section className="section" aria-labelledby="pk-h">
        <div className="wrap">
          <div className="shead kk-reveal"><div><span className="label">Spaces</span><h2 className="h2" id="pk-h">Three ways to <em>celebrate</em></h2></div><p>Prices include food and soft drinks, and exclude GST.</p></div>
          <div className="packages kk-reveal">
            {eventPackages.map((p) => (
              <article className="pkg" key={p.name}>
                <div className="ph"><Image src={img(p.image)} alt={p.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className="fill" /></div>
                <h3>{p.name}</h3>
                <div className="g"><span>{p.guests}</span><span>{p.price}</span></div>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg2" aria-labelledby="ev-h" id="enquire">
        <div className="wrap ev-grid">
          <div className="kk-reveal">
            <span className="label">Enquire</span>
            <h2 className="h2" id="ev-h">Tell us about <em>your evening</em></h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>Every event comes with:</p>
            <ul className="ev-list">{includes.map(([b, t]) => <li key={b}><Icon name="check" size={18} /><span><b>{b}</b>{t}</span></li>)}</ul>
          </div>
          <EventEnquiry />
        </div>
      </section>
    </>
  );
}
