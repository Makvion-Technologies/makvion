import Image from "next/image";
import Link from "next/link";
import type { Dentist, Review, Treatment } from "@/lib/sahyadri-smiles/content";
import { href, img } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";

export function TreatmentCard({ t }: { t: Treatment }) {
  return (
    <Link href={href(`/treatments/${t.slug}`)} className="tcard-img">
      <div className="ph"><Image src={img(t.image)} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" className="fill" /></div>
      <div className="body">
        <h3><span className="ti"><Icon name={t.icon} size={22} /></span>{t.name}</h3>
        <p>{t.short}</p>
        <div className="meta-row"><span><Icon name="clock" size={14} />{t.duration}</span><span>{t.visits}</span></div>
      </div>
    </Link>
  );
}

export function DentistCard({ d, sizes = "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px" }: { d: Dentist; sizes?: string }) {
  return (
    <article className="doc">
      <div className="ph"><Image src={img(d.image)} alt={`${d.name}, ${d.role.toLowerCase()} at Sahyadri Smiles`} fill sizes={sizes} className="fill" style={{ objectPosition: "50% 20%" }} /></div>
      <div className="body">
        <h3>{d.name}</h3>
        <span className="role">{d.role}</span>
        <span className="q">{d.quals}</span>
        <p>{d.bio}</p>
        <span className="days"><Icon name="cal" size={15} />In clinic {d.days}</span>
        <div className="langs" aria-label="Languages spoken">{d.languages.map((l) => <span key={l}>{l}</span>)}</div>
      </div>
    </article>
  );
}

export function Stars({ n = 5, size = 16 }: { n?: number; size?: number }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => <Icon key={i} name="star" size={size} strokeWidth={1.2} />)}
    </span>
  );
}

export function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="review">
      <Stars />
      <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
      <span className="tag">{r.treatment}</span>
      <figcaption><span className="avatar" aria-hidden="true">{r.name[0]}</span><span><b>{r.name}</b>{r.area}, Pune</span></figcaption>
    </figure>
  );
}
