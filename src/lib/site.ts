export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://ozmowebsite.vercel.app").replace(/\/$/, "");

export const site = {
  name: "OZMO Gym",
  legalName: "OZMO Gym & Spa",
  hours: "5 a.m - 11 p.m (Mon - Sun)",
  openingHours: "Mo-Su 05:00-23:00",
  phone: "+91 98144 23444",
  phoneHref: "tel:+919814423444",
  email: "ozmocare@gmail.com",
  address: "D Block, South City, Ayali Khurd, Ludhiana, Punjab 142027",
  foundedYears: 12,
  // TODO: replace with the real profile URLs
  socials: {
    x: "https://x.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },
};

export const serviceLinks = [
  { label: "Gym", href: "/services/gym" },
  { label: "Yoga", href: "/services/yoga" },
  { label: "Kickfit", href: "/services/kickfit" },
  { label: "Swimming", href: "/services/swimming" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Locations                                                          */
/* ------------------------------------------------------------------ */

export type Location = {
  slug: string;
  /** Neighbourhood or town shown as the location name, e.g. "Dugri" */
  area: string;
  city: string;
  status: "open" | "soon";
  /** Brand line for this branch, e.g. "OZMO Gym & Spa" */
  brand?: string;
  /** Street address without city/state. Missing = details not supplied yet. */
  street?: string;
  postalCode?: string;
  phone?: string;
  image?: string;
};

// Branches with a street address get their own page at /locations/[slug].
// TODO (needs details from OZMO): Jalandhar Bypass, Pakhowal Road, Jagraon — address, phone, photo.
export const locations: Location[] = [
  {
    slug: "south-city",
    area: "South City",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym Luxe",
    street: "D Block, South City, Ayali Khurd",
    postalCode: "142027",
    phone: "+91 98144 23444",
    image: "/images/branch-luxe.jpg",
  },
  {
    slug: "dugri",
    area: "Dugri",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym & Spa",
    street: "SCO 62-63, 2nd Floor, near Maharaja Palazzo, Phase 2, Urban Estate Dugri",
    postalCode: "141001",
    phone: "+91 99155 52700",
    image: "/images/branch-dugri.jpg",
  },
  {
    slug: "rajguru-nagar",
    area: "Rajguru Nagar",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym & Spa",
    street: "Sindhi Bakery Market, SCO 1-2-3, Rajguru Nagar",
    postalCode: "141012",
    phone: "+91 96460 00727",
    image: "/images/branch-rajguru.jpg",
  },
  {
    slug: "model-town",
    area: "Model Town",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym",
    street: "SCF 6 & 7, Model Town Extension Road, D-Block, Atam Nagar, Model Town",
    postalCode: "141002",
    phone: "+91 96153 90001",
    image: "/images/branch-modeltown.jpg",
  },
  {
    slug: "haibowal",
    area: "Haibowal",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym & Spa",
    street: "Uppal Plaza, Main Road, Shakti Vihar, Badi Haibowal Kalan",
    postalCode: "141001",
    phone: "+91 98153 83875",
    image: "/images/branch-haibowal.jpg",
  },
  {
    slug: "field-ganj",
    area: "Field Ganj",
    city: "Ludhiana",
    status: "open",
    brand: "OZMO Gym",
    street: "Main Market, SCO 23-24, opposite Civil Hospital, CMC Campus",
    postalCode: "141008",
    phone: "+91 98153 83875",
    image: "/images/branch-fieldganj.jpg",
  },
  { slug: "jalandhar-bypass", area: "Jalandhar Bypass", city: "Ludhiana", status: "open" },
  { slug: "pakhowal-road", area: "Pakhowal Road", city: "Ludhiana", status: "open" },
  { slug: "jagraon", area: "Jagraon", city: "Jagraon", status: "open" },

  { slug: "chandigarh-road", area: "Chandigarh Road", city: "Ludhiana", status: "soon" },
  { slug: "gill-road", area: "Gill Road", city: "Ludhiana", status: "soon" },
  { slug: "sahnewal", area: "Sahnewal", city: "Sahnewal", status: "soon" },
  { slug: "khanna", area: "Khanna", city: "Khanna", status: "soon" },
  { slug: "moga", area: "Moga", city: "Moga", status: "soon" },
];

export const openLocations = locations.filter((l) => l.status === "open");
export const soonLocations = locations.filter((l) => l.status === "soon");
/** Open branches with full details — these get a page at /locations/[slug]. */
export const detailedLocations = openLocations.filter((l) => l.street);

export const locationTitle = (l: Location) =>
  l.area === l.city ? `OZMO Gym ${l.city}` : `OZMO Gym ${l.area}, ${l.city}`;
export const fullAddress = (l: Location) =>
  l.street ? `${l.street}, ${l.city}, Punjab ${l.postalCode ?? ""}`.trim() : `${l.area}, ${l.city}, Punjab`;
export const locationHref = (l: Location) => (l.street ? `/locations/${l.slug}` : "/locations");
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mapSrc = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
export const directionsHref = (l: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    l.street ? `${l.brand ?? "OZMO Gym"} ${fullAddress(l)}` : `OZMO Gym ${l.area} ${l.city}`,
  )}`;

/** Town markers for the Punjab network map (lat/lon of each town). */
export const towns: { name: string; lat: number; lon: number; label: "above" | "below" | "right"; dx?: number }[] = [
  { name: "Ludhiana", lat: 30.901, lon: 75.857, label: "above" },
  { name: "Jagraon", lat: 30.789, lon: 75.473, label: "below" },
  { name: "Sahnewal", lat: 30.849, lon: 75.951, label: "below", dx: -12 },
  { name: "Khanna", lat: 30.705, lon: 76.222, label: "right", dx: 6 },
  { name: "Moga", lat: 30.817, lon: 75.171, label: "above" },
];

/* ------------------------------------------------------------------ */
/* Brand numbers                                                       */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 10000, suffix: "+", label: "Members trained" },
  { value: openLocations.length, suffix: "", label: "Gyms running" },
  { value: 50, suffix: "+", label: "Expert trainers" },
  { value: site.foundedYears, suffix: "+", label: "Years in fitness" },
];

export const testimonials = [
  {
    quote:
      "Amazing gym! Knowledgeable trainers, top-notch facilities, fun classes. I've seen great results and love the OZMO community.",
    name: "Simran Kaur",
    role: "Model",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "Overcame gym intimidation with the friendly atmosphere. Personalized plan helped me reach my fitness goals. Feeling stronger and more confident.",
    name: "Abhi V.",
    role: "Software engineer",
    image: "/images/testimonial-2.jpg",
  },
];

// Slides 2 and 3 are placeholders — replace with real member results.
export const transformations = [
  {
    name: "David",
    age: 32,
    duration: "9 weeks",
    weight: [84, 75],
    bodyFat: [27, 15],
    before: "/images/transform-before.jpg",
    after: "/images/transform-after.jpg",
  },
  {
    name: "Member name",
    age: 28,
    duration: "12 weeks",
    weight: [92, 80],
    bodyFat: [30, 18],
    before: "/images/transform-before.jpg",
    after: "/images/transform-after.jpg",
  },
  {
    name: "Member name",
    age: 35,
    duration: "16 weeks",
    weight: [88, 76],
    bodyFat: [29, 16],
    before: "/images/transform-before.jpg",
    after: "/images/transform-after.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

// Answers are drafts — review with OZMO before launch.
export const homeFaqs = [
  {
    q: "How much does an OZMO gym membership cost?",
    a: "Membership pricing depends on the branch, the services you choose and the plan duration. Call us on +91 98144 23444 or book a free trial and our team will walk you through the current plans.",
  },
  {
    q: "As a beginner, how can I find out which workout program is right for me?",
    a: "Every new member starts with a short assessment with one of our trainers. Based on your goals and fitness level they will recommend a program and show you how to use the equipment safely.",
  },
  {
    q: "Is my membership valid at all OZMO gyms?",
    a: `Memberships are issued by your home branch. Ask the front desk about multi-branch access across our ${openLocations.length} OZMO gyms.`,
  },
  {
    q: "What are OZMO's opening hours?",
    a: "All OZMO gyms are open from 5 a.m. to 11 p.m., Monday to Sunday.",
  },
  {
    q: "Does OZMO offer personal training?",
    a: "Yes. Personal training is available with our certified trainers, including tailored workout plans and progress tracking.",
  },
  {
    q: "Where are OZMO gyms located?",
    a: `We have ${openLocations.length} gyms running across Ludhiana and Jagraon — ${openLocations
      .map((l) => l.area)
      .join(", ")} — with new gyms opening soon in ${soonLocations.map((l) => l.area).join(", ")}.`,
  },
];

export const franchiseFaqs = [
  {
    q: "How much investment does an OZMO franchise need?",
    a: "Investment depends on the city, the size of the property and the format (gym, or gym & spa). Share your budget range in the form below and our franchise team will take you through the detailed financial model on a call.",
  },
  {
    q: "What is the expected return on investment?",
    a: "Returns depend on location, centre size, membership pricing and local demand. Use the calculator on this page to test your own numbers, then our team will walk you through the assumptions behind OZMO's model.",
  },
  {
    q: "Do I need a fitness background?",
    a: "No. We look for partners with business ownership drive, local market knowledge and commitment to member experience. OZMO trains your team and provides the operating playbook.",
  },
  {
    q: "What support will I receive before and after launch?",
    a: "Site selection, interior and equipment planning, staff hiring and training, launch marketing and grand-opening support — followed by ongoing audits, monthly business reviews and marketing campaigns.",
  },
  {
    q: "Will I need to hire my own staff?",
    a: "Yes, the team is employed by the franchise partner. We help you hire and we train and certify trainers to OZMO standards.",
  },
  {
    q: "What territory rights will I have?",
    a: "Territory is agreed before signing so partners are not competing with another OZMO in the same catchment. Our team will share the details for your city.",
  },
];

/* ------------------------------------------------------------------ */
/* Franchise                                                           */
/* ------------------------------------------------------------------ */

export const budgetRanges = ["Under ₹25 L", "₹25 L - ₹50 L", "₹50 L - ₹1 Cr", "Above ₹1 Cr"];

/**
 * Starting values for the franchise ROI calculator. These are illustrative
 * example inputs only — CONFIRM WITH OZMO before launch. Visitors can change all of them.
 */
export const roiDefaults = {
  investment: { value: 7500000, min: 3000000, max: 20000000, step: 500000 },
  members: { value: 450, min: 100, max: 1500, step: 25 },
  fee: { value: 2000, min: 800, max: 5000, step: 100 },
  costs: { value: 550000, min: 150000, max: 2000000, step: 25000 },
};

/* ------------------------------------------------------------------ */
/* Franchise terms                                                     */
/* ------------------------------------------------------------------ */
// DRAFT FIGURES — benchmarked against Punjab/North-India premium gym franchises.
// Every number below must be confirmed by OZMO before this page goes live.

export const franchiseGlance = [
  { label: "Business model", value: "FOFO", note: "Franchise owned, franchise operated" },
  { label: "Total investment", value: "₹50 L – ₹1.5 Cr", note: "Depends on format and city" },
  { label: "Area required", value: "3,000 – 10,000 sq ft", note: "Carpet area, commercial property" },
  { label: "Franchise fee", value: "₹5 L – ₹10 L", note: "One-time, by format" },
  { label: "Royalty", value: "5% of revenue", note: "Monthly, from month 4" },
  { label: "Expected payback", value: "24 – 36 months", note: "Indicative, not guaranteed" },
  { label: "Agreement term", value: "9 years", note: "Renewable" },
  { label: "Time to launch", value: "90 – 120 days", note: "From signing to opening" },
];

export const franchiseFormats = [
  {
    name: "OZMO Gym",
    tag: "Neighbourhood",
    area: "3,000 – 5,000 sq ft",
    investment: "₹50 L – ₹75 L",
    fee: "₹5 L",
    image: "/images/equip-chest.jpg",
    features: ["Strength & cardio floors", "Functional training zone", "Personal training", "Changing rooms & lockers"],
  },
  {
    name: "OZMO Gym & Spa",
    tag: "Most popular",
    area: "5,000 – 8,000 sq ft",
    investment: "₹75 L – ₹1.2 Cr",
    fee: "₹7.5 L",
    image: "/images/premium-gym.jpg",
    features: ["Everything in OZMO Gym", "Group class studio", "Steam & sauna", "Premium washrooms"],
  },
  {
    name: "OZMO Luxe",
    tag: "Flagship",
    area: "8,000 – 10,000+ sq ft",
    investment: "₹1.2 Cr – ₹1.5 Cr+",
    fee: "₹10 L",
    image: "/images/premium-sauna.jpg",
    features: ["Everything in Gym & Spa", "Luxury interiors & lounge", "Spa therapies", "Dedicated recovery zone"],
  },
];

/** Share of total investment, shown as a bar. */
export const investmentBreakdown = [
  { label: "Gym equipment", share: 40 },
  { label: "Interiors & fit-out", share: 30 },
  { label: "Franchise fee", share: 8 },
  { label: "Launch marketing", share: 7 },
  { label: "Working capital", share: 15 },
];

export const propertyChecklist = [
  "3,000+ sq ft carpet area on ground, first or second floor",
  "Main-road visibility with signage rights",
  "Parking for at least 25 cars and two-wheelers",
  "Clear ceiling height of 11 ft or more",
  "Dense residential or office catchment within 3 km",
  "Power load and water supply suitable for a gym & spa",
];
