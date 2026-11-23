"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { clinic, href, treatments, whatsappLink } from "@/lib/sahyadri-smiles/content";
import type { IconName } from "./icons";
import { Icon } from "./icons";
import { longDate, slotsFor, upcomingDays, type Day, type Slot } from "@/lib/sahyadri-smiles/slots";
import { useNowMinute } from "@/lib/sahyadri-smiles/time";

type Reason = { id: string; label: string; note: string; icon: IconName; dentist: string };
const REASONS: Reason[] = [
  { id: "pain", label: "Tooth pain or emergency", note: "Same-day slots kept free", icon: "alert", dentist: "Dr. Kavita" },
  ...treatments.map((t) => ({ id: t.slug, label: t.name, note: t.duration, icon: t.icon, dentist: t.dentist })),
  { id: "other", label: "Something else", note: "Tell us in a note", icon: "info", dentist: "Dr. Anjali" },
];
const STEPS = ["Reason", "Date & time", "Your details"];
const WHO = ["Myself", "My child", "My parent", "Someone else"];
const LANGS = ["English", "Marathi", "Hindi", "Kannada"];

type Details = { name: string; phone: string; email: string; who: string; patient: string; language: string; notes: string; nervous: boolean; consent: boolean };
type Errors = Partial<Record<keyof Details | "reason" | "slot", string>>;

const cleanPhone = (p: string) => p.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");

function validateDetails(d: Details): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  else if (!/^[\p{L} .'-]+$/u.test(d.name.trim())) e.name = "Please use letters only.";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(d.phone))) e.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "This email address doesn't look right.";
  if (d.who !== "Myself" && d.patient.trim().length < 2) e.patient = "Please tell us the patient's name.";
  if (!d.consent) e.consent = "Please allow us to contact you so we can confirm the visit.";
  return e;
}

function icsFile(day: Day, slot: Slot, reason: string) {
  const [y, m, d] = day.key.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, d, 0, slot.min - 330));
  const end = new Date(start.getTime() + 45 * 60_000);
  const f = (x: Date) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sahyadri Smiles//Appointments//EN", "BEGIN:VEVENT",
    `UID:${f(start)}-${Math.random().toString(36).slice(2)}@sahyadrismiles.in`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:Dental appointment: ${reason}`, `LOCATION:${clinic.addressLines.join(", ").replace(/,/g, "\\,")}`,
    `DESCRIPTION:Sahyadri Smiles Dental Clinic. Call ${clinic.phoneDisplay} to change or cancel.`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export function BookingForm() {
  const params = useSearchParams();
  const now = useNowMinute();
  const nowMs = (now ?? 0) * 60_000;
  const days = useMemo(() => (now === null ? [] : upcomingDays(now * 60_000, 14)), [now]);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState<string | null>(null);
  const [reason, setReason] = useState(() => {
    const t = params.get("treatment");
    return t && REASONS.some((r) => r.id === t) ? t : "";
  });
  const [dayKey, setDayKey] = useState(() => params.get("date") ?? "");
  const [slotMin, setSlotMin] = useState<number | null>(() => {
    const t = Number(params.get("time"));
    return Number.isFinite(t) && t > 0 ? t : null;
  });
  const [week, setWeek] = useState(() => {
    const idx = upcomingDays(Date.now(), 14).findIndex((d) => d.key === params.get("date"));
    return idx >= 7 ? 1 : 0;
  });
  const [details, setDetails] = useState<Details>({ name: "", phone: "", email: "", who: "Myself", patient: "", language: "English", notes: "", nervous: false, consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [banner, setBanner] = useState("");
  const headRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const day = days.find((d) => d.key === dayKey && !d.closed);
  const slots = day ? slotsFor(day, nowMs) : [];
  const slot = slots.find((s) => s.min === slotMin && s.available);
  const r = REASONS.find((x) => x.id === reason);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headRef.current?.focus({ preventScroll: true });
    const top = document.getElementById("booking")?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top: top - 100, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step, done]);

  const set = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const focusFirstError = (e: Errors) => {
    const order = ["reason", "slot", "name", "phone", "email", "patient", "consent"] as const;
    const k = order.find((x) => e[x]);
    if (k) requestAnimationFrame(() => document.getElementById(`bk-${k}`)?.focus());
  };

  const next = () => {
    let e: Errors = {};
    if (step === 0 && !r) e = { reason: "Please choose a reason for your visit." };
    if (step === 1 && (!day || !slot)) e = { slot: !day ? "Please choose a day." : "Please choose an available time." };
    if (step === 2) e = validateDetails(details);
    setErrors(e);
    if (Object.keys(e).length) {
      setBanner(Object.values(e).length > 1 ? `Please fix ${Object.values(e).length} things below.` : (Object.values(e)[0] as string));
      focusFirstError(e);
      return;
    }
    setBanner("");
    if (step < 2) setStep(step + 1);
    else setDone(`SS-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
  };

  const reset = () => {
    setDone(null); setStep(0); setReason(""); setDayKey(""); setSlotMin(null); setErrors({}); setBanner("");
    setDetails({ name: "", phone: "", email: "", who: "Myself", patient: "", language: "English", notes: "", nervous: false, consent: false });
  };

  const waMessage = r && day && slot
    ? `Hi Sahyadri Smiles, I just requested an appointment${done ? ` (ref ${done})` : ""}.\nReason: ${r.label}\nWhen: ${longDate(day)}, ${slot.label}\nName: ${details.name.trim() || "-"}`
    : "Hi Sahyadri Smiles, I'd like to book an appointment.";

  if (done && r && day && slot) {
    const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsFile(day, slot, r.label))}`;
    return (
      <div className="confirm" id="booking">
        <div className="tick-big"><Icon name="check" size={40} strokeWidth={2.6} /></div>
        <h2 ref={headRef} tabIndex={-1}>Thank you, {details.name.trim().split(" ")[0]}. Your visit is requested.</h2>
        <p className="lead" style={{ marginTop: "1rem" }}>Our front desk will call you on <b>+91 {cleanPhone(details.phone).replace(/(\d{5})(\d{5})/, "$1 $2")}</b> within 15 minutes (9:30 am to 8:30 pm) to confirm. Nothing to pay now.</p>
        <span className="ref">Reference {done}</span>
        <div className="panel">
          <div className="sum-row"><span>Reason</span><b>{r.label}</b></div>
          <div className="sum-row"><span>When</span><b>{longDate(day)}, {slot.label}</b></div>
          <div className="sum-row"><span>Dentist</span><b>{r.dentist}</b></div>
          <div className="sum-row"><span>Patient</span><b>{details.who === "Myself" ? details.name.trim() : `${details.patient.trim()} (${details.who.replace("My ", "").replace("Someone else", "family or friend")})`}</b></div>
          <div className="sum-row" style={{ borderBottom: 0 }}><span>Where</span><b>{clinic.addressLines[0]}, Baner</b></div>
          {details.nervous && <div className="note-box"><Icon name="heart" size={18} />We&apos;ve noted that you&apos;re a little nervous. We&apos;ll book a longer slot and go at your pace.</div>}
        </div>
        <div className="confirm-actions">
          <a className="btn btn-wa" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Confirm on WhatsApp</a>
          <a className="btn btn-soft" href={ics} download="sahyadri-smiles-appointment.ics"><Icon name="download" size={18} />Add to calendar</a>
          <button type="button" className="btn btn-soft" onClick={reset}>Book another visit</button>
        </div>
        <p className="muted" style={{ marginTop: "1.5rem", fontSize: ".9375rem" }}>Need directions? <Link className="link-arrow" href={href("/contact")}>How to reach us <Icon name="right" size={16} /></Link></p>
      </div>
    );
  }

  const visibleDays = days.slice(week * 7, week * 7 + 7);
  const periods = (["Morning", "Afternoon", "Evening"] as const).map((p) => ({ p, list: slots.filter((s) => s.period === p) })).filter((x) => x.list.length);

  return (
    <div className="bk-grid" id="booking">
      <div>
        <ol className="stepper" aria-label="Booking progress">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? "done" : i === step ? "current" : ""} aria-current={i === step ? "step" : undefined}>
              <div className="bar"><i /></div><span>{i + 1}. {s}</span>
            </li>
          ))}
        </ol>
        <form className="panel" noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          <div className="panel-h"><span className="n">{step + 1}</span><h2 ref={headRef} tabIndex={-1}>{["What brings you in?", "Pick a day and time", "Your details"][step]}</h2></div>
          <div aria-live="polite">{banner && <div className="err-banner" role="alert"><Icon name="alert" size={18} />{banner}</div>}</div>

          {step === 0 && (
            <fieldset>
              <legend className="sr-only">Reason for your visit</legend>
              <div className="reasons" id="bk-reason" tabIndex={-1}>
                {REASONS.map((x) => (
                  <label key={x.id} className="reason">
                    <input type="radio" name="reason" value={x.id} checked={reason === x.id} onChange={() => { setReason(x.id); setErrors({}); setBanner(""); }} />
                    <span className="ic"><Icon name={x.icon} size={22} /></span>
                    <span><b>{x.label}</b><small>{x.note}</small></span>
                    <span className="tick" aria-hidden="true"><Icon name="check" size={14} strokeWidth={3} /></span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <div>
              {days.length === 0 ? <div className="skel-block" aria-label="Loading available days" /> : (
                <>
                  <div className="week-nav">
                    <span id="bk-month">{visibleDays[0]?.month} {visibleDays[0]?.dayNum} – {visibleDays[visibleDays.length - 1]?.month} {visibleDays[visibleDays.length - 1]?.dayNum}</span>
                    <div>
                      <button type="button" className="icon-btn" aria-label="Previous week" disabled={week === 0} onClick={() => setWeek(0)}><Icon name="left" size={18} /></button>
                      <button type="button" className="icon-btn" aria-label="Next week" disabled={week === 1} onClick={() => setWeek(1)}><Icon name="right" size={18} /></button>
                    </div>
                  </div>
                  <div className="days" role="group" aria-labelledby="bk-month" id="bk-slot" tabIndex={-1}>
                    {visibleDays.map((d) => (
                      <button key={d.key} type="button" className="day" disabled={d.closed} aria-pressed={d.key === dayKey} aria-label={`${longDate(d)}${d.closed ? ", closed" : ""}`}
                        onClick={() => { setDayKey(d.key); setSlotMin(null); setErrors({}); setBanner(""); }}>
                        <small>{d.short}</small><b>{d.dayNum}</b><em>{d.closed ? "Closed" : d.month}</em>
                      </button>
                    ))}
                  </div>
                  {!day && <p className="closed-note">Choose a day to see open times. Sundays are for emergencies only, so please call us on {clinic.phoneDisplay}.</p>}
                  {day && periods.length === 0 && <p className="closed-note">No times left today. Please choose another day, or call us for an emergency.</p>}
                  {day && periods.map(({ p, list }) => (
                    <div key={p} role="group" aria-label={`${p} times on ${longDate(day)}`}>
                      <p className="period"><Icon name={p === "Evening" ? "moon" : "sun"} size={16} />{p}</p>
                      <div className="times">
                        {list.map((s) => (
                          <button key={s.min} type="button" className="time" disabled={!s.available} aria-pressed={s.min === slotMin}
                            aria-label={`${s.label}${s.available ? "" : ", booked"}`} onClick={() => { setSlotMin(s.min); setErrors({}); setBanner(""); }}>{s.label}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="fields">
              <div className="field">
                <label htmlFor="bk-name">Full name</label>
                <input id="bk-name" autoComplete="name" value={details.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "bk-name-err" : undefined} placeholder="e.g. Priya Sharma" />
                {errors.name && <span className="err" id="bk-name-err"><Icon name="alert" size={14} />{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="bk-phone">Mobile number</label>
                <div className="phone-in"><span aria-hidden="true">+91</span>
                  <input id="bk-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={details.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "bk-phone-err" : "bk-phone-hint"} placeholder="98765 43210" maxLength={14} />
                </div>
                {errors.phone ? <span className="err" id="bk-phone-err"><Icon name="alert" size={14} />{errors.phone}</span> : <span className="hint" id="bk-phone-hint">We&apos;ll call this number to confirm.</span>}
              </div>
              <div className="field">
                <label htmlFor="bk-who">Who is the visit for?</label>
                <select id="bk-who" value={details.who} onChange={(e) => set("who", e.target.value)}>{WHO.map((w) => <option key={w}>{w}</option>)}</select>
              </div>
              {details.who !== "Myself" ? (
                <div className="field">
                  <label htmlFor="bk-patient">Patient&apos;s name</label>
                  <input id="bk-patient" value={details.patient} onChange={(e) => set("patient", e.target.value)} aria-invalid={!!errors.patient} aria-describedby={errors.patient ? "bk-patient-err" : undefined} />
                  {errors.patient && <span className="err" id="bk-patient-err"><Icon name="alert" size={14} />{errors.patient}</span>}
                </div>
              ) : (
                <div className="field">
                  <label htmlFor="bk-lang">Preferred language</label>
                  <select id="bk-lang" value={details.language} onChange={(e) => set("language", e.target.value)}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select>
                </div>
              )}
              <div className="field full">
                <label htmlFor="bk-email">Email <span className="opt">(optional, for a confirmation copy)</span></label>
                <input id="bk-email" type="email" autoComplete="email" value={details.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "bk-email-err" : undefined} placeholder="you@example.com" />
                {errors.email && <span className="err" id="bk-email-err"><Icon name="alert" size={14} />{errors.email}</span>}
              </div>
              <div className="field full">
                <label htmlFor="bk-notes">Anything we should know? <span className="opt">(optional)</span></label>
                <textarea id="bk-notes" value={details.notes} onChange={(e) => set("notes", e.target.value)} maxLength={500} placeholder="e.g. Pain on the lower left side since Monday. A bit nervous about injections." />
              </div>
              <div className="field full" style={{ gap: ".875rem" }}>
                <label className="checkrow"><input type="checkbox" checked={details.nervous} onChange={(e) => set("nervous", e.target.checked)} />I&apos;m a little nervous. Please give me extra time.</label>
                <label className="checkrow"><input id="bk-consent" type="checkbox" checked={details.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "bk-consent-err" : undefined} />I agree to be contacted on this number about my appointment.</label>
                {errors.consent && <span className="err" id="bk-consent-err"><Icon name="alert" size={14} />{errors.consent}</span>}
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 0 && <button type="button" className="btn btn-soft" onClick={() => { setStep(step - 1); setErrors({}); setBanner(""); }}><Icon name="left" size={18} />Back</button>}
            <button type="submit" className="btn btn-primary">{step < 2 ? <>Continue <Icon name="right" size={18} /></> : <>Request appointment <Icon name="check" size={18} /></>}</button>
            {step === 2 && <a className="btn btn-wa" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Book on WhatsApp instead</a>}
          </div>
        </form>
      </div>

      <aside className="summary" aria-label="Your visit">
        <div className="panel">
          <h2>Your visit</h2>
          <div className="sum-row"><span>Reason</span>{r ? <b>{r.label}</b> : <b className="empty">Not chosen</b>}</div>
          <div className="sum-row"><span>Date</span>{day ? <b>{longDate(day)}</b> : <b className="empty">Not chosen</b>}</div>
          <div className="sum-row"><span>Time</span>{slot ? <b>{slot.label}</b> : <b className="empty">Not chosen</b>}</div>
          <div className="sum-row"><span>Dentist</span>{r ? <b>{r.dentist}</b> : <b className="empty">Assigned for you</b>}</div>
          <div className="sum-row" style={{ borderBottom: 0 }}><span>Where</span><b>Baner Road, Pune</b></div>
          <div className="note-box"><Icon name="shield" size={18} /><span>Consultation fees are confirmed on the call. Pay at the clinic by UPI, card or cash.</span></div>
        </div>
        <div className="help-box">
          <b>Prefer to talk?</b>
          Call the front desk on <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a> or <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>. We reply within 10 minutes, 9:30 am to 8:30 pm.
        </div>
      </aside>
    </div>
  );
}
