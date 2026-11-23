import { istParts } from "./time";

export type Day = { key: string; dow: number; label: string; short: string; dayNum: number; month: string; isToday: boolean };
export type Slot = { min: number; label: string; available: boolean; service: "Lunch" | "Dinner" };

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function upcomingDays(nowMs: number, count = 14): Day[] {
  const out: Day[] = [];
  for (let i = 0; i < count; i++) {
    const p = istParts(nowMs + i * 86_400_000);
    const key = `${p.y}-${String(p.m + 1).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;
    out.push({ key, dow: p.dow, label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : DOW_LONG[p.dow], short: i === 0 ? "Today" : DOW[p.dow], dayNum: p.d, month: MON[p.m], isToday: i === 0 });
  }
  return out;
}

export function longDate(d: Day) {
  const [, m] = d.key.split("-").map(Number);
  return `${DOW_LONG[d.dow]}, ${d.dayNum} ${MON_LONG[m - 1]}`;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

const fmt = (min: number) => {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};

/** Lunch 12:00–3:00 pm and dinner 7:00–11:30 pm (11:45 on Fri/Sat), every 30 minutes. Busy slots fill up faster for bigger parties. */
export function slotsFor(day: Day, party: number, nowMs: number): Slot[] {
  const lunch = [720, 750, 780, 810, 840, 870, 900];
  const dinner = [1140, 1170, 1200, 1230, 1260, 1290, 1320, 1350, 1380];
  if (day.dow === 5 || day.dow === 6) dinner.push(1410);
  const nowMin = day.isToday ? istParts(nowMs).minutes : -1;
  const rate = party >= 7 ? 0.45 : party >= 5 ? 0.33 : 0.22;
  const mk = (min: number, service: Slot["service"]): Slot => {
    const peak = min >= 1230 && min <= 1290 && (day.dow === 5 || day.dow === 6);
    const taken = (hash(`${day.key}-${min}-${party > 4 ? "L" : "S"}`) % 100) / 100 < rate + (peak ? 0.25 : 0);
    return { min, label: fmt(min), service, available: min > nowMin + 45 && !taken };
  };
  return [...lunch.map((m) => mk(m, "Lunch")), ...dinner.map((m) => mk(m, "Dinner"))];
}

export { fmt as fmtSlot };
