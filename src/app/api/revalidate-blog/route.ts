import { revalidateTag } from "next/cache";
import { BLOG_TAG } from "@/lib/blog";
import { OFFERS_TAG } from "@/lib/offers";

// Called by /admin after a post or offer is saved, published or deleted, so the public site updates immediately.
// Only signed-in blog authors can trigger it: their Supabase access token is checked against is_blog_author().

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !key) return Response.json({ ok: false }, { status: 401 });

  const res = await fetch(`${url}/rest/v1/rpc/is_blog_author`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok || (await res.json()) !== true) return Response.json({ ok: false }, { status: 403 });

  revalidateTag(BLOG_TAG, { expire: 0 });
  revalidateTag(OFFERS_TAG, { expire: 0 });
  return Response.json({ ok: true });
}
