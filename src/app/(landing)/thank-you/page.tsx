import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import ConversionPing from "@/components/ConversionPing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Thank you — OZMO Gym" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[80svh] items-center pb-16 pt-32">
      <ConversionPing />
      <div className="wrap max-w-2xl text-center">
        <CheckCircle2 size={64} className="mx-auto text-brand" strokeWidth={1.75} />
        <h1 className="h-display mt-6 text-[clamp(2.4rem,6vw,4rem)]">Thank you!</h1>
        <p className="lead mx-auto mt-5 max-w-lg">
          We&apos;ve received your details. The OZMO team will call you shortly with membership plans and timings.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={site.phoneHref} className="btn-primary">
            <Phone size={17} /> Call us now
          </a>
          <Link href="/locations" className="btn-ghost">
            <MapPin size={17} /> Find your nearest OZMO
          </Link>
        </div>
        <p className="mt-8 text-sm text-white/45">
          <Link href="/" className="hover:text-brand">
            Explore the OZMO website
          </Link>
        </p>
      </div>
    </section>
  );
}
