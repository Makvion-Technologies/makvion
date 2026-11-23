"use client";
import { useEffect, useRef, useState } from "react";
import { info, whatsappLink } from "@/lib/kesar-kitchen/content";
import { Icon } from "./icons";

const TYPES = ["Birthday", "Anniversary", "Engagement or sangeet", "Corporate dinner", "Family get-together", "Something else"];
const SPACES = ["Teak Room (10–18)", "Lantern Bar (20–40)", "Full restaurant (up to 90)", "Help me choose"];
const BUDGETS = ["₹ 1,500 – 2,000 per guest", "₹ 2,000 – 2,500 per guest", "₹ 2,500 + per guest", "Not sure yet"];

type F = { name: string; phone: string; email: string; type: string; date: string; guests: string; space: string; budget: string; notes: string };
const EMPTY: F = { name: "", phone: "", email: "", type: TYPES[0], date: "", guests: "", space: SPACES[3], budget: BUDGETS[3], notes: "" };

export function EventEnquiry() {
  const [f, setF] = useState<F>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (done) headRef.current?.focus(); }, [done]);
  const set = (k: keyof F, v: string) => { setF((x) => ({ ...x, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit Indian mobile number.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right.";
    const g = Number(f.guests);
    if (!g || g < 8 || g > 90) e.guests = "Private events are for 8 to 90 guests.";
    if (!f.date) e.date = "Please choose a date.";
    setErrors(e);
    const keys = Object.keys(e);
    if (keys.length) { document.getElementById(`ev-${keys[0]}`)?.focus(); return; }
    setDone(true);
  };

  const msg = `Hi Kesar Kitchen, I've sent an event enquiry.\nEvent: ${f.type}\nDate: ${f.date}\nGuests: ${f.guests}\nSpace: ${f.space}\nName: ${f.name}`;

  if (done) {
    return (
      <div className="panel" role="status">
        <div className="tick" style={{ width: "3.5rem", height: "3.5rem", border: "1px solid var(--kk-saffron)", borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--kk-saffron)", marginBottom: "1.25rem" }}><Icon name="check" size={26} /></div>
        <h2 ref={headRef} tabIndex={-1}>Thank you, {f.name.trim().split(" ")[0]}.</h2>
        <p className="muted" style={{ margin: ".75rem 0 1.5rem" }}>Our events team will call you within one working day with menus and a quote for your {f.type.toLowerCase()} on {new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.</p>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Continue on WhatsApp</a>
          <button type="button" className="btn ghost" onClick={() => { setF(EMPTY); setDone(false); }}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="err" id={`ev-${k}-err`}><Icon name="alert" size={14} />{errors[k]}</span>;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `ev-${k}-err` : undefined });

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2 style={{ marginBottom: ".375rem" }}>Plan an event</h2>
      <p className="muted" style={{ marginBottom: "1.75rem", fontSize: ".9375rem" }}>Tell us a little about it. We reply within one working day, or call {info.phoneDisplay}.</p>
      <div className="fields">
        <div className="field"><label htmlFor="ev-name">Your name</label><input id="ev-name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="ev-phone">Mobile</label><div className="phone-in"><span>+91</span><input id="ev-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={f.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} /></div>{err("phone")}</div>
        <div className="field full"><label htmlFor="ev-email">Email <span className="opt">(optional)</span></label><input id="ev-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />{err("email")}</div>
        <div className="field"><label htmlFor="ev-type">Type of event</label><select id="ev-type" value={f.type} onChange={(e) => set("type", e.target.value)}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="field"><label htmlFor="ev-date">Preferred date</label><input id="ev-date" type="date" value={f.date} onChange={(e) => set("date", e.target.value)} {...aria("date")} />{err("date")}</div>
        <div className="field"><label htmlFor="ev-guests">Number of guests</label><input id="ev-guests" type="number" inputMode="numeric" min={8} max={90} value={f.guests} onChange={(e) => set("guests", e.target.value)} {...aria("guests")} />{err("guests")}</div>
        <div className="field"><label htmlFor="ev-space">Space</label><select id="ev-space" value={f.space} onChange={(e) => set("space", e.target.value)}>{SPACES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="field full"><label htmlFor="ev-budget">Budget</label><select id="ev-budget" value={f.budget} onChange={(e) => set("budget", e.target.value)}>{BUDGETS.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="field full"><label htmlFor="ev-notes">Anything else <span className="opt">(optional)</span></label><textarea id="ev-notes" value={f.notes} onChange={(e) => set("notes", e.target.value)} maxLength={600} placeholder="Dietary needs, a cake, decorations, a live tandoor…" /></div>
      </div>
      <button type="submit" className="btn block" style={{ marginTop: ".5rem" }}>Send enquiry</button>
      <p className="fine">Or email {info.eventsEmail}</p>
    </form>
  );
}
