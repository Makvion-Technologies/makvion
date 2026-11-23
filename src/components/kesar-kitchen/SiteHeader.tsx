"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, info, nav } from "@/lib/kesar-kitchen/content";
import { Brand } from "./Brand";
import { Icon } from "./icons";

const isActive = (pathname: string, target: string) => pathname === target || pathname.startsWith(`${target}/`);

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
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
  const left = nav.slice(0, 3);
  const right = nav.slice(3);

  return (
    <>
      <header className={`site-header${scrolled ? " solid" : ""}`}>
        <div className="wrap">
          <nav aria-label="Main">
            {left.map((n) => <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label}</Link>)}
          </nav>
          <Brand />
          <div className="r">
            <nav aria-label="More">
              {right.map((n) => <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label}</Link>)}
              <Link href={href("/order")} aria-current={isActive(pathname, href("/order")) ? "page" : undefined}>Order</Link>
            </nav>
            <Link className="btn ghost sm" href={href("/reserve")}>Reserve<span className="sr-only"> a table</span></Link>
            <button ref={burgerRef} type="button" className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="kk-menu" onClick={() => setOpen(true)}>
              <Icon name="menu" size={26} />
            </button>
          </div>
        </div>
      </header>
      <div id="kk-menu" ref={menuRef} className={`mobile-menu${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
        <div className="mm-top">
          <Brand onClick={close} />
          <button type="button" className="burger" aria-label="Close menu" onClick={close}><Icon name="close" size={26} /></button>
        </div>
        <nav aria-label="Mobile">
          <Link href={href()} onClick={close} aria-current={pathname === href() ? "page" : undefined}>Home <Icon name="arrow" /></Link>
          {nav.map((n) => <Link key={n.href} href={n.href} onClick={close} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label} <Icon name="arrow" /></Link>)}
          <Link href={href("/order")} onClick={close} aria-current={isActive(pathname, href("/order")) ? "page" : undefined}>Order online <Icon name="arrow" /></Link>
        </nav>
        <div className="mm-actions">
          <Link className="btn" href={href("/reserve")} onClick={close}>Reserve a table</Link>
          <a className="btn ghost" href={info.phoneHref}><Icon name="phone" size={18} />Call {info.phoneDisplay}</a>
        </div>
        <p className="mm-foot">{info.addressLines.join(", ")}<br />Open every day from 12 noon</p>
      </div>
    </>
  );
}
