import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificatesBrowser } from "@/components/portfolio/certificates-browser";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { certificates } from "@/lib/content";
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

  return buildPageMetadata(
    locale,
    "Certificates",
    "Certificate repository with filters, preview, and download",
    "/certificates",
  );
}

export default async function CertificatesPage({
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
      <SectionHeading title={dict.certificates.title} subtitle={dict.certificates.subtitle} />
      <CertificatesBrowser locale={locale} items={certificates} />
    </div>
  );
}
