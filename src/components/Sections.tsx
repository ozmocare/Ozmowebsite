import type { ReactNode } from "react";
import { Star } from "lucide-react";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { SocialLinks } from "./Socials";
import { testimonials } from "@/lib/site";

/** Full-bleed photo with a dark overlay behind arbitrary content. */
export function PhotoBg({
  src,
  overlay = "bg-black/70",
  className = "",
  children,
}: {
  src: string;
  overlay?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className={`absolute inset-0 -z-10 ${overlay}`} />
      {children}
    </div>
  );
}

/** Inner-page banner: photo + centred white title. */
export function PageHero({ title, image }: { title: string; image: string }) {
  return (
    <PhotoBg src={image} overlay="bg-black/55" className="pt-[72px] lg:pt-[110px]">
      <div className="flex h-[46vh] min-h-[320px] items-center justify-center md:h-[62vh]">
        <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] uppercase text-white">{title}</h1>
      </div>
    </PhotoBg>
  );
}

/** Dark translucent panel with heading left and a form right (trial + franchise). */
export function FormSection({
  id,
  title,
  text,
  children,
}: {
  id?: string;
  title: ReactNode;
  text: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <PhotoBg src="/images/premium-gym.jpg" overlay="bg-black/60" className="py-10 md:py-16">
        <div className="wrap">
          <Reveal className="grid gap-12 bg-black/85 p-6 md:p-10 lg:grid-cols-[1fr_1fr] lg:gap-28 lg:p-14">
            <div className="flex flex-col">
              <h2 className="h-section">{title}</h2>
              <p className="lead mt-6 max-w-lg">{text}</p>
              <div className="mt-auto hidden border-t border-white/25 pt-10 lg:block">
                <Logo size="lg" />
              </div>
            </div>
            {children}
          </Reveal>
        </div>
      </PhotoBg>
    </section>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="mx-4 flex w-[min(86vw,820px)] shrink-0 overflow-hidden rounded-2xl bg-[#141414]/95">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.image} alt="" className="hidden w-[280px] shrink-0 object-cover sm:block" />
      <div className="flex min-h-[340px] flex-col p-8 md:p-10">
        <div className="flex gap-1.5 text-brand" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={34} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <blockquote className="mt-6 text-lg leading-9 text-white/90 md:text-xl">{t.quote}</blockquote>
        <figcaption className="mt-auto pt-8">
          <span className="block text-xl font-bold">{t.name}</span>
          <span className="mt-2 block text-white/60">— {t.role}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Testimonials() {
  // Repeat the set so the track is wide enough to loop on large screens.
  const set = [...testimonials, ...testimonials];
  return (
    <section>
      <PhotoBg src="/images/testimonial-1.jpg" overlay="bg-black/65 backdrop-blur-sm" className="py-20 md:py-24">
        <h2 className="text-center font-display text-[clamp(1.5rem,3.4vw,2.6rem)] uppercase text-white">
          What people say
        </h2>
        <div className="mt-12 overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "45s" }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
                {set.map((t, i) => (
                  <TestimonialCard key={i} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </PhotoBg>
    </section>
  );
}

/** Vertical "Follow us!" rail on the home hero. */
export function FollowRail() {
  return (
    <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex">
      <span className="h-28 w-px bg-white/60" />
      <span className="text-xl text-white/70 [writing-mode:vertical-rl]">Follow us!</span>
      <SocialLinks className="flex flex-col items-center gap-7" />
      <span className="h-24 w-px bg-white/60" />
    </div>
  );
}

/** Icon tile + text row used in feature lists. */
export function FeatureRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-5">
      <span className="icon-tile">{icon}</span>
      <span className="text-lg leading-9 text-white/90 md:text-xl">{children}</span>
    </li>
  );
}

/** Image + heading + copy block used in the staggered two-column layouts. */
export function ShowcaseItem({
  image,
  title,
  text,
  className = "",
}: {
  image?: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="mb-8 aspect-[3/2] w-full object-cover" />
      )}
      <h3 className="h-sub">{title}</h3>
      <p className="mt-5 text-lg leading-9 text-white/90">{text}</p>
    </Reveal>
  );
}
