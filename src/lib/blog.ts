import { cacheLife, cacheTag } from "next/cache";
import type { Post } from "./blog-shared";

export { categories, formatDate, readingTime, slugify, type Post } from "./blog-shared";

// Blog posts live in the Supabase `posts` table (supabase/blog.sql).
// Public pages only ever see published posts; drafts are visible to authors in /admin.

export const BLOG_TAG = "blog-posts";

export type PostSummary = Omit<Post, "content" | "status" | "created_at"> & { words: number };

const LIST_FIELDS = "id,slug,title,excerpt,cover_image,category,author_name,published_at,updated_at,content";

async function query<T>(params: string): Promise<T[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/posts?${params}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) {
      // e.g. the table hasn't been created yet — show an empty blog instead of failing the build
      console.error("Blog query failed:", res.status, await res.text());
      return [];
    }
    return (await res.json()) as T[];
  } catch (err) {
    console.error("Blog query error:", err);
    return [];
  }
}

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export async function getPublishedPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  const rows = await query<Post>(`select=${LIST_FIELDS}&status=eq.published&order=published_at.desc&limit=200`);
  return rows.map(({ content, ...rest }) => ({ ...rest, words: wordCount(content ?? "") }));
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const rows = await query<Post>(`select=*&status=eq.published&slug=eq.${slug}&limit=1`);
  return rows[0] ?? null;
}
