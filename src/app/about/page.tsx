import type { Metadata } from "next";
import { HeartPulse, UserCheck, Users } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { NetworkMap } from "@/components/Locations";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, SectionHeading, Testimonials } from "@/components/Sections";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import { openLocations, site, soonLocations, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About OZMO — Ludhiana's Premium Gym & Spa Chain",
  description: `OZMO Gym & Spa has ${site.foundedYears}+ years in health and wellness, ${openLocations.length} gyms across Ludhiana and Jagraon and over 10,000 members trained. Meet the team and our mission.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const pillars = [
  { icon: HeartPulse, title: "Body & mind", text: "Empowering a life of physical and mental well-being." },
  { icon: UserCheck, title: "Expert guidance", text: "Personalized training programs with certified trainers." },
  { icon: Users, title: "Community", text: "A supportive community that keeps you showing up." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About OZMO"
        title={
          <>
            Built in Ludhiana. <span className="text-brand">Built for results.</span>
          </>
        }
        lead={`For ${site.foundedYears}+ years OZMO has helped people across Punjab transform body and mind — with premium gyms, expert trainers and a community that keeps you going.`}
        image="/images/about-gym.jpg"
        crumbs={[{ name: "About", href: "/about" }]}
      />

      <section className="pb-20">
        <div className="wrap">
          <div className="card px-2 py-8 md:py-10">
            <Stats items={stats} />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our mission"
              title="Fitness is the foundation for a healthy, happy life"
              lead="Our mission is to help people of all fitness levels achieve their goals through personalized training programs, expert guidance, and a supportive community."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {pillars.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 90} className="card h-full p-6">
                    <span className="icon-badge">
                      <p.icon size={22} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-extrabold uppercase">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{p.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Photo src="/images/slide-athlete.jpg" alt="Member training at OZMO" className="aspect-[4/5] rounded-3xl lg:aspect-[4/4.6]" />
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Our network"
            title={
              <>
                {openLocations.length} gyms. <span className="text-brand">{soonLocations.length} on the way.</span>
              </>
            }
            lead={`From our first gym in Ludhiana to Jagraon — and next ${soonLocations
              .map((l) => l.area)
              .join(", ")}. Wherever you are, there's an OZMO close by.`}
          />
          <Reveal>
            <NetworkMap />
          </Reveal>
        </div>
      </section>

      <Team />
      <Testimonials />

      <CtaBand
        eyebrow="Start today"
        title="Your first workout is free"
        text="Book a free 1-day trial at any OZMO gym and see the difference for yourself."
        primary={{ label: "Book a free trial", href: "/#trial" }}
        secondary={{ label: "Find a gym", href: "/locations" }}
      />
    </>
  );
}
