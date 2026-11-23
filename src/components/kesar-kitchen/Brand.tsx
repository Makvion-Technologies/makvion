import Link from "next/link";
import { href, info } from "@/lib/kesar-kitchen/content";

export function Brand({ onClick, className = "brand" }: { onClick?: () => void; className?: string }) {
  return (
    <Link href={href()} className={className} onClick={onClick} aria-label="Kesar Kitchen, home">
      <b>{info.name}</b>
      <small>{info.tagline}</small>
    </Link>
  );
}
