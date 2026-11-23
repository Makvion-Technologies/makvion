import { useSyncExternalStore } from "react";
import { hours } from "./content";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServer = () => null;

/** Current time in whole minutes since epoch, or null while prerendering (avoids hydration mismatch). */
export function useNowMinute(): number | null {
  return useSyncExternalStore(subscribe, getMinute, getServer);
}

/** Wall-clock parts in India time (UTC+5:30) for a timestamp. */
export function istParts(ms: number) {
  const d = new Date(ms + 330 * 60_000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), dow: d.getUTCDay(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

export function fmtTime(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${((h + 11) % 12) + 1}:${m.toString().padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

export function openStatus(ms: number) {
  const { dow, minutes } = istParts(ms);
  const today = hours.find((h) => h.day === dow)!;
  if (today.open !== undefined && today.close !== undefined) {
    if (minutes >= today.open && minutes < today.close) return { open: true, text: `Open now · until ${fmtTime(today.close)}` };
    if (minutes < today.open) return { open: false, text: `Closed · opens today at ${fmtTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours.find((h) => h.day === (dow + i) % 7)!;
    if (next.open !== undefined) return { open: false, text: `Closed · opens ${i === 1 ? "tomorrow" : next.label} at ${fmtTime(next.open)}` };
  }
  return { open: false, text: "Closed" };
}
