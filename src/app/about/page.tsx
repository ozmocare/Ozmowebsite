import type { Metadata } from "next";
import { HeartPulse, UserCheck } from "lucide-react";
import PunjabMap from "@/components/PunjabMap";
import Reveal from "@/components/Reveal";
import { PageHero, PhotoBg, Testimonials } from "@/components/Sections";
import { SocialIcon } from "@/components/Socials";
import Stats from "@/components/Stats";
import Tapes from "@/components/Tapes";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "About us",
  description:
    "OZMO is a leading fitness system in Punjab with 12+ years of experience, 6 branches and over 10,000 lifetime customers.",
};

const pillars = [
  { icon: <HeartPulse size={30} />, text: "Empowering a life of physical and mental well-being" },
  { icon: <UserCheck size={30} />, text: "Personalized training programs with expert guidance" },
  { icon: <SocialIcon name="instagram" size={30} />, text: "Thriving online communities foster individual empowerment" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About us" image="/images/about-gym.jpg" />

      <section className="bg-navy py-20 md:py-24">
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
            {/* TODO: swap this still for the real gym tour video when it is available */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about-gym.jpg" alt="Inside an OZMO gym" className="aspect-[2/1] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <Tapes className="bg-black" />

      <section className="bg-black pb-24 pt-10">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section">All branches</h2>
            <p className="lead mx-auto mt-8 max-w-xl">
              We are the leading fitness system in Punjab with 6 fitness centers to help you easily
              choose the right one for you.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <PunjabMap />
          </Reveal>
        </div>
      </section>

      <PhotoBg src="/images/franchise-training.jpg" overlay="bg-black/85" className="py-20 md:py-28">
        <section className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
            <Reveal>
              <h2 className="h-section">Our mission</h2>
              <p className="lead mt-10">
                We believe that fitness is the foundation for a healthy and happy life.
              </p>
              <p className="lead mt-10">
                Our mission is to help people of all fitness levels achieve their goals through
                personalized training programs, expert guidance, and a supportive community.
              </p>
            </Reveal>
            <Reveal delay={150}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/slide-athlete.jpg" alt="Athlete training" className="aspect-[720/400] w-full object-cover" />
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.text}>
                <Reveal delay={i * 120} className="flex items-center gap-5">
                  <span className="icon-tile">{p.icon}</span>
                  <span className="text-lg leading-9 text-white/90 md:text-xl">{p.text}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </PhotoBg>

      <Team />
      <Testimonials />
    </>
  );
}
