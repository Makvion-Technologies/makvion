import type { Dish } from "@/lib/kesar-kitchen/menu";
import { VegMark } from "./icons";

export const rupees = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;

export function MenuItem({ d, as: H = "h3" }: { d: Dish; as?: "h3" | "h4" }) {
  return (
    <div className="item">
      <div className="t">
        <H><VegMark veg={d.veg} />{d.name}</H>
        <span className="dots" aria-hidden="true" />
        <span className="p">{rupees(d.price)}</span>
      </div>
      <p>{d.fav && <span className="chef-tag">House favourite</span>}{d.desc}</p>
    </div>
  );
}
