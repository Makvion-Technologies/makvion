import Link from "next/link";
import { href } from "@/lib/indigo-loom/content";

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link className="word" href={href()} onClick={onClick} aria-label="Indigo Loom, home">
      Indigo Loom<small aria-hidden="true">Handwoven in India</small>
    </Link>
  );
}
