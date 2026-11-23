import { notFound } from "next/navigation";

/** Sends unknown /sahyadri-smiles/* URLs to this site's own 404 page instead of Makvion's. */
export default function Missing() {
  notFound();
}
