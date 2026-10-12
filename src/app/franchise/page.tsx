import type { Metadata } from "next";
import { Award, Brain, CircleCheck, HeartPulse, Sparkles, UserCheck, UserPlus } from "lucide-react";
import Branches from "@/components/Branches";
import Carousel from "@/components/Carousel";
import Faq from "@/components/Faq";
import { FranchiseForm } from "@/components/LeadForms";
import Reveal from "@/components/Reveal";
import { FeatureRow, FormSection, PageHero, PhotoBg, ShowcaseItem } from "@/components/Sections";
import Tapes from "@/components/Tapes";
import { franchiseFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Franchise",
  description:
    "Become an OZMO Gyms franchise partner — a proven fitness model, complete setup support, marketing assets and ongoing guidance.",
};

const reasons = [
  { icon: CircleCheck, text: "Over a decade of know-how in the health & wellness industry." },
  { icon: UserCheck, text: "Established brand recognition and strong member trust." },
  { icon: Award, text: "Proven operational systems and support infrastructure in place." },
  { icon: Sparkles, text: "High-growth fitness market — capture the demand in your region." },
  { icon: HeartPulse, text: "Our mission: help people transform body and mind — and build that community locally." },
];

const leftColumn = [
  {
    image: "/images/franchise-group.jpg",
    title: "Full fitness centre concept",
    text: "A complete gym setup including strength, cardio, and functional training zones, along with group classes like yoga, cross-fit, and aerobics — designed to deliver a premium fitness experience.",
  },
  {
    image: "/images/franchise-marketing.jpg",
    title: "Marketing-ready brand assets",
    text: "Get access to brand-approved visuals, logos, launch campaigns, and digital marketing templates to help you create awareness and drive sign-ups quickly.",
  },
  {
    image: "/images/franchise-training.jpg",
    title: "Ongoing training & performance support",
    text: "Regular guidance, staff training, and operational audits to keep your team aligned with brand standards and business goals.",
  },
];

const rightColumn = [
  {
    image: "/images/equip-chest.jpg",
    title: "Premium equipment and design standards",
    text: "Access to top-quality equipment, interiors, and branding guidelines to maintain a modern, high-performance environment that attracts and retains members.",
  },
  {
    image: "/images/franchise-management.jpg",
    title: "Member management system & operational tools",
    text: "Streamlined software and systems for member tracking, attendance, billing, and performance analytics — ensuring smooth daily operations.",
  },
  {
    image: "/images/franchise-teamwork.jpg",
    title: "Support in membership acquisition and retention",
    text: "Dedicated assistance with local marketing, social media, and promotional strategies to help you consistently attract new members and retain existing ones.",
  },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero title="Franchise" image="/images/franchise-teamwork.jpg" />

      <section className="bg-black py-20 md:py-24">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section">
              Become a partner in
              <br />
              transforming lives.
            </h2>
            <p className="lead mx-auto mt-10 max-w-3xl">
              Join the OZMO Gyms family and build a thriving fitness business with a proven model.
              <br />
              With 12+ years of experience and 10,000+ members served, our brand is ready for
              expansion.
            </p>
          </Reveal>
          <Reveal className="mt-14">
            <Carousel
              images={[
                { src: "/images/franchise-group.jpg", alt: "Group combat fitness class" },
                { src: "/images/franchise-class.jpg", alt: "Dance fitness class" },
                { src: "/images/franchise-training.jpg", alt: "Aerobics session" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-black pb-24">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section text-center">Why franchise with us</h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {reasons.map((r, i) => (
              <li key={r.text}>
                <Reveal delay={i * 100} className="flex flex-col items-center text-center">
                  <span className="icon-tile h-[88px] w-[88px] rounded-xl">
                    <r.icon size={40} strokeWidth={1.6} />
                  </span>
                  <p className="mt-9 max-w-[13rem] text-lg leading-9 text-white/90 md:text-xl">{r.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Tapes className="bg-black" />

      <PhotoBg src="/images/franchise-training.jpg" overlay="bg-black/90" className="py-20 md:py-24">
        <section className="wrap">
          <Reveal className="text-center">
            <h2 className="h-section">
              What you get as a
              <br />
              franchise partner:
            </h2>
            <p className="lead mx-auto mt-10 max-w-3xl">
              As a franchise partner, you get a proven fitness model, complete setup support,
              marketing assets, and ongoing guidance — everything you need to build a successful gym
              with our trusted brand.
            </p>
          </Reveal>

          {/* Two staggered columns */}
          <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-x-24 lg:gap-x-48">
            <div className="space-y-16 md:space-y-28">
              {leftColumn.map((item) => (
                <ShowcaseItem key={item.title} {...item} />
              ))}
            </div>
            <div className="space-y-16 md:mt-40 md:space-y-28">
              {rightColumn.map((item) => (
                <ShowcaseItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>
      </PhotoBg>

      <PhotoBg src="/images/franchise-class.jpg" overlay="bg-black/85" className="py-20 md:py-28">
        <section className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
          <Reveal>
            <h2 className="h-section">
              Support &amp;
              <br />
              training provided
            </h2>
            <ul className="mt-12 space-y-10">
              <FeatureRow icon={<HeartPulse size={30} />}>
                Pre-launch: Site-selection assistance, interior &amp; equipment planning, staff
                hiring, local marketing campaigns.
              </FeatureRow>
              <FeatureRow icon={<UserPlus size={30} />}>
                Launch: Grand-opening support, member onboarding, brand launch event guidance.
              </FeatureRow>
              <FeatureRow icon={<Brain size={30} />}>
                Ongoing: Trainer certification, operational check-lists, monthly business reviews,
                digital marketing campaigns, new product/program roll-outs.
              </FeatureRow>
              <FeatureRow icon={<Brain size={30} />}>
                Quality assurance and brand standards to maintain premium positioning.
              </FeatureRow>
            </ul>
          </Reveal>
          <Reveal delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/franchise-class.jpg" alt="Group fitness class" className="aspect-[800/447] w-full object-cover" />
          </Reveal>
        </section>
      </PhotoBg>

      <Branches />
      <Faq items={franchiseFaqs} />

      <FormSection
        id="enquire"
        title={
          <>
            Ready to bring
            <br />
            OZMO Gyms to
            <br />
            your city?
          </>
        }
        text="Fill out the form below and our franchise team will get in touch with you within 24 hours."
      >
        <FranchiseForm />
      </FormSection>
    </>
  );
}
