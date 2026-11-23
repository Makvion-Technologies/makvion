export type PinResult = { ok: true; place: string; days: [number, number]; cod: boolean; express: boolean } | { ok: false; message: string };

const PLACES: [string, string, string][] = [
  ["411", "Pune", "Maharashtra"], ["412", "Pune district", "Maharashtra"], ["400", "Mumbai", "Maharashtra"], ["401", "Thane", "Maharashtra"], ["410", "Navi Mumbai", "Maharashtra"],
  ["440", "Nagpur", "Maharashtra"], ["422", "Nashik", "Maharashtra"], ["431", "Aurangabad", "Maharashtra"], ["110", "New Delhi", "Delhi"], ["122", "Gurugram", "Haryana"],
  ["201", "Noida", "Uttar Pradesh"], ["560", "Bengaluru", "Karnataka"], ["600", "Chennai", "Tamil Nadu"], ["500", "Hyderabad", "Telangana"], ["700", "Kolkata", "West Bengal"],
  ["380", "Ahmedabad", "Gujarat"], ["302", "Jaipur", "Rajasthan"], ["226", "Lucknow", "Uttar Pradesh"], ["682", "Kochi", "Kerala"], ["403", "Goa", "Goa"], ["160", "Chandigarh", "Chandigarh"],
];
const METRO = new Set(["400", "401", "410", "110", "122", "201", "560", "600", "500", "700", "380"]);

export function lookupPlace(pin: string): { city: string; state: string } | null {
  const hit = PLACES.find(([p]) => pin.startsWith(p));
  return hit ? { city: hit[1], state: hit[2] } : null;
}

export function checkPincode(raw: string): PinResult {
  const pin = raw.replace(/\s/g, "");
  if (!/^[1-9]\d{5}$/.test(pin)) return { ok: false, message: "Enter a valid 6-digit pincode." };
  if (pin.startsWith("744")) return { ok: false, message: "Sorry, we can't deliver to this pincode yet. Write to us on WhatsApp and we'll find a way." };
  const place = lookupPlace(pin);
  const p3 = pin.slice(0, 3);
  const remote = /^(79|18|19)/.test(pin);
  const days: [number, number] = p3 === "411" ? [1, 2] : pin.startsWith("4") ? [2, 3] : METRO.has(p3) ? [2, 4] : remote ? [6, 9] : [4, 7];
  return { ok: true, place: place ? place.city : `pincode ${pin}`, days, cod: !remote, express: p3 === "411" || METRO.has(p3) };
}

export function deliveryWindow(days: [number, number], from = new Date()) {
  const add = (n: number) => {
    const d = new Date(from);
    let left = n;
    while (left > 0) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0) left--; }
    return d;
  };
  const f = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  return days[0] === days[1] ? f(add(days[0])) : `${f(add(days[0]))} to ${f(add(days[1]))}`;
}

export const STATES = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
