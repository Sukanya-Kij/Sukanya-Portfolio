import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { experiences } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildPageMetadata(locale, "Experience", "Career timeline and measurable outcomes", "/experience");
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <div>
      <SectionHeading title={dict.experience.title} subtitle={dict.experience.subtitle} />
      <ExperienceTimeline locale={locale} items={experiences} />
    </div>
  );
}
