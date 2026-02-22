import type { Metadata } from "next";
import type { Locale } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const routeSegments = [
  "",
  "/about",
  "/experience",
  "/projects",
  "/certificates",
  "/contact",
] as const;

export function buildPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        th: `/th${path}`,
        en: `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      siteName: "Sukanya Kijjapalo Portfolio",
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
