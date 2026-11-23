"use client";
import { type FormEvent, type ReactNode, useState } from "react";
import { whatsappLink } from "@/lib/indigo-loom/content";
import { Icon } from "./icons";

const TOPICS = ["An order I've placed", "Returns or exchange", "Sizing help", "Bulk or gifting order", "Press or collaboration", "Something else"];
type F = { name: string; email: string; phone: string; topic: string; order: string; message: string };

export function ContactForm() {
  const [f, setF] = useState<F>({ name: "", email: "", phone: "", topic: TOPICS[0], order: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof F, v: string) => { setF({ ...f, [k]: v }); if (errors[k]) setErrors({ ...errors, [k]: undefined }); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof F, string>> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) er.email = "Please enter a valid email.";
    if (f.phone && !/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ""))) er.phone = "Enter a 10-digit mobile number, or leave it blank.";
    if (f.message.trim().length < 10) er.message = "Tell us a little more, at least 10 characters.";
    setErrors(er);
    const k = Object.keys(er)[0];
    if (k) { document.getElementById(`ct-${k}`)?.focus(); return; }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="sent" role="status">
        <div className="tick" aria-hidden="true"><Icon name="check" size={26} /></div>
        <h2>Thank you, <i>{f.name.trim().split(/\s+/)[0]}.</i></h2>
        <p>We&apos;ve got your message and will reply to {f.email} within one working day. For anything urgent, WhatsApp is quickest.</p>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(`Hi Indigo Loom, I just sent a message about: ${f.topic}${f.order ? ` (order ${f.order})` : ""}.`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Continue on WhatsApp</a>
          <button type="button" className="btn line" onClick={() => { setSent(false); setF({ ...f, message: "", order: "" }); }}>Send another message</button>
        </div>
      </div>
    );
  }

  const field = (k: keyof F, label: string, input: ReactNode, wide = false) => (
    <div className={`field${wide ? " wide" : ""}${errors[k] ? " bad" : ""}`}>
      <label htmlFor={`ct-${k}`}>{label}</label>
      {input}
      {errors[k] && <span className="err" id={`ct-${k}-err`}><Icon name="alert" size={14} />{errors[k]}</span>}
    </div>
  );
  const a = (k: keyof F) => ({ id: `ct-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `ct-${k}-err` : undefined });

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="fgrid">
        {field("name", "Your name", <input {...a("name")} autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} />)}
        {field("email", "Email", <input {...a("email")} type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} />)}
        {field("phone", "Mobile (optional)", <input {...a("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" value={f.phone} onChange={(e) => set("phone", e.target.value)} />)}
        {field("topic", "What is it about?", <select {...a("topic")} value={f.topic} onChange={(e) => set("topic", e.target.value)}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>)}
        {(f.topic === TOPICS[0] || f.topic === TOPICS[1]) && field("order", "Order number (optional)", <input {...a("order")} value={f.order} onChange={(e) => set("order", e.target.value)} placeholder="e.g. IL4821736" />, true)}
        {field("message", "Message", <textarea {...a("message")} rows={5} maxLength={1200} value={f.message} onChange={(e) => set("message", e.target.value)} />, true)}
      </div>
      <button type="submit" className="btn">Send message<Icon name="arrow" size={16} /></button>
    </form>
  );
}
