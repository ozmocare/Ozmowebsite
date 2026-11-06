import Logo from "@/components/Logo";
import { site } from "@/lib/site";

/** Distraction-free chrome for ad landing pages: logo + call-back button only. */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          <Logo preload className="h-10 w-auto md:h-11" />
          <a href="/enquire#form" className="btn-primary px-5 py-2.5 text-sm">
            Get a call back
          </a>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/10 bg-ink-2 py-8 text-center text-sm text-white/45">
        <p>
          © 2025 OZMO Gym &amp; Spa · {site.address} · {site.hours}
        </p>
      </footer>
    </>
  );
}
