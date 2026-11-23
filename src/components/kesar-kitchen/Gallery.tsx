"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, img } from "@/lib/kesar-kitchen/content";
import { Icon } from "./icons";

const CATS = ["All", "Food", "Rooms", "Kitchen"] as const;

/** Filterable photo grid with a keyboard-friendly lightbox. */
export function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => { setOpen(null); lastFocus.current?.focus(); }, []);
  const step = useCallback((by: number) => setOpen((o) => (o === null ? o : (o + by + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && boxRef.current) {
        const b = Array.from(boxRef.current.querySelectorAll<HTMLElement>("button"));
        const i = b.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        b[(i + (e.shiftKey ? -1 : 1) + b.length) % b.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, close, step]);

  const cur = open !== null ? list[open] : null;
  return (
    <>
      <div className="gal-filter" role="group" aria-label="Filter photos">
        {CATS.map((c) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="masonry">
        {list.map((g, i) => (
          <button key={g.image} type="button" className={g.tall ? "tall" : undefined} onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }} aria-label={`Open photo: ${g.alt}`}>
            <Image src={img(g.image)} alt={g.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            <span aria-hidden="true">{g.alt}</span>
          </button>
        ))}
      </div>
      {cur && (
        <div ref={boxRef} className="lightbox" role="dialog" aria-modal="true" aria-label={cur.alt}>
          <div className="lb-top"><span>{(open ?? 0) + 1} / {list.length}</span><button ref={closeRef} type="button" className="icon-btn" aria-label="Close photo" onClick={close}><Icon name="close" size={20} /></button></div>
          <div className="lb-img"><Image src={img(cur.image)} alt={cur.alt} fill sizes="100vw" /></div>
          <div className="lb-nav">
            <button type="button" className="icon-btn" aria-label="Previous photo" onClick={() => step(-1)}><Icon name="left" size={20} /></button>
            <p>{cur.alt}</p>
            <button type="button" className="icon-btn" aria-label="Next photo" onClick={() => step(1)}><Icon name="right" size={20} /></button>
          </div>
        </div>
      )}
    </>
  );
}
