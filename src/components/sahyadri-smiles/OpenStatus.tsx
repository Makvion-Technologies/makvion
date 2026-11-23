"use client";
import { openStatus, useNowMinute } from "@/lib/sahyadri-smiles/time";

/** Live open/closed status in India time. Renders the weekly hours until the browser takes over. */
export function OpenStatus() {
  const now = useNowMinute();
  if (now === null) return <span><span className="status-dot" aria-hidden="true" /><b>Mon to Fri</b> &nbsp;9:30 am – 8:30 pm</span>;
  const s = openStatus(now * 60_000);
  const [lead, rest] = s.text.split(" · ");
  return (
    <span>
      <span className={`status-dot${s.open ? "" : " closed"}`} aria-hidden="true" />
      <b>{lead}</b> · {rest}
    </span>
  );
}
