"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="bg-black py-20 md:py-28">
      <div className="wrap">
        <h2 className="h-section text-center">
          Let&apos;s see our students
          <br />
          have transformed
        </h2>

        <div className="relative mt-14 md:mt-20">
          <div key={index} className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-16 gap-y-3 border-l-4 border-brand pl-6 text-3xl font-bold md:text-4xl">
                <dt className="text-white/70">Name:</dt>
                <dd>{t.name}</dd>
                <dt className="text-white/70">Age:</dt>
                <dd>{t.age}</dd>
              </dl>

              <table className="mt-14 w-full max-w-lg text-left">
                <thead>
                  <tr className="border-b border-white/30 text-xl text-white/70">
                    <th className="pb-6 font-bold">
                      <span className="inline-block border border-white px-5 py-2.5 text-white">{t.duration}</span>
                    </th>
                    <th className="pb-6 font-bold">Before</th>
                    <th className="pb-6 font-bold">After</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label}>
                      <th className="pt-10 text-xl font-bold text-white/70">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i} className="pt-10 font-display text-3xl">
                          {v}
                          <span className="ml-1 font-sans text-lg font-bold text-white/70">{r.unit}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { src: t.before, label: "Before" },
                { src: t.after, label: "After" },
              ].map((p) => (
                <figure key={p.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={`${t.name} ${p.label.toLowerCase()}`} className="aspect-[3/4] w-full object-cover" />
                  <figcaption className="mt-8 text-center font-display text-xl uppercase text-brand md:text-3xl">
                    {p.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous transformation"
            className="absolute -left-2 top-[38%] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 md:-left-6"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next transformation"
            className="absolute -right-2 top-[38%] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 md:-right-6"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {transformations.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show transformation ${i + 1}`}
              className={`h-3 w-3 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
