import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/Sections";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "OZMO Blog — Fitness, Nutrition & Training Tips",
  description:
    "Workout tips, nutrition advice, member transformations and news from the OZMO Gym & Spa team in Ludhiana.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="OZMO Blog"
        title={
          <>
            Train smarter. <span className="text-brand">Live stronger.</span>
          </>
        }
        lead="Workout tips, nutrition advice, member stories and news from the OZMO team."
        image="/images/luxe-corridor.jpg"
        crumbs={[{ name: "Blog", href: "/blog" }]}
      />

      <section className="pb-24">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="card px-6 py-16 text-center">
              <p className="font-display text-2xl font-black uppercase">First articles coming soon</p>
              <p className="mt-3 text-white/60">The OZMO team is writing. Check back shortly.</p>
            </div>
          ) : (
            <>
              {featured && (
                <Reveal>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="card group grid overflow-hidden transition hover:border-brand/50 lg:grid-cols-[1.3fr_1fr]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-surface-2 lg:aspect-auto">
                      {featured.cover_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featured.cover_image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-7 md:p-10">
                      <p className="eyebrow">{featured.category ?? "Latest"}</p>
                      <h2 className="h2 mt-4 text-[clamp(1.6rem,3vw,2.4rem)] group-hover:text-brand">{featured.title}</h2>
                      {featured.excerpt && <p className="lead mt-4">{featured.excerpt}</p>}
                      <span className="mt-6 font-bold text-brand">Read article →</span>
                    </div>
                  </Link>
                </Reveal>
              )}
              {rest.length > 0 && (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p, i) => (
                    <li key={p.id}>
                      <Reveal delay={(i % 3) * 80} className="h-full">
                        <BlogCard post={p} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Start today"
        title="Ready to train with us?"
        text="Find your nearest OZMO and our team will help you pick the right membership."
        primary={{ label: "Find a gym", href: "/locations" }}
        secondary={{ label: "Enquire about membership", href: "/#join" }}
      />
    </>
  );
}
