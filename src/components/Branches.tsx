"use client";

import { useState } from "react";
import { MapPin, PhoneCall } from "lucide-react";
import { branches, mapSrc } from "@/lib/site";
import Reveal from "./Reveal";

export default function Branches({ className = "bg-navy" }: { className?: string }) {
  const [activeId, setActiveId] = useState(branches[0].id);
  const active = branches.find((b) => b.id === activeId) ?? branches[0];

  return (
    <section id="branches" className={`py-20 md:py-28 ${className}`}>
      <div className="wrap">
        <Reveal className="text-center">
          <h2 className="h-section">All branches</h2>
          <p className="lead mx-auto mt-8 max-w-xl">
            We have 6 branches across Punjab for your convenience to choose the one closest to you.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid overflow-hidden rounded-2xl bg-[#111] lg:h-[640px] lg:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-6 overflow-y-auto p-5 md:p-10 lg:h-full">
            {branches.map((b) => {
              const isActive = b.id === active.id;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(b.id)}
                    aria-pressed={isActive}
                    className={`flex w-full flex-col overflow-hidden rounded-xl border text-left transition sm:flex-row ${
                      isActive ? "border-brand/70 bg-[#3a3a10]" : "border-transparent bg-[#1b1b1b] hover:bg-[#242424]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image} alt="" className="h-44 w-full object-cover sm:h-auto sm:w-60 sm:shrink-0" />
                    <span className="block space-y-3 p-5">
                      <span className="block text-2xl font-bold md:text-3xl">{b.name}</span>
                      <span className="flex items-center gap-3 text-white/70">
                        <PhoneCall size={18} className="shrink-0 text-brand" /> {b.phone}
                      </span>
                      <span className="flex items-center gap-3 leading-7 text-white/80">
                        <MapPin size={18} className="shrink-0 text-brand" /> {b.address}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <iframe
            key={active.id}
            title={`Map of ${active.name}`}
            src={mapSrc(`${active.name}, ${active.address}`)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0 lg:h-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
