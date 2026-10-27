// Stores website form submissions (membership/contact and franchise enquiries) in the Supabase `leads` table.
// Table + RLS policy: see supabase/schema.sql

const TYPES = ["franchise", "contact"] as const;
const FIELDS = ["name", "phone", "email", "service", "branch", "city", "budget", "message"] as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

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

  if (!lead.name) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (type !== "contact" && !lead.phone) {
    return Response.json({ error: "Please enter your phone number." }, { status: 400 });
  }
  if (type === "contact" && !lead.email && !lead.phone) {
    return Response.json({ error: "Please enter your phone number or email." }, { status: 400 });
  }
  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("Supabase env vars are missing; lead was not saved.");
    return Response.json(
      { error: "The form is not connected yet. Please call us instead." },
      { status: 503 },
    );
  }

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

  if (!res.ok) {
    console.error("Supabase insert failed:", res.status, await res.text());
    return Response.json({ error: "Could not submit right now. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
