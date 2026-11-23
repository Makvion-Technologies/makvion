import Link from "next/link";
import { Gallery } from "@/components/kesar-kitchen/Gallery";
import { PageHero } from "@/components/kesar-kitchen/PageHero";
import { href } from "@/lib/kesar-kitchen/content";
import { pageMeta } from "@/lib/kesar-kitchen/meta";

export const metadata = pageMeta("Gallery", "Photos of the food, the rooms and the kitchen at Kesar Kitchen, Koregaon Park, Pune.", "/gallery");

export default function GalleryPage() {
  return (
    <>
      <PageHero image="platter" crumb="Gallery" label="Gallery" title={<>A look <em>inside</em></>} lead="The food, the rooms and the people who keep the tandoor burning." />
      <section className="section">
        <div className="wrap">
          <Gallery />
          <div className="btn-row" style={{ marginTop: "3rem", justifyContent: "center" }}><Link className="btn" href={href("/reserve")}>Reserve a table</Link></div>
        </div>
      </section>
    </>
  );
}
