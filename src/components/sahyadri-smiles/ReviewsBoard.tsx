"use client";
import { useState } from "react";
import { reviews } from "@/lib/sahyadri-smiles/content";
import { ReviewCard } from "./Cards";

const TAGS = ["All", ...Array.from(new Set(reviews.map((r) => r.treatment)))];

export function ReviewsBoard() {
  const [tag, setTag] = useState("All");
  const list = tag === "All" ? reviews : reviews.filter((r) => r.treatment === tag);
  return (
    <>
      <div className="filter-row chips" role="group" aria-label="Filter reviews by treatment">
        {TAGS.map((t) => <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>)}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} reviews shown</p>
      <div className="reviews">{list.map((r) => <ReviewCard key={r.name} r={r} />)}</div>
    </>
  );
}
