"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { openLocations } from "@/lib/site";

const interests = ["Gym membership", "Personal training", "Yoga", "Kickfit", "Swimming", "Steam & spa"];
const callTimes = ["Anytime", "Morning (6 – 11 am)", "Afternoon (11 am – 4 pm)", "Evening (4 – 9 pm)"];
const TRACKING = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

export const LEAD_ID_KEY = "ozmo_lead_id";

const selectCls = "field appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10";
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/80">{label}</span>
      {children}
    </label>
  );
}

/** Short call-back form for Google Ads traffic. Redirects to /thank-you, where the conversion fires. */
export default function AdsLeadForm({ id }: { id?: string }) {
  const router = useRouter();
  // Load the thank-you page ahead of time so the switch after submitting is instant.
  useEffect(() => router.prefetch("/thank-you"), [router]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  // Set when the visitor came from the offer pop-up (/enquire?offer=…).
  const [offer, setOffer] = useState("");
  useEffect(() => {
    const o = new URLSearchParams(window.location.search).get("offer")?.trim().slice(0, 150) ?? "";
    // Read once on mount; the page itself is static, so the offer comes from the browser URL.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (o) setOffer(o);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    const digits = (data.phone ?? "").replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const tracking = Object.fromEntries(TRACKING.map((k) => [k, params.get(k) ?? ""]));

    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
          type: "contact",
          source: offer ? "offer-popup" : "ads-landing",
          ...(offer && { message: `Offer: ${offer}` }),
          page: window.location.pathname + window.location.search,
          ...tracking,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      try {
        sessionStorage.setItem(LEAD_ID_KEY, `${Date.now()}-${digits.slice(-4)}`);
      } catch {}
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSending(false);
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {offer && (
        <p className="flex items-start gap-3 rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-white/90">
          <Tag size={18} className="mt-0.5 shrink-0 text-brand" />
          <span>
            <span className="font-bold text-brand">Offer selected:</span> {offer}. Our team will call you with the details.
          </span>
        </p>
      )}
      <Field label="Your name">
        <input name="name" required placeholder="Full name" className="field" autoComplete="name" />
      </Field>
      <Field label="Mobile number">
        <div className="flex">
          <span className="flex items-center rounded-l-xl border border-r-0 border-white/10 bg-surface px-3 font-semibold text-white/60">
            +91
          </span>
          <input
            name="phone"
            required
            type="tel"
            inputMode="numeric"
            maxLength={14}
            placeholder="98xxx xxxxx"
            className="field rounded-l-none"
            autoComplete="tel-national"
          />
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nearest OZMO">
          <select name="branch" className={selectCls} style={chevron} defaultValue={openLocations[0].area}>
            {openLocations.map((l) => (
              <option key={l.slug}>{l.area}</option>
            ))}
          </select>
        </Field>
        <Field label="Interested in">
          <select name="service" className={selectCls} style={chevron} defaultValue={interests[0]}>
            {interests.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Best time to call">
        <select name="callback" className={selectCls} style={chevron} defaultValue={callTimes[0]}>
          {callTimes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      {error && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}
      <button type="submit" disabled={sending} className="btn-primary w-full py-4 text-base">
        {sending ? "Sending…" : "Get a call back"} <ArrowRight size={18} />
      </button>
      <p className="text-center text-xs leading-5 text-white/40">
        By submitting, you agree to be contacted by OZMO on call or WhatsApp about memberships.
      </p>
    </form>
  );
}
