"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks, serviceLinks, site, soonLocations } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkCls = (href: string) =>
    `relative font-semibold transition hover:text-brand ${isActive(href) ? "text-brand" : "text-white/85"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div
        className={`overflow-hidden bg-brand text-ink transition-all duration-300 ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
      >
        <div className="wrap flex items-center justify-center gap-2 py-2 text-center text-[13px] font-semibold md:justify-between">
          <p className="truncate">Opening soon: {soonLocations.map((l) => l.area).join(" · ")}</p>
          <Link
            href="/franchise"
            className="hidden items-center gap-1 font-bold underline-offset-4 hover:underline md:inline-flex"
          >
            Own an OZMO franchise <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div
        className={`border-b transition-colors duration-300 ${
          open
            ? "border-white/10 bg-ink"
            : scrolled
              ? "border-white/10 bg-ink/95 backdrop-blur"
              : "border-transparent bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <div className="wrap flex h-[76px] items-center gap-8">
          <Logo preload className="h-10 w-auto md:h-11" />

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.slice(0, 2).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="group relative">
                <button type="button" aria-haspopup="true" className={`flex items-center gap-1 ${linkCls("/services")}`}>
                  Services
                  <ChevronDown size={16} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="card min-w-48 p-2 shadow-2xl">
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="block rounded-lg px-4 py-2.5 font-medium text-white/85 hover:bg-white/5 hover:text-brand"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {navLinks.slice(2).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls(l.href)}>
                    {l.label}
                    {l.href === "/franchise" && (
                      <span className="absolute -right-4 -top-3 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-black uppercase leading-none text-ink">
                        Grow
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-sm font-semibold text-white/85 hover:text-brand xl:flex"
            >
              <Phone size={16} className="text-brand" /> {site.phone}
            </a>
            <Link href="/#join" className="btn-primary px-5 py-2.5 text-sm">
              Join now
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-2 text-white lg:hidden"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Mobile" className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-white/10 lg:hidden">
            <ul className="wrap flex flex-col py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className={`block py-3 text-lg ${linkCls(l.href)}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pb-1 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Services</li>
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={() => setOpen(false)} className={`block py-2 ${linkCls(s.href)}`}>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4 border-t border-white/10 pt-4">
                <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-white/85">
                  <Phone size={16} className="text-brand" /> {site.phone}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
