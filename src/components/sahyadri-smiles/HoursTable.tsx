"use client";
import { hours } from "@/lib/sahyadri-smiles/content";
import { fmtTime, istParts, useNowMinute } from "@/lib/sahyadri-smiles/time";

export function HoursTable() {
  const now = useNowMinute();
  const today = now === null ? -1 : istParts(now * 60_000).dow;
  return (
    <table className="hours-table">
      <caption className="sr-only">Clinic opening hours</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className={h.day === today ? "today" : undefined}>
            <th scope="row">{h.label}{h.day === today && <span className="today-tag">Today</span>}</th>
            <td>{h.open !== undefined && h.close !== undefined ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : h.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
