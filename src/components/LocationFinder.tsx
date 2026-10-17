"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { fullAddress, mapSrc, openLocations, site, telHref } from "@/lib/site";

/** Interactive list of open gyms with a live Google map of the selected one. */
export default function LocationFinder() {
  const [activeSlug, setActiveSlug] = useState(openLocations[0].slug);
  const active = openLocations.find((l) => l.slug === activeSlug) ?? openLocations[0];
  const query = active.street ? `${active.brand ?? "OZMO Gym"}, ${fullAddress(active)}` : `OZMO Gym ${active.area} ${active.city}`;

  return (
    <div className="card grid overflow-hidden lg:h-[620px] lg:grid-cols-[1fr_1.15fr]">
      <ul className="space-y-2 overflow-y-auto p-3 md:p-4 lg:h-full" aria-label="OZMO gyms">
        {openLocations.map((l) => {
          const isActive = l.slug === active.slug;
          return (
            <li key={l.slug}>
              <button
                type="button"
                onClick={() => setActiveSlug(l.slug)}
                aria-pressed={isActive}
                className={`w-full rounded-xl border p-5 text-left transition ${
                  isActive ? "border-brand bg-brand/10" : "border-transparent hover:bg-white/5"
                }`}
              >
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-white/45">
                      {l.brand ?? "OZMO Gym"}
                    </span>
                    <span className="mt-1 block font-display text-lg font-extrabold uppercase">
                      {l.area}
                      {l.area !== l.city && <span className="text-white/40">, {l.city}</span>}
                    </span>
                  </span>
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? "bg-brand" : "bg-white/20"}`} />
                </span>
                {isActive && (
                  <span className="mt-3 block space-y-2 text-sm text-white/70">
                    <span className="flex gap-2">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                      {l.street ? fullAddress(l) : "Address details coming soon"}
                    </span>
                    <span className="flex gap-2">
                      <Phone size={16} className="mt-0.5 shrink-0 text-brand" /> {l.phone ?? site.phone}
                    </span>
                  </span>
                )}
              </button>
              {isActive && (
                <div className="flex gap-2 px-5 pb-3 pt-1">
                  <a href={telHref(l.phone ?? site.phone)} className="btn-primary px-4 py-2 text-sm">
                    <Phone size={14} /> Call
                  </a>
                  {l.street && (
                    <Link href={`/locations/${l.slug}`} className="btn-ghost px-4 py-2 text-sm">
                      Gym details <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <iframe
        key={active.slug}
        title={`Map of OZMO Gym ${active.area}`}
        src={mapSrc(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[380px] w-full border-0 grayscale-[0.3] lg:h-full"
      />
    </div>
  );
}
