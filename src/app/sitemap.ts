import type { MetadataRoute } from "next";
import { routeSegments } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routeSegments.map((segment) => ({
    url: `${siteUrl}${segment || "/"}`,
    lastModified: now,
    changeFrequency: segment === "" ? "weekly" : "monthly",
    priority: segment === "" ? 1 : 0.8,
  }));
}
