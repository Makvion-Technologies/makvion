"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, info } from "@/lib/kesar-kitchen/content";
import { Icon } from "./icons";

/** Call / menu / reserve bar on phones. Hidden on the reservation page. */
export function MobileBar() {
  const pathname = usePathname() ?? "";
  const hide = pathname.startsWith(href("/reserve"));
  return (
    <div className={`mob-bar${hide ? " hide" : ""}`} aria-hidden={hide} inert={hide}>
      <a href={info.phoneHref}><Icon name="phone" size={16} />Call</a>
      <Link href={href("/menu")}>Menu</Link>
      <Link className="b" href={href("/reserve")}>Reserve</Link>
    </div>
  );
}
