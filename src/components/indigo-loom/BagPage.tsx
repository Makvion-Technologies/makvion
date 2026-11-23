"use client";
import Image from "next/image";
import Link from "next/link";
import { bag, useBag } from "@/lib/indigo-loom/bag";
import { href, img } from "@/lib/indigo-loom/content";
import { rupees } from "@/lib/indigo-loom/format";
import { products } from "@/lib/indigo-loom/products";
import { Icon } from "./icons";
import { ProductCard } from "./ProductCard";
import { QtyStepper } from "./QtyStepper";

export function BagPage() {
  const { items, count, subtotal, savings } = useBag();
  const inBag = new Set(items.map((i) => i.slug));
  const more = products.filter((p) => !inBag.has(p.slug)).slice(0, 4);

  return (
    <>
      {items.length === 0 ? (
        <div className="empty big-empty">
          <Icon name="bag" size={40} />
          <p className="serif">Your bag is empty.</p>
          <p className="muted">Pieces you add will stay here, even if you close the tab.</p>
          <Link className="btn" href={href("/shop")}>Shop the collection</Link>
        </div>
      ) : (
        <div className="bag-grid">
          <section aria-labelledby="il-bag-items">
            <h2 id="il-bag-items" className="sr-only">Items in your bag</h2>
            <ul className="bag-lines">
              {items.map((i) => (
                <li key={i.key} className="bline big">
                  <Link className="ph" href={href(`/products/${i.slug}`)}><Image src={img(i.product.image)} alt="" fill sizes="(max-width: 760px) 96px, 140px" className="fill" /></Link>
                  <div className="tx">
                    <div className="top">
                      <div>
                        <Link href={href(`/products/${i.slug}`)} className="nm">{i.product.name}</Link>
                        <p className="muted">{i.product.craft} · {i.product.cluster}</p>
                        <p className="muted">{i.product.colour} · Size {i.size}</p>
                      </div>
                      <div className="amt">
                        <b>{rupees(i.product.price * i.qty)}</b>
                        {i.qty > 1 && <span className="muted small">{rupees(i.product.price)} each</span>}
                      </div>
                    </div>
                    <div className="ctl">
                      <QtyStepper value={i.qty} label={`${i.product.name}, size ${i.size}`} onChange={(n) => bag.setQty(i.slug, i.size, n)} />
                      <button type="button" className="tlink" onClick={() => bag.remove(i.slug, i.size)}><Icon name="trash" size={15} />Remove<span className="sr-only"> {i.product.name}</span></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <aside className="summary" aria-labelledby="il-sum-h">
            <h2 id="il-sum-h">Order summary</h2>
            <div className="row"><span>Subtotal ({count} {count === 1 ? "item" : "items"})</span><span>{rupees(subtotal)}</span></div>
            {savings > 0 && <div className="row save"><span>You save</span><span>{rupees(savings)}</span></div>}
            <div className="row"><span>Shipping</span><span>Free</span></div>
            <div className="row tot"><span>Total</span><b>{rupees(subtotal)}</b></div>
            <p className="muted small">Inclusive of GST. Have a code? Add it at checkout.</p>
            <Link className="btn block" href={href("/checkout")}><Icon name="lock" size={16} />Checkout</Link>
            <ul className="perks">
              <li><Icon name="truck" size={18} />Dispatched from Pune within 24 hours</li>
              <li><Icon name="cash" size={18} />Cash on delivery available</li>
              <li><Icon name="returns" size={18} />7-day returns, free pickup</li>
            </ul>
          </aside>
        </div>
      )}
      <section className="more" aria-labelledby="il-more-h">
        <h2 id="il-more-h" className="h3">You may also <i>like</i></h2>
        <div className="pgrid four">{more.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>
    </>
  );
}
