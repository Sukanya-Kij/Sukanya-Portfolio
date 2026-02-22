import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { routeSegments } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    routeSegments.map((segment) => ({
      url: `${siteUrl}/${locale}${segment}`,
      lastModified: now,
      changeFrequency: segment === "" ? "weekly" : "monthly",
      priority: segment === "" ? 1 : 0.8,
    })),
  );
}
