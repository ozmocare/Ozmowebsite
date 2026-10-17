"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  images,
  className = "aspect-[16/9]",
  controls = true,
  interval = 5000,
  sizes = "(min-width: 1320px) 1240px, 100vw",
}: {
  images: { src: string; alt: string }[];
  className?: string;
  controls?: boolean;
  interval?: number;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval, index]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-surface ${className}`}>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {controls && count > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 md:bottom-6 md:right-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-brand hover:text-ink"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-brand hover:text-ink"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
      {count > 1 && (
        <div className="absolute bottom-6 left-6 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-3 bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
