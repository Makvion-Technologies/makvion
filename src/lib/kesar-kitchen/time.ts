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

/** Wall-clock parts in India time (UTC+5:30). */
export function istParts(ms: number) {
  const d = new Date(ms + 330 * 60_000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), dow: d.getUTCDay(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

export function fmtTime(min: number) {
  const m24 = min % 1440;
  const h = Math.floor(m24 / 60);
  const m = m24 % 60;
  if (m24 === 720) return "12 noon";
  return `${((h + 11) % 12) + 1}:${m.toString().padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** Open/closed text, handling kitchens that close after midnight. */
export function openStatus(ms: number) {
  const { dow, minutes } = istParts(ms);
  const today = hours.find((h) => h.day === dow)!;
  const yesterday = hours.find((h) => h.day === (dow + 6) % 7)!;
  if (minutes + 1440 < yesterday.close) return { open: true, text: `Open now · till ${fmtTime(yesterday.close)}` };
  if (minutes >= today.open && minutes < today.close) return { open: true, text: `Open now · till ${fmtTime(today.close)}` };
  return { open: false, text: `Closed · opens at ${fmtTime(today.open)}` };
}
