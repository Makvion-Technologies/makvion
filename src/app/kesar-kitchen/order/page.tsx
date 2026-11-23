import { Icon } from "@/components/kesar-kitchen/icons";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { PickupOrder } from "@/components/kesar-kitchen/PickupOrder";
import { deliveryApps, info } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta(
  "Order online",
  "Order Kesar Kitchen for delivery through your favourite delivery app, or build a pickup order and send it to us on WhatsApp. Koregaon Park, Pune.",
  "/order",
);

export default function OrderPage() {
  return (
    <>
      <PageHero image="biryani-plate" crumb="Order online" label="Delivery & pickup" title={<>Kesar, <em>at home</em></>} lead="The same kitchen, the same eighteen-hour dal. Order delivery on the apps, or pick up from Lane 6 and skip the commission." />
      <section className="section" aria-labelledby="del-h">
        <div className="wrap">
          <div className="shead kk-reveal"><div><span className="label">Delivery</span><h2 className="h2" id="del-h">Order on <em>delivery apps</em></h2></div><p>We deliver within about 7 km of Koregaon Park, from 12 noon to 12:30 am.</p></div>
          <div className="apps kk-reveal">
            {deliveryApps.map((a) => (
              <a key={a.name} className="app" href={a.href} target="_blank" rel="noopener noreferrer">
                <span className="label dim">Delivery app</span>
                <h3>Order on {a.name}</h3>
                <p>{a.note}. Search for &ldquo;Kesar Kitchen, Koregaon Park&rdquo;.</p>
                <span className="go">Open {a.name} <Icon name="arrow" size={16} /></span>
              </a>
            ))}
            <a className="app" href={info.phoneHref}>
              <span className="label dim">Direct</span>
              <h3>Call to order</h3>
              <p>Large orders and party trays, with 24 hours&apos; notice. {info.phoneDisplay}.</p>
              <span className="go">Call now <Icon name="arrow" size={16} /></span>
            </a>
          </div>
        </div>
      </section>
      <section className="section bg2" aria-labelledby="pick-h">
        <div className="wrap">
          <div className="shead kk-reveal"><div><span className="label">Pickup</span><h2 className="h2" id="pick-h">Build a <em>pickup order</em></h2></div><p>Pick your dishes, add a name and send it to us on WhatsApp. We&apos;ll confirm the time and have it packed when you arrive.</p></div>
          <PickupOrder />
        </div>
      </section>
    </>
  );
}
