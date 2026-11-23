"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { href } from "@/lib/sahyadri-smiles/content";
import { upcomingDays } from "@/lib/sahyadri-smiles/slots";
import { useNowMinute } from "@/lib/sahyadri-smiles/time";
import { Icon } from "./icons";

const REASONS = [
  { id: "check-up-and-cleaning", label: "Check-up" },
  { id: "pain", label: "Tooth pain" },
  { id: "teeth-whitening", label: "Whitening" },
  { id: "braces-and-aligners", label: "Braces & aligners" },
  { id: "kids-dentistry", label: "For my child" },
];
const WHEN = ["Today", "Tomorrow", "This weekend", "Pick a date"] as const;

export function QuickBook() {
  const router = useRouter();
  const now = useNowMinute();
  const [reason, setReason] = useState("check-up-and-cleaning");
  const [when, setWhen] = useState<(typeof WHEN)[number]>("Tomorrow");

  const go = () => {
    const params = new URLSearchParams({ treatment: reason });
    if (now !== null && when !== "Pick a date") {
      const days = upcomingDays(now * 60_000, 8);
      const d = when === "Today" ? days[0] : when === "Tomorrow" ? days[1] : days.find((x) => x.dow === 6);
      if (d && !d.closed) params.set("date", d.key);
    }
    router.push(`${href("/book")}?${params.toString()}`);
  };

  return (
    <section className="qb" aria-labelledby="qb-title">
      <div className="wrap">
        <div className="qb-card ss-reveal">
          <div>
            <h2 id="qb-title">Book in two taps</h2>
            <p>No forms to begin with. We call to confirm within 15 minutes.</p>
          </div>
          <div role="group" aria-labelledby="qb-1">
            <p className="step-k" id="qb-1"><b>1</b>What brings you in?</p>
            <div className="chips">
              {REASONS.map((r) => <button key={r.id} type="button" className="chip" aria-pressed={reason === r.id} onClick={() => setReason(r.id)}>{r.label}</button>)}
            </div>
          </div>
          <div role="group" aria-labelledby="qb-2">
            <p className="step-k" id="qb-2"><b>2</b>When suits you?</p>
            <div className="chips">
              {WHEN.map((w) => <button key={w} type="button" className="chip" aria-pressed={when === w} onClick={() => setWhen(w)}>{w}</button>)}
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={go}>See times <Icon name="right" size={18} /></button>
        </div>
      </div>
    </section>
  );
}
