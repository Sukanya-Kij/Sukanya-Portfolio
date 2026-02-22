import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/portfolio/contact-form";
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

  return buildPageMetadata(locale, "Contact", "Contact Sukanya Kijjapalo", "/contact");
}

export default async function ContactPage({
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
    <div className="grid gap-6 lg:grid-cols-2">
      <section>
        <SectionHeading title={dict.contact.title} subtitle={dict.contact.subtitle} />

        <article className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">{dict.contact.emailLabel}</p>
          <a href={`mailto:${profile.email}`} className="mt-2 inline-block text-base text-teal-700 underline">
            {profile.email}
          </a>
        </article>
      </section>

      <section>
        <ContactForm locale={locale} />
      </section>
    </div>
  );
}
