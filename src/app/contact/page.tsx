import type { Metadata } from "next";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Branches from "@/components/Branches";
import { ContactForm } from "@/components/LeadForms";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Sections";
import { mapSrc, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with OZMO Gym — call, email or send us a message. 6 branches across Ludhiana.",
};

const cards = [
  { icon: PhoneCall, label: "Phone number", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email address", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Address", value: site.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" image="/images/premium-gym.jpg" />

      <section className="bg-black py-20 md:py-24">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section text-center">
              Happy to help! Let us know
              <br />
              your questions or feedback
            </h2>
          </Reveal>

          <Reveal className="mt-16 grid gap-12 lg:grid-cols-[1.55fr_1fr]">
            <ContactForm />
            <ul className="space-y-7">
              {cards.map((c) => (
                <li key={c.label} className="flex items-center gap-7 rounded-xl bg-[#121212] p-8">
                  <c.icon size={44} strokeWidth={1.6} className="shrink-0" />
                  <div>
                    <p className="text-lg text-white/70">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-xl font-bold hover:text-brand md:text-2xl">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-xl font-bold leading-9 md:text-2xl">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0b100c] pb-20">
        <div className="wrap">
          <iframe
            title="OZMO Gym Luxe on Google Maps"
            src={mapSrc(`Ozmo gym Luxe, ${site.address}`)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full rounded-2xl border-0 md:h-[600px]"
          />
        </div>
      </section>

      <Branches className="bg-black" />
    </>
  );
}
