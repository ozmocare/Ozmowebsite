import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, readingTime } from "@/lib/blog-shared";
import type { PostSummary } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostSummary }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-surface-2">
        {post.cover_image ? (
          // Covers are uploaded through /admin to Supabase Storage.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(252,238,0,0.18),transparent_60%)]">
            <span className="font-display text-2xl font-black uppercase text-white/15">OZMO</span>
          </div>
        )}
        {post.category && (
          <span className="chip absolute left-4 top-4 border-transparent bg-brand text-xs uppercase tracking-wider text-ink">
            {post.category}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-white/50">
          {formatDate(post.published_at)} · {readingTime(post.words)}
        </p>
        <h3 className="mt-2 font-display text-xl font-extrabold uppercase leading-tight">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-3 line-clamp-3 leading-7 text-white/65">{post.excerpt}</p>}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1 pt-5 font-bold text-brand hover:underline"
          aria-label={`Read ${post.title}`}
        >
          Read article <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
