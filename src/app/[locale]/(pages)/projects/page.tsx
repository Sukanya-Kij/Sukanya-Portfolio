import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCards } from "@/components/portfolio/project-cards";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { projects } from "@/lib/content";
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

  return buildPageMetadata(locale, "Projects", "Case studies and measurable project outcomes", "/projects");
}

export default async function ProjectsPage({
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
      <SectionHeading title={dict.projects.title} subtitle={dict.projects.subtitle} />
      <ProjectCards locale={locale} items={projects} />
    </div>
  );
}
