"use client";
import { useRef, useState } from "react";
import { menu } from "@/lib/kesar-kitchen/menu";
import { MenuItem } from "./MenuItem";

const cats = menu.filter((c) => c.id !== "drinks");

/** Tabbed menu preview on the home page (WAI-ARIA tabs with arrow-key support). */
export function MenuPreview() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % cats.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + cats.length) % cats.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = cats.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  };
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Menu sections">
        {cats.map((c, i) => (
          <button key={c.id} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={`mp-tab-${c.id}`} aria-controls={`mp-panel-${c.id}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} className="tab" onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}>
            {c.name}
          </button>
        ))}
      </div>
      {cats.map((c, i) => (
        <div key={c.id} role="tabpanel" id={`mp-panel-${c.id}`} aria-labelledby={`mp-tab-${c.id}`} hidden={active !== i}>
          {c.items.slice(0, 5).map((d) => <MenuItem key={d.name} d={d} />)}
        </div>
      ))}
    </>
  );
}
