import type { IconName } from "@/components/sahyadri-smiles/icons";

/** Every page of this site lives under this path on makvion.com. */
export const BASE = "/sahyadri-smiles";
export const href = (path = "") => `${BASE}${path}`;
export const img = (name: string) => `${BASE}/${name}.webp`;

export const clinic = {
  name: "Sahyadri Smiles",
  legalName: "Sahyadri Smiles Dental Clinic",
  tagline: "Family Dental Clinic",
  phoneDisplay: "020 4860 2211",
  phoneHref: "tel:+912048602211",
  phoneIntl: "+91-20-4860-2211",
  whatsappDisplay: "+91 98903 22110",
  whatsappNumber: "919890322110",
  email: "hello@sahyadrismiles.in",
  street: "2nd floor, Shreeji Arcade, Baner Road, near Mahabaleshwar Hotel",
  locality: "Baner",
  city: "Pune",
  region: "Maharashtra",
  postcode: "411045",
  addressLines: ["2nd floor, Shreeji Arcade, Baner Road", "Near Mahabaleshwar Hotel, Baner", "Pune, Maharashtra 411045"],
  addressShort: "Baner Road, Pune",
  mapsQuery: "Mahabaleshwar Hotel, Baner Road, Baner, Pune, Maharashtra 411045",
};

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.mapsQuery)}`;

export function whatsappLink(message = "Hi Sahyadri Smiles, I'd like to book an appointment.") {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** 0 = Sunday. Times are minutes after midnight, India time. */
export const hours: { day: number; label: string; open?: number; close?: number; note?: string }[] = [
  { day: 1, label: "Monday", open: 570, close: 1230 },
  { day: 2, label: "Tuesday", open: 570, close: 1230 },
  { day: 3, label: "Wednesday", open: 570, close: 1230 },
  { day: 4, label: "Thursday", open: 570, close: 1230 },
  { day: 5, label: "Friday", open: 570, close: 1230 },
  { day: 6, label: "Saturday", open: 570, close: 1080 },
  { day: 0, label: "Sunday", note: "Emergencies only, call first" },
];

export const nav = [
  { href: href("/treatments"), label: "Treatments" },
  { href: href("/about"), label: "Our approach" },
  { href: href("/dentists"), label: "Dentists" },
  { href: href("/reviews"), label: "Reviews" },
  { href: href("/faq"), label: "FAQ" },
  { href: href("/contact"), label: "Visit us" },
];

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  duration: string;
  visits: string;
  bestFor: string;
  intro: string;
  signs: string[];
  steps: { title: string; text: string }[];
  comfort: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
  dentist: string;
};

export const treatments: Treatment[] = [
  {
    slug: "check-up-and-cleaning",
    name: "Check-ups & cleaning",
    short: "A thorough check, gentle scaling and polishing, and an honest plan. No upselling.",
    icon: "smile",
    image: "cleaning",
    imageAlt: "Dentist examining a smiling patient's teeth during a routine check-up",
    duration: "40 minutes",
    visits: "1 visit, every 6 months",
    bestFor: "Everyone, from age 3 upwards",
    intro:
      "Most dental problems are cheap and painless to fix when they are caught early. A six-monthly check-up lets us spot small cavities, gum trouble and worn fillings long before they hurt.",
    signs: ["It has been more than 6 months since your last visit", "Gums bleed when you brush", "Tartar or stains you can't brush away", "Bad breath that doesn't go away"],
    steps: [
      { title: "A chat first", text: "We ask about any pain, sensitivity or worries, and note your medical history." },
      { title: "Full check", text: "Teeth, gums, bite and soft tissues are checked. X-rays only if we genuinely need them." },
      { title: "Scaling & polishing", text: "Ultrasonic scaling removes tartar, then a polish removes surface stains." },
      { title: "Your plan, in writing", text: "We show you what we saw on the intraoral camera and explain any next steps and costs." },
    ],
    comfort: ["Numbing gel for sensitive areas", "Warm-water scaling for sensitive teeth", "Breaks whenever you raise a hand"],
    aftercare: ["Teeth may feel slightly sensitive for a day", "Avoid tea and coffee for 2 hours after polishing", "Brush twice a day with a soft brush and floss once"],
    faqs: [
      { q: "Does scaling damage enamel?", a: "No. Scaling removes hardened deposits (tartar) from the tooth surface. It does not remove enamel. Teeth can feel different afterwards simply because the tartar is gone." },
      { q: "How often should I get a cleaning?", a: "Every 6 months for most people. If you have gum disease, braces or diabetes, we may suggest every 3 to 4 months." },
    ],
    dentist: "Dr. Anjali",
  },
  {
    slug: "fillings",
    name: "Tooth-coloured fillings",
    short: "Small cavities fixed in a single, quick visit with fillings that match your teeth.",
    icon: "tooth",
    image: "tools",
    imageAlt: "Sterilised dental instruments laid out on a blue tray",
    duration: "30 to 45 minutes per tooth",
    visits: "1 visit",
    bestFor: "Cavities, chipped edges and old metal fillings",
    intro:
      "A filling repairs a tooth damaged by decay. We use composite resin shaded to match your tooth, so nobody can tell it is there. It bonds to the tooth, so less healthy tooth needs to be removed.",
    signs: ["Sensitivity to sweets, hot or cold", "Food getting stuck in one spot", "A dark spot or small hole", "An old filling that is chipped or leaking"],
    steps: [
      { title: "Numbing, if needed", text: "Many small fillings need no injection at all. If you need one, we use numbing gel first." },
      { title: "Remove the decay", text: "Only the soft, decayed part is removed, keeping as much natural tooth as possible." },
      { title: "Layer and shape", text: "Composite is placed in thin layers, hardened with a blue light and shaped to your bite." },
      { title: "Polish and check", text: "We check your bite with you so nothing feels high when you go home." },
    ],
    comfort: ["Many small fillings need no injection", "Numbing gel before every injection", "Mercury-free materials"],
    aftercare: ["You can eat as soon as numbness wears off", "Mild sensitivity for a few days is normal", "Call us if your bite feels high"],
    faqs: [
      { q: "How long do composite fillings last?", a: "Usually 7 to 10 years, often longer with good brushing and regular check-ups." },
      { q: "Should I replace my old silver fillings?", a: "Only if they are cracked, leaking or have decay under them. We won't replace a healthy filling just for looks unless you want us to." },
    ],
    dentist: "Dr. Anjali",
  },
  {
    slug: "root-canal",
    name: "Root canal treatment",
    short: "Single-sitting root canals for most teeth, done slowly and comfortably.",
    icon: "shield",
    image: "treatment",
    imageAlt: "Dentist explaining a treatment to a relaxed patient in the dental chair",
    duration: "60 to 90 minutes",
    visits: "Usually 1 sitting, plus a crown visit",
    bestFor: "Deep decay, an infected nerve or a cracked tooth",
    intro:
      "A root canal removes infected or inflamed nerve tissue from inside the tooth, cleans and seals it, and saves the tooth. With modern rotary instruments and proper numbing, it feels much like getting a large filling.",
    signs: ["Throbbing pain, especially at night", "Lingering pain after hot or cold", "Swelling or a pimple on the gum", "A tooth that has turned darker"],
    steps: [
      { title: "X-ray and diagnosis", text: "A digital X-ray shows how deep the infection goes, and we explain it on screen." },
      { title: "Comfortable numbing", text: "Numbing gel first, then a slow injection. We test that the tooth is fully numb before starting." },
      { title: "Clean and seal", text: "The canals are cleaned with rotary files, disinfected and sealed with a rubber-based material." },
      { title: "Protect with a crown", text: "Back teeth usually need a crown afterwards so they don't crack. We take a scan for it." },
    ],
    comfort: ["Single sitting for most teeth", "A rubber dam keeps you dry and protected", "You can pause at any time"],
    aftercare: ["Mild soreness for 2 to 3 days is common", "Avoid chewing hard food on that side until the crown is fitted", "Take any painkiller exactly as prescribed"],
    faqs: [
      { q: "Is a root canal painful?", a: "The treatment itself should not be painful once the tooth is properly numb. It is the infection that causes pain, and the root canal relieves it." },
      { q: "Can't I just remove the tooth?", a: "You can, but a missing tooth often leads to shifting teeth and needs a bridge or implant later. Saving your natural tooth is usually the better long-term option." },
    ],
    dentist: "Dr. Kavita",
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & clear aligners",
    short: "Metal, ceramic or clear aligners, planned with a 3D scan for teens and adults.",
    icon: "braces",
    image: "aligners",
    imageAlt: "Hands holding a clear aligner and its case against a light blue background",
    duration: "Consultation: 30 minutes",
    visits: "Check-ins every 4 to 8 weeks",
    bestFor: "Crowded, gapped or crooked teeth and bite problems",
    intro:
      "Straighter teeth are easier to clean and often more comfortable to bite with. We offer metal braces, tooth-coloured ceramic braces and clear aligners, and help you choose what fits your life and budget.",
    signs: ["Crowded or overlapping teeth", "Gaps between teeth", "Upper teeth that stick out", "Jaw or bite discomfort"],
    steps: [
      { title: "Consultation & scan", text: "A quick 3D scan of your teeth, photos and an X-ray. No messy impressions." },
      { title: "See your plan", text: "We show a simulation of how your teeth will move and how long it should take." },
      { title: "Fitting", text: "Braces are fitted in about an hour. Aligners come in sets you change every 1 to 2 weeks." },
      { title: "Retainers", text: "Once teeth are straight, retainers keep them there. We include your first set." },
    ],
    comfort: ["Orthodontic wax and a care kit at fitting", "Evening check-ins for school and office", "Clear aligners for a near-invisible option"],
    aftercare: ["Expect tenderness for 3 to 5 days after each adjustment", "Wear aligners 20 to 22 hours a day", "Avoid sticky and very hard foods with braces"],
    faqs: [
      { q: "Am I too old for braces?", a: "No. As long as your teeth and gums are healthy, orthodontic treatment works at any age. Many of our patients are in their 30s and 40s." },
      { q: "How long does treatment take?", a: "Most cases take 12 to 24 months. Minor corrections with aligners can take as little as 6 months." },
    ],
    dentist: "Dr. Rohan",
  },
  {
    slug: "dental-implants",
    name: "Implants & crowns",
    short: "Replace missing teeth with implants, crowns and bridges that look and feel natural.",
    icon: "implant",
    image: "implants",
    imageAlt: "Models showing a dental implant, a crown and natural teeth side by side",
    duration: "Planning visit: 45 minutes",
    visits: "2 to 3 visits over 3 to 4 months",
    bestFor: "One or more missing teeth, or loose dentures",
    intro:
      "An implant is a small titanium post placed in the jawbone that acts like a tooth root. Once it has bonded with the bone, a custom crown is fitted on top. It doesn't affect neighbouring teeth and can last for decades.",
    signs: ["A missing tooth or gap", "A tooth that can't be saved", "Loose or uncomfortable dentures", "Difficulty chewing on one side"],
    steps: [
      { title: "3D planning", text: "A CBCT scan shows your bone in 3D so the implant can be placed precisely." },
      { title: "Implant placement", text: "Done under local anaesthesia in about an hour. Most patients return to work the next day." },
      { title: "Healing", text: "Over 2 to 3 months the implant bonds with the bone. A temporary tooth can be fitted if needed." },
      { title: "Your new tooth", text: "A custom zirconia or ceramic crown is fitted, shaded to match your teeth." },
    ],
    comfort: ["A detailed written estimate before you decide", "Sedation options for anxious patients", "A follow-up call the evening after surgery"],
    aftercare: ["Soft foods for the first few days", "Rinse gently with warm salt water from day two", "No smoking while the implant heals"],
    faqs: [
      { q: "Is everyone suitable for implants?", a: "Most adults with healthy gums and enough bone are. Uncontrolled diabetes and heavy smoking can affect healing, so we assess this at your planning visit." },
      { q: "How long do implants last?", a: "With good care, implants can last 20 years or more. The crown on top may need replacing after 10 to 15 years." },
    ],
    dentist: "Dr. Anjali",
  },
  {
    slug: "kids-dentistry",
    name: "Kids' dentistry",
    short: "Fun first visits, sealants and fluoride, with a dentist who is great with children.",
    icon: "kid",
    image: "kids",
    imageAlt: "A young girl sitting happily in a colourful children's dental chair with her mother",
    duration: "30 minutes",
    visits: "Every 6 months",
    bestFor: "Babies, children and teens up to 16",
    intro:
      "Good habits start early. Our children's room, gentle pace and simple explanations help kids feel at ease, so they grow up thinking of the dentist as a friendly place.",
    signs: ["Your child is turning 1 and hasn't had a first visit", "White or brown spots on teeth", "Thumb sucking after age 4", "Crooked or crowded new teeth"],
    steps: [
      { title: "Meet & play", text: "A tour of the room and a ride in the chair. We show every instrument before using it." },
      { title: "Gentle check", text: "A count of teeth, a check for cavities and advice on brushing and diet." },
      { title: "Protection", text: "Fluoride varnish and pit-and-fissure sealants to protect back teeth from decay." },
      { title: "Sticker & tips", text: "Every visit ends with a sticker and a simple brushing chart for home." },
    ],
    comfort: ["Parents are always welcome in the room", "Child-sized instruments and a cartoon ceiling", "Short visits to suit little attention spans"],
    aftercare: ["No food or drink for 30 minutes after fluoride", "Help your child brush until about age 7", "Limit sticky sweets and night-time milk bottles"],
    faqs: [
      { q: "When should my child first see a dentist?", a: "By their first birthday, or within six months of the first tooth appearing. Early visits are short and mostly about getting comfortable." },
      { q: "Do milk teeth really need fillings?", a: "Yes. Milk teeth hold space for adult teeth, and decay in them can cause pain and infection. Small fillings now prevent bigger problems later." },
    ],
    dentist: "Dr. Meera",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth whitening",
    short: "Safe in-clinic whitening or take-home trays, supervised by a dentist.",
    icon: "spark",
    image: "whitening",
    imageAlt: "Close-up of a woman with a bright, natural smile",
    duration: "60 to 75 minutes in clinic",
    visits: "1 visit, or 2 weeks at home",
    bestFor: "Stains from tea, coffee, smoking or age",
    intro:
      "Professional whitening lightens the natural colour of your teeth safely, without harming enamel. We check your teeth first, because whitening won't change the colour of fillings or crowns, and sensitive teeth need extra care.",
    signs: ["Yellowing from tea, coffee or paan", "A big event coming up", "Uneven colour between teeth", "Stains that cleaning doesn't remove"],
    steps: [
      { title: "Shade check", text: "We record your current shade and check for cavities or gum problems first." },
      { title: "Protect gums", text: "A protective barrier is painted over your gums before any gel is applied." },
      { title: "Whiten", text: "Gel is applied in short cycles, or we make custom trays for you to use at home." },
      { title: "Compare", text: "We compare against your starting shade and give you a stain-avoidance guide." },
    ],
    comfort: ["Desensitising gel after treatment", "Gentle formulas for sensitive teeth", "Honest advice on what results to expect"],
    aftercare: ["Avoid tea, coffee, turmeric and cola for 48 hours", "Use a sensitivity toothpaste for a week", "Touch-ups once a year keep results fresh"],
    faqs: [
      { q: "Is whitening safe?", a: "Yes, when supervised by a dentist. Over-the-counter kits and charcoal powders can damage enamel or gums, which is why we check your teeth first." },
      { q: "How long do results last?", a: "Usually 1 to 2 years, depending on how much tea, coffee and tobacco you consume." },
    ],
    dentist: "Dr. Rohan",
  },
];

export type Dentist = { name: string; role: string; quals: string; image: string; focus: string; bio: string; languages: string[]; days: string };

export const dentists: Dentist[] = [
  { name: "Dr. Anjali", role: "Lead dentist & prosthodontist", quals: "BDS, MDS (Prosthodontics)", image: "dr-anjali", focus: "Crowns, implants and smile makeovers", bio: "Anjali started Sahyadri Smiles to be the clinic she'd want her own family to visit. She is known for explaining every option clearly and never rushing a decision.", languages: ["English", "Marathi", "Hindi"], days: "Mon to Sat" },
  { name: "Dr. Rohan", role: "Orthodontist", quals: "BDS, MDS (Orthodontics)", image: "dr-rohan", focus: "Braces, clear aligners and whitening", bio: "Rohan plans every case with a 3D scan and loves showing patients their future smile on screen before they commit to anything.", languages: ["English", "Hindi", "Kannada"], days: "Tue, Thu & Sat" },
  { name: "Dr. Meera", role: "Paediatric dentist", quals: "BDS, MDS (Paedodontics)", image: "dr-meera", focus: "Children's dentistry and first visits", bio: "Meera has a knack for turning nervous kids into proud sticker collectors. Parents tell us their children now look forward to check-ups.", languages: ["English", "Marathi"], days: "Mon, Wed & Fri" },
  { name: "Dr. Kavita", role: "Endodontist", quals: "BDS, MDS (Conservative Dentistry & Endodontics)", image: "dentist-at-work", focus: "Root canals and saving damaged teeth", bio: "Kavita does most of our root canal treatments. Patients who arrive anxious often say it was far easier than they expected.", languages: ["English", "Marathi", "Hindi"], days: "Mon to Fri" },
];

export type Review = { name: string; area: string; treatment: string; text: string };

export const reviews: Review[] = [
  { name: "Priya S.", area: "Baner", treatment: "Root canal", text: "I had avoided the dentist for six years. Dr. Anjali explained everything on the screen first and the root canal was honestly painless. I was out in an hour." },
  { name: "Amit K.", area: "Aundh", treatment: "Kids' dentistry", text: "My daughter actually asked when she can go back. The kids' room and Dr. Meera's patience made all the difference." },
  { name: "Sneha R.", area: "Balewadi", treatment: "Check-ups & cleaning", text: "Booked on WhatsApp during lunch and got a 7 pm slot the same day. Clean clinic, clear estimate, no pressure to add extras." },
  { name: "Rahul D.", area: "Pashan", treatment: "Braces & aligners", text: "Started aligners at 34. Dr. Rohan showed me the full plan on a 3D model and every check-in has been on time, even in the evenings." },
  { name: "Neha P.", area: "Sus", treatment: "Teeth whitening", text: "Wanted whiter teeth before my wedding without sensitivity. They checked my teeth first, were honest about results, and it looked natural." },
  { name: "Vikram J.", area: "Baner", treatment: "Implants & crowns", text: "Got an implant for a molar I lost years ago. Written estimate up front, a follow-up call the same evening, and it feels like my own tooth." },
  { name: "Ananya M.", area: "Wakad", treatment: "Fillings", text: "Two small fillings, no injection needed for one of them. They matched the colour so well I can't find them myself." },
  { name: "Suresh B.", area: "Aundh", treatment: "Root canal", text: "Came in with a swollen face on a Saturday. They saw me within the hour and Dr. Kavita finished the root canal in one sitting." },
  { name: "Farah Q.", area: "Baner", treatment: "Kids' dentistry", text: "Both my boys had sealants done. Dr. Meera let them hold the mirror and count their own teeth. Zero tears, which is a first." },
  { name: "Kunal T.", area: "Balewadi", treatment: "Check-ups & cleaning", text: "The hygienist used warm water because I mentioned sensitive teeth. Small thing, but nobody had ever asked before." },
  { name: "Meghna V.", area: "Pashan", treatment: "Braces & aligners", text: "My son's braces came off last month and the result is lovely. They included retainers and showed him how to clean them." },
  { name: "Arjun N.", area: "Sus", treatment: "Implants & crowns", text: "I was nervous about surgery. They offered sedation and walked me through each step. Back at work the next morning." },
];

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Visiting us",
    items: [
      { q: "Do I need an appointment?", a: "We recommend booking so you don't have to wait, but we keep slots free every day for dental pain and emergencies. Call or WhatsApp us and we'll fit you in." },
      { q: "Is there parking near the clinic?", a: "Yes. Shreeji Arcade has free basement parking for patients, and two-wheeler parking is at the front of the building. Just tell the security guard you're visiting the clinic." },
      { q: "Is the clinic wheelchair accessible?", a: "Yes. There is a lift to the second floor and our treatment rooms have space for a wheelchair. Let us know when you book and we'll meet you at the entrance." },
      { q: "What should I bring to my first visit?", a: "Any old X-rays or dental reports, a list of medicines you take, and your insurance details if you have them." },
    ],
  },
  {
    group: "Comfort & safety",
    items: [
      { q: "Will it hurt?", a: "We use numbing gel before any injection and wait for it to work fully. Most patients tell us they felt pressure, not pain. You can raise your hand to pause at any point." },
      { q: "I'm very anxious about dentists. Can you help?", a: "Absolutely. Tick 'I'm a little nervous' when you book. We'll schedule a longer slot, explain each step before we do it, and agree a stop signal with you. Sedation is available for some treatments." },
      { q: "How do you sterilise instruments?", a: "Every instrument is cleaned, sealed in a pouch and sterilised in a Class B autoclave. We open the sealed kit in front of you. Single-use items are never reused." },
    ],
  },
  {
    group: "Costs & payment",
    items: [
      { q: "Will I know the cost before treatment?", a: "Yes. You get a written estimate before any treatment starts, and we never add procedures without asking you first." },
      { q: "Do you accept insurance or offer EMI?", a: "We help you file claims with most major insurers, and offer no-cost EMI on treatments above ₹10,000 through partner banks." },
      { q: "How can I pay?", a: "UPI, debit and credit cards, net banking and cash are all accepted at the clinic." },
    ],
  },
  {
    group: "Children",
    items: [
      { q: "At what age should my child first visit?", a: "By their first birthday, or within six months of the first tooth appearing. Early visits are short, fun and mostly about getting comfortable." },
      { q: "Can I stay with my child during treatment?", a: "Of course. Parents are always welcome in the room, and many children feel calmer holding a parent's hand." },
    ],
  },
];
