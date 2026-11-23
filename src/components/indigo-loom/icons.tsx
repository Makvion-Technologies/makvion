import type { SVGProps } from "react";

const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
  left: <path d="m15 6-6 6 6 6" />,
  down: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3 9h18M3 15h18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  truck: <><path d="M2.5 6h12v10.5h-12zM14.5 9.5h4l3 3.5v3.5h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="18" cy="18" r="1.8" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="1" /><circle cx="12" cy="12" r="2.6" /></>,
  returns: <><path d="M6 8.5h10a5 5 0 0 1 0 10H8" /><path d="m9.5 5-3.5 3.5L9.5 12" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="1" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>,
  alert: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5M12 16.2v.3" /></>,
  star: <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6L12 4Z" />,
  ruler: <><path d="M3 15.5 15.5 3 21 8.5 8.5 21z" /><path d="m7 11.5 2 2M10 8.5l2 2M13 5.5l2 2" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4 6.5 8 6 8-6" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  trash: <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />,
  whatsapp: <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Zm-3 4.7c.2-.4.5-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.5.9 1.4 1.8 2.4 2.4.3.2.5.1.6 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .5-.2 1.3-1 1.7-.7.4-1.7.5-3.6-.4a10 10 0 0 1-4-3.9c-.6-1.1-.7-2.2-.2-3.1Z" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const solid = name === "whatsapp";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={solid ? "currentColor" : "none"} stroke={solid ? "none" : "currentColor"} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  );
}

export function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="stars">
      <span className="s" role="img" aria-label={`Rated ${rating} out of 5`}>{"★★★★★"}</span>
      <span>{rating.toFixed(1)}{count !== undefined && <> · {count} reviews</>}</span>
    </span>
  );
}
