"use client";
import { MAX_QTY } from "@/lib/indigo-loom/bag";
import { Icon } from "./icons";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="qty" role="group" aria-label={`Quantity, ${label}`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label={value === 1 ? `Remove ${label}` : `Decrease quantity of ${label}`}><Icon name="minus" size={14} /></button>
      <output aria-live="polite" aria-label="Quantity">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label={`Increase quantity of ${label}`}><Icon name="plus" size={14} /></button>
    </div>
  );
}
