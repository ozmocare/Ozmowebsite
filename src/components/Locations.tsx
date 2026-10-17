import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import Photo from "./Photo";
import {
  directionsHref,
  locations,
  site,
  telHref,
  towns,
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
/* Dotted Punjab map with OZMO towns                                   */
/* ------------------------------------------------------------------ */

// Rough outline of Punjab in the map's own coordinate space (bbox ≈ 73.88–76.94°E, 29.53–32.51°N).
const outline: [number, number][] = [
  [555, 90], [905, 90], [925, 150], [975, 150], [1040, 190], [1045, 260], [1090, 300],
  [1115, 360], [1110, 430], [1050, 450], [1050, 500], [980, 510], [945, 580], [900, 605],
  [800, 600], [740, 610], [715, 660], [700, 610], [640, 570], [520, 555], [390, 545],
  [400, 480], [380, 445], [430, 375], [470, 320], [520, 275], [560, 250], [540, 225], [545, 150],
];

const project = (lat: number, lon: number): [number, number] => [
  380 + ((lon - 73.88) / 3.06) * 735,
  90 + ((32.51 - lat) / 2.98) * 570,
];

function inside(x: number, y: number) {
  let hit = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [xi, yi] = outline[i];
    const [xj, yj] = outline[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const dots: [number, number][] = [];
for (let y = 90; y <= 660; y += 12) {
  for (let x = 380; x <= 1116; x += 12) if (inside(x, y)) dots.push([x, y]);
}

export function NetworkMap({ className = "" }: { className?: string }) {
  const markers = towns.map((t) => {
    const here = locations.filter((l) => l.city === t.name);
    const open = here.filter((l) => l.status === "open").length;
    const soon = here.length - open;
    return { ...t, open, soon, xy: project(t.lat, t.lon) };
  });

  const label = `Map of Punjab showing OZMO gyms in ${markers
    .map((m) => `${m.name} (${m.open} open, ${m.soon} opening soon)`)
    .join(", ")}`;

  return (
    <figure className={className}>
      <svg viewBox="600 300 480 230" className="w-full" role="img" aria-label={label}>
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={4.2} className="fill-white/[0.07]" />
        ))}
        {markers.map((m, i) => {
          const [x0, y] = m.xy;
          const x = x0 + (m.dx ?? 0);
          const active = m.open > 0;
          const pos =
            m.label === "above"
              ? { x, anchor: "middle" as const, name: y - 22, count: y - 44 }
              : m.label === "below"
                ? { x, anchor: "middle" as const, name: y + 36, count: y + 58 }
                : { x: x + 18, anchor: "start" as const, name: y + 4, count: y + 26 };
          return (
            <g key={m.name}>
              {active && (
                <circle
                  cx={x0}
                  cy={y}
                  r={9}
                  className="origin-center animate-pulse-ring fill-brand [transform-box:fill-box]"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              )}
              <circle
                cx={x0}
                cy={y}
                r={active ? 9 : 7}
                className={active ? "fill-brand" : "fill-ink stroke-white"}
                strokeWidth={active ? 0 : 3}
              />
              <text
                x={pos.x}
                y={pos.name}
                textAnchor={pos.anchor}
                className="fill-white font-display text-[19px] font-extrabold uppercase"
              >
                {m.name}
              </text>
              <text
                x={pos.x}
                y={pos.count}
                textAnchor={pos.anchor}
                className={`text-[14px] font-semibold ${active ? "fill-brand" : "fill-white/60"}`}
              >
                {[m.open && `${m.open} open`, m.soon && `${m.soon} soon`].filter(Boolean).join(" · ")}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-white/60">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brand" /> Open now
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white" /> Opening soon
        </span>
      </figcaption>
    </figure>
  );
}
