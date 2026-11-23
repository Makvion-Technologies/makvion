"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { FABRICS, PRICE_BANDS, SIZES, SORTS, inStock, products, type Collection, type Size } from "@/lib/indigo-loom/products";
import { Icon } from "./icons";
import { ProductCard } from "./ProductCard";

type Key = "type" | "size" | "fabric" | "price";
const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function ShopGrid({ collection }: { collection?: Collection }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const uid = useId();

  const scope = useMemo(() => products.filter((p) => !collection || p.collection === collection), [collection]);
  const types = useMemo(() => Array.from(new Set(scope.map((p) => p.type))), [scope]);
  const fabrics = FABRICS.filter((f) => scope.some((p) => p.fabric === f));
  const sizes = SIZES.filter((s) => scope.some((p) => p.sizes.includes(s)));

  const sel: Record<Key, string[]> = { type: list(params.get("type")), size: list(params.get("size")), fabric: list(params.get("fabric")), price: list(params.get("price")) };
  const sort = SORTS.some((s) => s.id === params.get("sort")) ? (params.get("sort") as string) : "featured";
  const q = (params.get("q") ?? "").trim();

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mut(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const toggle = (key: Key, val: string) => update((p) => {
    const cur = list(p.get(key));
    const nv = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val];
    if (nv.length) p.set(key, nv.join(",")); else p.delete(key);
  });
  const clearAll = () => update((p) => { (["type", "size", "fabric", "price", "q"] as const).forEach((k) => p.delete(k)); });

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const out = scope.filter((p) => {
      if (sel.type.length && !sel.type.includes(p.type)) return false;
      if (sel.fabric.length && !sel.fabric.includes(p.fabric)) return false;
      if (sel.size.length && !sel.size.some((s) => inStock(p, s as Size))) return false;
      if (sel.price.length && !sel.price.some((id) => { const b = PRICE_BANDS.find((x) => x.id === id); return b && p.price >= b.min && p.price <= b.max; })) return false;
      if (words.length) {
        const hay = `${p.name} ${p.type} ${p.fabric} ${p.craft} ${p.cluster} ${p.colour} ${p.collection}`.toLowerCase();
        if (!words.every((w) => hay.includes(w.replace(/s$/, "")))) return false;
      }
      return true;
    });
    const by = {
      featured: () => 0,
      new: (a: typeof out[0], b: typeof out[0]) => b.added - a.added,
      "price-asc": (a: typeof out[0], b: typeof out[0]) => a.price - b.price,
      "price-desc": (a: typeof out[0], b: typeof out[0]) => b.price - a.price,
      rating: (a: typeof out[0], b: typeof out[0]) => b.rating - a.rating || b.reviews - a.reviews,
    }[sort as "featured"];
    return sort === "featured" ? out : [...out].sort(by);
  }, [scope, sel.type, sel.fabric, sel.size, sel.price, q, sort]);

  const active: { key: Key | "q"; val: string; label: string }[] = [
    ...(q ? [{ key: "q" as const, val: q, label: `“${q}”` }] : []),
    ...sel.type.map((v) => ({ key: "type" as const, val: v, label: v })),
    ...sel.size.map((v) => ({ key: "size" as const, val: v, label: `Size ${v}` })),
    ...sel.fabric.map((v) => ({ key: "fabric" as const, val: v, label: v })),
    ...sel.price.map((v) => ({ key: "price" as const, val: v, label: PRICE_BANDS.find((b) => b.id === v)?.label ?? v })),
  ];
  const nFilters = active.length;

  const group = (key: Key, title: string, opts: { val: string; label: string; n?: number }[]) => (
    <fieldset className="fgroup">
      <legend className="mono">{title}</legend>
      {key === "size" ? (
        <div className="size-opts">
          {opts.map((o) => (
            <label key={o.val} className="sz-chip">
              <input type="checkbox" checked={sel.size.includes(o.val)} onChange={() => toggle("size", o.val)} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      ) : (
        opts.map((o) => (
          <label key={o.val} className="check">
            <input type="checkbox" checked={sel[key].includes(o.val)} onChange={() => toggle(key, o.val)} />
            <span>{o.label}</span>{o.n !== undefined && <span className="n">{o.n}</span>}
          </label>
        ))
      )}
    </fieldset>
  );

  return (
    <div className="shop">
      <div className="toolbar">
        <button type="button" className="btn line sm ftoggle" aria-expanded={open} aria-controls={`${uid}-f`} onClick={() => setOpen(!open)}>
          <Icon name="filter" size={16} />Filters{nFilters > 0 && <span className="bagc">{nFilters}</span>}
        </button>
        <p className="count" aria-live="polite"><b>{shown.length}</b> {shown.length === 1 ? "piece" : "pieces"}</p>
        <label className="sort">
          <span className="mono">Sort</span>
          <select value={sort} onChange={(e) => update((p) => { if (e.target.value === "featured") p.delete("sort"); else p.set("sort", e.target.value); })}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <Icon name="down" size={16} />
        </label>
      </div>

      {nFilters > 0 && (
        <div className="active" aria-label="Active filters" role="group">
          {active.map((a) => (
            <button key={a.key + a.val} type="button" className="chip on" onClick={() => (a.key === "q" ? update((p) => p.delete("q")) : toggle(a.key, a.val))} aria-label={`Remove filter ${a.label}`}>
              {a.label}<Icon name="close" size={13} />
            </button>
          ))}
          <button type="button" className="tlink" onClick={clearAll}>Clear all</button>
        </div>
      )}

      <div className="shop-body">
        <aside id={`${uid}-f`} className={`filters${open ? " open" : ""}`} aria-label="Filters">
          {types.length > 1 && group("type", "Category", types.map((t) => ({ val: t, label: t, n: scope.filter((p) => p.type === t).length })))}
          {sizes.length > 1 && group("size", "Size", sizes.map((s) => ({ val: s, label: s })))}
          {group("price", "Price", PRICE_BANDS.map((b) => ({ val: b.id, label: b.label, n: scope.filter((p) => p.price >= b.min && p.price <= b.max).length })).filter((o) => o.n > 0))}
          {fabrics.length > 1 && group("fabric", "Fabric", fabrics.map((f) => ({ val: f, label: f, n: scope.filter((p) => p.fabric === f).length })))}
          <button type="button" className="btn block sm show-m" onClick={() => setOpen(false)}>Show {shown.length} {shown.length === 1 ? "piece" : "pieces"}</button>
        </aside>

        <div className="results">
          {shown.length === 0 ? (
            <div className="empty">
              <p className="serif">Nothing matches those filters.</p>
              <p className="muted">Try removing a size or fabric, or browse everything.</p>
              <button type="button" className="btn" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <div className="pgrid">
              {shown.map((p, i) => <ProductCard key={p.slug} p={p} preload={i < 2} sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
