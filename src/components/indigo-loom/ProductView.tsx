"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { bag, drawer } from "@/lib/indigo-loom/bag";
import { img, whatsappLink } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { checkPincode, deliveryWindow, type PinResult } from "@/lib/indigo-loom/pincode";
import { inStock, type Product, type Size } from "@/lib/indigo-loom/products";
import { Icon, Stars } from "./icons";
import { useDialog } from "./useDialog";

const CHART: Record<string, [string, string, string, string]> = {
  XS: ["32", "26", "35", "40"], S: ["34", "28", "37", "41"], M: ["36", "30", "39", "42"], L: ["38", "32", "41", "43"], XL: ["40", "34", "43", "44"], XXL: ["42", "36", "45", "45"],
};

export function ProductView({ p }: { p: Product }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<Size | null>(p.sizes.length === 1 && inStock(p, p.sizes[0]) ? p.sizes[0] : null);
  const [sizeErr, setSizeErr] = useState(false);
  const [pin, setPin] = useState("");
  const [pinRes, setPinRes] = useState<PinResult | null>(null);
  const [added, setAdded] = useState(false);
  const [guide, setGuide] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const closeGuide = useCallback(() => setGuide(false), []);
  useDialog(guide, guideRef, closeGuide);
  const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  const allSold = p.sizes.every((s) => !inStock(p, s));

  const add = () => {
    if (!size) {
      setSizeErr(true);
      sizeRef.current?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      sizeRef.current?.querySelector<HTMLInputElement>("input:not(:disabled)")?.focus({ preventScroll: true });
      return;
    }
    bag.add(p.slug, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
    drawer.open();
  };

  return (
    <div className="pdp">
      <div className="pgal" aria-label={`${p.name} photos`} role="region">
        <div className="thumbs" role="group" aria-label="Choose photo">
          {p.gallery.map((g, i) => (
            <button key={g} type="button" aria-pressed={active === i} aria-label={`Photo ${i + 1} of ${p.gallery.length}`} onClick={() => setActive(i)}>
              <Image src={img(g)} alt="" fill sizes="80px" className="fill" />
            </button>
          ))}
        </div>
        <div className="main">
          <Image src={img(p.gallery[active])} alt={active === 0 ? `${p.name} in ${p.colour.toLowerCase()}` : `${p.name}, detail ${active}`} fill sizes="(max-width: 900px) 100vw, 55vw" className="fill" preload style={active === 0 && p.focus ? { objectPosition: p.focus } : undefined} />
          {p.tag && <span className="tag">{p.tag}</span>}
          <div className="gnav">
            <button type="button" className="icon-btn" aria-label="Previous photo" onClick={() => setActive((active - 1 + p.gallery.length) % p.gallery.length)}><Icon name="left" size={18} /></button>
            <span className="mono" aria-live="polite">{active + 1} / {p.gallery.length}</span>
            <button type="button" className="icon-btn" aria-label="Next photo" onClick={() => setActive((active + 1) % p.gallery.length)}><Icon name="right" size={18} /></button>
          </div>
        </div>
      </div>

      <div className="pinfo">
        <p className="mono dim">{p.craft} · {p.cluster}, {p.state}</p>
        <h1>{p.name.split(" ").slice(0, -1).join(" ")} <i>{p.name.split(" ").slice(-1)}</i></h1>
        <a href="#reviews" className="rlink"><Stars rating={p.rating} count={p.reviews} /></a>
        <div className="price">
          {rupees(p.price)}
          {p.mrp && <><s><span className="sr-only">Was </span>{rupees(p.mrp)}</s><span className="off">{off}% off</span></>}
          <small>Inclusive of all taxes</small>
        </div>
        <p className="desc">{p.description}</p>

        <div className="opt">
          <div className="l"><span>Colour: <b>{p.colour}</b></span></div>
          <span className="swatch" style={{ background: p.swatch }} aria-hidden="true" />
        </div>

        <div className={`opt${sizeErr ? " has-err" : ""}`} ref={sizeRef} role="radiogroup" aria-labelledby="il-size-l" aria-describedby={sizeErr ? "il-size-err" : undefined}>
          <div className="l">
            <span id="il-size-l">Size: <b>{size ?? "Select"}</b></span>
            {p.sizes[0] !== "Free size" && <button type="button" className="tlink" onClick={() => setGuide(true)}><Icon name="ruler" size={15} />Size guide</button>}
          </div>
          <div className="sizes">
            {p.sizes.map((s) => {
              const ok = inStock(p, s);
              return (
                <label key={s} className={ok ? undefined : "x"}>
                  <input type="radio" name={`size-${p.slug}`} value={s} checked={size === s} disabled={!ok} onChange={() => { setSize(s); setSizeErr(false); }} />
                  <span>{s}{!ok && <span className="sr-only"> (sold out)</span>}</span>
                </label>
              );
            })}
          </div>
          {sizeErr && <p className="err" id="il-size-err" role="alert"><Icon name="alert" size={14} />Please choose a size.</p>}
          {p.soldOut?.length ? <p className="muted small">Sold out in {p.soldOut.join(", ")}. <a className="ilink" href={whatsappLink(`Hi Indigo Loom, please tell me when the ${p.name} is back in size ${p.soldOut[0]}.`)} target="_blank" rel="noopener noreferrer">Get notified on WhatsApp</a></p> : null}
        </div>

        <div className="buy" id="il-buy">
          <button type="button" className="btn" onClick={add} disabled={allSold}>
            {allSold ? "Sold out" : added ? <><Icon name="check" size={16} />Added to bag</> : <>Add to bag · {rupees(p.price)}</>}
          </button>
        </div>
        <div className="paynote"><span>Pay your way</span>{["UPI", "Cards", "Netbanking", "COD"].map((m) => <span key={m} className="pm">{m}</span>)}</div>

        <form className="pincode" noValidate onSubmit={(e) => { e.preventDefault(); setPinRes(checkPincode(pin)); }}>
          <label htmlFor={`pin-${p.slug}`}><Icon name="pin" size={18} />Check delivery</label>
          <div className="pin-row">
            <input id={`pin-${p.slug}`} inputMode="numeric" autoComplete="postal-code" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setPinRes(null); }} placeholder="Enter pincode" aria-describedby={`pin-${p.slug}-r`} aria-invalid={pinRes?.ok === false} />
            <button type="submit" className="tlink">Check</button>
          </div>
          <div id={`pin-${p.slug}-r`} aria-live="polite">
            {pinRes && (pinRes.ok ? (
              <ul className="pin-ok">
                <li><Icon name="truck" size={17} />Delivery to <b>{pinRes.place}</b> by <b>{deliveryWindow(pinRes.days)}</b>. Free.</li>
                <li><Icon name={pinRes.cod ? "check" : "alert"} size={17} />{pinRes.cod ? "Cash on delivery available" : "Prepaid only for this pincode"}</li>
                <li><Icon name="returns" size={17} />7-day returns with free pickup</li>
              </ul>
            ) : <p className="err"><Icon name="alert" size={14} />{pinRes.message}</p>)}
          </div>
        </form>

        <div className="acc">
          <details open>
            <summary>Details<Icon name="plus" size={16} /></summary>
            <ul>{p.details.map((d) => <li key={d}>{d}</li>)}<li>Fabric: {p.fabric}. Made in {p.cluster}, {p.state}; finished in Pune.</li></ul>
          </details>
          <details>
            <summary>Fabric and care<Icon name="plus" size={16} /></summary>
            <ul>{p.care.map((d) => <li key={d}>{d}</li>)}<li>Small slubs and colour variation are marks of the hand, not flaws.</li></ul>
          </details>
          <details>
            <summary>Shipping and returns<Icon name="plus" size={16} /></summary>
            <p>Free shipping across India, dispatched from Pune within 24 hours. Cash on delivery available on most pincodes. Return or exchange within 7 days of delivery with free pickup from your door.</p>
          </details>
        </div>
      </div>

      <div className="stickybuy" aria-hidden="true">
        <div><b>{rupees(p.price)}</b>{size ? `Size ${size}` : "Choose a size"}</div>
        <button type="button" className="btn" tabIndex={-1} onClick={add} disabled={allSold}>{added ? "Added" : "Add to bag"}</button>
      </div>

      <div ref={guideRef} className={`modal${guide ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="il-sg-h" aria-hidden={!guide} inert={!guide}>
        <div className="modal-box">
          <div className="dr-head"><h2 id="il-sg-h">Size guide</h2><button type="button" className="icon-btn" aria-label="Close size guide" onClick={closeGuide}><Icon name="close" size={22} /></button></div>
          <p className="muted">Body measurements in inches. Our pieces are cut relaxed, so if you are between sizes, take the smaller one.</p>
          <div className="tbl-wrap">
            <table>
              <caption className="sr-only">Body measurements by size, in inches</caption>
              <thead><tr><th scope="col">Size</th><th scope="col">Bust / chest</th><th scope="col">Waist</th><th scope="col">Hip</th><th scope="col">Length</th></tr></thead>
              <tbody>{p.sizes.filter((s) => CHART[s]).map((s) => <tr key={s}><th scope="row">{s}</th>{CHART[s].map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="muted small">Still unsure? <a className="ilink" href={whatsappLink(`Hi Indigo Loom, can you help me with sizing for the ${p.name}?`)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a> with your height and usual size.</p>
        </div>
      </div>
      <div className={`scrim${guide ? " on" : ""}`} onClick={closeGuide} aria-hidden="true" />
    </div>
  );
}
