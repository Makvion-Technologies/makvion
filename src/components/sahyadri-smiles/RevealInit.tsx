"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades sections in as they scroll into view. Content is never left hidden: a timer shows everything after 2.5s. */
export function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const els = () => Array.from(document.querySelectorAll<HTMLElement>(".ss .ss-reveal:not(.in)"));
    const show = (el: Element) => el.classList.add("in");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els().forEach(show);
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els().forEach((el) => (el.getBoundingClientRect().top < window.innerHeight * 0.95 ? show(el) : io.observe(el)));
    const t = window.setTimeout(() => els().forEach(show), 2500);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [pathname]);
  return null;
}
