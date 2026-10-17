import { Bike, Clock, UserCheck, Users } from "lucide-react";
import Carousel from "./Carousel";
import Faq from "./Faq";
import JsonLd, { breadcrumbSchema } from "./JsonLd";
import { TrialForm } from "./LeadForms";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { CtaBand, FormSection, ImageCard, PageHero, SectionHeading } from "./Sections";
import Photo from "./Photo";
import { amenities, equipmentBrands, type ServiceContent } from "@/lib/services";
import { homeFaqs, openLocations } from "@/lib/site";

const featureIcons = [Bike, UserCheck, Clock, Users];

export default function ServicePage({ service }: { service: ServiceContent }) {
  const path = `/services/${service.slug}`;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: service.title, path },
        ])}
      />
      <PageHero
        eyebrow="OZMO services"
        title={
          <>
            {service.title} <span className="text-brand">in Ludhiana</span>
          </>
        }
        lead={service.description}
        image={service.hero}
        crumbs={[{ name: service.title, href: path }]}
      />

      <section className="pb-20">
        <div className="wrap">
          <Carousel images={service.slides} className="aspect-[16/10] md:aspect-[21/9]" />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow={`Why ${service.title.toLowerCase()} at OZMO`} title={service.introTitle} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <li key={f}>
                  <Reveal delay={i * 90} className="card h-full p-7">
                    <span className="icon-badge">
                      <Icon size={24} strokeWidth={2} />
                    </span>
                    <p className="mt-6 text-lg leading-7 text-white/80">{f}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Marquee />

      {service.slug === "gym" && (
        <section className="border-b border-white/10 py-14">
          <p className="wrap text-center text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Equipment from world-leading brands
          </p>
          <ul className="wrap mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {equipmentBrands.map((b) => (
              <li key={b} className="font-display text-2xl font-extrabold uppercase tracking-wide text-white/60">
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Inside the club" title={service.areasTitle} lead={service.areasText} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.areas.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <ImageCard image={a.image} title={a.title} text={a.text} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="wrap">
          <SectionHeading
            eyebrow="After your workout"
            title="Premium amenities"
            lead="Every OZMO membership comes with access to amenities that make recovery part of the routine."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 90}>
                  <Photo src={a.image} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5] rounded-2xl" />
                  <h3 className="h3 mt-5">{a.title}</h3>
                  <p className="mt-2 leading-7 text-white/65">{a.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow={`${openLocations.length} gyms near you`}
        title="Find your nearest OZMO"
        text={`${service.title} is available across our gyms in Ludhiana and Jagraon, open 5 a.m. to 11 p.m. every day.`}
        primary={{ label: "See all locations", href: "/locations" }}
      />

      <Faq items={homeFaqs} />

      <FormSection
        id="trial"
        eyebrow="Free 1-day trial"
        title="Try OZMO free for a day"
        text={`Experience ${service.title.toLowerCase()} and every other OZMO facility — on us. Pick your nearest gym and we'll call to confirm.`}
        points={["Full access for a day", "Trainer walkthrough", "No payment needed"]}
      >
        <TrialForm />
      </FormSection>
    </>
  );
}
