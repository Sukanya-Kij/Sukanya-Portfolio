import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { profile } from "@/lib/content";
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

  return buildPageMetadata(locale, "About", "Professional summary, skills, and education", "/about");
}

export default async function AboutPage({
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
      <SectionHeading title={dict.about.title} subtitle={profile.title[locale]} />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">{dict.about.summaryTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{profile.summary[locale]}</p>
        </section>

        <section className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">{dict.about.languagesTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {profile.languages.map((language) => (
              <li key={language.name}>
                <p className="font-semibold text-slate-900">{language.name}</p>
                <p>{language.level[locale]}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">{dict.about.skillsTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {profile.skills[locale].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">{dict.about.educationTitle}</h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-700">
            {profile.education.map((item) => (
              <li key={item.institution}>
                <p className="font-semibold text-slate-900">{item.degree[locale]}</p>
                <p>{item.institution}</p>
                <p className="text-slate-500">{item.period}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
