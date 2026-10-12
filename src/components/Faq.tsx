"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="z-mark bg-brand py-20 text-black md:py-28">
      <div className="wrap">
        <h2 className="text-center font-display text-[clamp(1.5rem,3.4vw,2.6rem)] uppercase leading-[1.3]">
          Frequently
          <br />
          asked questions
        </h2>
        <ul className="mx-auto mt-12 max-w-[870px] space-y-6">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="rounded-lg border border-black/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-6 px-7 py-7 text-left text-lg font-bold md:text-xl"
                >
                  <Plus size={26} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  {item.q}
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-7 pl-[4.75rem] text-lg leading-8 text-black/80">{item.a}</p>
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
