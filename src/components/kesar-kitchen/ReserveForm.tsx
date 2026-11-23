"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { href, info, whatsappLink } from "@/lib/kesar-kitchen/content";
import { longDate, slotsFor, upcomingDays, type Day } from "@/lib/kesar-kitchen/slots";
import { useNowMinute } from "@/lib/kesar-kitchen/time";
import { Icon } from "./icons";

const SEATING = [
  { id: "main", name: "Main Room", note: "By the tandoor" },
  { id: "bar", name: "Lantern Bar", note: "Low tables, relaxed" },
  { id: "any", name: "No preference", note: "Best available" },
] as const;
const OCCASIONS = ["No occasion", "Birthday", "Anniversary", "Date night", "Family dinner", "Business meal"];
const STEPS = ["Guests", "Date & time", "Your details"];

type Details = { name: string; phone: string; email: string; occasion: string; notes: string; highchair: boolean; consent: boolean };
const EMPTY: Details = { name: "", phone: "", email: "", occasion: OCCASIONS[0], notes: "", highchair: false, consent: false };

const pad = (n: number) => String(n).padStart(2, "0");
function icsFor(day: Day, min: number, party: number, ref: string) {
  const [y, m, d] = day.key.split("-").map(Number);
  const startUtc = Date.UTC(y, m - 1, d, 0, min) - 330 * 60_000;
  const f = (ms: number) => { const t = new Date(ms); return `${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00Z`; };
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kesar Kitchen//Reservations//EN", "BEGIN:VEVENT", `UID:${ref}@kesarkitchen.in`, `DTSTAMP:${f(startUtc)}`, `DTSTART:${f(startUtc)}`, `DTEND:${f(startUtc + 120 * 60_000)}`, `SUMMARY:Table for ${party} at Kesar Kitchen`, `LOCATION:${info.addressLines.join(", ")}`, `DESCRIPTION:Reservation ${ref}. Call ${info.phoneDisplay} to change.`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export function ReserveForm() {
  const params = useSearchParams();
  const now = useNowMinute();
  const nowMs = (now ?? 0) * 60_000;
  const days = useMemo(() => (now === null ? [] : upcomingDays(now * 60_000, 14)), [now]);

  const [step, setStep] = useState(0);
  const [party, setParty] = useState(() => { const p = Number(params.get("party")); return p >= 1 && p <= 10 ? p : 2; });
  const [seating, setSeating] = useState<string>("any");
  const [dayKey, setDayKey] = useState<string | null>(() => params.get("date"));
  const [week, setWeek] = useState(() => {
    const idx = upcomingDays(Date.now(), 14).findIndex((d) => d.key === params.get("date"));
    return idx >= 7 ? 1 : 0;
  });
  const [slotMin, setSlotMin] = useState<number | null>(null);
  const [details, setDetails] = useState<Details>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headRef.current?.focus();
  }, [step, ref]);

  const day = days.find((d) => d.key === dayKey) ?? null;
  const slots = day ? slotsFor(day, party, nowMs) : [];
  const visible = days.slice(week * 7, week * 7 + 7);
  const slotLabel = slots.find((s) => s.min === slotMin)?.label;
  const seat = SEATING.find((s) => s.id === seating)!;
  const set = <K extends keyof Details>(k: K, v: Details[K]) => { setDetails((d) => ({ ...d, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!day) e.date = "Please choose a day.";
      else if (slotMin === null) e.slot = "Please choose a time.";
    }
    if (step === 2) {
      if (details.name.trim().length < 2) e.name = "Please enter your name.";
      if (!/^[6-9]\d{9}$/.test(details.phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
      if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = "That email doesn't look right.";
      if (!details.consent) e.consent = "Please confirm so we can hold your table.";
    }
    setErrors(e);
    const n = Object.values(e).filter(Boolean).length;
    setBanner(n ? (n === 1 ? Object.values(e)[0] : `Please fix ${n} things below.`) : "");
    if (n) {
      const firstKey = Object.keys(e)[0];
      window.requestAnimationFrame(() => document.getElementById(`kk-${firstKey}`)?.focus());
    }
    return n === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step < 2) { setStep(step + 1); return; }
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    setRef(`KK-${Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")}`);
  };

  const phoneDisplay = details.phone.replace(/\D/g, "").replace(/^(\d{5})(\d{5})$/, "$1 $2");
  const waMessage = `Hi Kesar Kitchen, please confirm my table${ref ? ` (ref ${ref})` : ""}.\nGuests: ${party}\nWhen: ${day ? longDate(day) : ""}${slotLabel ? `, ${slotLabel}` : ""}\nSeating: ${seat.name}\nName: ${details.name || "-"}${details.occasion !== OCCASIONS[0] ? `\nOccasion: ${details.occasion}` : ""}`;

  if (ref && day && slotMin !== null) {
    return (
      <div className="confirm" id="reservation">
        <div className="tick"><Icon name="check" size={32} strokeWidth={1.8} /></div>
        <span className="label">Reservation confirmed</span>
        <h2 ref={headRef} tabIndex={-1} style={{ marginTop: "1rem" }}>See you soon, {details.name.trim().split(" ")[0]}.</h2>
        <p className="muted" style={{ marginTop: ".75rem" }}>We&apos;ve held a table for {party} and sent the details to +91 {phoneDisplay}. A WhatsApp reminder goes out on the day.</p>
        <span className="ref">Reference {ref}</span>
        <div className="panel">
          <div className="sum-row"><span>Guests</span><b>{party} {party === 1 ? "guest" : "guests"}</b></div>
          <div className="sum-row"><span>When</span><b>{longDate(day)}, {slotLabel}</b></div>
          <div className="sum-row"><span>Seating</span><b>{seat.name}</b></div>
          {details.occasion !== OCCASIONS[0] && <div className="sum-row"><span>Occasion</span><b>{details.occasion}</b></div>}
          <div className="sum-row"><span>Where</span><b>{info.addressLines.join(", ")}</b></div>
          <p className="muted" style={{ fontSize: ".875rem", marginTop: "1rem" }}>We hold tables for 15 minutes. Running late or need to change? Call {info.phoneDisplay} or reply on WhatsApp.</p>
        </div>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Confirm on WhatsApp</a>
          <a className="btn ghost" href={icsFor(day, slotMin, party, ref)} download="kesar-kitchen-reservation.ics"><Icon name="download" size={18} />Add to calendar</a>
          <button type="button" className="btn ghost" onClick={() => { setRef(null); setStep(0); setSlotMin(null); setDetails(EMPTY); }}>Book another table</button>
        </div>
        <p className="muted" style={{ marginTop: "1.5rem", fontSize: ".9375rem" }}>Finding us: <Link className="ilink" href={href("/visit")}>Directions &amp; parking</Link></p>
      </div>
    );
  }

  return (
    <div className="bk-grid" id="reservation">
      <form className="panel" onSubmit={submit} noValidate>
        <ol className="steps-bar" aria-label="Progress">
          {STEPS.map((s, i) => <li key={s} className={i === step ? "on" : i < step ? "done" : undefined} aria-current={i === step ? "step" : undefined}>{i + 1}. {s}</li>)}
        </ol>
        <div aria-live="polite">{banner && <div className="err-banner" role="alert"><Icon name="alert" size={18} />{banner}</div>}</div>

        {step === 0 && (
          <>
            <h2 ref={headRef} tabIndex={-1}>How many guests?</h2>
            <p className="muted" style={{ margin: ".375rem 0 1.5rem" }}>Tables for up to 10 can be booked online.</p>
            <div className="party" role="radiogroup" aria-label="Number of guests">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" role="radio" aria-checked={party === n} aria-label={`${n} ${n === 1 ? "guest" : "guests"}`} onClick={() => { setParty(n); setSlotMin(null); }}>{n}</button>
              ))}
            </div>
            <div className="note-box" style={{ marginTop: "1rem" }}><Icon name="users" size={18} /><span>More than 10, or want the Teak Room to yourselves? <Link className="ilink" href={href("/private-dining")}>Enquire about private dining</Link></span></div>
            <p className="flabel" style={{ margin: "2rem 0 .75rem" }} id="kk-seat-l">Seating preference</p>
            <div className="seat" role="radiogroup" aria-labelledby="kk-seat-l">
              {SEATING.map((s) => <button key={s.id} type="button" role="radio" className="opt-card" aria-checked={seating === s.id} onClick={() => setSeating(s.id)}><b>{s.name}</b><span>{s.note}</span></button>)}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 ref={headRef} tabIndex={-1}>Pick a date and time</h2>
            <p className="muted" style={{ margin: ".375rem 0 1.5rem" }}>Showing availability for {party} {party === 1 ? "guest" : "guests"}.</p>
            <div className="daybar">
              <span className="flabel" id="kk-week">{visible[0] ? `${visible[0].month} ${visible[0].dayNum} – ${visible[visible.length - 1].month} ${visible[visible.length - 1].dayNum}` : "Loading dates"}</span>
              <div className="nav">
                <button type="button" className="icon-btn" aria-label="Previous week" disabled={week === 0} onClick={() => setWeek(0)}><Icon name="left" size={18} /></button>
                <button type="button" className="icon-btn" aria-label="Next week" disabled={week === 1} onClick={() => setWeek(1)}><Icon name="right" size={18} /></button>
              </div>
            </div>
            <div className="days" role="group" aria-labelledby="kk-week" id="kk-date" tabIndex={-1}>
              {visible.map((d) => (
                <button key={d.key} type="button" className="day" aria-pressed={d.key === dayKey} aria-label={longDate(d)} onClick={() => { setDayKey(d.key); setSlotMin(null); setErrors({}); setBanner(""); }}>
                  <small>{d.short}</small><b>{d.dayNum}</b><em>{d.month}</em>
                </button>
              ))}
            </div>
            {errors.date && <p className="err" style={{ marginTop: ".75rem" }}><Icon name="alert" size={14} />{errors.date}</p>}
            {day && (["Lunch", "Dinner"] as const).map((svc) => {
              const list = slots.filter((s) => s.service === svc);
              const open = list.filter((s) => s.available).length;
              return (
                <div key={svc} role="group" aria-label={`${svc} times on ${longDate(day)}`}>
                  <p className="period"><Icon name="clock" size={14} />{svc} · {open ? `${open} times free` : "fully booked"}</p>
                  <div className="times" id={svc === "Lunch" ? "kk-slot" : undefined} tabIndex={-1}>
                    {list.map((s) => (
                      <button key={s.min} type="button" className="time" disabled={!s.available} aria-pressed={s.min === slotMin} aria-label={`${s.label}${s.available ? "" : ", unavailable"}`} onClick={() => { setSlotMin(s.min); setErrors({}); setBanner(""); }}>{s.label}</button>
                    ))}
                  </div>
                </div>
              );
            })}
            {errors.slot && <p className="err" style={{ marginTop: ".75rem" }}><Icon name="alert" size={14} />{errors.slot}</p>}
            {!day && <p className="muted" style={{ marginTop: "1.25rem" }}>Choose a day to see open tables.</p>}
          </>
        )}

        {step === 2 && (
          <>
            <h2 ref={headRef} tabIndex={-1} style={{ marginBottom: "1.5rem" }}>Your details</h2>
            <div className="fields">
              <div className="field">
                <label htmlFor="kk-name">Full name</label>
                <input id="kk-name" autoComplete="name" value={details.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "kk-name-err" : undefined} placeholder="e.g. Priya Deshmukh" />
                {errors.name && <span className="err" id="kk-name-err"><Icon name="alert" size={14} />{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="kk-phone">Mobile number</label>
                <div className="phone-in"><span>+91</span><input id="kk-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={details.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "kk-phone-err" : "kk-phone-hint"} placeholder="98765 43210" /></div>
                {errors.phone ? <span className="err" id="kk-phone-err"><Icon name="alert" size={14} />{errors.phone}</span> : <span className="hint" id="kk-phone-hint">For your confirmation and reminder.</span>}
              </div>
              <div className="field">
                <label htmlFor="kk-email">Email <span className="opt">(optional)</span></label>
                <input id="kk-email" type="email" autoComplete="email" value={details.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "kk-email-err" : undefined} placeholder="you@example.com" />
                {errors.email && <span className="err" id="kk-email-err"><Icon name="alert" size={14} />{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="kk-occasion">Occasion</label>
                <select id="kk-occasion" value={details.occasion} onChange={(e) => set("occasion", e.target.value)}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
              </div>
              <div className="field full">
                <label htmlFor="kk-notes">Requests <span className="opt">(optional)</span></label>
                <textarea id="kk-notes" value={details.notes} onChange={(e) => set("notes", e.target.value)} maxLength={400} placeholder="Allergies, Jain food, a quiet corner, a cake from the kitchen…" />
              </div>
            </div>
            <label className="checkrow"><input type="checkbox" checked={details.highchair} onChange={(e) => set("highchair", e.target.checked)} />We&apos;ll need a high chair</label>
            <label className="checkrow"><input id="kk-consent" type="checkbox" checked={details.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "kk-consent-err" : undefined} />I understand the table is held for 15 minutes after the booking time.</label>
            {errors.consent && <span className="err" id="kk-consent-err"><Icon name="alert" size={14} />{errors.consent}</span>}
          </>
        )}

        <div className="form-actions">
          {step > 0 && <button type="button" className="btn ghost" onClick={() => { setStep(step - 1); setErrors({}); setBanner(""); }}><Icon name="left" size={16} />Back</button>}
          <button type="submit" className="btn">{step < 2 ? <>Continue <Icon name="arrow" size={16} /></> : <>Confirm reservation <Icon name="check" size={16} /></>}</button>
        </div>
      </form>

      <aside className="sticky-col" aria-label="Your reservation">
        <div className="summary">
          <h2>Your table</h2>
          <div className="sum-row"><span>Guests</span><b>{party}</b></div>
          <div className="sum-row"><span>Seating</span><b>{seat.name}</b></div>
          <div className="sum-row"><span>Date</span><b className={day ? undefined : "unset"}>{day ? longDate(day) : "Not chosen"}</b></div>
          <div className="sum-row"><span>Time</span><b className={slotLabel ? undefined : "unset"}>{slotLabel ?? "Not chosen"}</b></div>
        </div>
        <div className="note-box"><Icon name="phone" size={18} /><span>Prefer to talk? Call <a className="ilink" href={info.phoneHref}>{info.phoneDisplay}</a> or <a className="ilink" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</span></div>
      </aside>
    </div>
  );
}
