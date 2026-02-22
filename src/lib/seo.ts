import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const routeSegments = ["", "/about", "/portfolio", "/contact"] as const;

export function buildPageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path || "/";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      siteName: "Sukanya Kijjapalo Portfolio",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
