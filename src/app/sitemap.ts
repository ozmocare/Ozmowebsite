import type { MetadataRoute } from "next";
import { detailedLocations, serviceLinks, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/locations", priority: 0.9 },
    { path: "/franchise", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    ...serviceLinks.map((s) => ({ path: s.href, priority: 0.8 })),
    ...detailedLocations.map((l) => ({ path: `/locations/${l.slug}`, priority: 0.8 })),
  ];
  return pages.map((p) => ({
    url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
