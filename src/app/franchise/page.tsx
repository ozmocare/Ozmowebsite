import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  Handshake,
  Megaphone,
  Phone,
  Repeat,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Faq from "@/components/Faq";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { FranchiseForm } from "@/components/LeadForms";
import { NetworkMap } from "@/components/Locations";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import RoiCalculator from "@/components/RoiCalculator";
import { FormSection, ImageCard, PageHero, SectionHeading } from "@/components/Sections";
import Stats from "@/components/Stats";
import StickyApply from "@/components/StickyApply";
import { franchiseFaqs, openLocations, site, soonLocations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gym Franchise in Punjab — Grow with OZMO",
  description: `Own an OZMO Gym franchise. A proven premium gym model with ${site.foundedYears}+ years of experience, ${openLocations.length} gyms running and 10,000+ members. Full setup, marketing and training support. Apply today.`,
  alternates: { canonical: "/franchise" },
  openGraph: { url: "/franchise", title: "Grow with OZMO — Gym Franchise in Punjab" },
};

const proof = [
  { value: site.foundedYears, suffix: "+", label: "Years in fitness" },
  { value: 10000, suffix: "+", label: "Members trained" },
  { value: openLocations.length, suffix: "", label: "Gyms running" },
  { value: soonLocations.length, suffix: "", label: "Opening soon" },
];

const reasons = [
  {
    icon: Repeat,
    title: "Recurring revenue",
    text: "Memberships renew month after month, giving you predictable cash flow instead of one-off sales.",
  },
  {
    icon: Banknote,
    title: "Multiple income streams",
    text: "Memberships, personal training, group classes and spa services — more ways to earn from every member.",
  },
  {
    icon: BadgeCheck,
    title: "A brand people already trust",
    text: `${site.foundedYears}+ years and 10,000+ members mean OZMO opens with recognition, not from zero.`,
  },
  {
    icon: ShieldCheck,
    title: "Lower risk, proven playbook",
    text: "Operating systems, SOPs and pricing refined across our own gyms — you follow what already works.",
  },
  {
    icon: Rocket,
    title: "Faster launch",
    text: "Site selection, fit-out, hiring and launch marketing handled with you, so you open sooner.",
  },
  {
    icon: TrendingUp,
    title: "A market that keeps growing",
    text: "Demand for premium fitness in Punjab's cities and towns is rising — get there first with a known name.",
  },
];

const benefits = [
  {
    image: "/images/franchise-group.jpg",
    title: "Full fitness centre concept",
    text: "A complete gym setup including strength, cardio and functional zones, plus group classes like yoga, cross-fit and aerobics.",
  },
  {
    image: "/images/equip-chest.jpg",
    title: "Premium equipment & design",
    text: "Top-quality equipment, interiors and branding guidelines for a high-performance environment that attracts and retains members.",
  },
  {
    image: "/images/franchise-management.jpg",
    title: "Member management system",
    text: "Software for member tracking, attendance, billing and performance analytics — so daily operations run smoothly.",
  },
  {
    image: "/images/franchise-marketing.jpg",
    title: "Marketing-ready brand assets",
    text: "Brand-approved visuals, launch campaigns and digital marketing templates to create awareness and drive sign-ups quickly.",
  },
  {
    image: "/images/franchise-teamwork.jpg",
    title: "Membership growth support",
    text: "Local marketing, social media and promotional strategies to consistently attract new members and keep existing ones.",
  },
  {
    image: "/images/franchise-training.jpg",
    title: "Training & performance support",
    text: "Staff training, trainer certification and regular operational audits to keep your team aligned with OZMO standards.",
  },
];

const steps = [
  { icon: Phone, title: "Enquire", text: "Fill in the form or call us. We'll set up a discovery call within 24 hours." },
  { icon: Handshake, title: "Discovery call", text: "We walk you through the model, investment and numbers for your city." },
  { icon: Building2, title: "Site selection", text: "Together we evaluate your property or find the right location." },
  { icon: BadgeCheck, title: "Agreement", text: "Sign the franchise agreement and lock in your territory." },
  { icon: Users, title: "Build & hire", text: "Fit-out, equipment and staff hiring — with OZMO training your team." },
  { icon: Megaphone, title: "Grand opening", text: "Launch marketing and opening-day support to fill your gym from day one." },
];

const idealPartner = [
  "Passionate about fitness and community",
  "Ready to invest and actively involved in the business",
  "Has, or can secure, a suitable commercial property",
  "Strong local network in their city",
  "Committed to a premium member experience",
];

export default function FranchisePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Franchise", path: "/franchise" },
        ])}
      />

      <PageHero
        eyebrow="OZMO franchise"
        title={
          <>
            Grow <span className="text-brand">with OZMO</span>
          </>
        }
        lead={`Own a premium gym backed by a brand Punjab already trusts — ${site.foundedYears}+ years in fitness, ${openLocations.length} gyms running and ${soonLocations.length} more opening soon.`}
        image="/images/franchise-group.jpg"
        crumbs={[{ name: "Franchise", href: "/franchise" }]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#apply" className="btn-primary">
            Apply for a franchise <ArrowRight size={18} />
          </a>
          <a href="#roi" className="btn-ghost">
            Calculate your returns
          </a>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-white/75">
          {["Proven business model", "End-to-end setup support", "Marketing & training included"].map((p) => (
            <li key={p} className="flex items-center gap-2">
              <Check size={16} className="text-brand" /> {p}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Proof band */}
      <section className="bg-brand py-10 text-ink md:py-12">
        <div className="wrap">
          <Stats items={proof} tone="brand" />
        </div>
      </section>

      {/* Why invest */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Why invest in OZMO"
            title="A business built to grow"
            lead="A gym franchise is a long-term asset in your city. Here's why partners choose OZMO."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.title}>
                <Reveal delay={(i % 3) * 90} className="card h-full p-7 transition hover:border-brand/50">
                  <span className="icon-badge">
                    <r.icon size={24} />
                  </span>
                  <h3 className="h3 mt-6">{r.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{r.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROI calculator */}
      <section id="roi" className="section bg-paper text-ink">
        <div className="wrap">
          <SectionHeading
            tone="light"
            eyebrow="Return on investment"
            title="Run the numbers yourself"
            lead="Move the sliders to match your city and see what an OZMO gym could earn. Then let our team walk you through the real model."
          />
          <Reveal className="mt-12">
            <RoiCalculator />
          </Reveal>
        </div>
      </section>

      {/* Network */}
      <section className="section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Our momentum"
              title={
                <>
                  Expanding across <span className="text-brand">Punjab</span>
                </>
              }
              lead={`${openLocations.length} OZMO gyms are already running, with new gyms opening soon in ${soonLocations
                .map((l) => l.area)
                .join(", ")}. Your city could be next.`}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="card p-6">
                <p className="font-display text-5xl font-black text-brand">{openLocations.length}</p>
                <p className="mt-1 font-semibold text-white/70">Gyms running</p>
              </div>
              <div className="card p-6">
                <p className="font-display text-5xl font-black">{soonLocations.length}</p>
                <p className="mt-1 font-semibold text-white/70">Opening soon</p>
              </div>
            </div>
            <a href="#apply" className="btn-primary mt-8">
              Claim your city <ArrowRight size={18} />
            </a>
          </div>
          <Reveal>
            <NetworkMap />
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="What you get"
            title="Everything you need to succeed"
            lead="As a franchise partner you get a proven fitness model, complete setup support, marketing assets and ongoing guidance."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <ImageCard image={b.image} title={b.title} text={b.text} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            align="center"
            eyebrow="Your path to opening"
            title="From enquiry to grand opening"
            lead="A clear, guided process — with the OZMO team beside you at every step."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 90} className="card relative h-full overflow-hidden p-7">
                  <span className="absolute -right-2 -top-6 font-display text-[7rem] font-black leading-none text-white/[0.04]">
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="icon-badge">
                      <s.icon size={22} />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Step {i + 1}</span>
                  </span>
                  <h3 className="h3 mt-6">{s.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ideal partner */}
      <section className="section bg-ink-2">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Photo src="/images/franchise-class.jpg" alt="Group fitness class at OZMO" className="aspect-[4/3] rounded-3xl" />
          <div>
            <SectionHeading
              eyebrow="Who we're looking for"
              title="Is OZMO right for you?"
              lead="You don't need a fitness background — OZMO brings the playbook. We look for partners who are:"
            />
            <ul className="mt-8 space-y-4">
              {idealPartner.map((p) => (
                <li key={p} className="flex items-start gap-4 text-lg text-white/85">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <a href="#apply" className="btn-primary mt-10">
              Start your application <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Faq items={franchiseFaqs} eyebrow="Franchise FAQ" title="Before you invest" />

      <FormSection
        id="apply"
        eyebrow="Apply now"
        title="Bring OZMO to your city"
        text="Tell us a little about yourself and the city you have in mind. Our franchise team will call you within 24 hours with the full investment model."
        points={["Detailed investment & ROI model", "Territory availability for your city", "No obligation discovery call"]}
      >
        <FranchiseForm />
      </FormSection>

      <p className="wrap -mt-10 pb-16 text-center text-white/55">
        Prefer to talk?{" "}
        <a href={site.phoneHref} className="font-bold text-brand hover:underline">
          Call {site.phone}
        </a>{" "}
        or <Link href="/contact" className="font-bold text-brand hover:underline">contact us</Link>.
      </p>

      <StickyApply />
    </>
  );
}
