"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { budgetRanges, openLocations, serviceLinks } from "@/lib/site";

type Status = { state: "idle" | "sending" | "done" | "error"; message?: string };

function useLeadSubmit(type: "trial" | "franchise" | "contact", successMessage: string) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus({ state: "done", message: successMessage });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return { status, onSubmit };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/80">{label}</span>
      {children}
    </label>
  );
}

// Hidden field real users never fill; bots do. Checked server-side.
function Honeypot() {
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />;
}

function StatusLine({ status }: { status: Status }) {
  if (status.state !== "done" && status.state !== "error") return null;
  return (
    <p
      role="status"
      className={`rounded-xl px-4 py-3 text-sm font-semibold ${
        status.state === "done" ? "bg-brand/15 text-brand" : "bg-red-500/10 text-red-300"
      }`}
    >
      {status.message}
    </p>
  );
}

function Submit({ status, label, busy }: { status: Status; label: string; busy: string }) {
  return (
    <button type="submit" disabled={status.state === "sending"} className="btn-primary w-full py-4 text-base">
      {status.state === "sending" ? busy : label} <ArrowRight size={18} />
    </button>
  );
}

const selectCls = "field appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10";
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

export function TrialForm({ defaultBranch }: { defaultBranch?: string }) {
  const { status, onSubmit } = useLeadSubmit(
    "trial",
    "You're in! Our team will call you shortly to confirm your free trial.",
  );
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required placeholder="Full name" className="field" autoComplete="name" />
        </Field>
        <Field label="Phone number">
          <input name="phone" required type="tel" inputMode="tel" placeholder="98xxx xxxxx" className="field" autoComplete="tel" />
        </Field>
      </div>
      <Field label="Email (optional)">
        <input name="email" type="email" placeholder="you@example.com" className="field" autoComplete="email" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="I'm interested in">
          <select name="service" className={selectCls} style={chevron} defaultValue="Gym">
            {serviceLinks.map((s) => (
              <option key={s.label}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Nearest OZMO">
          <select name="branch" className={selectCls} style={chevron} defaultValue={defaultBranch ?? openLocations[0].area}>
            {openLocations.map((l) => (
              <option key={l.slug}>{l.area}</option>
            ))}
          </select>
        </Field>
      </div>
      <StatusLine status={status} />
      <Submit status={status} label="Book my free trial" busy="Booking…" />
      <p className="text-center text-xs text-white/40">No payment needed. We&apos;ll call to confirm a time.</p>
    </form>
  );
}

export function FranchiseForm() {
  const { status, onSubmit } = useLeadSubmit(
    "franchise",
    "Thank you! Our franchise team will call you within 24 hours.",
  );
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required placeholder="Full name" className="field" autoComplete="name" />
        </Field>
        <Field label="Phone number">
          <input name="phone" required type="tel" inputMode="tel" placeholder="98xxx xxxxx" className="field" autoComplete="tel" />
        </Field>
      </div>
      <Field label="Email">
        <input name="email" type="email" placeholder="you@example.com" className="field" autoComplete="email" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City / location of interest">
          <input name="city" required placeholder="e.g. Mohali" className="field" />
        </Field>
        <Field label="Investment budget">
          <select name="budget" className={selectCls} style={chevron} defaultValue={budgetRanges[1]}>
            {budgetRanges.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Anything you'd like us to know? (optional)">
        <textarea name="message" rows={3} placeholder="Property available, timeline, questions…" className="field resize-y" />
      </Field>
      <StatusLine status={status} />
      <Submit status={status} label="Apply for franchise" busy="Sending…" />
      <p className="text-center text-xs text-white/40">Your details are only shared with the OZMO franchise team.</p>
    </form>
  );
}

export function ContactForm() {
  const { status, onSubmit } = useLeadSubmit("contact", "Thank you! We'll get back to you shortly.");
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required placeholder="Full name" className="field" autoComplete="name" />
        </Field>
        <Field label="Email">
          <input name="email" required type="email" placeholder="you@example.com" className="field" autoComplete="email" />
        </Field>
      </div>
      <Field label="Phone (optional)">
        <input name="phone" type="tel" inputMode="tel" placeholder="98xxx xxxxx" className="field" autoComplete="tel" />
      </Field>
      <Field label="Message">
        <textarea name="message" required rows={6} placeholder="How can we help?" className="field resize-y" />
      </Field>
      <StatusLine status={status} />
      <Submit status={status} label="Send message" busy="Sending…" />
    </form>
  );
}
