import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import Photo from "./Photo";
import {
  directionsHref,
  site,
  telHref,
  type Location,
} from "@/lib/site";

export function LocationCard({ l }: { l: Location }) {
  const soon = l.status === "soon";
  const hasDetails = Boolean(l.street);
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] bg-surface-2">
        {l.image ? (
          <Photo
            src={l.image}
            alt={`OZMO Gym ${l.area}`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full"
            imgClassName="transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(252,238,0,0.18),transparent_60%)]">
            <span className="font-display text-3xl font-black uppercase text-white/15">{l.area}</span>
          </div>
        )}
        <span
          className={`chip absolute left-4 top-4 border-transparent text-xs uppercase tracking-wider ${
            soon ? "bg-white text-ink" : "bg-brand text-ink"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${soon ? "bg-ink/40" : "bg-ink"}`} />
          {soon ? "Opening soon" : "Open now"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-white/50">{l.brand ?? "OZMO Gym"}</p>
        <h3 className="h3 mt-1 text-white">
          {l.area}
          {l.area !== l.city && <span className="text-white/40">, {l.city}</span>}
        </h3>

        {soon ? (
          <p className="mt-3 leading-7 text-white/60">
            A new OZMO is coming to {l.area}. Call us to be first in line for launch offers.
          </p>
        ) : hasDetails ? (
          <ul className="mt-4 space-y-2.5 text-[15px] text-white/70">
            <li className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand" /> {l.street}
            </li>
            <li className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0 text-brand" />
              <a href={telHref(l.phone!)} className="hover:text-brand">
                {l.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={17} className="mt-0.5 shrink-0 text-brand" /> {site.hours}
            </li>
          </ul>
        ) : (
          <p className="mt-3 leading-7 text-white/60">
            Call {site.phone} for directions and timings at our {l.area} gym.
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {hasDetails && (
            <Link href={`/locations/${l.slug}`} className="btn-primary px-5 py-2.5 text-sm">
              View gym <ArrowUpRight size={16} />
            </Link>
          )}
          {!soon && (
            <a
              href={directionsHref(l)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-5 py-2.5 text-sm"
            >
              <Navigation size={15} /> Directions
            </a>
          )}
          {soon && (
            <a href={site.phoneHref} className="btn-ghost px-5 py-2.5 text-sm">
              <Phone size={15} /> Register interest
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Google map of Ludhiana with every OZMO listing pinned              */
/* ------------------------------------------------------------------ */

const ludhianaQuery = "Ozmo Gym Ludhiana";

/** Live Google map: a search for OZMO Gym pins every branch listed on Google Maps. */
export function LudhianaMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-3xl border border-white/10 bg-surface ${className}`}>
      <iframe
        title="Map of OZMO gyms in Ludhiana"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(ludhianaQuery)}&z=12&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[420px] w-full border-0 md:h-[520px]"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
        <span className="flex items-center gap-2 font-semibold text-white/80">
          <MapPin size={16} className="text-brand" /> Every OZMO gym in Ludhiana, live on Google Maps
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ludhianaQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-brand hover:underline"
        >
          Open in Google Maps <ArrowUpRight size={15} />
        </a>
      </figcaption>
    </figure>
  );
}
