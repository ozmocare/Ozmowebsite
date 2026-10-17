"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1500);
        setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{n.toLocaleString("en-IN")}</span>;
}

export default function Stats({
  items,
  tone = "dark",
  className = "",
}: {
  items: { value: number; suffix: string; label: string }[];
  tone?: "dark" | "brand";
  className?: string;
}) {
  const brand = tone === "brand";
  return (
    <dl className={`grid grid-cols-2 gap-y-8 lg:grid-cols-4 ${className}`}>
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse gap-1 px-4 lg:px-8 ${
            i > 0 ? (brand ? "lg:border-l lg:border-ink/15" : "lg:border-l lg:border-white/10") : ""
          }`}
        >
          <dt className={`text-sm font-semibold uppercase tracking-wider ${brand ? "text-ink/70" : "text-white/60"}`}>
            {s.label}
          </dt>
          <dd className={`font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-none ${brand ? "text-ink" : "text-brand"}`}>
            <CountUp to={s.value} />
            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
