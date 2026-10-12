"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
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

  return <span ref={ref}>{n}</span>;
}

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse items-center gap-4 text-center">
          <dt className="text-xl text-white/90 md:text-2xl">{s.label}</dt>
          <dd className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-brand">
            <CountUp to={s.value} />
            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
