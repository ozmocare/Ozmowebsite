import {
  fullAddress,
  locationTitle,
  openLocations,
  site,
  siteUrl,
  type Location,
} from "@/lib/site";

/** Renders schema.org structured data. `<` is escaped to keep the script tag safe. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}

const postal = (l: Location) => ({
  "@type": "PostalAddress",
  streetAddress: l.street,
  addressLocality: l.city,
  addressRegion: "Punjab",
  postalCode: l.postalCode,
  addressCountry: "IN",
});

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/ozmo-logo.png`,
    email: site.email,
    telephone: site.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "D Block, South City, Ayali Khurd",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      postalCode: "142027",
      addressCountry: "IN",
    },
    subOrganization: openLocations
      .filter((l) => l.street)
      .map((l) => ({ "@id": `${siteUrl}/locations/${l.slug}#gym` })),
  };
}

export function gymSchema(l: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${siteUrl}/locations/${l.slug}#gym`,
    name: `${l.brand ?? "OZMO Gym"} ${l.area}`,
    url: `${siteUrl}/locations/${l.slug}`,
    image: l.image ? `${siteUrl}${l.image}` : `${siteUrl}/brand/ozmo-logo.png`,
    telephone: (l.phone ?? site.phone).replace(/\s/g, ""),
    address: postal(l),
    openingHours: site.openingHours,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    description: `${locationTitle(l)} — ${fullAddress(l)}. Open 5 a.m. to 11 p.m., all week.`,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(l))}`,
    potentialAction: { "@type": "ReserveAction", target: `${siteUrl}/locations/${l.slug}#trial`, name: "Book a free trial" },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
