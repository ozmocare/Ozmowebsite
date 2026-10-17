const words = ["Gym", "Cardio", "Cross-fit", "Yoga", "Swimming", "Steam & Spa", "Personal training"];

/** Yellow ticker strip between sections. */
export default function Marquee({ className = "" }: { className?: string }) {
  const row = [...words, ...words];
  return (
    <div className={`overflow-hidden bg-brand py-4 text-ink ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-lg font-extrabold uppercase md:text-2xl">
                {w}
                <svg viewBox="0 0 24 24" className="mx-6 h-4 w-4 md:mx-10" fill="currentColor">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
