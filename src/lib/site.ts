export const site = {
  name: "OZMO Gym",
  hours: "5 a.m - 11 p.m (Mon - Sun)",
  phone: "+91 98144 23444",
  phoneHref: "tel:+919814423444",
  email: "ozmocare@gmail.com",
  address: "D block, South City, Ayali Khurd, Ludhiana, Punjab 142027",
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
  { label: "Franchise", href: "/franchise" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export const tapeWords = ["GYM", "YOGA", "CROSS-FIT", "OZMO", "SWIMMING", "CARDIO"];

export type Branch = {
  id: string;
  short: string;
  name: string;
  phone: string;
  address: string;
  image: string;
};

export const branches: Branch[] = [
  {
    id: "luxe",
    short: "South City",
    name: "Ozmo gym Luxe",
    phone: "+91 98144 23444",
    address: "D block, South City, Ayali Khurd, Ludhiana, Punjab 142027",
    image: "/images/branch-luxe.jpg",
  },
  {
    id: "rajguru",
    short: "Rajguru Nagar",
    name: "OZMO GYM & SPA - Rajguru Nagar",
    phone: "+91 96460 00727",
    address: "Sindhi bakery market, Sco 1-2-3, Rajguru Nagar, Ludhiana, Punjab 141012",
    image: "/images/branch-rajguru.jpg",
  },
  {
    id: "dugri",
    short: "Dugri",
    name: "Ozmo Gym & Spa - Dugri",
    phone: "+91 99155 52700",
    address:
      "Sco 62-63, 2nd Floor, near Maharaja Palazzo, Phase 2, Duggri, Urban Estate Dugri, Ludhiana, Punjab 141001",
    image: "/images/branch-dugri.jpg",
  },
  {
    id: "haibowal",
    short: "Haibowal",
    name: "Ozmo Gym & Spa - Haibowal",
    phone: "+91 98153 83875",
    address: "Uppal Plazza, Main Road, Shakti Vihar, Badi, Haibowal Kalan, Ludhiana, Punjab 141001",
    image: "/images/branch-haibowal.jpg",
  },
  {
    id: "fieldganj",
    short: "Field Ganj",
    name: "Ozmo Gym - Field Ganj",
    phone: "+91 98153 83875",
    address: "Main Market, Sco 23-24, opposite civil hospital, CMC Campus, Ludhiana, Punjab 141008",
    image: "/images/branch-fieldganj.jpg",
  },
  {
    id: "modeltown",
    short: "Model Town",
    name: "Ozmo Gym - Model Town",
    phone: "+91 96153 90001",
    address:
      "Scf 6 & 7, Model Town Extension Road, D-Block, Atam Nagar, Model Town, Ludhiana, Punjab 141002",
    image: "/images/branch-modeltown.jpg",
  },
];

export const stats = [
  { value: 10000, suffix: "+", label: "Clients" },
  { value: 50, suffix: "+", label: "Expert trainers" },
  { value: 6, suffix: "", label: "Branches" },
  { value: 12, suffix: "+", label: "Year of experience" },
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

// Questions are from the original site; answers are drafts — review before launch.
export const homeFaqs = [
  {
    q: "I need consultation about the prices of OZMO's services?",
    a: "Membership pricing depends on the branch, the services you choose and the plan duration. Call us on +91 98144 23444 or fill in the free trial form and our team will walk you through the current plans.",
  },
  {
    q: "As a beginner, how can I find out which workout program is right for me?",
    a: "Every new member starts with a short assessment with one of our trainers. Based on your goals and fitness level they will recommend a program and show you how to use the equipment safely.",
  },
  {
    q: "Is my membership card valid for use at all OZMO facilities?",
    a: "Memberships are issued by your home branch. Ask the front desk about multi-branch access options across our 6 Ludhiana locations.",
  },
  {
    q: "What are OZMO's operating hours?",
    a: "We are open from 5 a.m. to 11 p.m., Monday to Sunday.",
  },
  {
    q: "Does OZMO offer PT services?",
    a: "Yes. Personal training is available with our certified trainers, including tailored workout plans and progress tracking.",
  },
];

export const franchiseFaqs = [
  {
    q: "What territory rights will I have?",
    a: "Territory is agreed for each franchise before signing, so that partners are not competing with another OZMO location in the same catchment. Our franchise team will share the details for your city.",
  },
  {
    q: "What initial support will I receive?",
    a: "Site-selection assistance, interior and equipment planning, staff hiring support and local launch marketing — everything needed to get your centre open.",
  },
  {
    q: "Will I need to hire my own staff?",
    a: "Yes, the team is employed by the franchise partner. We help with hiring and provide trainer certification and staff training to OZMO standards.",
  },
  {
    q: "What background do I need?",
    a: "You do not need to come from the fitness industry. We look for partners with business ownership drive, local market knowledge and a commitment to member experience.",
  },
  {
    q: "What is the expected return on investment?",
    a: "Returns vary with location, centre size and local demand. Our franchise team will take you through the financial model and assumptions during your consultation.",
  },
];

export const budgetRanges = ["Under ₹25 L", "₹25 L - ₹50 L", "₹50 L - ₹1 Cr", "Above ₹1 Cr"];

export const mapSrc = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
