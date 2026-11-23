"use client";
import { hours } from "@/lib/kesar-kitchen/content";
import { fmtTime, istParts, useNowMinute } from "@/lib/kesar-kitchen/time";

export function HoursList() {
  const now = useNowMinute();
  const today = now === null ? -1 : istParts(now * 60_000).dow;
  return (
    <dl className="hrs">
      {hours.map((h) => (
        <div key={h.day} className={h.day === today ? "now" : undefined}>
          <dt>{h.label}{h.day === today && <span className="sr-only"> (today)</span>}</dt>
          <dd>{fmtTime(h.open)} – {fmtTime(h.close)}</dd>
        </div>
      ))}
    </dl>
  );
}
