import { tapeWords } from "@/lib/site";

function Tape({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  // Content is doubled so the -50% marquee loop is seamless.
  const words = [...tapeWords, ...tapeWords, ...tapeWords, ...tapeWords];
  return (
    <div className={`absolute left-[-5%] w-[110%] overflow-hidden py-4 md:py-6 ${className}`}>
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {words.map((w, i) => (
              <span key={i} className="flex items-center font-display text-xl text-black md:text-3xl">
                <span className="mx-6 text-lg md:mx-12">•</span>
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The two crossed "caution tape" marquees that separate sections. */
export default function Tapes({ className = "bg-navy" }: { className?: string }) {
  return (
    <div className={`relative h-44 overflow-hidden md:h-64 ${className}`} aria-hidden>
      <Tape reverse className="top-1/2 -translate-y-1/2 rotate-[4deg] bg-[#dce3e3]" />
      <Tape className="top-1/2 -translate-y-1/2 -rotate-[4deg] bg-brand" />
    </div>
  );
}
