"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { drawer, useBag } from "@/lib/indigo-loom/bag";
import { announcements, href, info, nav } from "@/lib/indigo-loom/content";
import { Icon } from "./icons";
import { useDialog } from "./useDialog";
import { Wordmark } from "./Wordmark";

const isActive = (pathname: string, target: string) => pathname === target || (target !== href("/shop") && pathname.startsWith(`${target}/`));

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const { count } = useBag();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenu(false), []);
  const closeSearch = useCallback(() => setSearch(false), []);
  useDialog(menu, menuRef, closeMenu, burgerRef);
  useDialog(search, searchRef, closeSearch, searchBtnRef);

  return (
    <>
      <div className="ann" role="region" aria-label="Store benefits">
        {announcements.map((a) => <span key={a}>{a}</span>)}
      </div>
      <header className="site-header">
        <div className="wrap bar">
          <div className="l">
            <button ref={burgerRef} type="button" className="icon-btn burger" aria-label="Open menu" aria-expanded={menu} aria-controls="il-menu" onClick={() => setMenu(true)}><Icon name="menu" size={22} /></button>
            <nav aria-label="Main">
              <ul>
                {nav.map((n) => <li key={n.href}><Link href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>{n.label}</Link></li>)}
              </ul>
            </nav>
          </div>
          <Wordmark />
          <div className="r">
            <button ref={searchBtnRef} type="button" className="hd-link" aria-expanded={search} aria-controls="il-search" onClick={() => setSearch(true)} aria-label="Search"><Icon name="search" size={19} /><span className="hide-m" aria-hidden="true">Search</span></button>
            <Link className="hd-link hide-m" href={href("/journal")} aria-current={isActive(pathname, href("/journal")) ? "page" : undefined}>Journal</Link>
            <button type="button" className="hd-link" onClick={() => drawer.open()} aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
              <Icon name="bag" size={19} /><span className="hide-m" aria-hidden="true">Bag</span><span className="bagc" aria-hidden="true">{count}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="il-search" ref={searchRef} className={`search-panel${search ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Search the store" aria-hidden={!search} inert={!search}>
        <div className="wrap">
          <form action={href("/shop")} method="get" role="search" onSubmit={() => setSearch(false)}>
            <label htmlFor="il-q" className="mono">Search</label>
            <div className="sbox">
              <Icon name="search" size={22} />
              <input id="il-q" name="q" type="search" data-autofocus placeholder="Kurta, saree, khadi, indigo…" autoComplete="off" />
              <button type="submit" className="btn sm">Search</button>
            </div>
            <p className="sugg"><span className="mono">Popular</span>
              {["Indigo", "Khadi", "Saree", "Chikankari", "Linen"].map((s) => <Link key={s} href={`${href("/shop")}?q=${s.toLowerCase()}`} onClick={closeSearch}>{s}</Link>)}
            </p>
          </form>
          <button type="button" className="icon-btn x" aria-label="Close search" onClick={closeSearch}><Icon name="close" size={22} /></button>
        </div>
      </div>
      <div className={`scrim${search ? " on" : ""}`} onClick={closeSearch} aria-hidden="true" />

      <div id="il-menu" ref={menuRef} className={`mobile-menu${menu ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menu} inert={!menu}>
        <div className="mm-top">
          <Wordmark onClick={closeMenu} />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={closeMenu}><Icon name="close" size={22} /></button>
        </div>
        <nav aria-label="Mobile">
          {[{ label: "Home", href: href() }, ...nav, { label: "Journal", href: href("/journal") }].map((n) => (
            <Link key={n.href} href={n.href} onClick={closeMenu} aria-current={(n.href === href() ? pathname === n.href : isActive(pathname, n.href)) ? "page" : undefined}>{n.label}<Icon name="arrow" size={18} /></Link>
          ))}
        </nav>
        <div className="mm-help">
          <Link href={href("/shipping-returns")} onClick={closeMenu}>Shipping and returns</Link>
          <Link href={href("/faq")} onClick={closeMenu}>FAQ</Link>
          <Link href={href("/contact")} onClick={closeMenu}>Contact</Link>
        </div>
        <p className="mm-foot mono">{info.email} · WhatsApp {info.whatsappDisplay}</p>
      </div>
    </>
  );
}
