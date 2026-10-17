"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import JsonLd, { faqSchema } from "./JsonLd";

export default function Faq({
  items,
  eyebrow = "FAQ",
  title = "Questions, answered",
}: {
  items: { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-paper text-ink">
      <JsonLd data={faqSchema(items)} />
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-ink">{eyebrow}</p>
          <h2 className="h2 mt-4">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/65">
            Can&apos;t find what you&apos;re looking for? Call us on{" "}
            <a href="tel:+919814423444" className="font-bold text-ink underline decoration-brand decoration-[3px] underline-offset-4">
              +91 98144 23444
            </a>
            .
          </p>
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold md:text-xl"
                  >
                    {item.q}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen ? "rotate-45 bg-ink text-brand" : "bg-ink/5"
                      }`}
                    >
                      <Plus size={20} />
                    </span>
                  </button>
                </h3>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[17px] leading-8 text-ink/70">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
