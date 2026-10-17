import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Quote, Star } from "lucide-react";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

/** Eyebrow + H2 + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow ${tone === "light" ? "text-ink" : ""}`}>{eyebrow}</p>}
      <Tag className={`h2 mt-4 ${tone === "light" ? "text-ink" : "text-white"}`}>{title}</Tag>
      {lead && (
        <p className={`lead mt-5 ${center ? "mx-auto" : ""} ${tone === "light" ? "!text-ink/70" : ""}`}>{lead}</p>
      )}
    </Reveal>
  );
}

/** Inner-page hero with breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image: string;
  crumbs: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <Photo src={image} eager sizes="100vw" className="!absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent" />
      <div className="wrap">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/55">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                <ChevronRight size={14} />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-white/85">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-brand">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="h-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Two-column panel with a heading left and a form right. */
export function FormSection({
  id,
  eyebrow,
  title,
  text,
  points,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  points?: string[];
  children: ReactNode;
}) {
  return (
    <section id={id} className="section relative overflow-hidden">
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/10 blur-3xl" />
      <div className="wrap relative">
        <Reveal className="card grid gap-12 p-6 md:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2 mt-4">{title}</h2>
            <p className="lead mt-5">{text}</p>
            {points && (
              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-medium text-white/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Full-width yellow call-to-action band. */
export function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-ink">
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-16 -top-10 h-[420px] w-[420px] text-ink/[0.06]"
        fill="currentColor"
      >
        <path d="M100 0l25 75 75 25-75 25-25 75-25-75L0 100l75-25z" />
      </svg>
      <div className="wrap relative flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ink">{eyebrow}</p>
          <h2 className="h2 mt-4">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">{text}</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          <Link href={primary.href} className="btn-dark">
            {primary.label} <ArrowRight size={18} />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn border-2 border-ink/80 text-ink hover:bg-ink hover:text-brand">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section bg-ink-2">
      <div className="wrap">
        <SectionHeading eyebrow="Member stories" title="What our members say" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="card flex h-full overflow-hidden">
                <Photo src={t.image} sizes="240px" className="hidden w-48 shrink-0 sm:block md:w-56" />
                <div className="flex flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-brand" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }, (_, k) => (
                        <Star key={k} size={20} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <Quote size={36} className="text-white/10" />
                  </div>
                  <blockquote className="mt-5 text-lg leading-8 text-white/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto pt-6">
                    <span className="block font-bold">{t.name}</span>
                    <span className="text-sm text-white/50">{t.role}</span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Icon + text row for feature lists. */
export function FeatureRow({ icon, title, children }: { icon: ReactNode; title?: string; children: ReactNode }) {
  return (
    <li className="flex gap-5">
      <span className="icon-badge">{icon}</span>
      <div>
        {title && <h3 className="font-display text-lg font-bold uppercase">{title}</h3>}
        <p className={`leading-7 text-white/70 ${title ? "mt-1" : "pt-2.5"}`}>{children}</p>
      </div>
    </li>
  );
}

/** Image card with title + copy. */
export function ImageCard({
  image,
  title,
  text,
  index,
}: {
  image?: string;
  title: string;
  text: string;
  index?: number;
}) {
  return (
    <article className="card group h-full overflow-hidden">
      {image && (
        <Photo
          src={image}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10]"
          imgClassName="transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="p-6 md:p-7">
        {index !== undefined && (
          <span className="font-display text-sm font-black text-brand">{String(index + 1).padStart(2, "0")}</span>
        )}
        <h3 className="h3 mt-2 text-white">{title}</h3>
        <p className="mt-3 leading-7 text-white/65">{text}</p>
      </div>
    </article>
  );
}
