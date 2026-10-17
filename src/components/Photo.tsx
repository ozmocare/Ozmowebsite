import Image from "next/image";

/** Responsive cover image. Size it with `className` (aspect-*, h-*). */
export default function Photo({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${imgClassName}`}
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}
