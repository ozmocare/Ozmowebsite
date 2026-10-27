import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bike, Lock, MapPin, ShowerHead, Sparkles } from "lucide-react";
import Faq from "@/components/Faq";
import { JoinForm } from "@/components/LeadForms";
import { LudhianaMap } from "@/components/Locations";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { CtaBand, FeatureRow, FormSection, SectionHeading, Testimonials } from "@/components/Sections";
import Stats from "@/components/Stats";
import Transformations from "@/components/Transformations";
import { homeFaqs, locationHref, openLocations, site, soonLocations, stats } from "@/lib/site";

const services = [
  { label: "Gym", text: "Strength & free-weight zones", image: "/images/svc-gym.jpg", href: "/services/gym" },
  { label: "Cardio", text: "Treadmills, bikes & HIIT", image: "/images/svc-cardio.jpg", href: "/services/gym" },
  { label: "Kickfit", text: "Kickboxing & cross-fit", image: "/images/svc-crossfit.jpg", href: "/services/kickfit" },
  { label: "Yoga", text: "Flexibility & mindfulness", image: "/images/svc-yoga.jpg", href: "/services/yoga" },
  { label: "Swimming", text: "Coaching & lap swims", image: "/images/svc-swimming.jpg", href: "/services/swimming" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-40">
        <Photo src="/images/slide-athlete.jpg" alt="" eager sizes="100vw" className="!absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

        <div className="wrap">
          <p className="eyebrow">Ludhiana&apos;s premium gym &amp; spa chain</p>
          <h1 className="h-display mt-5 text-[clamp(3rem,10vw,8.5rem)]">
            Transform
            <br />
            body &amp; mind
            <br />
            <span className="text-brand">at OZMO</span>
          </h1>
          <p className="lead mt-7 max-w-xl">
            {site.foundedYears}+ years of helping Punjab get fitter. Modern equipment, expert trainers, steam &amp; spa —
            across {openLocations.length} gyms in Ludhiana and Jagraon.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#join" className="btn-primary">
              Join OZMO <ArrowRight size={18} />
            </Link>
            <Link href="/locations" className="btn-ghost">
              <MapPin size={17} /> Find a gym near you
            </Link>
          </div>

          <div className="mt-16 border-t border-white/15 pt-8">
            <Stats items={stats} />
          </div>
        </div>
      </section>

      <Marquee />

      {/* Services */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we offer"
              title="Train your way"
              lead="From heavy lifting to yoga and swimming — everything you need under one roof."
            />
            <Link href="/services/gym" className="btn-ghost">
              Explore services <ArrowUpRight size={17} />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {services.map((s, i) => (
              <li key={s.label} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
                <Reveal delay={i * 80} className="h-full">
                  <Link href={s.href} className="group relative block h-full overflow-hidden rounded-2xl">
                    <Photo
                      src={s.image}
                      alt={`${s.label} at OZMO Gym Ludhiana`}
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="aspect-[3/4] h-full"
                      imgClassName="transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
                      <div>
                        <h3 className="font-display text-2xl font-black uppercase">{s.label}</h3>
                        <p className="text-sm text-white/70">{s.text}</p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-ink transition group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities */}
      <section className="section bg-ink-2">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why OZMO"
              title={
                <>
                  5-star premium
                  <br />
                  fitness centres
                </>
              }
              lead="Every OZMO is built to feel like a premium club — so you actually look forward to training."
            />
            <ul className="mt-10 space-y-7">
              <FeatureRow icon={<Bike size={22} />} title="Full equipment">
                Modern facilities with full equipment in a spacious, comfortable space.
              </FeatureRow>
              <FeatureRow icon={<ShowerHead size={22} />} title="Showers, sauna & steam">
                Recover in style with showers, sauna and steam rooms after every session.
              </FeatureRow>
              <FeatureRow icon={<Lock size={22} />} title="Smart lockers">
                Smart lockers keep your personal belongings safe and secure.
              </FeatureRow>
              <FeatureRow icon={<Sparkles size={22} />} title="Expert trainers">
                50+ certified trainers to guide your form, plan and progress.
              </FeatureRow>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo src="/images/premium-gym.jpg" alt="OZMO gym floor" className="col-span-2 aspect-[16/9] rounded-2xl" />
            <Photo src="/images/premium-washroom.jpg" alt="Premium changing rooms" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square rounded-2xl" />
            <Photo src="/images/premium-sauna.jpg" alt="Sauna at OZMO" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Locations teaser */}
      <section className="section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Our locations"
              title={
                <>
                  {openLocations.length} gyms open.
                  <br />
                  <span className="text-brand">{soonLocations.length} more coming.</span>
                </>
              }
              lead="There's an OZMO close to home or work. Every gym is open 5 a.m. to 11 p.m., seven days a week."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {openLocations.map((l) => (
                <li key={l.slug}>
                  <Link href={locationHref(l)} className="chip border-white/15 text-white/85 hover:border-brand hover:text-brand">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {l.area}
                  </Link>
                </li>
              ))}
              {soonLocations.map((l) => (
                <li key={l.slug} className="chip border-dashed border-white/20 text-white/50">
                  {l.area} · soon
                </li>
              ))}
            </ul>
            <Link href="/locations" className="btn-primary mt-10">
              View all locations <ArrowRight size={18} />
            </Link>
          </div>
          <Reveal>
            <LudhianaMap />
          </Reveal>
        </div>
      </section>

      <Transformations />

      <CtaBand
        eyebrow="OZMO franchise"
        title="Grow with OZMO"
        text={`Bring a proven premium gym brand to your city. ${openLocations.length} gyms running, ${soonLocations.length} opening soon — and room for partners who want to build with us.`}
        primary={{ label: "Explore the franchise", href: "/franchise" }}
        secondary={{ label: "See investment details", href: "/franchise#details" }}
      />

      <Testimonials />
      <Faq items={homeFaqs} />

      <FormSection
        id="join"
        eyebrow="Membership enquiry"
        title="Start your OZMO journey"
        text="Tell us where you'd like to train and our team will call you with membership plans, pricing and timings."
        points={["Membership plans for every budget", "Tour the gym before you join", "Personal training available"]}
      >
        <JoinForm />
      </FormSection>
    </>
  );
}
