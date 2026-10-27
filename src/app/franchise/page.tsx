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
import { FormSection, PageHero, SectionHeading } from "@/components/Sections";
import Stats from "@/components/Stats";
import StickyApply from "@/components/StickyApply";
import {
  franchiseFaqs,
  franchiseFormats,
  franchiseGlance,
  franchiseHighlights,
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

const advantages = [
  { icon: Banknote, title: "Low overhead", text: "Lean staffing and proven cost controls keep running costs in check from day one." },
  { icon: ShieldCheck, title: "Streamlined operations", text: "SOPs, pricing and member-management software refined across our own gyms." },
  { icon: BadgeCheck, title: "Value-added services", text: "Personal training, group classes, steam & spa — more revenue from every member." },
  { icon: Megaphone, title: "Targeted local marketing", text: "Campaigns aimed at your catchment to fill memberships before you open." },
  { icon: Rocket, title: "State-of-the-art everything", text: "Premium equipment, interiors and amenities that members happily pay for." },
  { icon: Repeat, title: "Recurring revenue", text: "Memberships renew month after month — predictable cash flow, not one-off sales." },
];

const ozmoSupport = [
  {
    title: "Financing & site selection",
    text: "We guide you on financing options, evaluate locations with you and help negotiate the lease, so your gym opens in the right place on the right terms.",
    items: ["Financing guidance", "Catchment & site analysis", "Lease negotiation support"],
  },
  {
    title: "Design & construction assistance",
    text: "A dedicated OZMO franchise manager is your go-to expert, backed by the official OZMO design guide for layout, interiors and equipment.",
    items: ["Dedicated franchise manager", "OZMO design & layout guide", "Equipment & vendor tie-ups"],
  },
  {
    title: "Training & development",
    text: "Your team is trained to run an OZMO the OZMO way — before, during and after launch.",
    items: ["Orientation session", "Pre-sale & grand-opening training", "Live operations training", "In-gym IT & systems training"],
  },
];

const successTools = [
  { icon: Megaphone, title: "PR & launch marketing", text: "Opening campaigns, local press and events that make your launch the talk of the town." },
  { icon: TrendingUp, title: "Online presence", text: "Your gym listed on the OZMO website, Google and social channels, with ongoing digital ads." },
  { icon: Download, title: "Marketing materials", text: "Ready-made posters, brochures, banners, flyers and WhatsApp & email campaigns." },
  { icon: Users, title: "Member management system", text: "Software for memberships, attendance, billing and performance analytics." },
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
            Own an <span className="text-brand">OZMO Gym</span> franchise
          </>
        }
        lead={`Your next business opportunity — partner with a premium gym brand Punjab already trusts. ${site.foundedYears}+ years in fitness, ${openLocations.length} gyms running and ${soonLocations.length} more opening soon.`}
        image="/images/franchise-group.jpg"
        crumbs={[{ name: "Franchise", href: "/franchise" }]}
      >
        <dl className="mt-10 grid max-w-3xl overflow-hidden rounded-2xl sm:grid-cols-3">
          {franchiseHighlights.map((h) => (
            <div
              key={h.label}
              className={`flex flex-col-reverse gap-2 p-6 ${h.tone === "brand" ? "bg-brand text-ink" : "bg-surface-2 text-white"}`}
            >
              <dt className={`font-bold ${h.tone === "brand" ? "text-ink/75" : "text-white/70"}`}>{h.label}</dt>
              <dd className="font-display text-4xl font-black leading-none md:text-5xl">{h.value}</dd>
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
      <section className="border-y border-white/10 bg-ink-2 py-10 md:py-12">
        <div className="wrap">
          <Stats items={proof} />
        </div>
      </section>

      {/* Welcome + why a franchise */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Welcome to OZMO Gym &amp; Spa</p>
            <h2 className="h2 mt-4">Your next business opportunity</h2>
            <p className="lead mt-6">
              Owning an OZMO is more than an investment — it&apos;s a business you&apos;ll be proud of, in a
              community that grows healthier because of it. For {site.foundedYears}+ years OZMO has built one of
              Ludhiana&apos;s best-known premium fitness brands, and we&apos;re now bringing it to new cities with
              partners like you.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Why a gym franchise?</p>
            <h2 className="h2 mt-4">Fitness is a necessity, not a luxury</h2>
            <p className="lead mt-6">
              More people join gyms every year, and for most members a membership is part of everyday life — which
              means steady, recurring revenue. A franchise lets you tap that demand with a brand, systems and support
              that are already proven, instead of building from scratch.
            </p>
          </Reveal>
        </div>
        <ul className="wrap mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((r, i) => (
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

      {/* OZMO support */}
      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="OZMO support"
            title="We're with you at every step"
            lead="From finding the right property to training your team, OZMO's franchise team works alongside you."
          />
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {ozmoSupport.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 100} className="card relative h-full overflow-hidden p-7 md:p-8">
                  <span className="absolute -right-1 -top-5 font-display text-[6.5rem] font-black leading-none text-white/[0.05]">
                    {i + 1}
                  </span>
                  <span className="font-display text-sm font-black text-brand">0{i + 1}</span>
                  <h3 className="h3 mt-2">{s.title}</h3>
                  <p className="mt-4 leading-7 text-white/65">{s.text}</p>
                  <ul className="mt-6 space-y-3">
                    {s.items.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-white/85">
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
        </div>
      </section>

      {/* Success tools */}
      <section className="section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Success tools"
              title="Marketing that fills your gym"
              lead="OZMO provides 100% marketing support — PR, digital and print — so you can focus on running a great gym."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {successTools.map((t, i) => (
                <li key={t.title}>
                  <Reveal delay={(i % 2) * 90} className="flex gap-4">
                    <span className="icon-badge">
                      <t.icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-extrabold uppercase">{t.title}</h3>
                      <p className="mt-1 leading-7 text-white/65">{t.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            <Photo src="/images/franchise-marketing.jpg" alt="OZMO marketing materials" className="col-span-2 aspect-[16/9] rounded-2xl" />
            <Photo src="/images/franchise-management.jpg" alt="Member management system" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square rounded-2xl" />
            <Photo src="/images/franchise-teamwork.jpg" alt="OZMO franchise team" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square rounded-2xl" />
          </Reveal>
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
