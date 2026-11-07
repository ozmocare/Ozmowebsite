import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { detailedLocations, serviceLinks, siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/locations", priority: 0.9 },
    { path: "/franchise", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    ...serviceLinks.map((s) => ({ path: s.href, priority: 0.8 })),
    ...detailedLocations.map((l) => ({ path: `/locations/${l.slug}`, priority: 0.8 })),
  ];
  const staticEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));

  // Published blog posts; the list is cached under the blog tag, so publishing refreshes it.
  const posts = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updated_at ?? p.published_at ?? undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
