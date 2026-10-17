"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";
import { transformations } from "@/lib/site";

export default function Transformations() {
  const [index, setIndex] = useState(0);
  const count = transformations.length;
  const t = transformations[index];
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  const rows = [
    { label: "Weight", values: t.weight, unit: "kg" },
    { label: "Body fat", values: t.bodyFat, unit: "%" },
  ];

  return (
    <section className="section overflow-hidden">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Real results</p>
            <h2 className="h2 mt-4">Transformations at OZMO</h2>
          </div>
          {count > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous transformation"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-brand hover:bg-brand hover:text-ink"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next transformation"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-brand hover:bg-brand hover:text-ink"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        <div key={index} className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="card p-7 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">Member</p>
            <p className="mt-1 font-display text-4xl font-black uppercase">
              {t.name}, <span className="text-white/50">{t.age}</span>
            </p>
            <p className="chip mt-5 border-brand text-brand">{t.duration} program</p>

            <dl className="mt-8 space-y-6">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-white/50">{r.label}</dt>
                  <dd className="mt-2 flex items-baseline gap-4 font-display font-black">
                    <span className="text-3xl text-white/40 line-through decoration-2">
                      {r.values[0]}
                      {r.unit}
                    </span>
                    <span className="text-white/40">→</span>
                    <span className="text-5xl text-brand">
                      {r.values[1]}
                      <span className="text-2xl">{r.unit}</span>
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { src: t.before, label: "Before" },
              { src: t.after, label: "After" },
            ].map((p) => (
              <figure key={p.label} className="relative">
                <Photo
                  src={p.src}
                  alt={`${t.name} ${p.label.toLowerCase()} training at OZMO`}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="aspect-[3/4] rounded-2xl"
                />
                <figcaption
                  className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-black uppercase ${
                    p.label === "After" ? "bg-brand text-ink" : "bg-ink/80 text-white"
                  }`}
                >
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-10 flex gap-2">
            {transformations.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show transformation ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-10 bg-brand" : "w-4 bg-white/25"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
