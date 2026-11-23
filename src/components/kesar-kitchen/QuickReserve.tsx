"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { href } from "@/lib/kesar-kitchen/content";
import { upcomingDays } from "@/lib/kesar-kitchen/slots";
import { useNowMinute } from "@/lib/kesar-kitchen/time";

/** Pick party size and day, then continue to the full reservation form with both filled in. */
export function QuickReserve() {
  const router = useRouter();
  const now = useNowMinute();
  const [party, setParty] = useState(2);
  const [day, setDay] = useState(0);
  const days = now === null ? [] : upcomingDays(now * 60_000, 4);
  const go = () => {
    const d = days[day];
    router.push(href(`/reserve?party=${party}${d ? `&date=${d.key}` : ""}`));
  };
  return (
    <form className="qr" onSubmit={(e) => { e.preventDefault(); go(); }}>
      <h3>Reserve a table</h3>
      <p className="sub">Instant confirmation, with a WhatsApp reminder.</p>
      <fieldset>
        <legend>Guests</legend>
        <div className="chips" role="radiogroup" aria-label="Guests">
          {[1, 2, 3, 4, 5, 6, 8].map((n) => <button key={n} type="button" role="radio" className="chip" aria-checked={party === n} onClick={() => setParty(n)}>{n === 8 ? "7+" : n}</button>)}
        </div>
      </fieldset>
      <fieldset>
        <legend>When</legend>
        <div className="chips" role="radiogroup" aria-label="Day">
          {(days.length ? days : [{ key: "a", label: "Today" }, { key: "b", label: "Tomorrow" }, { key: "c", label: "…" }, { key: "d", label: "…" }]).map((d, i) => (
            <button key={d.key} type="button" role="radio" className="chip" aria-checked={day === i} onClick={() => setDay(i)}>{d.label}</button>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="btn block">See available times</button>
      <p className="fine">No booking fee. Free cancellation up to 2 hours before.</p>
    </form>
  );
}
