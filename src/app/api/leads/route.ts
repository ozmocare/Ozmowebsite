// Stores website form submissions (membership/contact and franchise enquiries).
// Every lead goes to the Supabase `leads` table (supabase/schema.sql) AND, when configured,
// to the OZMO Google Sheet via an Apps Script web app (google-sheets/Code.gs).

const TYPES = ["franchise", "contact"] as const;
const FIELDS = ["name", "phone", "email", "service", "branch", "city", "budget", "message"] as const;
// Ad-tracking + landing-page extras. Sent to the sheet; summarised into `message` for Supabase.
const EXTRAS = [
  "source",
  "callback",
  "page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function saveToSupabase(lead: Record<string, string | null>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) console.error("Supabase insert failed:", res.status, await res.text());
  return res.ok;
}

async function saveToSheet(row: Record<string, string | null>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, secret: process.env.GOOGLE_SHEETS_SECRET ?? "" }),
      signal: AbortSignal.timeout(8000),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      console.error("Google Sheet append failed:", res.status, json);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Google Sheet append error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const type = TYPES.find((t) => t === body.type);
  if (!type) return Response.json({ error: "Invalid form type." }, { status: 400 });

  const lead: Record<string, string | null> = { type };
  for (const f of FIELDS) lead[f] = clean(body[f], f === "message" ? 4000 : 200) || null;
  const extra: Record<string, string | null> = {};
  for (const f of EXTRAS) extra[f] = clean(body[f], 300) || null;

  if (!lead.name) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (type !== "contact" && !lead.phone) {
    return Response.json({ error: "Please enter your phone number." }, { status: 400 });
  }
  if (type === "contact" && !lead.email && !lead.phone) {
    return Response.json({ error: "Please enter your phone number or email." }, { status: 400 });
  }
  if (lead.phone && lead.phone.replace(/\D/g, "").length < 10) {
    return Response.json({ error: "Please enter a valid 10-digit phone number." }, { status: 400 });
  }
  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Keep ad attribution visible in Supabase too, without needing new columns.
  const tracking = [
    extra.source && `Source: ${extra.source}`,
    extra.callback && `Call back: ${extra.callback}`,
    extra.utm_source && `UTM: ${[extra.utm_source, extra.utm_medium, extra.utm_campaign].filter(Boolean).join(" / ")}`,
    extra.utm_term && `Keyword: ${extra.utm_term}`,
    extra.gclid && "Google Ads click",
  ].filter(Boolean);
  const supabaseLead = tracking.length
    ? { ...lead, message: [lead.message, ...tracking].filter(Boolean).join(" · ").slice(0, 4000) }
    : lead;

  const [inSupabase, inSheet] = await Promise.all([
    saveToSupabase(supabaseLead),
    saveToSheet({
      ...lead,
      ...extra,
      form: type === "franchise" ? "Franchise" : extra.source === "ads-landing" ? "Ads landing page" : "Website",
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    }),
  ]);

  if (!inSupabase && !inSheet) {
    return Response.json(
      { error: "Could not submit right now. Please call us instead." },
      { status: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL ? 502 : 503 },
    );
  }

  return Response.json({ ok: true });
}
