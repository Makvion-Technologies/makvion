"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { bag, drawer, useBag, useDrawer } from "@/lib/indigo-loom/bag";
import { href, img } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { Icon } from "./icons";
import { QtyStepper } from "./QtyStepper";
import { useDialog } from "./useDialog";

export function BagDrawer() {
  const open = useDrawer();
  const { items, count, subtotal, savings } = useBag();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const close = useCallback(() => drawer.close(), []);
  useDialog(open, ref, close);
  useEffect(() => { drawer.close(); }, [pathname]);

  return (
    <>
      <div className={`scrim${open ? " on" : ""}`} onClick={close} aria-hidden="true" />
      <div ref={ref} className={`drawer${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="il-bag-title" aria-hidden={!open} inert={!open}>
        <div className="dr-head">
          <h2 id="il-bag-title">Your bag <span className="mono">({count})</span></h2>
          <button type="button" className="icon-btn" aria-label="Close bag" onClick={close}><Icon name="close" size={22} /></button>
        </div>
        {items.length === 0 ? (
          <div className="dr-empty">
            <p className="serif">Your bag is empty.</p>
            <p className="muted">Start with the pieces everyone comes back for.</p>
            <Link className="btn" href={href("/shop")} onClick={close}>Shop the collection</Link>
          </div>
        ) : (
          <>
            <p className="dr-note"><Icon name="truck" size={18} />Free shipping across India on this order</p>
            <ul className="dr-lines">
              {items.map((i) => (
                <li key={i.key} className="bline">
                  <Link className="ph" href={href(`/products/${i.slug}`)} onClick={close}><Image src={img(i.product.image)} alt="" fill sizes="96px" className="fill" /></Link>
                  <div className="tx">
                    <div className="top"><Link href={href(`/products/${i.slug}`)} onClick={close} className="nm">{i.product.name}</Link><b>{rupees(i.product.price * i.qty)}</b></div>
                    <p className="muted">{i.product.colour} · Size {i.size}</p>
                    <div className="ctl">
                      <QtyStepper value={i.qty} label={`${i.product.name}, size ${i.size}`} onChange={(n) => bag.setQty(i.slug, i.size, n)} />
                      <button type="button" className="tlink" onClick={() => bag.remove(i.slug, i.size)}>Remove<span className="sr-only"> {i.product.name}</span></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="dr-foot">
              {savings > 0 && <div className="row save"><span>You save</span><span>{rupees(savings)}</span></div>}
              <div className="row tot"><span>Subtotal</span><b>{rupees(subtotal)}</b></div>
              <p className="muted small">Inclusive of GST. Shipping and any codes are applied at checkout.</p>
              <Link className="btn block" href={href("/checkout")} onClick={close}><Icon name="lock" size={16} />Checkout</Link>
              <Link className="btn line block" href={href("/bag")} onClick={close}>View bag</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
