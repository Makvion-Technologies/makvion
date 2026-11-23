"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic, href, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";

/** Sticky call / WhatsApp / book bar on phones. Hidden on the booking page itself. */
export function MobileBar() {
  const pathname = usePathname() ?? "";
  const onBook = pathname.startsWith(href("/book"));
  return (
    <div className={`mob-bar${onBook ? " hide" : ""}`} aria-hidden={onBook} inert={onBook}>
      <a href={clinic.phoneHref}><Icon name="phone" size={18} />Call</a>
      <a className="wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />Chat</a>
      <Link className="b" href={href("/book")}><Icon name="cal" size={18} />Book visit</Link>
    </div>
  );
}
