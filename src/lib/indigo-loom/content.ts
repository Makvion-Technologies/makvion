export const BASE = "/indigo-loom";
export const href = (path = "") => `${BASE}${path}`;
export const img = (name: string) => `${BASE}/${name}.webp`;

export const info = {
  name: "Indigo Loom",
  legalName: "Indigo Loom Handcrafts LLP",
  email: "hello@indigoloom.in",
  careEmail: "care@indigoloom.in",
  phoneDisplay: "+91 20 2546 7736",
  phoneHref: "tel:+912025467736",
  whatsappDisplay: "+91 98220 41736",
  whatsappNumber: "919822041736",
  street: "2nd floor, 14 Prabhat Road",
  locality: "Erandwane",
  city: "Pune",
  region: "Maharashtra",
  postcode: "411004",
  addressLines: ["2nd floor, 14 Prabhat Road", "Erandwane, Pune 411004"],
  studioHours: "Mon to Sat, 10 am to 7 pm",
  gstin: "27AAJFI4821K1Z6",
};

export const mapsQuery = "Prabhat Road, Erandwane, Pune, Maharashtra 411004";
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;

export function whatsappLink(message = "Hi Indigo Loom, I have a question about an order.") {
  return `https://wa.me/${info.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Shop all", href: href("/shop") },
  { label: "Women", href: href("/shop/women") },
  { label: "Men", href: href("/shop/men") },
  { label: "Sarees", href: href("/shop/sarees") },
  { label: "The craft", href: href("/craft") },
];

export const announcements = ["Free shipping across India", "Cash on delivery available", "7-day easy returns"];

export const clusters = [
  { name: "Akola", state: "Rajasthan", craft: "Dabu mud-resist and indigo", families: 9 },
  { name: "Bagru", state: "Rajasthan", craft: "Hand-block printing", families: 14 },
  { name: "Maheshwar", state: "Madhya Pradesh", craft: "Silk-cotton weaving", families: 11 },
  { name: "Chanderi", state: "Madhya Pradesh", craft: "Sheer handloom weaving", families: 7 },
  { name: "Pochampally", state: "Telangana", craft: "Double ikat", families: 12 },
  { name: "Ponduru", state: "Andhra Pradesh", craft: "Handspun khadi", families: 16 },
  { name: "Mangalgiri", state: "Andhra Pradesh", craft: "Handloom cotton", families: 8 },
  { name: "Lucknow", state: "Uttar Pradesh", craft: "Chikankari embroidery", families: 22 },
  { name: "Kutch", state: "Gujarat", craft: "Ajrakh printing", families: 6 },
  { name: "Phulia", state: "West Bengal", craft: "Jamdani weaving", families: 5 },
  { name: "Bhagalpur", state: "Bihar", craft: "Linen and tussar weaving", families: 7 },
];

export const reviews = [
  { name: "Ananya K.", city: "Bengaluru", product: "Chandni Kurta Set", text: "The fabric feels even better than the photos. I've washed my kurta set eight times and the print hasn't faded at all." },
  { name: "Rohit M.", city: "Nagpur", product: "Haldi Khadi Kurta", text: "Ordered with COD, it reached Nagpur in three days. The exchange for a bigger size was picked up from home, no questions." },
  { name: "Shruti P.", city: "Pune", product: "Rani Maheshwari Saree", text: "My mother cried when she saw the Maheshwari. It came with a little card naming the weaver. Such a thoughtful touch." },
];

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Orders and payment",
    items: [
      { q: "Which payment methods do you accept?", a: "UPI (GPay, PhonePe, Paytm and any UPI app), all major credit and debit cards including RuPay, netbanking from 50+ banks, and cash on delivery for orders up to ₹15,000." },
      { q: "Is cash on delivery available?", a: "Yes, on most pincodes across India. A ₹49 handling fee applies to COD orders. Enter your pincode on any product page to check." },
      { q: "Can I change or cancel my order?", a: "Write to us on WhatsApp within 12 hours of ordering and we will change the size or cancel it before it is packed. After dispatch, you can use our 7-day returns." },
      { q: "Do prices include GST?", a: "Yes. Every price on the site includes GST, and you will get a GST invoice by email when your order ships." },
    ],
  },
  {
    group: "Shipping",
    items: [
      { q: "How long does delivery take?", a: "Orders are dispatched from our Pune studio within 24 hours on working days. Pune gets them in 1 to 2 days, metro cities in 2 to 4 days and the rest of India in 4 to 7 days." },
      { q: "Is shipping free?", a: "Standard shipping is free on every order within India. Express delivery is available for ₹150 on most metro pincodes." },
      { q: "Do you ship outside India?", a: "Not yet. We currently ship to every serviceable pincode in India." },
    ],
  },
  {
    group: "Returns and exchanges",
    items: [
      { q: "What is your return policy?", a: "You can return or exchange unworn pieces with tags within 7 days of delivery. We arrange a free pickup from your door and refund to your original payment method, or to your bank account for COD orders." },
      { q: "Are sarees returnable?", a: "Yes, as long as the fall and pico have not been done and the tags are intact." },
      { q: "When will I get my refund?", a: "Within 5 to 7 working days of the pickup, once the piece reaches our studio and passes a quick check." },
    ],
  },
  {
    group: "Fabric and care",
    items: [
      { q: "Will natural dyes fade or bleed?", a: "Indigo and madder settle over the first few washes. Wash dark pieces separately in cold water for the first three washes, with a mild detergent, and dry in the shade." },
      { q: "Why are there small irregularities in the weave?", a: "Slubs, slight colour variation and tiny print offsets are the marks of a handloom and a hand block. No two pieces are exactly alike." },
      { q: "How do I find my size?", a: "Every product page has a size guide in inches. If you are between sizes, our pieces are cut relaxed, so take the smaller one, or ask us on WhatsApp." },
    ],
  },
];
