import { notFound } from "next/navigation";

/** Sends unknown /indigo-loom/* URLs to this site's own 404 page. */
export default function Missing() {
  notFound();
}
