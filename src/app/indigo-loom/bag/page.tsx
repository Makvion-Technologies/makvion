import { BagPage } from "@/components/indigo-loom/BagPage";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = { ...pageMeta("Your bag", "Review the pieces in your bag, change quantities and check out with UPI, cards, netbanking or cash on delivery.", "/bag"), robots: { index: false } };

export default function Bag() {
  return (
    <>
      <PageHead kicker="Free shipping across India" title="Your" italic="bag" crumbs={[{ label: "Bag" }]} />
      <div className="wrap"><BagPage /></div>
    </>
  );
}
