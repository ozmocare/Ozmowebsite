import { cacheLife, cacheTag } from "next/cache";
import type { Offer } from "./offers-shared";

export { offerEnquiryHref, type Offer } from "./offers-shared";

// Offers live in the Supabase `offers` table (supabase/offers.sql) and are managed in /admin.
// The public API only returns active, unexpired offers (enforced by row-level security).

export const OFFERS_TAG = "offers";

export async function getLiveOffers(): Promise<Offer[]> {
  "use cache";
  cacheTag(OFFERS_TAG);
  cacheLife("hours");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/offers?select=*&order=sort_order.asc,created_at.desc&limit=10`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) {
      // e.g. offers.sql hasn't been run yet — no pop-up rather than a broken page
      console.error("Offers query failed:", res.status, await res.text());
      return [];
    }
    return (await res.json()) as Offer[];
  } catch (err) {
    console.error("Offers query error:", err);
    return [];
  }
}
