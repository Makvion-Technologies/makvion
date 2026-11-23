import type { SVGProps } from "react";

const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
  left: <path d="m15 6-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3 8h18M3 16h18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4Z" />,
  pin: <><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  cal: <><rect x="3.5" y="5" width="17" height="15" rx="1" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  users: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3 19.5c.7-3.3 3.1-5 6-5s5.3 1.7 6 5" /><path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.8c1.8.6 3 2.2 3.5 4.7" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.4-4.4" /></>,
  alert: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5M12 16.2v.3" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.3" /></>,
  download: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />,
  star: <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6L12 4Z" />,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  bike: <><circle cx="6" cy="16.5" r="3.5" /><circle cx="18" cy="16.5" r="3.5" /><path d="M6 16.5 9.5 9h5l3.5 7.5M12 9 9.5 4.5H7M14.5 9 16 6h2.5" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  car: <><path d="M5 16V11l2-4.5h10L19 11v5" /><path d="M3.5 16h17v2.5h-17zM7 13h.5M16.5 13h.5" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4 6.5 8 6 8-6" /></>,
  whatsapp: <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Zm-3 4.7c.2-.4.5-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.5.9 1.4 1.8 2.4 2.4.3.2.5.1.6 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .5-.2 1.3-1 1.7-.7.4-1.7.5-3.6-.4a10 10 0 0 1-4-3.9c-.6-1.1-.7-2.2-.2-3.1Z" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const solid = name === "whatsapp";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={solid ? "currentColor" : "none"} stroke={solid ? "none" : "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  );
}

/** Indian veg / non-veg mark, with an accessible label. */
export function VegMark({ veg }: { veg: boolean }) {
  return <span className={veg ? "vg" : "vg nv"} role="img" aria-label={veg ? "Vegetarian" : "Non-vegetarian"} />;
}
