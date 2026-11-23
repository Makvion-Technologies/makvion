import { Icon } from "./icons";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}<Icon name="plus" size={18} /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
