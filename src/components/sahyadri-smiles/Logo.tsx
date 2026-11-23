import Link from "next/link";
import { href } from "@/lib/sahyadri-smiles/content";
import { Icon } from "./icons";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href={href()} className="logo" onClick={onClick} aria-label="Sahyadri Smiles Family Dental Clinic, home">
      <span className="mark"><Icon name="tooth" size={22} /></span>
      <span>Sahyadri Smiles<small>Family Dental Clinic</small></span>
    </Link>
  );
}
