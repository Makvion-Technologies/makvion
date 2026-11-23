"use client";
import { openStatus, useNowMinute } from "@/lib/kesar-kitchen/time";

export function OpenStatus({ className = "status" }: { className?: string }) {
  const now = useNowMinute();
  if (now === null) return <p className={className}><i aria-hidden="true" />Open every day from 12 noon</p>;
  const s = openStatus(now * 60_000);
  return <p className={`${className}${s.open ? "" : " closed"}`}><i aria-hidden="true" />{s.text}</p>;
}
