import { Bike, Clock, UserCheck, Users } from "lucide-react";
import Carousel from "./Carousel";
import Faq from "./Faq";
import { TrialForm } from "./LeadForms";
import Reveal from "./Reveal";
import { FormSection, PageHero, PhotoBg, ShowcaseItem } from "./Sections";
import Tapes from "./Tapes";
import Transformations from "./Transformations";
import { amenities, equipmentBrands, type ServiceContent } from "@/lib/services";
import { homeFaqs } from "@/lib/site";

const featureIcons = [Bike, UserCheck, Clock, Users];

export default function ServicePage({ service }: { service: ServiceContent }) {
  const left = service.areas.filter((_, i) => i % 2 === 0);
  const right = service.areas.filter((_, i) => i % 2 === 1);

  return (
    <>
      <PageHero title={service.title} image={service.hero} />

      <section className="bg-black py-12 md:py-16">
        <div className="wrap">
          <Carousel images={service.slides} />
        </div>
      </section>

      <Tapes className="bg-black" />

      <section className="bg-black pb-24 pt-6">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mx-auto max-w-4xl text-center">{service.introTitle}</h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {service.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <li key={f}>
                  <Reveal delay={i * 100} className="flex flex-col items-center text-center">
                    <span className="icon-tile h-[88px] w-[88px] rounded-xl">
                      <Icon size={40} strokeWidth={1.6} />
                    </span>
                    <p className="mt-9 max-w-[18rem] text-lg leading-9 text-white/90 md:text-xl">{f}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Equipment brands */}
      <section className="overflow-hidden bg-black pb-10">
        <p className="px-5 text-center text-xl font-bold text-brand md:text-2xl">
          State-of-the-art gym equipment from world-leading brands.
        </p>
        <div className="mt-12 flex w-max animate-marquee" style={{ animationDuration: "25s" }}>
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {[...equipmentBrands, ...equipmentBrands].map((b, i) => (
                <li key={i} className="mx-10 whitespace-nowrap text-3xl font-bold tracking-wide text-white/85 md:mx-16">
                  {b}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <PhotoBg src="/images/slide-athlete.jpg" overlay="bg-black/90" className="py-20 md:py-24">
        <section className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section mx-auto max-w-4xl">{service.areasTitle}</h2>
            <p className="lead mx-auto mt-8 max-w-2xl">{service.areasText}</p>
          </Reveal>
          <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-x-24 lg:gap-x-40">
            <div className="space-y-16 md:mt-28 md:space-y-28">
              {left.map((a) => (
                <ShowcaseItem key={a.title} {...a} />
              ))}
            </div>
            <div className="space-y-16 md:space-y-28">
              {right.map((a) => (
                <ShowcaseItem key={a.title} {...a} />
              ))}
            </div>
          </div>
        </section>
      </PhotoBg>

      <Transformations />

      <section className="bg-black pb-24">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section">Premium amenities</h2>
            <p className="lead mx-auto mt-8 max-w-2xl">
              Beyond the workout floor, OZMO offers a full range of amenities, including: steam
              rooms, showers, and personal lockers.
            </p>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {amenities.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 100}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt=""
                    className={`w-full object-cover ${i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                  />
                  <h3 className="h-sub mt-8">{a.title}</h3>
                  <p className="mt-4 text-lg leading-9 text-white/90">{a.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={homeFaqs} />

      <FormSection
        id="trial"
        title={
          <>
            Free 1-day trial
            <br />
            signup
          </>
        }
        text="Sign up for free 1-day trial with us and experience all of our services for free at OZMO."
      >
        <TrialForm />
      </FormSection>
    </>
  );
}
