import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { SocialLinks } from "./Socials";
import { locationHref, navLinks, openLocations, serviceLinks, site, soonLocations } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-2">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Logo className="h-14 w-auto" />
          <p className="mt-6 max-w-sm leading-7 text-white/60">
            OZMO Gym &amp; Spa is Ludhiana&apos;s premium fitness chain — {site.foundedYears}+ years in health and
            wellness, {openLocations.length} gyms running and 10,000+ members trained.
          </p>
          <SocialLinks className="mt-6 flex gap-4" />
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Explore</h2>
          <ul className="mt-5 space-y-3 text-white/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-brand">
                  {s.label} in Ludhiana
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Our gyms</h2>
          <ul className="mt-5 space-y-3 text-white/70">
            {openLocations.map((l) => (
              <li key={l.slug}>
                <Link href={locationHref(l)} className="hover:text-brand">
                  Gym in {l.area}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-white/45">
            Opening soon: {soonLocations.map((l) => l.area).join(", ")}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Contact</h2>
          <ul className="mt-5 space-y-4 text-white/70">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 hover:text-brand">
                <Phone size={18} className="mt-0.5 shrink-0 text-brand" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-brand">
                <Mail size={18} className="mt-0.5 shrink-0 text-brand" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand" /> {site.address}
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand" /> {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 OZMO Gym &amp; Spa. All rights reserved.</p>
        {/* TODO: link these once the policy documents are ready */}
        <ul className="flex gap-6">
          <li>
            <a href="#" className="hover:text-brand">Terms</a>
          </li>
          <li>
            <a href="#" className="hover:text-brand">Privacy</a>
          </li>
          <li>
            <a href="#" className="hover:text-brand">Refunds</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
