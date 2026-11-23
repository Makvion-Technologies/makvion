import type { SVGProps } from "react";

const paths = {
  tooth: <path d="M7.5 3.5c-2.6 0-4 2-4 4.6 0 2.3 1 3.6 1.6 5.6.7 2.4.9 6.8 2.8 6.8 1.7 0 1.6-4.6 4.1-4.6s2.4 4.6 4.1 4.6c1.9 0 2.1-4.4 2.8-6.8.6-2 1.6-3.3 1.6-5.6 0-2.6-1.4-4.6-4-4.6-1.9 0-2.8 1.1-4.5 1.1S9.4 3.5 7.5 3.5Z" />,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  right: <path d="M5 12h14M13 6l6 6-6 6" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  cal: (<><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />,
  shield: (<><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></>),
  smile: (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" /></>),
  spark: <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />,
  braces: (<><rect x="3" y="8" width="5" height="8" rx="1.5" /><rect x="9.5" y="8" width="5" height="8" rx="1.5" /><rect x="16" y="8" width="5" height="8" rx="1.5" /><path d="M2 12h20" /></>),
  implant: (<><path d="M7 3.5h10c0 3-1.5 4.5-5 4.5S7 6.5 7 3.5Z" /><path d="M9 10h6M9.5 13h5M10 16h4M11 19h2" /></>),
  kid: (<><circle cx="12" cy="8" r="4" /><path d="M5 21c.8-4 3.6-6 7-6s6.2 2 7 6" /></>),
  pin: (<><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  mail: (<><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4 7 8 6 8-6" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  users: (<><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" /><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.5 3.5 5.2" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>),
  moon: <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" />,
  car: (<><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3.5 16h17v3h-17zM5 11h14" /></>),
  wheelchair: (<><circle cx="11" cy="4.5" r="1.5" /><path d="M11 7.5v6h5l2 5" /><path d="M8 10.5a5.5 5.5 0 1 0 7.5 7" /></>),
  card: (<><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></>),
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  info: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></>),
  alert: (<><path d="M12 4 2.8 19.5h18.4L12 4Z" /><path d="M12 10v4M12 17h.01" /></>),
  globe: (<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.5 3.4 5.3 3.4 8.5s-1.1 6-3.4 8.5c-2.3-2.5-3.4-5.3-3.4-8.5S9.7 6 12 3.5Z" /></>),
} as const;

export type IconName = keyof typeof paths | "whatsapp";

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  if (name === "whatsapp") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
        <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  );
}
