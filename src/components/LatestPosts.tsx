import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";
import { SectionHeading } from "./Sections";
import { getPublishedPosts } from "@/lib/blog";

/** The newest blog posts, for the home page. Renders nothing until something is published. */
export default async function LatestPosts({ count = 3 }: { count?: number }) {
  const posts = (await getPublishedPosts()).slice(0, count);
  if (posts.length === 0) return null;

  return (
    <section className="section bg-ink-2">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="OZMO Blog" title="Latest from the blog" lead="Workout tips, nutrition advice and news from the OZMO team." />
          <Link href="/blog" className="btn-ghost">
            View all articles <ArrowRight size={18} />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 80} className="h-full">
                <BlogCard post={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
