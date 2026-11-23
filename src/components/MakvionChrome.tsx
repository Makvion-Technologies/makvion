"use client";
import { usePathname } from "next/navigation";

/** Client websites hosted under makvion.com that bring their own header, footer and widgets. */
const STANDALONE_SITES = ["/sahyadri-smiles", "/kesar-kitchen", "/indigo-loom"];

export function isStandaloneSite(pathname: string | null) {
  return !!pathname && STANDALONE_SITES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Renders Makvion's site chrome (header, footer, floating buttons) everywhere except standalone client sites. */
export function MakvionChrome({ children }: { children: React.ReactNode }) {
  return isStandaloneSite(usePathname()) ? null : <>{children}</>;
}
