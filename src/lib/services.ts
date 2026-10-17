export type ServiceContent = {
  slug: string;
  title: string;
  /** <title> tag, keyword-focused */
  seoTitle: string;
  description: string;
  hero: string;
  slides: { src: string; alt: string }[];
  introTitle: string;
  features: string[];
  areasTitle: string;
  areasText: string;
  areas: { title: string; text: string; image?: string }[];
};

// Gym content is from the original site. Yoga, Kickfit and Swimming were not shown
// in the reference recording — their copy is a first draft to be reviewed.
export const services: Record<string, ServiceContent> = {
  gym: {
    slug: "gym",
    title: "Gym",
    seoTitle: "Gym in Ludhiana — Strength & Cardio Training",
    description:
      "Train at OZMO, Ludhiana's premium gym chain: strength, cardio and functional zones with Matrix and Aerofit equipment, expert trainers and steam & spa. Open 5 a.m.–11 p.m.",
    hero: "/images/premium-gym.jpg",
    slides: [
      { src: "/images/slide-athlete.jpg", alt: "Athlete training with a resistance band" },
      { src: "/images/equip-chest.jpg", alt: "Free weights area" },
      { src: "/images/about-gym.jpg", alt: "Strength machines" },
    ],
    introTitle: "We provide the best gym services for you",
    features: [
      "Modern facilities with full equipment. Spacious and comfortable space.",
      "Professional Trainers: Receive expert guidance and tailored workout plans.",
      "Flexible hours: Train any day of the week, from 5 a.m to 11 p.m.",
      "Supportive community that keeps you motivated and consistent.",
    ],
    areasTitle: "Diverse workout machines to suit all customer needs",
    areasText:
      "At OZMO, we provide a full range of workout machines, allowing customers to comfortably choose the exercises that best suit them.",
    areas: [
      {
        title: "Chest workout area",
        text: "Build a powerful chest with our state-of-the-art equipment in the Chest Workout Area. Perfect for strength and definition.",
        image: "/images/equip-chest.jpg",
      },
      {
        title: "Back workout area",
        text: "Strengthen your back and improve posture in our Back Workout Area. Comprehensive equipment for a complete back workout.",
        image: "/images/equip-back.jpg",
      },
      {
        title: "Shoulder workout area",
        text: "Develop strong, defined shoulders in our Shoulder Workout Area, with free weights and machines for every level.",
        image: "/images/about-gym.jpg",
      },
      {
        title: "Leg workout area",
        text: "Get ready to feel the burn in our Leg Workout Area. Sculpt and strengthen your legs with the best machines and exercises.",
        image: "/images/premium-gym.jpg",
      },
      {
        title: "Abdominal workout area",
        text: "Achieve those six-pack abs in our Abdominal Workout Area. Specialised equipment and exercises for a strong core.",
        image: "/images/franchise-training.jpg",
      },
      {
        title: "Cardio workout area",
        text: "Boost your endurance and burn calories in our Cardio Workout Area. Enjoy a variety of machines to keep your heart pumping.",
        image: "/images/branch-rajguru.jpg",
      },
    ],
  },
  yoga: {
    slug: "yoga",
    title: "Yoga",
    seoTitle: "Yoga Classes in Ludhiana",
    description:
      "Yoga classes at OZMO Gym, Ludhiana — guided sessions for flexibility, strength and stress relief, for beginners and regular practitioners. Book a free trial.",
    hero: "/images/franchise-training.jpg",
    slides: [
      { src: "/images/franchise-training.jpg", alt: "Group class" },
      { src: "/images/franchise-class.jpg", alt: "Studio session" },
    ],
    introTitle: "We provide the best yoga services for you",
    features: [
      "Calm, spacious studios designed for focus and comfort.",
      "Experienced instructors who adapt every pose to your level.",
      "Morning and evening batches to fit your schedule.",
      "Improve flexibility, posture, breathing and stress levels.",
    ],
    areasTitle: "Yoga sessions to suit every level",
    areasText:
      "From first-timers to regular practitioners, OZMO yoga sessions help you build strength and flexibility at your own pace.",
    areas: [
      {
        title: "Beginner flow",
        text: "Learn the foundations — breathing, alignment and the core poses — in a relaxed, guided session.",
        image: "/images/svc-yoga.jpg",
      },
      {
        title: "Power yoga",
        text: "A faster, strength-focused practice that builds stamina, tones the body and burns calories.",
        image: "/images/franchise-training.jpg",
      },
      {
        title: "Stretch & recovery",
        text: "Gentle mobility work that eases sore muscles and speeds up recovery after heavy training days.",
        image: "/images/franchise-class.jpg",
      },
      {
        title: "Meditation & breathwork",
        text: "Guided pranayama and meditation to reduce stress and improve focus and sleep.",
        image: "/images/premium-sauna.jpg",
      },
    ],
  },
  kickfit: {
    slug: "kickfit",
    title: "Kickfit",
    seoTitle: "Kickboxing & Cross-fit Classes in Ludhiana",
    description:
      "Kickfit at OZMO Gym, Ludhiana — high-energy kickboxing, HIIT and cross-fit classes with expert coaches. Burn fat and build conditioning. Book a free trial.",
    hero: "/images/franchise-group.jpg",
    slides: [
      { src: "/images/franchise-group.jpg", alt: "Kickfit class" },
      { src: "/images/franchise-class.jpg", alt: "Group conditioning class" },
    ],
    introTitle: "We provide the best kickfit services for you",
    features: [
      "High-intensity classes that burn fat and build conditioning.",
      "Coaches who teach safe technique for every punch and kick.",
      "Bags, gloves and pads available at the studio.",
      "Group energy that pushes you further than training alone.",
    ],
    areasTitle: "Kickfit classes to suit all fitness goals",
    areasText:
      "Kickfit combines kickboxing, cross-fit and functional training into sessions that build strength, speed and confidence.",
    areas: [
      {
        title: "Kickboxing basics",
        text: "Master stance, footwork, punches and kicks with step-by-step coaching.",
        image: "/images/svc-crossfit.jpg",
      },
      {
        title: "HIIT conditioning",
        text: "Short, intense intervals that raise your heart rate and keep you burning calories long after class.",
        image: "/images/franchise-group.jpg",
      },
      {
        title: "Cross-fit circuits",
        text: "Functional strength circuits using kettlebells, ropes and bodyweight movements.",
        image: "/images/equip-chest.jpg",
      },
      {
        title: "Core & agility",
        text: "Drills that sharpen balance, coordination and core strength.",
        image: "/images/franchise-class.jpg",
      },
    ],
  },
  swimming: {
    slug: "swimming",
    title: "Swimming",
    seoTitle: "Swimming Classes in Ludhiana",
    description:
      "Swimming at OZMO, Ludhiana — learn-to-swim coaching, lap swimming and aqua fitness, with showers, lockers and steam rooms. Book a free trial.",
    hero: "/images/premium-washroom.jpg",
    slides: [
      { src: "/images/premium-washroom.jpg", alt: "Changing rooms" },
      { src: "/images/premium-sauna.jpg", alt: "Sauna" },
    ],
    introTitle: "We provide the best swimming services for you",
    features: [
      "Clean, well-maintained pool with regular water quality checks.",
      "Certified coaches for beginners and advanced swimmers.",
      "Low-impact, full-body training that is easy on the joints.",
      "Showers, lockers and steam rooms to relax afterwards.",
    ],
    areasTitle: "Swimming programs to suit all ages",
    areasText:
      "Whether you are learning to swim or training for endurance, OZMO offers a program that fits.",
    areas: [
      {
        title: "Learn to swim",
        text: "Patient, step-by-step coaching that builds water confidence and correct technique.",
        image: "/images/svc-swimming.jpg",
      },
      {
        title: "Lap swimming",
        text: "Dedicated lane time for fitness swimmers working on distance and speed.",
        image: "/images/premium-washroom.jpg",
      },
      {
        title: "Aqua fitness",
        text: "Water-based workouts that improve strength and cardio with minimal joint stress.",
        image: "/images/franchise-class.jpg",
      },
      {
        title: "Recovery sessions",
        text: "Gentle pool sessions that loosen tight muscles and aid recovery between workouts.",
        image: "/images/premium-sauna.jpg",
      },
    ],
  },
};

export const equipmentBrands = ["Aerofit", "GrooveFit", "MATRIX", "BeatPulse", "VIVA FITNESS"];

export const amenities = [
  {
    title: "Steam rooms",
    text: "Experience ultimate relaxation, body detoxification, and enhanced health.",
    image: "/images/premium-sauna.jpg",
  },
  {
    title: "Bathroom",
    text: "Modern showers with warm, refreshing water. Wash away dirt, sweat, and relax muscles.",
    image: "/images/premium-washroom.jpg",
  },
  {
    title: "Personal locker",
    text: "Personal lockers help you keep your property safe and convenient.",
    image: "/images/premium-gym.jpg",
  },
  {
    title: "Lounge area",
    text: "Our elegant and comfortable lounge area provides you with an ideal relaxation space.",
    image: "/images/amenity-lounge.jpg",
  },
];
