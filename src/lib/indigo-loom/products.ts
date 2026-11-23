export type Collection = "women" | "men" | "sarees";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Free size";
export type Fabric = "Cotton" | "Khadi" | "Silk-cotton" | "Chanderi" | "Linen" | "Mul cotton";

export type Product = {
  slug: string;
  name: string;
  collection: Collection;
  type: string;
  fabric: Fabric;
  craft: string;
  cluster: string;
  state: string;
  colour: string;
  swatch: string;
  price: number;
  mrp?: number;
  tag?: string;
  image: string;
  gallery: string[];
  focus?: string;
  sizes: Size[];
  soldOut?: Size[];
  added: number;
  rating: number;
  reviews: number;
  short: string;
  description: string;
  details: string[];
  care: string[];
  maker: { name: string; role: string; note: string };
};

export const APPAREL: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    slug: "neel-dabu-co-ord", name: "Neel Dabu Co-ord", collection: "women", type: "Co-ord sets", fabric: "Cotton", craft: "Dabu mud-resist print", cluster: "Akola", state: "Rajasthan",
    colour: "Deep indigo", swatch: "#1E2A57", price: 4850, tag: "Bestseller", image: "hero-indigo", gallery: ["hero-indigo", "hero-indigo-d1", "hero-indigo-d2", "indigo-cloth"], focus: "50% 30%",
    sizes: APPAREL, soldOut: ["XS"], added: 20261102, rating: 4.9, reviews: 184,
    short: "Mud-resist printed cotton, dipped in indigo up to nine times.",
    description: "A relaxed shirt and straight trouser set in mid-weight cotton. The floral is drawn in mud paste by hand, then the cloth is dipped in an indigo vat again and again until it turns this deep, uneven blue.",
    details: ["Relaxed shirt with a band collar and coconut-shell buttons", "Straight trousers with an elasticated back and two side pockets", "Mid-weight 60s cotton cambric, hand-block printed", "Model is 5'6\" and wears size S"],
    care: ["Hand wash cold, separately for the first three washes", "Mild detergent, no bleach", "Dry inside out in the shade", "Warm iron on the reverse"],
    maker: { name: "Saleem Chhipa", role: "Dabu printer, Akola", note: "Saleem's family has printed dabu in Akola for four generations. Each length of this cloth spends a full week between his tables, the mud pits and the indigo vat." },
  },
  {
    slug: "kattha-bagru-set", name: "Kattha Bagru Set", collection: "women", type: "Co-ord sets", fabric: "Cotton", craft: "Hand-block print", cluster: "Bagru", state: "Rajasthan",
    colour: "Kattha brown", swatch: "#6B3A26", price: 4450, tag: "New", image: "prod-coord-rust", gallery: ["prod-coord-rust", "prod-coord-rust-d1", "prod-coord-rust-d2", "detail-sleeve"],
    sizes: APPAREL, added: 20261112, rating: 4.8, reviews: 46,
    short: "Bagru block print in kattha and iron-rust dyes.",
    description: "A kurta-length shirt and wide trousers printed in Bagru with dyes made from kattha bark and iron rust. The warm brown deepens slightly with every wash.",
    details: ["Long shirt with side slits and a notched neck", "Wide-leg trousers with a drawstring waist", "Soft 60s cotton, hand-block printed with natural dyes", "Model is 5'7\" and wears size M"],
    care: ["Hand wash cold with a mild detergent", "Dry in the shade", "Warm iron"],
    maker: { name: "Ramesh Chhipa", role: "Block printer, Bagru", note: "Ramesh carves some of his own teak blocks. This print uses three, pressed by hand over 1,200 times for a single set." },
  },
  {
    slug: "chandni-kurta-set", name: "Chandni Kurta Set", collection: "women", type: "Kurta sets", fabric: "Cotton", craft: "Ajrakh-inspired block print", cluster: "Kutch", state: "Gujarat",
    colour: "Ecru and madder", swatch: "#EFE9DD", price: 3650, image: "chandni-kurta", gallery: ["chandni-kurta", "chandni-kurta-d1", "chandni-kurta-d2", "embroidery"],
    sizes: APPAREL, soldOut: ["XXL"], added: 20261020, rating: 4.9, reviews: 212,
    short: "Three-piece kurta set with a soft mul dupatta.",
    description: "An A-line kurta with straight pants and a mul dupatta, block-printed in Kutch with small madder florals on an ecru ground. Light enough for Pune afternoons, with enough structure for an evening out.",
    details: ["A-line kurta with a round neck and three-quarter sleeves", "Straight pants with an elasticated waist", "Mul cotton dupatta with hand-finished edges", "Model is 5'5\" and wears size S"],
    care: ["Hand wash cold", "Dry in the shade", "Warm iron on the reverse"],
    maker: { name: "Jabbar Khatri", role: "Ajrakh printer, Kutch", note: "Jabbar works with a small team near Bhuj, washing each length in the river between printing stages, the way Ajrakh has always been made." },
  },
  {
    slug: "raat-rani-tunic", name: "Raat Rani Tunic", collection: "women", type: "Tops and tunics", fabric: "Cotton", craft: "Natural-dye block print", cluster: "Bagru", state: "Rajasthan",
    colour: "Midnight indigo", swatch: "#1B2440", price: 3290, tag: "Piece of the month", image: "ink-tunic", gallery: ["ink-tunic", "ink-tunic-d1", "ink-tunic-d2", "indigo-dye"], focus: "50% 30%",
    sizes: APPAREL, soldOut: ["XL"], added: 20261015, rating: 4.9, reviews: 212,
    short: "Night-blooming jasmine, printed in a single pass of natural dye.",
    description: "A relaxed tunic in handloom cotton, block-printed with night-blooming jasmine in a single pass of natural dye. Wear it over trousers or with jeans. It softens with every wash.",
    details: ["Relaxed fit with dropped shoulders", "Hip length with side slits", "Handloom cotton, natural-dye block print", "Model is 5'6\" and wears size S"],
    care: ["Hand wash cold, separately at first", "Dry in the shade", "Warm iron"],
    maker: { name: "Kamla Devi", role: "Printer, Bagru", note: "Kamla leads a group of six women printers in Bagru. They print the raat rani motif with a single block, which is why every flower sits a little differently." },
  },
  {
    slug: "mul-chikankari-dress", name: "Mul Chikankari Dress", collection: "women", type: "Dresses", fabric: "Mul cotton", craft: "Hand chikankari", cluster: "Lucknow", state: "Uttar Pradesh",
    colour: "Ivory", swatch: "#F1EDE4", price: 3980, image: "mul-dress", gallery: ["mul-dress", "mul-dress-d1", "mul-dress-d2", "embroidery"],
    sizes: APPAREL, added: 20261005, rating: 4.7, reviews: 98,
    short: "Featherlight mul, hand-embroidered in Lucknow.",
    description: "A tiered midi dress in mul cotton with hand-done chikankari on the yoke and sleeves. Takes about nine days of embroidery per dress.",
    details: ["Tiered midi length with a gathered yoke", "Hand chikankari in tonal thread", "Comes with a matching cotton slip", "Model is 5'4\" and wears size XS"],
    care: ["Gentle hand wash or dry clean", "Do not wring", "Iron on the reverse over a towel"],
    maker: { name: "Rukhsana Begum", role: "Chikankari artisan, Lucknow", note: "Rukhsana embroiders from home in old Lucknow and trains younger women in her lane in the finer stitches like phanda and murri." },
  },
  {
    slug: "pudina-chanderi-dress", name: "Pudina Chanderi Dress", collection: "women", type: "Dresses", fabric: "Chanderi", craft: "Handloom weave", cluster: "Chanderi", state: "Madhya Pradesh",
    colour: "Pudina green", swatch: "#BFD3BE", price: 4200, tag: "New", image: "mint-dress", gallery: ["mint-dress", "mint-dress-d1", "mint-dress-d2", "stripes"],
    sizes: ["XS", "S", "M", "L", "XL"], soldOut: ["M"], added: 20261110, rating: 4.8, reviews: 31,
    short: "Sheer handloom chanderi with a fine zari stripe.",
    description: "A flowing dress in handwoven chanderi, a blend of silk and cotton so light it moves with the breeze. Fully lined in soft cotton.",
    details: ["Relaxed fit with a V neck and puff sleeves", "Fully lined in cotton voile", "Handwoven chanderi with a fine zari stripe", "Model is 5'6\" and wears size S"],
    care: ["Dry clean recommended", "Store folded in muslin", "Cool iron"],
    maker: { name: "Imran Ansari", role: "Weaver, Chanderi", note: "Imran weaves on a throw-shuttle loom in his courtyard. A length for one dress takes him about four days." },
  },
  {
    slug: "rani-maheshwari-saree", name: "Rani Maheshwari Saree", collection: "sarees", type: "Sarees", fabric: "Silk-cotton", craft: "Handloom, zari border", cluster: "Maheshwar", state: "Madhya Pradesh",
    colour: "Rani pink", swatch: "#C2185B", price: 7900, tag: "Handwoven", image: "saree-silk", gallery: ["saree-silk", "saree-silk-d1", "saree-silk-d2", "weaver-woman"],
    sizes: ["Free size"], added: 20261025, rating: 5.0, reviews: 64,
    short: "Silk-cotton Maheshwari with a reversible zari border.",
    description: "A classic Maheshwari in rani pink silk-cotton with a black and gold reversible border and a striped pallu. Comes with an unstitched blouse piece.",
    details: ["5.5 m saree with a 0.8 m blouse piece", "Silk warp and cotton weft", "Reversible zari border, striped pallu", "Fall and pico can be added for ₹350 on request"],
    care: ["Dry clean only", "Store wrapped in muslin and refold every few months"],
    maker: { name: "Sunita Bai", role: "Master weaver, Maheshwar", note: "Sunita has woven Maheshwari sarees for 26 years. She signs each one with a small woven mark in the pallu." },
  },
  {
    slug: "shravan-ikat-saree", name: "Shravan Ikat Saree", collection: "sarees", type: "Sarees", fabric: "Cotton", craft: "Double ikat", cluster: "Pochampally", state: "Telangana",
    colour: "Indigo and ecru", swatch: "#2C3B73", price: 8400, image: "saree-field", gallery: ["saree-field", "saree-field-d1", "saree-field-d2", "weaver-man"],
    sizes: ["Free size"], added: 20261108, rating: 4.9, reviews: 27,
    short: "Pochampally double ikat in indigo cotton.",
    description: "Both the warp and weft threads are tie-dyed before weaving, so the pattern appears as the cloth is woven. A saree like this takes up to eighteen days on the loom.",
    details: ["5.5 m saree with a 0.8 m blouse piece", "Handwoven double ikat cotton", "Contrast ecru pallu", "Fall and pico can be added for ₹350 on request"],
    care: ["Gentle hand wash cold, or dry clean", "Dry in the shade", "Warm iron"],
    maker: { name: "Sunanda Gajam", role: "Master weaver, Pochampally", note: "\u201cThe loom remembers every hand that worked it.\u201d Sunanda and her husband tie, dye and weave each saree themselves." },
  },
  {
    slug: "neel-khadi-shirt", name: "Neel Khadi Shirt", collection: "men", type: "Shirts", fabric: "Khadi", craft: "Handspun, handwoven", cluster: "Ponduru", state: "Andhra Pradesh",
    colour: "Indigo", swatch: "#2B3A60", price: 2750, mrp: 3200, tag: "Sale", image: "indigo-shirt", gallery: ["indigo-shirt", "indigo-shirt-d1", "indigo-shirt-d2", "indigo-cloth"],
    sizes: ["S", "M", "L", "XL", "XXL"], added: 20260920, rating: 4.7, reviews: 143,
    short: "Fine handspun khadi, dyed in natural indigo.",
    description: "A regular-fit shirt in Ponduru khadi, one of the finest handspun cottons in India. Breathes beautifully in the heat and gets softer with every wear.",
    details: ["Regular fit with a classic collar", "Single chest pocket, horn buttons", "Handspun, handwoven Ponduru khadi", "Model is 6'0\" and wears size L"],
    care: ["Machine wash cold on a gentle cycle", "Wash separately at first", "Dry in the shade"],
    maker: { name: "Appanna", role: "Spinner, Ponduru", note: "In Ponduru the cotton is still cleaned with a fish-jaw comb and spun on a single-spindle charkha, which is why the yarn is so fine." },
  },
  {
    slug: "haldi-khadi-kurta", name: "Haldi Khadi Kurta", collection: "men", type: "Kurtas", fabric: "Khadi", craft: "Handspun, handwoven", cluster: "Ponduru", state: "Andhra Pradesh",
    colour: "Haldi yellow", swatch: "#E9DDA8", price: 2450, image: "men-kurta", gallery: ["men-kurta", "men-kurta-d1", "men-kurta-d2", "stripes"], focus: "50% 20%",
    sizes: ["S", "M", "L", "XL", "XXL"], soldOut: ["S"], added: 20261001, rating: 4.8, reviews: 167,
    short: "A short kurta in soft khadi, dyed with turmeric.",
    description: "A hip-length kurta in handspun khadi, coloured with turmeric and pomegranate rind. Easy over jeans, sharp enough for a pooja.",
    details: ["Regular fit, hip length", "Band collar with a concealed placket", "Two side pockets", "Model is 5'11\" and wears size L"],
    care: ["Hand wash cold, separately", "Dry in the shade to keep the colour bright"],
    maker: { name: "Lakshmi", role: "Weaver, Ponduru", note: "Lakshmi weaves on a pit loom set into the floor of her home. One kurta length takes her about two days." },
  },
  {
    slug: "dhoop-linen-shirt", name: "Dhoop Linen Shirt", collection: "men", type: "Shirts", fabric: "Linen", craft: "Handloom", cluster: "Bhagalpur", state: "Bihar",
    colour: "Natural", swatch: "#D9CFBE", price: 2890, image: "men-linen", gallery: ["men-linen", "men-linen-d1", "men-linen-d2", "weaver-man"],
    sizes: APPAREL, added: 20261018, rating: 4.6, reviews: 58,
    short: "Handloom linen with a relaxed, open collar.",
    description: "A relaxed shirt in handloom linen from Bhagalpur, with a camp collar and a straight hem made to be worn untucked.",
    details: ["Relaxed fit with a camp collar", "Straight hem with side vents", "Handloom linen, garment washed", "Model is 6'0\" and wears size L"],
    care: ["Machine wash cold, gentle cycle", "Line dry", "Iron while damp"],
    maker: { name: "Mohammad Arif", role: "Weaver, Bhagalpur", note: "Arif's workshop weaves linen and tussar on six looms. He started weaving linen eight years ago and hasn't looked back." },
  },
  {
    slug: "pista-mangalgiri-kurta", name: "Pista Mangalgiri Kurta", collection: "men", type: "Kurtas", fabric: "Cotton", craft: "Handloom", cluster: "Mangalgiri", state: "Andhra Pradesh",
    colour: "Pista green", swatch: "#BFD3BE", price: 2350, image: "men-mint", gallery: ["men-mint", "men-mint-d1", "men-mint-d2", "stripes"],
    sizes: ["S", "M", "L", "XL", "XXL"], soldOut: ["XXL"], added: 20260928, rating: 4.7, reviews: 89,
    short: "Crisp Mangalgiri cotton with a nizam border placket.",
    description: "A long kurta in Mangalgiri handloom cotton, known for its crisp hand and fine count. Finished with a woven nizam border along the placket.",
    details: ["Regular fit, knee length", "Mandarin collar and woven border placket", "Mangalgiri handloom cotton", "Model is 5'11\" and wears size M"],
    care: ["Hand wash cold", "Starch lightly for a crisp finish", "Warm iron"],
    maker: { name: "Venkatesh", role: "Weaver, Mangalgiri", note: "Venkatesh weaves the nizam border on a jacquard attachment his father built in the 1980s." },
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const collections: Record<Collection, { title: string; italic: string; blurb: string; image: string }> = {
  women: { title: "Women", italic: "handwoven", blurb: "Co-ords, kurta sets, tunics and dresses in natural fibres, printed and embroidered by hand.", image: "chandni-kurta" },
  men: { title: "Men", italic: "everyday", blurb: "Khadi, linen and handloom cotton shirts and kurtas, made to breathe in the heat.", image: "men-linen" },
  sarees: { title: "Sarees", italic: "from the loom", blurb: "Maheshwari and Pochampally sarees, each one woven by a single family over weeks.", image: "saree-field" },
};

export const FABRICS: Fabric[] = ["Cotton", "Khadi", "Silk-cotton", "Chanderi", "Linen", "Mul cotton"];
export const SIZES: Size[] = [...APPAREL, "Free size"];
export const PRICE_BANDS = [
  { id: "u3", label: "Under ₹3,000", min: 0, max: 2999 },
  { id: "3to5", label: "₹3,000 to ₹5,000", min: 3000, max: 5000 },
  { id: "o5", label: "Above ₹5,000", min: 5001, max: Infinity },
] as const;
export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
] as const;

export const inStock = (p: Product, s: Size) => p.sizes.includes(s) && !p.soldOut?.includes(s);
