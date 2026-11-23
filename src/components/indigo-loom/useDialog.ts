"use client";
import { type RefObject, useEffect } from "react";

/** Focus trap, Escape to close, scroll lock and focus return for a modal panel. */
export function useDialog(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void, returnTo?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const prevFocus = (returnTo?.current ?? document.activeElement) as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select, textarea") ?? []).filter((el) => el.offsetParent !== null);
    window.setTimeout(() => (ref.current?.querySelector<HTMLElement>("[data-autofocus]") ?? focusables()[0])?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab") {
        const items = focusables();
        if (!items.length) return;
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
      prevFocus?.focus?.();
    };
  }, [open, ref, onClose, returnTo]);
}
