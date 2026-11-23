"use client";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { bag, CODES, COD_FEE, EXPRESS_FEE, useBag, type BagItem } from "@/lib/indigo-loom/bag";
import { href, img, info, whatsappLink } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { checkPincode, deliveryWindow, lookupPlace, STATES } from "@/lib/indigo-loom/pincode";
import { Icon } from "./icons";

type Address = { email: string; phone: string; name: string; pincode: string; line1: string; line2: string; landmark: string; city: string; state: string };
type Pay = "upi" | "card" | "netbanking" | "cod";
type Order = { id: string; items: BagItem[]; address: Address; pay: Pay; payLabel: string; total: number; ship: "standard" | "express"; eta: string };
type Errors = Record<string, string>;

const EMPTY_ADDR: Address = { email: "", phone: "", name: "", pincode: "", line1: "", line2: "", landmark: "", city: "", state: "" };
const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Bank of Baroda", "Punjab National Bank", "Bank of Maharashtra", "Canara Bank", "Union Bank of India", "IDFC FIRST Bank", "Yes Bank"];
const UPI_APPS = ["Google Pay", "PhonePe", "Paytm", "BHIM"];
const COD_LIMIT = 15000;

const luhn = (num: string) => {
  let sum = 0;
  num.split("").reverse().forEach((d, i) => { let n = Number(d); if (i % 2) { n *= 2; if (n > 9) n -= 9; } sum += n; });
  return sum % 10 === 0;
};
const cardBrand = (n: string) => (/^4/.test(n) ? "Visa" : /^(5[1-5]|2[2-7])/.test(n) ? "Mastercard" : /^(60|65|81|82|508)/.test(n) ? "RuPay" : /^3[47]/.test(n) ? "Amex" : "Card");

export function Checkout() {
  const { items, count, subtotal, savings } = useBag();
  const [step, setStep] = useState<0 | 1>(0);
  const [addr, setAddr] = useState<Address>(EMPTY_ADDR);
  const [ship, setShip] = useState<"standard" | "express">("standard");
  const [pay, setPay] = useState<Pay>("upi");
  const [upiMode, setUpiMode] = useState<"id" | "app">("app");
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState(UPI_APPS[0]);
  const [card, setCard] = useState({ number: "", exp: "", cvv: "", name: "" });
  const [bank, setBank] = useState("");
  const [codeIn, setCodeIn] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [codeErr, setCodeErr] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [banner, setBanner] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step, order]);

  const pin = addr.pincode.length === 6 ? checkPincode(addr.pincode) : null;
  const pinOk = pin?.ok ? pin : null;
  const discount = code ? Math.round((subtotal * CODES[code].pct) / 100) : 0;
  const shipFee = ship === "express" ? EXPRESS_FEE : 0;
  const codFee = step === 1 && pay === "cod" ? COD_FEE : 0;
  const total = subtotal - discount + shipFee + codFee;
  const codAllowed = !!pinOk?.cod && subtotal - discount <= COD_LIMIT;
  const eta = pinOk ? deliveryWindow(ship === "express" ? [1, Math.max(1, pinOk.days[0] - 1)] : pinOk.days) : "";

  const set = (k: keyof Address, v: string) => {
    setAddr((a) => {
      const next = { ...a, [k]: v };
      if (k === "pincode" && v.length === 6) {
        const place = lookupPlace(v);
        if (place) { if (!a.city) next.city = place.city; if (!a.state) next.state = place.state; }
      }
      return next;
    });
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };

  const showErrors = (e: Errors) => {
    setErrors(e);
    const keys = Object.keys(e);
    if (!keys.length) { setBanner(""); return true; }
    setBanner(keys.length === 1 ? "Please fix the highlighted field." : `Please fix the ${keys.length} highlighted fields.`);
    window.setTimeout(() => document.getElementById(`il-${keys[0]}`)?.focus(), 30);
    return false;
  };

  const validateAddress = () => {
    const e: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(addr.email.trim())) e.email = "Enter a valid email for your order updates.";
    if (!/^[6-9]\d{9}$/.test(addr.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))) e.phone = "Enter a 10-digit Indian mobile number.";
    if (addr.name.trim().length < 2) e.name = "Enter the full name for delivery.";
    const pr = checkPincode(addr.pincode);
    if (!pr.ok) e.pincode = pr.message;
    if (addr.line1.trim().length < 5) e.line1 = "Enter your flat, house or building and street.";
    if (addr.line2.trim().length < 2) e.line2 = "Enter your area or locality.";
    if (addr.city.trim().length < 2) e.city = "Enter your city.";
    if (!addr.state) e.state = "Choose your state.";
    return showErrors(e);
  };

  const validatePay = () => {
    const e: Errors = {};
    if (pay === "upi" && upiMode === "id" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())) e.upi = "Enter a valid UPI ID, like name@okhdfcbank.";
    if (pay === "card") {
      const n = card.number.replace(/\D/g, "");
      if (n.length < 13 || n.length > 19 || !luhn(n)) e.cardnum = "Check the card number.";
      const m = card.exp.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      const now = new Date();
      if (!m || Number(m[1]) < 1 || Number(m[1]) > 12 || new Date(2000 + Number(m[2]), Number(m[1]), 0) < new Date(now.getFullYear(), now.getMonth(), 1)) e.exp = "Enter a valid expiry, MM / YY.";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "Enter the 3 or 4 digit CVV.";
      if (card.name.trim().length < 2) e.cardname = "Enter the name on the card.";
    }
    if (pay === "netbanking" && !bank) e.bank = "Choose your bank.";
    if (pay === "cod" && !codAllowed) e.pay = "Cash on delivery isn't available for this order. Please choose another method.";
    return showErrors(e);
  };

  const applyCode = () => {
    const c = codeIn.trim().toUpperCase();
    if (!c) return;
    if (CODES[c]) { setCode(c); setCodeErr(""); } else { setCode(null); setCodeErr("That code isn't valid."); }
  };

  const place = () => {
    if (!validatePay()) return;
    setBusy(true);
    const payLabel = pay === "upi" ? (upiMode === "id" ? `UPI · ${upiId.trim()}` : `UPI · ${upiApp}`) : pay === "card" ? `${cardBrand(card.number.replace(/\D/g, ""))} ending ${card.number.replace(/\D/g, "").slice(-4)}` : pay === "netbanking" ? `Netbanking · ${bank}` : "Cash on delivery";
    window.setTimeout(() => {
      const id = `IL${String(Date.now()).slice(-7)}`;
      setOrder({ id, items, address: addr, pay, payLabel, total, ship, eta });
      bag.clear();
      setBusy(false);
    }, 1100);
  };

  if (order) {
    const firstName = order.address.name.trim().split(/\s+/)[0];
    return (
      <div className="confirm" aria-labelledby="il-done-h">
        <div className="tick" aria-hidden="true"><Icon name="check" size={30} /></div>
        <p className="mono dim">Order {order.id}</p>
        <h1 id="il-done-h" ref={headRef} tabIndex={-1}>Thank you, <i>{firstName}.</i></h1>
        <p className="lead">{order.pay === "cod" ? "Your order is confirmed. Please keep" : "Your payment is received and your order is confirmed. We've sent the details to"} {order.pay === "cod" ? <b>{rupees(order.total)}</b> : <b>{order.address.email}</b>}{order.pay === "cod" ? " ready for when it arrives." : "."}</p>
        <div className="conf-grid">
          <div className="conf-box">
            <h2 className="mono">Arriving</h2>
            <p className="serif big">{order.eta}</p>
            <p className="muted">{order.ship === "express" ? "Express delivery" : "Free standard delivery"} from our Pune studio. You&apos;ll get tracking on WhatsApp at +91 {order.address.phone.replace(/\D/g, "").slice(-10).replace(/(\d{5})(\d{5})/, "$1 $2")}.</p>
          </div>
          <div className="conf-box">
            <h2 className="mono">Delivering to</h2>
            <address>{order.address.name}<br />{order.address.line1}<br />{order.address.line2}{order.address.landmark && <>, near {order.address.landmark}</>}<br />{order.address.city}, {order.address.state} {order.address.pincode}</address>
          </div>
          <div className="conf-box">
            <h2 className="mono">Payment</h2>
            <p>{order.payLabel}</p>
            <p className="muted">{order.pay === "cod" ? `Pay ${rupees(order.total)} in cash or by UPI to the courier.` : `Paid ${rupees(order.total)}`}</p>
          </div>
        </div>
        <ul className="conf-items">
          {order.items.map((i) => (
            <li key={i.key}><span className="ph"><Image src={img(i.product.image)} alt="" fill sizes="64px" className="fill" /></span><span><b>{i.product.name}</b><span className="muted">Size {i.size} · Qty {i.qty}</span></span><span>{rupees(i.product.price * i.qty)}</span></li>
          ))}
          <li className="tot"><span /><span>Total paid{order.pay === "cod" ? " on delivery" : ""}</span><b>{rupees(order.total)}</b></li>
        </ul>
        <div className="btn-row center">
          <Link className="btn" href={href("/shop")}>Continue shopping</Link>
          <a className="btn line" href={whatsappLink(`Hi Indigo Loom, I'd like an update on my order ${order.id}.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Order updates on WhatsApp</a>
        </div>
        <p className="muted small center">Need to change something? Write to {info.careEmail} within 12 hours, quoting {order.id}.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty big-empty">
        <Icon name="bag" size={40} />
        <p className="serif">Your bag is empty.</p>
        <p className="muted">Add a piece or two, then come back to check out.</p>
        <Link className="btn" href={href("/shop")}>Shop the collection</Link>
      </div>
    );
  }

  const field = (k: keyof Address | string, label: string, input: ReactNode, hint?: string, wide = false) => (
    <div className={`field${wide ? " wide" : ""}${errors[k] ? " bad" : ""}`}>
      <label htmlFor={`il-${k}`}>{label}</label>
      {input}
      {errors[k] ? <span className="err" id={`il-${k}-err`}><Icon name="alert" size={14} />{errors[k]}</span> : hint && <span className="hint" id={`il-${k}-hint`}>{hint}</span>}
    </div>
  );
  const aria = (k: string, hint = false) => ({ id: `il-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `il-${k}-err` : hint ? `il-${k}-hint` : undefined });

  return (
    <div className="co-grid">
      <div className="co-main">
        <ol className="co-steps" aria-label="Checkout progress">
          <li className="done"><Link href={href("/bag")}>Bag</Link></li>
          <li className={step === 0 ? "on" : "done"} aria-current={step === 0 ? "step" : undefined}>Address</li>
          <li className={step === 1 ? "on" : undefined} aria-current={step === 1 ? "step" : undefined}>Payment</li>
          <li>Confirmation</li>
        </ol>
        <div aria-live="polite">{banner && <div className="err-banner" role="alert"><Icon name="alert" size={18} />{banner}</div>}</div>

        {step === 0 ? (
          <form noValidate onSubmit={(e) => { e.preventDefault(); if (validateAddress()) { if (ship === "express" && !pinOk?.express) setShip("standard"); setStep(1); } }}>
            <h1 ref={headRef} tabIndex={-1} className="co-h">Where should we <i>deliver?</i></h1>
            <h2 className="mono sub">Contact</h2>
            <div className="fgrid">
              {field("email", "Email", <input {...aria("email", true)} type="email" autoComplete="email" value={addr.email} onChange={(e) => set("email", e.target.value)} placeholder="you@gmail.com" />, "For your order confirmation and GST invoice.")}
              {field("phone", "Mobile number", <div className="phone-in"><span>+91</span><input {...aria("phone", true)} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={11} value={addr.phone} onChange={(e) => set("phone", e.target.value)} placeholder="98765 43210" /></div>, "The courier will call this number.")}
            </div>
            <h2 className="mono sub">Shipping address</h2>
            <div className="fgrid">
              {field("name", "Full name", <input {...aria("name")} autoComplete="name" value={addr.name} onChange={(e) => set("name", e.target.value)} />, undefined, true)}
              {field("pincode", "Pincode", <input {...aria("pincode", true)} inputMode="numeric" autoComplete="postal-code" maxLength={6} value={addr.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} />, pinOk ? `Delivers by ${deliveryWindow(pinOk.days)}${pinOk.cod ? " · COD available" : ""}` : "We'll fill in your city.")}
              {field("city", "City", <input {...aria("city")} autoComplete="address-level2" value={addr.city} onChange={(e) => set("city", e.target.value)} />)}
              {field("line1", "Flat, house no., building, street", <input {...aria("line1")} autoComplete="address-line1" value={addr.line1} onChange={(e) => set("line1", e.target.value)} />, undefined, true)}
              {field("line2", "Area, locality", <input {...aria("line2")} autoComplete="address-line2" value={addr.line2} onChange={(e) => set("line2", e.target.value)} />)}
              {field("landmark", "Landmark (optional)", <input {...aria("landmark")} value={addr.landmark} onChange={(e) => set("landmark", e.target.value)} />)}
              {field("state", "State", <select {...aria("state")} autoComplete="address-level1" value={addr.state} onChange={(e) => set("state", e.target.value)}><option value="">Choose state</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select>, undefined, true)}
            </div>
            <h2 className="mono sub">Delivery</h2>
            <div className="opts" role="radiogroup" aria-label="Delivery speed">
              <label className="opt-card"><input type="radio" name="ship" checked={ship === "standard"} onChange={() => setShip("standard")} /><span><b>Standard</b><small>{pinOk ? `By ${deliveryWindow(pinOk.days)}` : "2 to 7 working days"}</small></span><em>Free</em></label>
              <label className={`opt-card${pinOk && !pinOk.express ? " off" : ""}`}><input type="radio" name="ship" checked={ship === "express"} disabled={!!pinOk && !pinOk.express} onChange={() => setShip("express")} /><span><b>Express</b><small>{pinOk ? (pinOk.express ? `By ${deliveryWindow([1, Math.max(1, pinOk.days[0] - 1)])}` : "Not available for this pincode") : "Metro cities and Pune"}</small></span><em>{rupees(EXPRESS_FEE)}</em></label>
            </div>
            <div className="co-actions">
              <Link className="tlink" href={href("/bag")}><Icon name="left" size={15} />Back to bag</Link>
              <button type="submit" className="btn">Continue to payment<Icon name="arrow" size={16} /></button>
            </div>
          </form>
        ) : (
          <form noValidate onSubmit={(e) => { e.preventDefault(); place(); }}>
            <h1 ref={headRef} tabIndex={-1} className="co-h">How would you like to <i>pay?</i></h1>
            <div className="ship-to">
              <div><span className="mono dim">Deliver to</span><p>{addr.name}, {addr.line1}, {addr.line2}, {addr.city} {addr.pincode}</p></div>
              <button type="button" className="tlink" onClick={() => { setStep(0); setErrors({}); setBanner(""); }}>Change</button>
            </div>
            <div className="pay-list" role="radiogroup" aria-label="Payment method" id="il-pay" tabIndex={-1}>
              {([
                ["upi", "UPI", "Google Pay, PhonePe, Paytm or any UPI app"],
                ["card", "Credit or debit card", "Visa, Mastercard, RuPay, Amex"],
                ["netbanking", "Netbanking", "All major Indian banks"],
                ["cod", "Cash on delivery", codAllowed ? `Pay in cash or UPI on delivery · ${rupees(COD_FEE)} fee` : pinOk?.cod === false ? "Not available for this pincode" : `Available on orders up to ${rupees(COD_LIMIT)}`],
              ] as [Pay, string, string][]).map(([id, t, s]) => (
                <div key={id} className={`pay${pay === id ? " on" : ""}`}>
                  <label className="pay-h">
                    <input type="radio" name="pay" value={id} checked={pay === id} disabled={id === "cod" && !codAllowed} onChange={() => { setPay(id); setErrors({}); setBanner(""); }} />
                    <span><b>{t}</b><small>{s}</small></span>
                  </label>
                  {pay === id && id === "upi" && (
                    <div className="pay-b">
                      <div className="seg" role="group" aria-label="UPI option">
                        <button type="button" aria-pressed={upiMode === "app"} onClick={() => setUpiMode("app")}>Pay with an app</button>
                        <button type="button" aria-pressed={upiMode === "id"} onClick={() => setUpiMode("id")}>Enter UPI ID</button>
                      </div>
                      {upiMode === "app" ? (
                        <div className="apps" role="radiogroup" aria-label="UPI app">
                          {UPI_APPS.map((a) => <label key={a} className="app"><input type="radio" name="upiapp" checked={upiApp === a} onChange={() => setUpiApp(a)} /><span>{a}</span></label>)}
                        </div>
                      ) : field("upi", "UPI ID", <input {...aria("upi", true)} value={upiId} onChange={(e) => { setUpiId(e.target.value); setErrors({}); }} placeholder="yourname@okhdfcbank" autoComplete="off" />, "You'll approve the payment in your UPI app.")}
                    </div>
                  )}
                  {pay === id && id === "card" && (
                    <div className="pay-b fgrid">
                      {field("cardnum", "Card number", <input {...aria("cardnum")} inputMode="numeric" autoComplete="cc-number" value={card.number} maxLength={23} onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })} placeholder="1234 5678 9012 3456" />, undefined, true)}
                      {field("exp", "Expiry", <input {...aria("exp")} inputMode="numeric" autoComplete="cc-exp" value={card.exp} maxLength={7} onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 4); setCard({ ...card, exp: d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d }); }} placeholder="MM / YY" />)}
                      {field("cvv", "CVV", <input {...aria("cvv")} inputMode="numeric" autoComplete="cc-csc" type="password" value={card.cvv} maxLength={4} onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") })} />)}
                      {field("cardname", "Name on card", <input {...aria("cardname")} autoComplete="cc-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />, undefined, true)}
                    </div>
                  )}
                  {pay === id && id === "netbanking" && (
                    <div className="pay-b">
                      <div className="banks" role="radiogroup" aria-label="Popular banks">
                        {BANKS.slice(0, 4).map((b) => <label key={b} className="app"><input type="radio" name="bankq" checked={bank === b} onChange={() => { setBank(b); setErrors({}); }} /><span>{b.replace(" Bank", "").replace("State Bank of India", "SBI")}</span></label>)}
                      </div>
                      {field("bank", "Or choose your bank", <select {...aria("bank")} value={bank} onChange={(e) => { setBank(e.target.value); setErrors({}); }}><option value="">Select bank</option>{BANKS.map((b) => <option key={b}>{b}</option>)}</select>)}
                    </div>
                  )}
                  {pay === id && id === "cod" && <div className="pay-b"><p className="muted small">A {rupees(COD_FEE)} handling fee is added. Keep {rupees(total)} ready, payable in cash or by UPI to the courier.</p></div>}
                </div>
              ))}
            </div>
            {errors.pay && <p className="err"><Icon name="alert" size={14} />{errors.pay}</p>}
            <p className="secure"><Icon name="lock" size={16} />Payments are encrypted and processed securely. We never store your card details.</p>
            <div className="co-actions">
              <button type="button" className="tlink" onClick={() => { setStep(0); setErrors({}); setBanner(""); }}><Icon name="left" size={15} />Back to address</button>
              <button type="submit" className="btn" disabled={busy} aria-busy={busy}>{busy ? "Placing your order…" : pay === "cod" ? `Place order · ${rupees(total)}` : `Pay ${rupees(total)}`}</button>
            </div>
          </form>
        )}
      </div>

      <aside className="summary co-sum" aria-labelledby="il-cs-h">
        <h2 id="il-cs-h">Your order <span className="mono dim">({count})</span></h2>
        <ul className="sum-items">
          {items.map((i) => (
            <li key={i.key}><span className="ph"><Image src={img(i.product.image)} alt="" fill sizes="64px" className="fill" /><span className="q">{i.qty}</span></span><span><b>{i.product.name}</b><span className="muted">Size {i.size}</span></span><span>{rupees(i.product.price * i.qty)}</span></li>
          ))}
        </ul>
        <form className="code" noValidate onSubmit={(e) => { e.preventDefault(); applyCode(); }}>
          <label htmlFor="il-code" className="sr-only">Discount code</label>
          <input id="il-code" value={codeIn} onChange={(e) => { setCodeIn(e.target.value); setCodeErr(""); }} placeholder="Discount code" autoComplete="off" aria-invalid={!!codeErr} aria-describedby="il-code-msg" />
          <button type="submit" className="btn line sm">Apply</button>
        </form>
        <p id="il-code-msg" aria-live="polite" className="small">{codeErr ? <span className="err">{codeErr}</span> : code ? <span className="ok">{code} applied: {CODES[code].label}. <button type="button" className="tlink" onClick={() => { setCode(null); setCodeIn(""); }}>Remove</button></span> : null}</p>
        <div className="row"><span>Subtotal</span><span>{rupees(subtotal)}</span></div>
        {savings > 0 && <div className="row save"><span>Sale savings</span><span>{rupees(savings)}</span></div>}
        {discount > 0 && <div className="row save"><span>Code {code}</span><span>− {rupees(discount)}</span></div>}
        <div className="row"><span>Shipping</span><span>{shipFee ? rupees(shipFee) : "Free"}</span></div>
        {codFee > 0 && <div className="row"><span>COD fee</span><span>{rupees(codFee)}</span></div>}
        <div className="row tot"><span>Total</span><b>{rupees(total)}</b></div>
        <p className="muted small">Inclusive of GST.</p>
      </aside>
    </div>
  );
}
