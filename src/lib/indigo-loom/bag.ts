"use client";
import { useSyncExternalStore } from "react";
import { bySlug, type Product, type Size } from "./products";

export type BagLine = { slug: string; size: Size; qty: number };
export type BagItem = BagLine & { product: Product; key: string };

const KEY = "indigo-loom-bag-v1";
const MAX_QTY = 5;
const EMPTY: BagLine[] = [];
const listeners = new Set<() => void>();
let cache: BagLine[] | null = null;

function read(): BagLine[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as unknown;
    cache = Array.isArray(raw)
      ? raw.filter((l): l is BagLine => !!l && typeof l.slug === "string" && typeof l.size === "string" && Number.isInteger(l.qty) && !!bySlug(l.slug)).map((l) => ({ ...l, qty: Math.min(MAX_QTY, Math.max(1, l.qty)) }))
      : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: BagLine[]) {
  cache = next;
  try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage full or blocked: keep in memory */ }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; cb(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
}

export const bag = {
  add(slug: string, size: Size, qty = 1) {
    const lines = read();
    const hit = lines.find((l) => l.slug === slug && l.size === size);
    write(hit ? lines.map((l) => (l === hit ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l)) : [...lines, { slug, size, qty: Math.min(MAX_QTY, qty) }]);
  },
  setQty(slug: string, size: Size, qty: number) {
    if (qty < 1) return bag.remove(slug, size);
    write(read().map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)));
  },
  remove(slug: string, size: Size) {
    write(read().filter((l) => !(l.slug === slug && l.size === size)));
  },
  clear() { write([]); },
};

export { MAX_QTY };

export function useBag() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const items: BagItem[] = lines.map((l) => ({ ...l, product: bySlug(l.slug)!, key: `${l.slug}:${l.size}` }));
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const mrpTotal = items.reduce((n, i) => n + i.qty * (i.product.mrp ?? i.product.price), 0);
  return { items, count, subtotal, savings: mrpTotal - subtotal };
}

/* Bag drawer open state, shared between the header, product pages and the drawer. */
let drawerOpen = false;
const drawerListeners = new Set<() => void>();
export const drawer = {
  open() { drawerOpen = true; drawerListeners.forEach((l) => l()); },
  close() { drawerOpen = false; drawerListeners.forEach((l) => l()); },
};
export function useDrawer() {
  return useSyncExternalStore((cb) => { drawerListeners.add(cb); return () => drawerListeners.delete(cb); }, () => drawerOpen, () => false);
}

export const CODES: Record<string, { pct: number; label: string }> = { LOOM10: { pct: 10, label: "10% off your first order" } };
export const COD_FEE = 49;
export const EXPRESS_FEE = 150;
