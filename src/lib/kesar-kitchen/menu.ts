export type Dish = { name: string; price: number; veg: boolean; desc: string; fav: boolean };
export type MenuCategory = { id: string; name: string; blurb: string; image: string; items: Dish[] };

export const menu: MenuCategory[] = [
  { id: "small-plates", name: "Small plates", blurb: "To share, or not. Ask your server for the day's chaat.", image: "samosa", items: [
    { name: "Amritsari Fish Pakora", price: 445, veg: false, desc: "Basa in carom-gram batter, mint chutney, pickled onion", fav: false },
    { name: "Kesar Paneer Tikka", price: 395, veg: true, desc: "Malai-marinated paneer, saffron, charred in the tandoor", fav: true },
    { name: "Kothimbir Vadi", price: 265, veg: true, desc: "Pune-style coriander fritters, peanut chutney", fav: false },
    { name: "Chicken Chapli Kebab", price: 465, veg: false, desc: "Hand-pounded mince, pomegranate, crushed coriander", fav: false },
    { name: "Dahi Ke Kebab", price: 345, veg: true, desc: "Hung-curd patties, beetroot crisp, chilli jam", fav: false },
    { name: "Kolhapuri Mutton Sukka", price: 525, veg: false, desc: "Dry-roasted mutton, kanda-lasun masala, coconut", fav: false },
  ] },
  { id: "tandoor", name: "Tandoor", blurb: "Our charcoal tandoor is lit at noon and burns till closing.", image: "tandoori", items: [
    { name: "Tandoori Pomfret", price: 745, veg: false, desc: "Whole pomfret, Konkan masala, lime butter", fav: true },
    { name: "Murgh Malai Tikka", price: 475, veg: false, desc: "Cream, cheese and green cardamom, charcoal finished", fav: false },
    { name: "Bharwan Aloo", price: 365, veg: true, desc: "Stuffed potatoes, nuts, paneer, smoked with cloves", fav: false },
    { name: "Seekh Kebab Lucknowi", price: 545, veg: false, desc: "Lamb mince, mace and rose petal, rumali on the side", fav: false },
    { name: "Tandoori Broccoli", price: 385, veg: true, desc: "Cheddar-yoghurt marinade, toasted almonds", fav: false },
    { name: "Garlic Naan / Laccha Paratha", price: 95, veg: true, desc: "From the clay oven, brushed with white butter", fav: false },
  ] },
  { id: "curries", name: "Curries", blurb: "Served with steamed rice or any bread from the tandoor.", image: "kadai", items: [
    { name: "Dal Kesari", price: 395, veg: true, desc: "Black urad simmered 18 hours, finished with saffron butter", fav: true },
    { name: "Old Delhi Butter Chicken", price: 545, veg: false, desc: "Charred tikka in a tomato-fenugreek makhani", fav: true },
    { name: "Mutton Rogan Josh", price: 625, veg: false, desc: "Kashmiri chilli, fennel and dry ginger, bone-in", fav: false },
    { name: "Palak Paneer", price: 425, veg: true, desc: "Hand-cut spinach, fresh paneer, garlic tadka", fav: false },
    { name: "Kadhai Kolhapuri", price: 445, veg: true, desc: "Mixed vegetables or chicken in a fiery Kolhapuri masala", fav: false },
    { name: "Malvani Prawn Curry", price: 695, veg: false, desc: "Coconut, kokum and Malvani masala, served with bhakri", fav: false },
    { name: "Kolhapuri Tambda Rassa", price: 595, veg: false, desc: "Fiery red mutton curry, the Kolhapur way, with bhakri", fav: false },
  ] },
  { id: "biryani-rice", name: "Biryani & rice", blurb: "Dum biryanis take 25 minutes. Worth every one of them.", image: "biryani-plate", items: [
    { name: "Awadhi Gosht Biryani", price: 645, veg: false, desc: "Dum-cooked under dough, aged basmati, kewra, mutton", fav: true },
    { name: "Hyderabadi Chicken Dum Biryani", price: 545, veg: false, desc: "Kacchi style, saffron milk, fried onions", fav: false },
    { name: "Subz Tarkari Biryani", price: 445, veg: true, desc: "Seasonal vegetables, mint, rose water", fav: false },
    { name: "Jeera Rice / Steamed Rice", price: 215, veg: true, desc: "Ambemohar from Mulshi", fav: false },
    { name: "Kheema Pulao", price: 495, veg: false, desc: "Spiced lamb mince, whole garam masala, raita", fav: false },
  ] },
  { id: "desserts", name: "Desserts", blurb: "Made in-house every afternoon, in small batches.", image: "jalebi", items: [
    { name: "Kesar Pista Kulfi", price: 245, veg: true, desc: "Slow-reduced milk, saffron, Iranian pistachio", fav: true },
    { name: "Gulab Jamun, Warm", price: 225, veg: true, desc: "With rabri and rose", fav: false },
    { name: "Jalebi & Rabri", price: 245, veg: true, desc: "Made to order, crisp and syrupy", fav: false },
    { name: "Puran Poli", price: 235, veg: true, desc: "Chana dal and jaggery flatbread, ghee, katachi amti", fav: false },
    { name: "Shahi Tukda", price: 255, veg: true, desc: "Ghee-fried bread, saffron rabri, silver leaf", fav: false },
  ] },
  { id: "drinks", name: "Drinks", blurb: "Chai, coolers and lassi. Full bar menu at the Lantern Bar.", image: "chai-pour", items: [
    { name: "Kesar Chai in Kulhad", price: 145, veg: true, desc: "Saffron, cardamom, slow-brewed", fav: false },
    { name: "Kokum Sherbet", price: 165, veg: true, desc: "Konkan kokum, black salt, roasted cumin", fav: false },
    { name: "Masala Chaas", price: 145, veg: true, desc: "Churned buttermilk, ginger, curry leaf", fav: false },
    { name: "Mango Lassi (seasonal)", price: 195, veg: true, desc: "Alphonso pulp, thick curd", fav: false },
  ] },
];
