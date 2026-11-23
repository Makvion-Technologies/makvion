import { Icon } from "./icons";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}<span className="pm" aria-hidden="true"><Icon name="plus" size={16} /></span></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
