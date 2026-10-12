import Link from "next/link";
import { Dumbbell } from "lucide-react";

// Text recreation of the OZMO wordmark. Swap for the real logo file when available.
export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" aria-label="OZMO Gym home" className="inline-flex items-center text-gold">
      <span className={`font-logo leading-none tracking-tight ${lg ? "text-5xl" : "text-[2.5rem]"}`}>
        OZM
      </span>
      <span
        className={`ml-0.5 inline-flex items-center justify-center rounded-full bg-gold text-navy ${
          lg ? "h-11 w-11" : "h-9 w-9"
        }`}
      >
        <Dumbbell size={lg ? 24 : 20} strokeWidth={3} />
      </span>
      <span
        className="ml-1 font-logo text-[11px] leading-none tracking-wide [writing-mode:vertical-rl] rotate-180"
        aria-hidden
      >
        GYM
      </span>
    </Link>
  );
}
