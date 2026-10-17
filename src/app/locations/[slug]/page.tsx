import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import Faq from "@/components/Faq";
import JsonLd, { breadcrumbSchema, gymSchema } from "@/components/JsonLd";
import { TrialForm } from "@/components/LeadForms";
import { LocationCard } from "@/components/Locations";
import Reveal from "@/components/Reveal";
import { FormSection, PageHero, SectionHeading } from "@/components/Sections";
import {
  detailedLocations,
  directionsHref,
  fullAddress,
  homeFaqs,
  locationTitle,
  mapSrc,
  openLocations,
  serviceLinks,
  site,
  telHref,
} from "@/lib/site";

// Every location is prerendered via generateStaticParams, so blocking on params is fine.
export const instant = false;

export function generateStaticParams() {
  return detailedLocations.map((l) => ({ slug: l.slug }));
}

const find = (slug: string) => detailedLocations.find((l) => l.slug === slug);

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = find(slug);
  if (!l) return {};
  const title = `Gym in ${l.area}, ${l.city} | ${l.brand ?? "OZMO Gym"}`;
  const description = `${l.brand ?? "OZMO Gym"} ${l.area}: ${fullAddress(l)}. Call ${l.phone}. Open 5 a.m.–11 p.m. daily with modern equipment, expert trainers and steam & spa. Book a free trial.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { url: `/locations/${l.slug}`, title, description, images: l.image ? [l.image] : undefined },
  };
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const l = find(slug);
  if (!l) notFound();

  const others = openLocations.filter((o) => o.slug !== l.slug).slice(0, 3);
  const facts = [
    { icon: MapPin, label: "Address", value: fullAddress(l) },
    { icon: Phone, label: "Phone", value: l.phone!, href: telHref(l.phone!) },
    { icon: Clock, label: "Opening hours", value: "5 a.m. – 11 p.m., Monday to Sunday" },
  ];

  return (
    <>
      <JsonLd data={gymSchema(l)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: l.area, path: `/locations/${l.slug}` },
        ])}
      />

      <PageHero
        eyebrow={l.brand ?? "OZMO Gym"}
        title={
          <>
            Gym in <span className="text-brand">{l.area}</span>, {l.city}
          </>
        }
        lead={`${locationTitle(l)} — premium strength and cardio floors, expert trainers and post-workout recovery, open every day from 5 a.m.`}
        image={l.image ?? "/images/premium-gym.jpg"}
        crumbs={[
          { name: "Locations", href: "/locations" },
          { name: l.area, href: `/locations/${l.slug}` },
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#trial" className="btn-primary">
            Book a free trial here
          </a>
          <a href={telHref(l.phone!)} className="btn-ghost">
            <Phone size={17} /> {l.phone}
          </a>
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="card flex flex-col p-6 md:p-8">
            <h2 className="h3">Visit {l.brand ?? "OZMO"} {l.area}</h2>
            <ul className="mt-6 space-y-6">
              {facts.map((f) => (
                <li key={f.label} className="flex gap-4">
                  <span className="icon-badge">
                    <f.icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-white/50">{f.label}</p>
                    {f.href ? (
                      <a href={f.href} className="mt-1 block text-lg font-bold hover:text-brand">
                        {f.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg font-bold leading-7">{f.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={directionsHref(l)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 self-start"
            >
              <Navigation size={17} /> Get directions
            </a>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={`Map of ${locationTitle(l)}`}
              src={mapSrc(`${l.brand ?? "OZMO Gym"}, ${fullAddress(l)}`)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 lg:h-full lg:min-h-[460px]"
            />
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow={`At OZMO ${l.area}`}
            title="Everything under one roof"
            lead="Strength and cardio floors, group classes, expert trainers, and steam & shower facilities to recover after every session."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="card group flex items-center justify-between p-6 transition hover:border-brand"
                >
                  <span className="font-display text-xl font-extrabold uppercase">{s.label}</span>
                  <ArrowUpRight className="text-brand transition group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FormSection
        id="trial"
        eyebrow={`Free trial · ${l.area}`}
        title={`Try OZMO ${l.area} free for a day`}
        text={`Book your free 1-day trial at ${l.brand ?? "OZMO Gym"} ${l.area}. We'll call to confirm a time that suits you.`}
        points={["Full access for a day", "Free trainer walkthrough", "No payment needed"]}
      >
        <TrialForm defaultBranch={l.area} />
      </FormSection>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Nearby" title="Other OZMO gyms" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <LocationCard l={o} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/60">
            <Link href="/locations" className="font-bold text-brand hover:underline">
              See all {openLocations.length} OZMO locations
            </Link>{" "}
            or call {site.phone}.
          </p>
        </div>
      </section>

      <Faq items={homeFaqs} />
    </>
  );
}
