import { Checkout } from "@/components/indigo-loom/Checkout";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = { ...pageMeta("Checkout", "Secure checkout with UPI, cards, netbanking or cash on delivery.", "/checkout"), robots: { index: false } };

export default function CheckoutPage() {
  return <div className="wrap co-wrap"><Checkout /></div>;
}
