import Link from "next/link";
import { Icon } from "@/components/indigo-loom/icons";
import { PageHead } from "@/components/indigo-loom/PageHead";
import { href, info, whatsappLink } from "@/lib/indigo-loom/content";
import { pageMeta } from "@/lib/indigo-loom/meta";

export const metadata = pageMeta("Shipping and returns", "Free shipping across India, dispatch within 24 hours, cash on delivery and 7-day returns with free pickup from your door.", "/shipping-returns");

export default function ShippingReturns() {
  return (
    <>
      <PageHead kicker="Help" title="Shipping and" italic="returns" intro="Free shipping on every order in India, and 7 days to change your mind." crumbs={[{ label: "Shipping and returns" }]} />
      <div className="wrap prose-grid">
        <nav className="toc" aria-label="On this page">
          <p className="mono dim">On this page</p>
          <a href="#shipping">Shipping</a><a href="#times">Delivery times</a><a href="#cod">Cash on delivery</a><a href="#returns">Returns and exchanges</a><a href="#refunds">Refunds</a>
        </nav>
        <div className="prose">
          <section id="shipping">
            <h2>Shipping</h2>
            <p>Standard shipping is free on every order within India. Orders placed before 2 pm on a working day leave our Pune studio the same day; everything else goes out within 24 hours. You&apos;ll get tracking on WhatsApp and email as soon as your parcel is picked up.</p>
            <p>Express delivery is available for ₹150 on Pune and metro pincodes.</p>
          </section>
          <section id="times">
            <h2>Delivery times</h2>
            <div className="tbl-wrap">
              <table>
                <caption className="sr-only">Delivery times by destination</caption>
                <thead><tr><th scope="col">Destination</th><th scope="col">Standard</th><th scope="col">Express</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Pune</th><td>1–2 working days</td><td>Next day</td></tr>
                  <tr><th scope="row">Rest of Maharashtra</th><td>2–3 working days</td><td>Not available</td></tr>
                  <tr><th scope="row">Metro cities</th><td>2–4 working days</td><td>1–2 working days</td></tr>
                  <tr><th scope="row">Rest of India</th><td>4–7 working days</td><td>Not available</td></tr>
                  <tr><th scope="row">North-east and J&amp;K</th><td>6–9 working days</td><td>Not available</td></tr>
                </tbody>
              </table>
            </div>
            <p className="muted small">Check the exact date for your pincode on any product page.</p>
          </section>
          <section id="cod">
            <h2>Cash on delivery</h2>
            <p>COD is available on most pincodes for orders up to ₹15,000, with a ₹49 handling fee. You can pay the courier in cash or by scanning their UPI code.</p>
          </section>
          <section id="returns">
            <h2>Returns and exchanges</h2>
            <ul className="ticks">
              <li><Icon name="check" size={16} />Return or exchange within 7 days of delivery.</li>
              <li><Icon name="check" size={16} />Pieces must be unworn, unwashed and have their tags attached.</li>
              <li><Icon name="check" size={16} />Sarees are returnable if the fall and pico have not been added.</li>
              <li><Icon name="check" size={16} />We arrange a free pickup from your door. No need to visit a courier office.</li>
            </ul>
            <p>To start a return, message us on <a className="ilink" href={whatsappLink("Hi Indigo Loom, I'd like to return or exchange an item from my order.")} target="_blank" rel="noopener noreferrer">WhatsApp</a> or write to <a className="ilink" href={`mailto:${info.careEmail}`}>{info.careEmail}</a> with your order number. Exchanges for a different size ship as soon as the pickup is done.</p>
          </section>
          <section id="refunds">
            <h2>Refunds</h2>
            <p>Refunds go back to your original payment method within 5 to 7 working days of the pickup. For COD orders, we&apos;ll refund to your bank account or UPI ID. The COD fee and express shipping charge are not refundable.</p>
            <p>Questions? <Link className="ilink" href={href("/contact")}>Get in touch</Link> or read the <Link className="ilink" href={href("/faq")}>FAQ</Link>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
