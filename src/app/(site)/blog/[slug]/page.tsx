import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import Markdown from "@/components/Markdown";
import { CtaBand } from "@/components/Sections";
import { formatDate, getPublishedPost, getPublishedPosts, readingTime } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";

// Posts are created in /admin after build, so slugs are resolved at request time (inside Suspense).
// Each post's data is cached and refreshed when an author publishes or edits.

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const description = post.excerpt ?? post.content.slice(0, 155);
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      {params.then(({ slug }) => (
        <PostContent slug={slug} />
      ))}
    </Suspense>
  );
}

async function PostContent({ slug }: { slug: string }) {
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const words = post.content.trim().split(/\s+/).length;
  const more = (await getPublishedPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt ?? undefined,
          image: post.cover_image ?? `${siteUrl}/opengraph-image.jpg`,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: { "@type": "Organization", name: post.author_name || site.legalName },
          publisher: {
            "@type": "Organization",
            name: site.legalName,
            logo: { "@type": "ImageObject", url: `${siteUrl}/brand/ozmo-logo.png` },
          },
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="relative isolate overflow-hidden pb-12 pt-40 md:pt-48">
          {post.cover_image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover_image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
            </>
          )}
          <div className="wrap max-w-4xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-white/55">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight size={14} />
                  <Link href="/blog" className="hover:text-brand">
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>
            {post.category && <p className="eyebrow mt-8">{post.category}</p>}
            <h1 className="h-display mt-4 text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.98]">{post.title}</h1>
            {post.excerpt && <p className="lead mt-6 max-w-3xl">{post.excerpt}</p>}
            <p className="mt-6 text-sm font-semibold text-white/60">
              {post.author_name ? `${post.author_name} · ` : ""}
              {formatDate(post.published_at)} · {readingTime(words)}
            </p>
          </div>
        </header>

        <div className="wrap max-w-3xl pb-20">
          <Markdown>{post.content}</Markdown>
          <Link href="/blog" className="btn-ghost mt-12">
            <ArrowLeft size={17} /> All articles
          </Link>
        </div>
      </article>

      <CtaBand
        eyebrow="Train with OZMO"
        title="Put it into practice"
        text="Our trainers can build this into a plan for you. Find your nearest OZMO or send a membership enquiry."
        primary={{ label: "Find a gym", href: "/locations" }}
        secondary={{ label: "Enquire now", href: "/#join" }}
      />

      {more.length > 0 && (
        <section className="section">
          <div className="wrap">
            <h2 className="h2 text-[clamp(1.6rem,3vw,2.4rem)]">More from the blog</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.id}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function PostSkeleton() {
  return (
    <div className="wrap max-w-3xl animate-pulse pb-24 pt-48">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="mt-6 h-12 w-full rounded bg-white/10" />
      <div className="mt-3 h-12 w-2/3 rounded bg-white/10" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-4 rounded bg-white/5" />
        ))}
      </div>
    </div>
  );
}
