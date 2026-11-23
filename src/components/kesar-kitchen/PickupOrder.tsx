"use client";
import { useMemo, useState } from "react";
import { info, whatsappLink } from "@/lib/kesar-kitchen/content";
import { menu } from "@/lib/kesar-kitchen/menu";
import { Icon, VegMark } from "./icons";
import { rupees } from "./MenuItem";

const PICKUP_TIMES = ["As soon as possible (about 35 min)", "In 1 hour", "In 2 hours", "This evening, 8 pm"];

/** Build a pickup order and send it to the restaurant on WhatsApp. Nothing is charged online. */
export function PickupOrder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [veg, setVeg] = useState(false);
  const [name, setName] = useState("");
  const [when, setWhen] = useState(PICKUP_TIMES[0]);
  const [err, setErr] = useState("");

  const all = useMemo(() => menu.flatMap((c) => c.items), []);
  const lines = all.filter((d) => (qty[d.name] ?? 0) > 0).map((d) => ({ d, n: qty[d.name] }));
  const total = lines.reduce((s, l) => s + l.d.price * l.n, 0);
  const count = lines.reduce((s, l) => s + l.n, 0);
  const change = (n: string, by: number) => setQty((q) => ({ ...q, [n]: Math.max(0, Math.min(20, (q[n] ?? 0) + by)) }));

  const message = `Hi Kesar Kitchen, I'd like to place a pickup order.\n${lines.map((l) => `${l.n} × ${l.d.name} (${rupees(l.d.price * l.n)})`).join("\n")}\nTotal: ${rupees(total)} + GST\nPickup: ${when}\nName: ${name || "-"}`;

  return (
    <div className="pick-grid">
      <div>
        <div className="filters" style={{ marginBottom: "1.5rem" }}>
          <div className="seg" role="group" aria-label="Dietary filter">
            <button type="button" aria-pressed={!veg} onClick={() => setVeg(false)}>Everything</button>
            <button type="button" aria-pressed={veg} onClick={() => setVeg(true)}><span className="vg" aria-hidden="true" />Veg only</button>
          </div>
        </div>
        {menu.map((c) => {
          const items = c.items.filter((d) => !veg || d.veg);
          if (!items.length) return null;
          return (
            <div className="pick-cat" key={c.id}>
              <h3>{c.name}</h3>
              {items.map((d) => {
                const n = qty[d.name] ?? 0;
                return (
                  <div className="pick-item" key={d.name}>
                    <div>
                      <span className="n"><VegMark veg={d.veg} />{d.name}</span>
                      <span className="pr">{rupees(d.price)}</span>
                    </div>
                    {n === 0 ? (
                      <button type="button" className="add-btn" onClick={() => change(d.name, 1)} aria-label={`Add ${d.name}`}>Add</button>
                    ) : (
                      <div className="qty" role="group" aria-label={`${d.name} quantity`}>
                        <button type="button" onClick={() => change(d.name, -1)} aria-label={`Remove one ${d.name}`}><Icon name="minus" size={16} /></button>
                        <output aria-live="polite">{n}</output>
                        <button type="button" onClick={() => change(d.name, 1)} disabled={n >= 20} aria-label={`Add one more ${d.name}`}><Icon name="plus" size={16} /></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <aside className="sticky-col" aria-label="Your pickup order">
        <div className="summary">
          <h2>Your order</h2>
          {lines.length === 0 ? <p className="muted" style={{ fontSize: ".9375rem" }}>Add dishes to start your pickup order.</p> : (
            <>
              {lines.map((l) => <div className="cart-line" key={l.d.name}><span>{l.n} × {l.d.name}</span><b>{rupees(l.d.price * l.n)}</b></div>)}
              <div className="cart-total"><span>Total <small className="muted">+ GST</small></span><b>{rupees(total)}</b></div>
            </>
          )}
          <div className="field" style={{ marginTop: "1.25rem" }}>
            <label htmlFor="kk-pick-name">Name for the order</label>
            <input id="kk-pick-name" value={name} onChange={(e) => { setName(e.target.value); setErr(""); }} autoComplete="name" aria-invalid={!!err && !name.trim()} placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="kk-pick-when">Pickup time</label>
            <select id="kk-pick-when" value={when} onChange={(e) => setWhen(e.target.value)}>{PICKUP_TIMES.map((t) => <option key={t}>{t}</option>)}</select>
          </div>
          {err && <p className="err" role="alert" style={{ marginBottom: "1rem" }}><Icon name="alert" size={14} />{err}</p>}
          {count > 0 && name.trim().length > 1 ? (
            <a className="btn block" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Send order on WhatsApp</a>
          ) : (
            <button type="button" className="btn block" onClick={() => setErr(count === 0 ? "Add at least one dish first." : "Please add a name for the order.")}><Icon name="whatsapp" size={18} />Send order on WhatsApp</button>
          )}
          <p className="fine">Pay at pickup by UPI, card or cash. Or call {info.phoneDisplay}.</p>
        </div>
      </aside>
    </div>
  );
}
