"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { branches, budgetRanges, serviceLinks } from "@/lib/site";

type Status = { state: "idle" | "sending" | "done" | "error"; message?: string };

function useLeadSubmit(type: "trial" | "franchise" | "contact") {
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
      setStatus({ state: "done", message: "Thank you! Our team will get in touch with you shortly." });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return { status, onSubmit };
}

function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-3 block text-lg font-medium">{text}</span>
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
    <p role="status" className={status.state === "done" ? "text-brand" : "text-red-400"}>
      {status.message}
    </p>
  );
}

const selectCls = "field appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10";
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

export function TrialForm() {
  const { status, onSubmit } = useLeadSubmit("trial");
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-3">
        <Label text="Name">
          <input name="name" required placeholder="Arnold Johnson" className="field" autoComplete="name" />
        </Label>
        <Label text="Phone number">
          <input name="phone" required type="tel" inputMode="tel" placeholder="9876543210" className="field" autoComplete="tel" />
        </Label>
      </div>
      <Label text="Email">
        <input name="email" type="email" placeholder="arnoldjohnson@gmail.com" className="field" autoComplete="email" />
      </Label>
      <Label text="Services">
        <select name="service" className={selectCls} style={chevron} defaultValue="Gym">
          {serviceLinks.map((s) => (
            <option key={s.label}>{s.label}</option>
          ))}
        </select>
      </Label>
      <Label text="Branch">
        <select name="branch" className={selectCls} style={chevron} defaultValue={branches[0].short}>
          {branches.map((b) => (
            <option key={b.id}>{b.short}</option>
          ))}
        </select>
      </Label>
      <StatusLine status={status} />
      <button type="submit" disabled={status.state === "sending"} className="btn mt-4 w-full py-4 text-lg">
        {status.state === "sending" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}

export function FranchiseForm() {
  const { status, onSubmit } = useLeadSubmit("franchise");
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-3">
        <Label text="Name">
          <input name="name" required placeholder="Arnold Johnson" className="field" autoComplete="name" />
        </Label>
        <Label text="Phone number">
          <input name="phone" required type="tel" inputMode="tel" placeholder="9876543210" className="field" autoComplete="tel" />
        </Label>
      </div>
      <Label text="Email">
        <input name="email" type="email" placeholder="arnoldjohnson@gmail.com" className="field" autoComplete="email" />
      </Label>
      <Label text="City / Location of Interest">
        <input name="city" required placeholder="Mohali" className="field" />
      </Label>
      <Label text="Investment Budget Range">
        <select name="budget" className={selectCls} style={chevron} defaultValue={budgetRanges[0]}>
          {budgetRanges.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </Label>
      <StatusLine status={status} />
      <button type="submit" disabled={status.state === "sending"} className="btn mt-4 w-full py-4 text-lg">
        {status.state === "sending" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const { status, onSubmit } = useLeadSubmit("contact");
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" required placeholder="Johnathan Michael" aria-label="Name" className="field" autoComplete="name" />
        <input name="email" required type="email" placeholder="Johnathan@gmail.com" aria-label="Email" className="field" autoComplete="email" />
      </div>
      <textarea name="message" required rows={10} placeholder="Enter your messages" aria-label="Message" className="field resize-y" />
      <StatusLine status={status} />
      <button type="submit" disabled={status.state === "sending"} className="btn w-full py-5 text-lg">
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
