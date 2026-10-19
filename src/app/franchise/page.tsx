import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  Download,
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
import {
  franchiseFaqs,
  franchiseFormats,
  franchiseGlance,
  investmentBreakdown,
  openLocations,
  propertyChecklist,
  site,
  soonLocations,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Gym Franchise in Punjab — Investment, ROI & Formats",
  description: `Own an OZMO Gym franchise in Punjab. Investment from ${franchiseGlance[1].value}, ${franchiseGlance[2].value}, payback ${franchiseGlance[5].value}. ${openLocations.length} gyms running, full setup, marketing and training support.`,
  alternates: { canonical: "/franchise" },
  openGraph: { url: "/franchise", title: "Own an OZMO Gym Franchise — Investment, ROI & Formats" },
};

const proof = [
  { value: site.foundedYears, suffix: "+", label: "Years in fitness" },
  { value: 10000, suffix: "+", label: "Members trained" },
  { value: openLocations.length, suffix: "", label: "Gyms running" },
  { value: soonLocations.length, suffix: "", label: "Opening soon" },
];

const heroFacts = [franchiseGlance[1], franchiseGlance[2], franchiseGlance[5]];

const reasons = [
  { icon: Repeat, title: "Recurring revenue", text: "Memberships renew month after month — predictable cash flow, not one-off sales." },
  { icon: Banknote, title: "Multiple income streams", text: "Memberships, personal training, group classes, spa services and supplements." },
  { icon: BadgeCheck, title: "A brand people trust", text: `${site.foundedYears}+ years and 10,000+ members — you open with recognition, not from zero.` },
  { icon: ShieldCheck, title: "Proven playbook", text: "SOPs, pricing and systems refined across our own gyms. You follow what already works." },
  { icon: Rocket, title: "Faster launch", text: "Site selection, fit-out, hiring and launch marketing handled with you." },
  { icon: TrendingUp, title: "Growing market", text: "Demand for premium fitness in Punjab's cities and towns keeps rising." },
];

const support = [
  {
    phase: "Before launch",
    items: ["Site selection & property evaluation", "Layout, interior & equipment planning", "Vendor tie-ups at partner rates", "Staff hiring support", "Pre-sale membership campaign"],
  },
  {
    phase: "Launch",
    items: ["Grand-opening event playbook", "Trainer certification & staff training", "Member onboarding systems", "Local digital marketing launch", "On-site OZMO team for opening week"],
  },
  {
    phase: "Ongoing",
    items: ["Monthly business reviews", "Operational & quality audits", "Brand marketing campaigns", "New programs & product roll-outs", "Member management software"],
  },
];

const benefits = [
  { image: "/images/franchise-group.jpg", title: "Full fitness centre concept", text: "Strength, cardio and functional zones plus group classes like yoga, cross-fit and aerobics." },
  { image: "/images/franchise-management.jpg", title: "Member management system", text: "Software for member tracking, attendance, billing and performance analytics." },
  { image: "/images/franchise-marketing.jpg", title: "Marketing-ready brand assets", text: "Brand-approved creatives, launch campaigns and digital marketing templates." },
];

const steps = [
  { icon: Phone, title: "Enquire", text: "Fill in the form or call us. We set up a discovery call within 24 hours." },
  { icon: Handshake, title: "Discovery meeting", text: "We share the full model, investment and numbers for your city." },
  { icon: Building2, title: "Site approval", text: "We evaluate your property or help you find the right one." },
  { icon: BadgeCheck, title: "Agreement", text: "Sign the franchise agreement and lock in your territory." },
  { icon: Users, title: "Build & hire", text: "Fit-out, equipment and hiring — OZMO trains your team." },
  { icon: Megaphone, title: "Grand opening", text: "Launch marketing and opening-day support to fill your gym from day one." },
];

const idealPartner = [
  "Passionate about fitness and community",
  "Ready to invest and be actively involved",
  "Owns, or can lease, a suitable commercial property",
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
            Own an <span className="text-brand">OZMO</span> gym
          </>
        }
        lead={`Partner with a premium gym brand Punjab already trusts — ${site.foundedYears}+ years in fitness, ${openLocations.length} gyms running and ${soonLocations.length} more opening soon.`}
        image="/images/franchise-group.jpg"
        crumbs={[{ name: "Franchise", href: "/franchise" }]}
      >
        <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {heroFacts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-white/15 bg-ink/60 p-5 backdrop-blur">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">{f.label}</dt>
              <dd className="mt-2 font-display text-xl font-black text-brand md:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#details" className="btn-primary">
            See franchise details <ArrowRight size={18} />
          </a>
          <a href={site.phoneHref} className="btn-ghost">
            <Phone size={17} /> Talk to our franchise team
          </a>
        </div>
      </PageHero>

      {/* Proof band */}
      <section className="bg-brand py-10 text-ink md:py-12">
        <div className="wrap">
          <Stats items={proof} tone="brand" />
        </div>
      </section>

      {/* At a glance */}
      <section id="details" className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Franchise at a glance"
            title="The OZMO franchise in numbers"
            lead="Everything you need to evaluate the opportunity. Our team will share the detailed model for your city on a call."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {franchiseGlance.map((f, i) => (
              <Reveal key={f.label} delay={(i % 4) * 70} className="bg-surface p-6 md:p-8">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{f.label}</dt>
                <dd className="mt-3 font-display text-2xl font-black text-brand md:text-[1.7rem]">{f.value}</dd>
                <dd className="mt-1 text-sm text-white/55">{f.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Formats */}
      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="Franchise formats"
            title="Choose the right OZMO for your city"
            lead="Three formats, sized for different catchments and budgets."
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {franchiseFormats.map((f, i) => {
              const featured = f.tag === "Most popular";
              return (
                <li key={f.name}>
                  <Reveal
                    delay={i * 100}
                    className={`flex h-full flex-col overflow-hidden rounded-3xl border ${
                      featured ? "border-brand bg-surface" : "border-white/10 bg-surface"
                    }`}
                  >
                    <div className="relative">
                      <Photo src={f.image} alt={`${f.name} format`} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[16/9]" />
                      <span
                        className={`chip absolute left-4 top-4 border-transparent text-xs uppercase tracking-wider ${
                          featured ? "bg-brand text-ink" : "bg-ink/80 text-white"
                        }`}
                      >
                        {f.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-2xl font-black uppercase">{f.name}</h3>
                      <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-sm">
                        <div>
                          <dt className="text-white/50">Investment</dt>
                          <dd className="mt-1 font-bold text-brand">{f.investment}</dd>
                        </div>
                        <div>
                          <dt className="text-white/50">Area</dt>
                          <dd className="mt-1 font-bold">{f.area}</dd>
                        </div>
                        <div>
                          <dt className="text-white/50">Franchise fee</dt>
                          <dd className="mt-1 font-bold">{f.fee}</dd>
                        </div>
                      </dl>
                      <ul className="mt-5 space-y-3">
                        {f.features.map((x) => (
                          <li key={x} className="flex items-center gap-3 text-white/80">
                            <Check size={17} className="shrink-0 text-brand" strokeWidth={3} /> {x}
                          </li>
                        ))}
                      </ul>
                      <a href="#apply" className="mt-auto pt-7">
                        <span className={featured ? "btn-primary w-full" : "btn-ghost w-full"}>
                          Enquire about {f.name} <ArrowRight size={17} />
                        </span>
                      </a>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Investment breakdown + ROI */}
      <section id="roi" className="section bg-paper text-ink">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <SectionHeading
              tone="light"
              eyebrow="Investment & returns"
              title="Where your money goes — and comes back"
              lead="A typical split of the total investment, followed by a calculator to test returns with your own numbers."
            />
            <Reveal>
              <div className="flex h-5 overflow-hidden rounded-full">
                {investmentBreakdown.map((b, i) => (
                  <span
                    key={b.label}
                    style={{ width: `${b.share}%`, opacity: 1 - i * 0.16 }}
                    className="bg-ink first:rounded-l-full last:rounded-r-full"
                  />
                ))}
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {investmentBreakdown.map((b, i) => (
                  <li key={b.label} className="flex items-center gap-2.5 text-sm font-semibold text-ink/80">
                    <span className="h-3 w-3 shrink-0 rounded-sm bg-ink" style={{ opacity: 1 - i * 0.16 }} />
                    {b.label} <span className="text-ink/50">{b.share}%</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="mt-14">
            <RoiCalculator />
          </Reveal>
        </div>
      </section>

      {/* Why invest */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Why invest in OZMO" title="A business built to grow" />
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

      {/* Support */}
      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="Support you get"
            title="We're with you at every stage"
            lead="From the first site visit to your hundredth member — and long after."
          />
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {support.map((s, i) => (
              <li key={s.phase}>
                <Reveal delay={i * 100} className="card h-full p-7 md:p-8">
                  <span className="font-display text-sm font-black text-brand">0{i + 1}</span>
                  <h3 className="h3 mt-2">{s.phase}</h3>
                  <ul className="mt-6 space-y-3.5">
                    {s.items.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-white/80">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={i * 90} className="h-full">
                  <ImageCard image={b.image} title={b.title} text={b.text} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Property + partner */}
      <section className="section">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-7 md:p-10">
            <p className="eyebrow">Property requirements</p>
            <h2 className="h2 mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">What your site needs</h2>
            <ul className="mt-8 space-y-4">
              {propertyChecklist.map((p) => (
                <li key={p} className="flex items-start gap-4 text-white/85">
                  <Building2 size={20} className="mt-0.5 shrink-0 text-brand" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/50">Don&apos;t have a property yet? We&apos;ll help you find one.</p>
          </Reveal>
          <Reveal delay={120} className="card p-7 md:p-10">
            <p className="eyebrow">Ideal partner</p>
            <h2 className="h2 mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Is OZMO right for you?</h2>
            <ul className="mt-8 space-y-4">
              {idealPartner.map((p) => (
                <li key={p} className="flex items-start gap-4 text-white/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/50">No fitness background needed — OZMO brings the playbook.</p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            align="center"
            eyebrow="Your path to opening"
            title="From enquiry to grand opening"
            lead={`Typically ${franchiseGlance[7].value.toLowerCase()} from signing to opening day.`}
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
            <a href="#apply" className="btn-primary mt-8">
              Check availability in your city <ArrowRight size={18} />
            </a>
          </div>
          <Reveal>
            <NetworkMap />
          </Reveal>
        </div>
      </section>

      <Faq items={franchiseFaqs} eyebrow="Franchise FAQ" title="Before you invest" />

      <FormSection
        id="apply"
        eyebrow="Enquire now"
        title="Bring OZMO to your city"
        text="Tell us about yourself and the city you have in mind. Our franchise team will call you within 24 hours and share the detailed investment model and franchise brochure."
        points={["Detailed investment & ROI model", "Territory availability for your city", "No-obligation discovery call"]}
      >
        <FranchiseForm />
      </FormSection>

      <p className="wrap -mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pb-16 text-center text-white/55">
        <Download size={16} className="text-brand" /> Want the brochure first?{" "}
        <a href={site.phoneHref} className="font-bold text-brand hover:underline">
          Call {site.phone}
        </a>{" "}
        or <Link href="/contact" className="font-bold text-brand hover:underline">message us</Link>.
      </p>

      <StickyApply />
    </>
  );
}
