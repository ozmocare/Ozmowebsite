"use client";

import { useState } from "react";
import { roiDefaults } from "@/lib/site";

const inr = (n: number) => {
  if (Math.abs(n) >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (Math.abs(n) >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

type Key = keyof typeof roiDefaults;

const inputs: { key: Key; label: string; format: (n: number) => string; hint: string }[] = [
  { key: "investment", label: "Total investment", format: inr, hint: "Fit-out, equipment and launch" },
  { key: "members", label: "Active members", format: (n) => n.toLocaleString("en-IN"), hint: "Paying members at maturity" },
  { key: "fee", label: "Average monthly fee per member", format: inr, hint: "Blended across plans" },
  { key: "costs", label: "Monthly running costs", format: inr, hint: "Rent, salaries, utilities, royalty" },
];

/** Interactive, visitor-driven estimate. Defaults live in roiDefaults (lib/site.ts). */
export default function RoiCalculator() {
  const [v, setV] = useState<Record<Key, number>>({
    investment: roiDefaults.investment.value,
    members: roiDefaults.members.value,
    fee: roiDefaults.fee.value,
    costs: roiDefaults.costs.value,
  });

  const revenue = v.members * v.fee;
  const profit = revenue - v.costs;
  const annual = profit * 12;
  const payback = profit > 0 ? Math.ceil(v.investment / profit) : null;
  const roi = (annual / v.investment) * 100;

  return (
    <div className="grid overflow-hidden rounded-3xl bg-ink text-white lg:grid-cols-[1.15fr_1fr]">
      <div className="space-y-8 p-6 md:p-10">
        {inputs.map((i) => {
          const cfg = roiDefaults[i.key];
          const pct = ((v[i.key] - cfg.min) / (cfg.max - cfg.min)) * 100;
          return (
            <label key={i.key} className="block">
              <span className="flex items-baseline justify-between gap-4">
                <span>
                  <span className="block font-semibold">{i.label}</span>
                  <span className="text-sm text-white/45">{i.hint}</span>
                </span>
                <span className="whitespace-nowrap font-display text-xl font-extrabold text-brand">{i.format(v[i.key])}</span>
              </span>
              <input
                type="range"
                min={cfg.min}
                max={cfg.max}
                step={cfg.step}
                value={v[i.key]}
                onChange={(e) => setV((s) => ({ ...s, [i.key]: Number(e.target.value) }))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-brand"
                style={{ background: `linear-gradient(to right, #fcee00 ${pct}%, rgba(255,255,255,0.12) ${pct}%)` }}
              />
            </label>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-8 bg-brand p-6 text-ink md:p-10">
        <dl className="grid grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-semibold text-ink/65">Monthly revenue</dt>
            <dd className="font-display text-2xl font-black md:text-3xl">{inr(revenue)}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink/65">Monthly profit</dt>
            <dd className="font-display text-2xl font-black md:text-3xl">{inr(profit)}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink/65">Yearly return</dt>
            <dd className="font-display text-2xl font-black md:text-3xl">{roi > 0 ? `${Math.round(roi)}%` : "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink/65">Payback period</dt>
            <dd className="font-display text-2xl font-black md:text-3xl">
              {payback ? `${payback} months` : "—"}
            </dd>
          </div>
        </dl>
        <div>
          <a href="#apply" className="btn-dark w-full">
            Get OZMO&apos;s detailed model
          </a>
          <p className="mt-4 text-xs leading-5 text-ink/65">
            Illustrative calculator only — the figures are the inputs you choose, not a projection or guarantee of
            earnings. Actual investment and returns depend on location, size, pricing and local demand. Our team will
            walk you through real numbers for your city.
          </p>
        </div>
      </div>
    </div>
  );
}
