"use client";
import Link from "next/link";
import { href } from "@/lib/sahyadri-smiles/content";
import { longDate, slotsFor, upcomingDays } from "@/lib/sahyadri-smiles/slots";
import { useNowMinute } from "@/lib/sahyadri-smiles/time";

/** "Next available" card in the hero, using the same slot data as the booking page. */
export function HeroSlots() {
  const now = useNowMinute();
  let title = "Evening slots open this week";
  let links: { label: string; to: string }[] = [];
  if (now !== null) {
    const ms = now * 60_000;
    for (const d of upcomingDays(ms, 7)) {
      const free = slotsFor(d, ms).filter((s) => s.available);
      if (d.closed || free.length === 0) continue;
      const evening = free.filter((s) => s.min >= 960);
      const pick = (evening.length >= 3 ? evening : free).slice(0, 4);
      title = d.isToday ? `Today, ${longDate(d).split(",")[0]}` : d.label === "Tomorrow" ? `Tomorrow, ${longDate(d).split(",")[0]}` : longDate(d);
      links = pick.map((s) => ({ label: s.label.replace(" am", "").replace(" pm", ""), to: href(`/book?date=${d.key}&time=${s.min}`) }));
      break;
    }
  }
  return (
    <div className="float f-slot">
      <p className="k">Next available with Dr. Anjali</p>
      <strong>{title}</strong>
      <div className="slot-row">
        {links.length === 0
          ? [0, 1, 2, 3].map((i) => <span key={i} className="skel" aria-hidden="true" />)
          : links.map((l) => <Link key={l.to} href={l.to} aria-label={`Book ${l.label} ${title}`}>{l.label}</Link>)}
      </div>
    </div>
  );
}
