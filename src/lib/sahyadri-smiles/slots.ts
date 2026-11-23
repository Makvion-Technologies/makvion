import { hours } from "./content";
import { fmtTime, istParts } from "./time";

export type Day = { key: string; dow: number; label: string; short: string; dayNum: number; month: string; closed: boolean; isToday: boolean };
export type Slot = { min: number; label: string; available: boolean; period: "Morning" | "Afternoon" | "Evening" };

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function upcomingDays(nowMs: number, count = 14): Day[] {
  const t = istParts(nowMs);
  const out: Day[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.UTC(t.y, t.m, t.d + i));
    const dow = date.getUTCDay();
    const h = hours.find((x) => x.day === dow)!;
    out.push({
      key: date.toISOString().slice(0, 10),
      dow,
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : DOW_LONG[dow],
      short: i === 0 ? "Today" : DOW[dow],
      dayNum: date.getUTCDate(),
      month: MON[date.getUTCMonth()],
      closed: h.open === undefined,
      isToday: i === 0,
    });
  }
  return out;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

/** 45-minute slots within opening hours, skipping the 1:15 to 2:30 pm lunch break. */
export function slotsFor(day: Day, nowMs: number): Slot[] {
  const h = hours.find((x) => x.day === day.dow)!;
  if (h.open === undefined || h.close === undefined) return [];
  const nowMin = istParts(nowMs).minutes;
  const out: Slot[] = [];
  for (let m = h.open + 15; m + 45 <= h.close; m += 45) {
    if (m >= 795 && m < 870) continue;
    const taken = hash(`${day.key}-${m}`) < 0.28;
    const past = day.isToday && m < nowMin + 60;
    out.push({ min: m, label: fmtTime(m), available: !taken && !past, period: m < 720 ? "Morning" : m < 1020 ? "Afternoon" : "Evening" });
  }
  return out;
}

export function longDate(day: Day) {
  const month = Number(day.key.slice(5, 7));
  return `${DOW_LONG[day.dow]}, ${day.dayNum} ${MON_LONG[month - 1]}`;
}
