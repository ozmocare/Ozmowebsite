"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Clock, Mail, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks, serviceLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = (href: string) =>
    `font-semibold transition hover:text-white ${pathname === href ? "text-white" : "text-white/80"}`;

  const servicesActive = pathname.startsWith("/services");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/30 bg-navy">
      <div className="wrap flex items-center gap-6 lg:gap-16">
        <div className="shrink-0 py-3">
          <Logo />
        </div>

        <div className="hidden min-w-0 flex-1 lg:block">
          {/* Info bar: collapses once the page is scrolled */}
          <div
            className={`flex items-center justify-between overflow-hidden text-[15px] text-white/90 transition-all duration-300 ${
              scrolled ? "max-h-0 opacity-0" : "max-h-12 pt-4 opacity-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-brand" /> {site.hours}
            </span>
            <span className="flex items-center gap-10">
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-brand">
                <Phone size={18} className="text-brand" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-brand">
                <Mail size={18} className="text-brand" /> {site.email}
              </a>
            </span>
          </div>

          <nav className="flex items-center justify-between py-4">
            <ul className="flex items-center gap-10 xl:gap-16">
              {navLinks.slice(0, 3).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="group relative">
                <button
                  type="button"
                  className={`flex items-center gap-1 font-semibold transition hover:text-white ${
                    servicesActive ? "text-white" : "text-white/80"
                  }`}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown size={16} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <ul className="invisible absolute left-0 top-full z-10 min-w-40 translate-y-1 rounded-md bg-[#101010] p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {serviceLinks.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="block rounded px-3 py-2 text-white/90 hover:bg-white/10 hover:text-brand">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href="/contact" className={linkCls("/contact")}>
                  Contact us
                </Link>
              </li>
            </ul>
            <Link href="/#trial" className="btn px-5 py-2.5">
              Try for FREE
            </Link>
          </nav>
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link href="/#trial" className="btn px-4 py-2 text-sm">
            Try for FREE
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy lg:hidden">
          <ul className="wrap flex flex-col py-3">
            {navLinks.slice(0, 3).map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className={`block py-3 ${linkCls(l.href)}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-3 font-semibold text-white/50">Services</li>
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} onClick={() => setOpen(false)} className={`block py-2 pl-4 ${linkCls(s.href)}`}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setOpen(false)} className={`block py-3 ${linkCls("/contact")}`}>
                Contact us
              </Link>
            </li>
            <li className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-brand" /> {site.hours}
              </span>
              <a href={site.phoneHref} className="flex items-center gap-2">
                <Phone size={16} className="text-brand" /> {site.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
