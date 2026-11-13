"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { offerEnquiryHref, type Offer } from "@/lib/offers-shared";

const SEEN_KEY = "ozmo-offers-seen";
const DELAY_MS = 1500;

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD
const endsLabel = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/**
 * Offer pop-up shown once per visit, a moment after the page opens.
 * Offers come from /admin; when several are live the visitor can flip between them.
 */
export default function OfferPopup({ offers: all }: { offers: Offer[] }) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Runs in the browser only: today's date decides which offers are still running.
  useEffect(() => {
    // Hide offers that ended since the cached list was fetched.
    const live = all.filter((o) => !o.ends_on || o.ends_on >= today());
    const signature = live.map((o) => o.id + o.updated_at).join("|");
    if (!signature) return;
    let seen = "";
    try {
      seen = sessionStorage.getItem(SEEN_KEY) ?? "";
    } catch {}
    if (seen === signature) return; // already shown this visit (and the offers haven't changed)
    const t = setTimeout(() => {
      setOffers(live);
      setOpen(true);
      try {
        sessionStorage.setItem(SEEN_KEY, signature); // once shown, don't show again this visit
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [all]);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open || offers.length === 0) return null;
  const o = offers[Math.min(index, offers.length - 1)];
  const count = offers.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        onClick={(e) => e.stopPropagation()}
        className="card relative max-h-[92svh] w-full max-w-md overflow-y-auto shadow-2xl animate-[offer-in_.35s_ease-out]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-white transition hover:bg-brand hover:text-ink"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-[4/3] bg-surface-2">
          {o.image ? (
            // Offer images are uploaded through /admin to Supabase Storage.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={o.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(252,238,0,0.25),transparent_60%)]">
              <span className="font-display text-5xl font-black uppercase text-brand">Offer</span>
            </div>
          )}
          {o.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-black uppercase tracking-wider text-ink">
              {o.badge}
            </span>
          )}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous offer"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-brand hover:text-ink"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next offer"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-brand hover:text-ink"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        <div className="p-6 md:p-7">
          <h2 id="offer-title" className="font-display text-2xl font-black uppercase leading-tight md:text-3xl">
            {o.title}
          </h2>
          {o.description && <p className="mt-3 whitespace-pre-line leading-7 text-white/70">{o.description}</p>}
          {o.ends_on && (
            <p className="mt-3 text-sm font-semibold text-brand">Valid till {endsLabel(o.ends_on)}</p>
          )}

          <Link href={offerEnquiryHref(o)} onClick={close} className="btn-primary mt-6 w-full">
            {o.cta_label || "Claim offer"} <ArrowRight size={18} />
          </Link>
          <button type="button" onClick={close} className="mt-3 w-full text-sm text-white/50 hover:text-white">
            No thanks
          </button>

          {count > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {offers.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show offer ${i + 1} of ${count}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-3 bg-white/25"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
