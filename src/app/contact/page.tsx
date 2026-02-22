import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/portfolio/contact-form";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { profile } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("Contact", "Contact Sukanya Kijjapalo", "/contact");

export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section>
        <SectionHeading title={ui.contact.title} subtitle={ui.contact.subtitle} />

        <article className="reveal premium-card overflow-hidden p-0">
          <Image src="/images/people/formal/fern-office-portrait-contact.jpg" alt="Fern portrait for contact section" width={900} height={1200} className="media-lift h-80 w-full object-cover" />
          <div className="p-6">
            <p className="text-sm font-semibold text-emerald-950">{ui.contact.emailLabel}</p>
            <a href={`mailto:${profile.email}`} className="mt-2 inline-flex min-h-[44px] min-w-[44px] items-center text-base text-emerald-800 tracking-wide underline decoration-emerald-400 transition hover:text-emerald-950">
              {profile.email}
            </a>
          </div>
        </article>
      </section>

      <section>
        <ContactForm />
      </section>
    </div>
  );
}
