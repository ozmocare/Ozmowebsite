import type { Metadata } from "next";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { ContactForm } from "@/components/LeadForms";
import LocationFinder from "@/components/LocationFinder";
import Reveal from "@/components/Reveal";
import { PageHero, SectionHeading } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact OZMO Gym Ludhiana",
  description: `Call ${site.phone}, email ${site.email} or send us a message. Find phone numbers and directions for every OZMO gym in Ludhiana and Jagraon.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const cards = [
  { icon: PhoneCall, label: "Call us", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Head office", value: site.address },
  { icon: Clock, label: "Opening hours", value: "5 a.m. – 11 p.m., Monday to Sunday" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Happy to <span className="text-brand">help</span>
          </>
        }
        lead="Questions about memberships, trials or the franchise? Send us a message or call your nearest OZMO."
        image="/images/premium-gym.jpg"
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="pb-24">
        <div className="wrap grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="card p-6 md:p-10">
            <h2 className="h3">Send us a message</h2>
            <p className="mt-2 text-white/60">We usually reply within one working day.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          <ul className="grid gap-4">
            {cards.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={i * 80} className="card flex h-full items-center gap-5 p-6">
                  <span className="icon-badge">
                    <c.icon size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-white/50">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-lg font-bold hover:text-brand">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg font-bold leading-7">{c.value}</p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="Visit us"
            title="Find your nearest OZMO"
            lead="Select a gym to see it on the map, call the front desk or get directions."
          />
          <Reveal className="mt-12">
            <LocationFinder />
          </Reveal>
        </div>
      </section>
    </>
  );
}
