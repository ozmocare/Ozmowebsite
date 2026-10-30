import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import LocationFinder from "@/components/LocationFinder";
import { LocationCard, LudhianaMap } from "@/components/Locations";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/Sections";
import { openLocations, soonLocations } from "@/lib/site";

const areas = openLocations.map((l) => l.area).join(", ");

export const metadata: Metadata = {
  title: "Gyms in Ludhiana & Jagraon — All OZMO Locations",
  description: `Find your nearest OZMO gym: ${areas}. Open 5 a.m. to 11 p.m., seven days a week. New gyms opening soon in ${soonLocations
    .map((l) => l.area)
    .join(", ")}.`,
  alternates: { canonical: "/locations" },
  openGraph: { url: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <PageHero
        eyebrow="Locations"
        title={
          <>
            Find your <span className="text-brand">OZMO</span>
          </>
        }
        lead={`${openLocations.length} gyms across Ludhiana and Jagraon, open 5 a.m. to 11 p.m. every day — and ${soonLocations.length} more opening soon.`}
        image="/images/premium-gym.jpg"
        crumbs={[{ name: "Locations", href: "/locations" }]}
      />

      <section className="pb-24">
        <div className="wrap">
          <SectionHeading eyebrow={`${openLocations.length} gyms open now`} title="Open now" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {openLocations.map((l, i) => (
              <li key={l.slug}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <LocationCard l={l} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading eyebrow="Map" title="See them on the map" lead="Pick a gym to see where it is and how to reach it." />
          <Reveal className="mt-12">
            <LocationFinder />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Coming soon"
              title={`${soonLocations.length} new OZMO gyms`}
              lead="New OZMO gyms are on the way. Call us to register your interest and get launch offers first."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {soonLocations.map((l, i) => (
                <li key={l.slug}>
                  <Reveal delay={(i % 2) * 80} className="h-full">
                    <LocationCard l={l} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:sticky lg:top-28">
            <LudhianaMap />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not in your city yet?"
        title="Bring OZMO to your city"
        text="We're growing across Punjab with franchise partners. If there's no OZMO near you, you could be the one to open it."
        primary={{ label: "Explore the franchise", href: "/franchise" }}
      />
    </>
  );
}
