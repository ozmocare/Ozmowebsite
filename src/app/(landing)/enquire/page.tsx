import type { Metadata } from "next";
import { ArrowRight, Check, Clock, Dumbbell, MapPin, Phone, ShowerHead, Star, UserCheck } from "lucide-react";
import AdsLeadForm from "@/components/AdsLeadForm";
import Photo from "@/components/Photo";
import { openLocations, site, testimonials } from "@/lib/site";

// Ads landing page: kept out of search results so it doesn't compete with the main site.
export const metadata: Metadata = {
  title: { absolute: "Join OZMO Gym & Spa — Get a Call Back" },
  description: `Premium gyms across Ludhiana and Jagraon. Leave your number and the OZMO team will call you with membership plans.`,
  alternates: { canonical: "/enquire" },
  robots: { index: false, follow: true },
};

const perks = [
  `${openLocations.length} gyms across Ludhiana & Jagraon`,
  "Open 5 a.m. – 11 p.m., all 7 days",
  "Certified trainers & personal training",
  "Steam, sauna & premium changing rooms",
];

const reasons = [
  { icon: Dumbbell, title: "Full equipment", text: "Strength, cardio and functional zones with premium machines." },
  { icon: UserCheck, title: "Expert trainers", text: "50+ certified trainers to guide your form and plan." },
  { icon: ShowerHead, title: "Spa & recovery", text: "Steam, sauna and premium washrooms after every session." },
  { icon: Clock, title: "Train anytime", text: "Open early to late, every single day of the week." },
];

export default function EnquirePage() {
  return (
    <>
      {/* Hero + form */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
        <Photo src="/images/slide-athlete.jpg" alt="" eager sizes="100vw" className="!absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Ludhiana&apos;s premium gym &amp; spa</p>
            <h1 className="h-display mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">
              Join <span className="text-brand">OZMO</span> today
            </h1>
            <p className="lead mt-6 max-w-xl">
              Leave your number and our team will call you with membership plans, pricing and the best OZMO near you.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-lg font-medium text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/70">
              <span>
                <strong className="font-display text-2xl font-black text-brand">10,000+</strong> members
              </span>
              <span>
                <strong className="font-display text-2xl font-black text-brand">{site.foundedYears}+</strong> years
              </span>
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={18} className="text-brand" fill="currentColor" strokeWidth={0} />
                ))}
                <span className="ml-1">loved by members</span>
              </span>
            </div>
          </div>

          <div id="form" className="card scroll-mt-6 p-6 shadow-2xl md:p-8">
            <h2 className="font-display text-2xl font-black uppercase">Get a call back</h2>
            <p className="mt-1 text-white/60">Takes 20 seconds. We usually call within a few hours.</p>
            <div className="mt-6">
              <AdsLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why OZMO */}
      <section className="py-16 md:py-20">
        <div className="wrap">
          <h2 className="h2 text-center text-[clamp(1.8rem,3.6vw,2.8rem)]">Why members choose OZMO</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <li key={r.title} className="card p-6">
                <span className="icon-badge">
                  <r.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold uppercase">{r.title}</h3>
                <p className="mt-2 leading-7 text-white/65">{r.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
            <Photo src="/images/premium-gym.jpg" alt="OZMO gym floor" sizes="33vw" className="aspect-[4/3] rounded-2xl" />
            <Photo src="/images/premium-washroom.jpg" alt="Premium changing rooms" sizes="33vw" className="aspect-[4/3] rounded-2xl" />
            <Photo src="/images/premium-sauna.jpg" alt="Sauna" sizes="33vw" className="aspect-[4/3] rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Locations + reviews */}
      <section className="bg-ink-2 py-16 md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h2 text-[clamp(1.8rem,3.6vw,2.8rem)]">An OZMO near you</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {openLocations.map((l) => (
                <li key={l.slug} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 font-semibold">
                  <MapPin size={18} className="shrink-0 text-brand" /> {l.area}
                  {l.area !== l.city && <span className="font-normal text-white/45">{l.city}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="card p-6">
                <div className="flex gap-1 text-brand" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 leading-7 text-white/85">“{t.quote}”</blockquote>
                <figcaption className="mt-3 font-bold">
                  {t.name} <span className="font-normal text-white/50">· {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand py-14 text-ink">
        <div className="wrap flex flex-col items-center gap-6 text-center">
          <h2 className="h2 text-[clamp(1.8rem,3.6vw,2.8rem)]">Ready to start?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#form" className="btn-dark">
              Get a call back <ArrowRight size={18} />
            </a>
            <a href={site.phoneHref} className="btn border-2 border-ink/80 text-ink hover:bg-ink hover:text-brand">
              <Phone size={17} /> {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-2 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
        <a href="#form" className="btn-primary">
          Get a call back
        </a>
        <a href={site.phoneHref} aria-label="Call OZMO" className="btn-ghost px-5">
          <Phone size={18} />
        </a>
      </div>
      <div className="h-20 md:hidden" />
    </>
  );
}
