import { site } from "@/lib/site";

const paths = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.54h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.09V21h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4z",
};

export function SocialIcon({ name, size = 22 }: { name: keyof typeof site.socials; size?: number }) {
  if (name === "instagram") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}

const order = ["x", "instagram", "linkedin", "youtube"] as const;

export function SocialLinks({
  names = order,
  variant = "plain",
  className = "",
}: {
  names?: readonly (keyof typeof site.socials)[];
  variant?: "plain" | "tile";
  className?: string;
}) {
  return (
    <div className={className}>
      {names.map((n) => (
        <a
          key={n}
          href={site.socials[n]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={n === "x" ? "X (Twitter)" : n}
          className={
            variant === "tile"
              ? "flex h-10 w-10 items-center justify-center bg-white text-black transition hover:bg-brand"
              : "text-white transition hover:text-brand"
          }
        >
          <SocialIcon name={n} size={variant === "tile" ? 20 : 24} />
        </a>
      ))}
    </div>
  );
}
