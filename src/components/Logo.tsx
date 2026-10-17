import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "h-11 w-auto", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Link href="/" aria-label="OZMO Gym — home" className="inline-flex shrink-0">
      <Image
        src="/brand/ozmo-logo.png"
        alt="OZMO Gym Luxe"
        width={1039}
        height={362}
        preload={preload}
        className={className}
      />
    </Link>
  );
}
