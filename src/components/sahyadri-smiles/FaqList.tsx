import { Icon } from "./icons";

export function FaqList({ items, openFirst = false }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary>{f.q}<span className="pm" aria-hidden="true"><Icon name="plus" size={16} /></span></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
