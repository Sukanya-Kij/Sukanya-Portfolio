import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { profile } from "@/lib/content";
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

  return buildPageMetadata(
    locale,
    "Portfolio",
    "Portfolio website for Sukanya Kijjapalo (Fern)",
    "",
  );
}

export default async function HomePage({
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
    <div className="space-y-10">
      <section className="reveal relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-cyan-100/60 blur-3xl" />

        <p className="text-xs font-semibold tracking-[0.2em] text-teal-700 uppercase">{dict.home.introLabel}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {profile.fullName} ({profile.nickname})
        </h1>
        <p className="mt-2 text-lg font-medium text-slate-700">{profile.title[locale]}</p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">{profile.summary[locale]}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/experience`} className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">
            {dict.home.ctaExperience}
          </Link>
          <Link href={`/${locale}/projects`} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {dict.home.ctaProjects}
          </Link>
          <Link href={`/${locale}/certificates`} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {dict.home.ctaCertificates}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">{dict.home.keyHighlights}</h2>
          <p className="mt-2 text-sm text-slate-600">{dict.home.yearsExp}</p>
        </article>
        <article className="reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Retention KPI</h2>
          <p className="mt-2 text-sm text-slate-600">{dict.home.metricRenewal}</p>
        </article>
        <article className="reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Process Improvement</h2>
          <p className="mt-2 text-sm text-slate-600">{dict.home.metricAutomation}</p>
        </article>
      </section>
    </div>
  );
}
