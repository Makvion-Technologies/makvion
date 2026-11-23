"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clinic, href, nav, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";

function isActive(pathname: string, target: string) {
  return pathname === target || pathname.startsWith(`${target}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <OpenStatus />
          <span className="hide-m">{clinic.addressShort} &nbsp;·&nbsp; Dental emergency? Call <a href={clinic.phoneHref}><b>{clinic.phoneDisplay}</b></a></span>
        </div>
      </div>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="icon-btn wa-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" style={{ color: "#127a45" }}>
              <Icon name="whatsapp" />
            </a>
            <a className="btn btn-soft btn-sm" href={clinic.phoneHref}><Icon name="phone" size={18} />Call</a>
            <Link className="btn btn-primary btn-sm" href={href("/book")}>
              <span className="long">Book appointment</span><span className="short">Book</span>
            </Link>
            <button ref={burgerRef} type="button" className="icon-btn burger" aria-label="Open menu" aria-expanded={open} aria-controls="ss-menu" onClick={() => setOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <div id="ss-menu" ref={menuRef} className={`mobile-menu${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
        <div className="mm-top">
          <Logo onClick={close} />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={close}><Icon name="close" /></button>
        </div>
        <nav aria-label="Mobile">
          <Link href={href()} onClick={close} aria-current={pathname === href() ? "page" : undefined}>Home <Icon name="right" /></Link>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={close} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label} <Icon name="right" /></Link>
          ))}
        </nav>
        <div className="mm-actions">
          <Link className="btn btn-primary" href={href("/book")} onClick={close}><Icon name="cal" />Book appointment</Link>
          <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />WhatsApp us</a>
          <a className="btn btn-soft" href={clinic.phoneHref}><Icon name="phone" size={18} />Call {clinic.phoneDisplay}</a>
        </div>
        <p className="mm-foot">{clinic.addressLines.join(", ")}</p>
      </div>
    </>
  );
}
