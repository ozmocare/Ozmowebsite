import Link from "next/link";
import { ArrowRight, Bike, Lock, ShowerHead } from "lucide-react";
import Branches from "@/components/Branches";
import Carousel from "@/components/Carousel";
import Faq from "@/components/Faq";
import { TrialForm } from "@/components/LeadForms";
import Reveal from "@/components/Reveal";
import { FeatureRow, FollowRail, FormSection, PhotoBg, Testimonials } from "@/components/Sections";
import Stats from "@/components/Stats";
import Tapes from "@/components/Tapes";
import Transformations from "@/components/Transformations";
import { homeFaqs } from "@/lib/site";

// Card photos already carry their label (cut from the original design).
const services = [
  { label: "Gym", image: "/images/svc-gym.jpg", href: "/services/gym" },
  { label: "Cardio", image: "/images/svc-cardio.jpg", href: "/services/gym" },
  { label: "Crossfit", image: "/images/svc-crossfit.jpg", href: "/services/kickfit" },
  { label: "Yoga", image: "/images/svc-yoga.jpg", href: "/services/yoga" },
  { label: "Swimming", image: "/images/svc-swimming.jpg", href: "/services/swimming" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <PhotoBg src="/images/slide-athlete.jpg" overlay="bg-black/65" className="pt-[72px] lg:pt-[110px]">
        <section className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-5 pb-16 pt-6 text-center lg:min-h-[calc(100svh-110px)]">
          <FollowRail />
          <p className="rounded-full border-[3px] border-[#222] bg-[#f1f1f1] px-6 py-2.5 text-lg font-semibold text-black shadow-lg">
            Trusted by 10k+ clients
          </p>
          <h1 className="mt-6 whitespace-nowrap font-display text-[clamp(1.9rem,9vw,8.75rem)] uppercase leading-[1.05]">
            <span className="block text-brand">Transform</span>
            <span className="block text-white">Body and mind</span>
            <span className="block text-brand">At Ozmo</span>
          </h1>
          <p className="lead mt-8 max-w-2xl">
            With 12+ years of experience in the health and wellness industry, our fitness solution
            continues to be a top option throughout India
          </p>
          <Link href="#services" className="btn mt-8 px-9 py-4 text-lg">
            See more <ArrowRight size={20} />
          </Link>
        </section>
      </PhotoBg>

      <Tapes />

      {/* Services */}
      <section id="services" className="bg-navy pb-24 pt-10">
        <Reveal className="wrap text-center">
          <h2 className="h-section">Our services</h2>
          <p className="lead mx-auto mt-8 max-w-2xl">
            OZMO offers variety of popular services to help you make comfortable choices that suit
            your needs.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {services.map((s) => (
              <li key={s.label} className="last:col-span-2 sm:last:col-span-1">
                <Link href={s.href} className="group block overflow-hidden" aria-label={s.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.label}
                    className="aspect-[296/564] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Numbers + gallery */}
      <section className="bg-navy pb-24">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section">
              Let us transform your
              <br />
              fitness journey
            </h2>
            <p className="lead mx-auto mt-10 max-w-2xl">
              We are a leading fitness system in Punjab, with 12+ years of experience in the fitness
              industry and trusted by over 10,000 lifetime customers.
            </p>
          </Reveal>
          <Reveal className="mt-14">
            <Stats />
          </Reveal>
          <Reveal className="mt-16">
            <Carousel
              images={[
                { src: "/images/slide-athlete.jpg", alt: "Athlete training with a resistance band" },
                { src: "/images/premium-gym.jpg", alt: "OZMO gym floor" },
                { src: "/images/about-gym.jpg", alt: "Strength training area" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 5-star facilities */}
      <PhotoBg src="/images/slide-athlete.jpg" overlay="bg-black/90" className="py-20 md:py-28">
        <section className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
          <Reveal>
            <h2 className="h-section">
              5-star premium
              <br />
              fitness center
            </h2>
            <ul className="mt-12 space-y-10">
              <FeatureRow icon={<Bike size={30} />}>
                Modern facilities with full equipment. Spacious and comfortable space.
              </FeatureRow>
              <FeatureRow icon={<ShowerHead size={30} />}>
                Including showers, sauna &amp; smart locker to enhance your post-exercise tranquility.
              </FeatureRow>
              <FeatureRow icon={<Lock size={30} />}>
                Smart lockers keep your personal belongings safe and secure.
              </FeatureRow>
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <Carousel
              controls={false}
              interval={3500}
              className="aspect-[800/447]"
              images={[
                { src: "/images/premium-gym.jpg", alt: "Gym floor with machines" },
                { src: "/images/premium-washroom.jpg", alt: "Premium washroom" },
                { src: "/images/premium-sauna.jpg", alt: "Sauna" },
              ]}
            />
          </Reveal>
        </section>
      </PhotoBg>

      <Transformations />
      <Branches />
      <Testimonials />
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
