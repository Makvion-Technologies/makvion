export const BASE = "/kesar-kitchen";
export const href = (path = "") => `${BASE}${path}`;
export const img = (name: string) => `${BASE}/${name}.webp`;

export const info = {
  name: "Kesar Kitchen",
  legalName: "Kesar Kitchen Hospitality",
  tagline: "Koregaon Park · Pune",
  phoneDisplay: "+91 20 6710 4455",
  phoneHref: "tel:+912067104455",
  phoneIntl: "+91-20-6710-4455",
  whatsappDisplay: "+91 98220 41455",
  whatsappNumber: "919822041455",
  email: "table@kesarkitchen.in",
  eventsEmail: "events@kesarkitchen.in",
  street: "Lane 6, North Main Road",
  locality: "Koregaon Park",
  city: "Pune",
  region: "Maharashtra",
  postcode: "411001",
  addressLines: ["Lane 6, North Main Road", "Koregaon Park, Pune 411001"],
  mapsQuery: "North Main Road, Koregaon Park, Pune, Maharashtra 411001",
  since: 2011,
};

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(info.mapsQuery)}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.mapsQuery)}`;

export function whatsappLink(message = "Hi Kesar Kitchen, I'd like to book a table.") {
  return `https://wa.me/${info.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Opening hours in minutes from midnight, India time. A close time above 1440 runs past midnight. */
export const hours: { day: number; label: string; open: number; close: number }[] = [
  { day: 1, label: "Monday", open: 720, close: 1470 },
  { day: 2, label: "Tuesday", open: 720, close: 1470 },
  { day: 3, label: "Wednesday", open: 720, close: 1470 },
  { day: 4, label: "Thursday", open: 720, close: 1470 },
  { day: 5, label: "Friday", open: 720, close: 1530 },
  { day: 6, label: "Saturday", open: 720, close: 1530 },
  { day: 0, label: "Sunday", open: 720, close: 1470 },
];

export const hoursSummary = [
  { label: "Mon – Thu", value: "12 noon – 12:30 am" },
  { label: "Fri – Sat", value: "12 noon – 1:30 am" },
  { label: "Sunday", value: "12 noon – 12:30 am" },
  { label: "Weekday lunch thali", value: "12 – 3:30 pm" },
];

export const nav = [
  { label: "Menu", href: href("/menu") },
  { label: "Our story", href: href("/story") },
  { label: "Private dining", href: href("/private-dining") },
  { label: "Gallery", href: href("/gallery") },
  { label: "Visit", href: href("/visit") },
];

export const deliveryApps = [
  { name: "Swiggy", href: "https://www.swiggy.com/city/pune", note: "Delivery across central and east Pune" },
  { name: "Zomato", href: "https://www.zomato.com/pune", note: "Delivery and scheduled orders" },
];

export const signatures = [
  { name: "Murgh Handi", price: 565, veg: false, image: "dal-handi", alt: "Murgh handi served in a copper pot", desc: "Chicken slow-cooked in a sealed copper handi with cream and kasuri methi." },
  { name: "Gosht Biryani", price: 645, veg: false, image: "biryani-pot", alt: "Awadhi gosht biryani in a clay pot", desc: "Dum-cooked under a dough seal. Aged basmati, kewra, tender mutton." },
  { name: "Tandoori Murgh", price: 495, veg: false, image: "tandoori", alt: "Tandoori chicken platter with onions and lime", desc: "Kashmiri chilli and hung curd, charred over charcoal, mint chutney." },
  { name: "Gulab Jamun", price: 225, veg: true, image: "jamun", alt: "Warm gulab jamun in syrup", desc: "Served warm with thick rabri and a whisper of rose." },
];

export const rooms = [
  { id: "main", name: "The Main Room", image: "room-dining", alt: "The main dining room with low lamps and teak tables", seats: "64 seats", text: "Low lamps, brass and teak. Our busiest room, and the one with the view of the tandoor." },
  { id: "bar", name: "The Lantern Bar", image: "room-candle", alt: "Candlelit lounge with lanterns", seats: "30 guests", text: "Small plates, chai and mocktails till 1 am. Walk-ins always welcome." },
  { id: "teak", name: "The Teak Room", image: "room-wood", alt: "Private dining room with a long teak table", seats: "Up to 18 seated", text: "Our private dining room, with its own entrance, server and set menus." },
];

export const press = [
  { quote: "The dal kesari alone is worth crossing the city for.", source: "Pune Food Diaries" },
  { quote: "Koregaon Park's warmest room, and its most generous kitchen.", source: "The Weekend Table" },
  { quote: "A rare late-night kitchen that never cuts corners.", source: "City Plate, Pune" },
];

export const reviews = [
  { name: "Aditi R.", text: "We came for a birthday and stayed till closing. The butter chicken and the warm jamun were perfect, and the staff remembered our names by dessert.", meta: "Dinner for 6" },
  { name: "Rahul M.", text: "Best biryani in Koregaon Park, no contest. Booking took a minute and they had our table ready with a candle for our anniversary.", meta: "Anniversary dinner" },
  { name: "Sana K.", text: "Hosted my parents' 35th in the Teak Room. Set menu, a cake from the kitchen, and not one thing we had to worry about.", meta: "Private dining, 16 guests" },
];

export type GalleryItem = { image: string; alt: string; cat: "Food" | "Rooms" | "Kitchen"; tall?: boolean };
export const gallery: GalleryItem[] = [
  { image: "hero-butter-chicken", alt: "Old Delhi butter chicken with a swirl of cream", cat: "Food" },
  { image: "room-dining", alt: "The main dining room set for dinner", cat: "Rooms" },
  { image: "chef", alt: "Chef plating a dish at the pass", cat: "Kitchen", tall: true },
  { image: "biryani-plate", alt: "A plate of gosht biryani with raita", cat: "Food" },
  { image: "room-candle", alt: "Candlelight in the Lantern Bar", cat: "Rooms", tall: true },
  { image: "roti", alt: "Rotis being rolled by hand", cat: "Kitchen" },
  { image: "platter", alt: "A sharing platter of kebabs and breads", cat: "Food", tall: true },
  { image: "spices", alt: "Whole spices laid out before roasting", cat: "Kitchen" },
  { image: "palak-paneer", alt: "Palak paneer with a garlic tadka", cat: "Food" },
  { image: "room-long", alt: "The long table in the main room", cat: "Rooms" },
  { image: "kulcha", alt: "Kulcha fresh from the tandoor", cat: "Food", tall: true },
  { image: "tawa", alt: "Kebabs sizzling on a hot tawa", cat: "Kitchen" },
  { image: "chai-pour", alt: "Kesar chai poured into a kulhad", cat: "Food" },
  { image: "room-wood", alt: "The Teak Room laid for a private dinner", cat: "Rooms", tall: true },
  { image: "jalebi", alt: "Crisp jalebi with rabri", cat: "Food" },
  { image: "curry-spoon", alt: "A spoonful of slow-cooked curry", cat: "Food", tall: true },
  { image: "thali-tiffin", alt: "The weekday lunch thali", cat: "Food", tall: true },
  { image: "dal", alt: "Dal kesari finished with saffron butter", cat: "Food" },
];

export const eventPackages = [
  { name: "Teak Room dinner", guests: "10 – 18 guests", price: "From ₹ 1,850 per guest", text: "A private room with its own server. Choose from three set menus, or build one with Chef Vikram.", image: "room-wood", alt: "The Teak Room set for a private dinner" },
  { name: "Lantern Bar evening", guests: "20 – 40 guests", price: "From ₹ 1,450 per guest", text: "Passed small plates, a chai and mocktail bar, and the room to yourselves from 7 to 10 pm.", image: "room-candle", alt: "The Lantern Bar lit by lanterns" },
  { name: "Full restaurant", guests: "Up to 90 guests", price: "From ₹ 2,400 per guest", text: "Weddings, sangeets and company dinners. The whole restaurant, a custom menu and live tandoor.", image: "room-long", alt: "The main room laid for a large celebration" },
];

export const faqs = [
  { q: "Do you take walk-ins?", a: "Yes. We keep the Lantern Bar and a few tables in the main room for walk-ins every night. On Friday and Saturday evenings, booking ahead is the safest bet." },
  { q: "How long do you hold a table?", a: "We hold tables for 15 minutes. If you're running late, a quick call or WhatsApp is all it takes and we'll do our best to keep it." },
  { q: "Do you have Jain or vegan options?", a: "Most of our vegetarian dishes can be made Jain, and several can be made vegan. Mention it when you book or tell your server." },
  { q: "Is there parking?", a: "Valet parking is available from 7 pm. Before that, there is street parking on Lane 6 and a pay-and-park on North Main Road." },
  { q: "Is service charge added?", a: "No. A service charge is never added to your bill. Prices are in rupees and exclusive of GST." },
];
