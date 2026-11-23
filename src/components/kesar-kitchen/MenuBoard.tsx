"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { img } from "@/lib/kesar-kitchen/content";
import { menu } from "@/lib/kesar-kitchen/menu";
import { Icon } from "./icons";
import { MenuItem } from "./MenuItem";

type Diet = "all" | "veg" | "nonveg";

/** Full menu with category tabs, a veg / non-veg filter, a house-favourites toggle and search. */
export function MenuBoard() {
  const [cat, setCat] = useState("all");
  const [diet, setDiet] = useState<Diet>("all");
  const [favs, setFavs] = useState(false);
  const [q, setQ] = useState("");

  const sections = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return menu
      .filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({
        ...c,
        items: c.items.filter((d) => (diet === "all" || (diet === "veg" ? d.veg : !d.veg)) && (!favs || d.fav) && (!needle || `${d.name} ${d.desc}`.toLowerCase().includes(needle))),
      }))
      .filter((c) => c.items.length > 0);
  }, [cat, diet, favs, q]);
  const count = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <div className="catbar">
        <div className="wrap">
          <div className="tabs" role="group" aria-label="Menu sections">
            <button type="button" className="tab" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All</button>
            {menu.map((c) => <button key={c.id} type="button" className="tab" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</button>)}
          </div>
          <div className="filters">
            <div className="seg" role="group" aria-label="Dietary filter">
              <button type="button" aria-pressed={diet === "all"} onClick={() => setDiet("all")}>All</button>
              <button type="button" aria-pressed={diet === "veg"} onClick={() => setDiet("veg")}><span className="vg" aria-hidden="true" />Veg</button>
              <button type="button" aria-pressed={diet === "nonveg"} onClick={() => setDiet("nonveg")}><span className="vg nv" aria-hidden="true" />Non-veg</button>
            </div>
            <div className="seg" role="group" aria-label="House favourites">
              <button type="button" aria-pressed={favs} onClick={() => setFavs(!favs)}><Icon name="star" size={14} style={{ marginRight: ".375rem" }} />Favourites</button>
            </div>
            <label className="search">
              <span className="sr-only">Search the menu</span>
              <Icon name="search" size={16} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes" />
            </label>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{count} dishes shown</p>
      {sections.length === 0 && (
        <div className="wrap mempty">
          <p>No dishes match those filters.</p>
          <button type="button" className="btn ghost sm" style={{ marginTop: "1.25rem" }} onClick={() => { setCat("all"); setDiet("all"); setFavs(false); setQ(""); }}>Clear filters</button>
        </div>
      )}
      {sections.map((c) => {
        const idx = menu.findIndex((m) => m.id === c.id);
        return (
          <section className="msec" id={c.id} key={c.id} aria-labelledby={`h-${c.id}`}>
            <div className="wrap head">
              <div>
                <span className="label">{String(idx + 1).padStart(2, "0")}</span>
                <h2 id={`h-${c.id}`}>{c.name}</h2>
                <p>{c.blurb}</p>
                <div className="ph"><Image src={img(c.image)} alt="" fill sizes="(max-width: 900px) 1px, 30vw" className="fill" /></div>
              </div>
              <div className="mlist">{c.items.map((d) => <MenuItem key={d.name} d={d} />)}</div>
            </div>
          </section>
        );
      })}
    </>
  );
}
