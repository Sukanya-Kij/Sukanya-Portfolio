import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { certificates, projects } from "@/lib/content";
import { primary, ui } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "Portfolio",
  "Certificates, field activities, and project outcomes of Sukanya Kijjapalo.",
  "/portfolio",
);

const activityPhotos = [
  {
    id: "client-visit-meeting",
    src: "/images/people/formal/fern-boardroom-professional.jpg",
    alt: "Client visit and professional discussion session",
    title: "Client Visit and Consultation",
  },
  {
    id: "certificate-handover",
    src: "/images/achievements/sgs-team-recognition-stage.jpg",
    alt: "Certificate handover with client and operations team",
    title: "Certificate Handover at Client Site",
  },
  {
    id: "follow-up-session",
    src: "/images/people/formal/fern-office-portrait-smile.jpg",
    alt: "Follow-up session for coordination and certification support",
    title: "Post-Audit Follow-up Session",
  },
] as const;

export default function PortfolioPage() {
  const certificateItems = certificates.slice(0, 2);
  const projectItems = projects.slice(0, 2);

  return (
    <div className="space-y-10">
      <SectionHeading title={ui.portfolio.title} subtitle={ui.portfolio.subtitle} />

      <section className="space-y-5">
        <h2 className="heading-luxe text-4xl text-emerald-50">{ui.portfolio.certificatesTitle}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {certificateItems.map((item) => (
            <article key={item.id} className="reveal premium-card overflow-hidden p-0">
              {item.previewImage ? (
                <Image
                  src={item.previewImage}
                  alt={primary(item.title)}
                  width={1200}
                  height={800}
                  priority={item.id === certificateItems[0]?.id}
                  className="media-lift h-64 w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h3 className="heading-luxe text-3xl text-emerald-950">{primary(item.title)}</h3>
                <p className="mt-1 text-sm text-emerald-800/85">{item.issuer}</p>
                <p className="mt-1 text-xs text-emerald-700/85">
                  {ui.portfolio.issuedLabel}: {item.issueDate}
                </p>
                {item.fileUrl ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary inline-flex min-h-11 items-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
                    >
                      {ui.portfolio.view}
                    </a>
                    <a
                      href={item.fileUrl}
                      download
                      className="btn-primary inline-flex min-h-11 items-center rounded-xl border border-emerald-700 bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
                    >
                      {ui.portfolio.download}
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="heading-luxe text-4xl text-emerald-50">{ui.portfolio.activitiesTitle}</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {activityPhotos.map((photo) => (
            <article key={photo.id} className="reveal premium-card overflow-hidden p-0">
              <Image src={photo.src} alt={photo.alt} width={1200} height={900} className="media-lift h-64 w-full object-cover" />
              <div className="p-4">
                <p className="text-sm font-semibold text-emerald-950">{photo.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="heading-luxe text-4xl text-emerald-50">{ui.portfolio.projectsTitle}</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {projectItems.map((project) => (
            <article key={project.slug} className="reveal premium-card p-6">
              <h3 className="heading-luxe text-3xl text-emerald-950">{primary(project.title)}</h3>
              <p className="mt-1 text-sm font-medium text-emerald-900/90">{primary(project.role)}</p>
              <p className="mt-3 text-sm text-emerald-900/85">{primary(project.context)}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-emerald-900/85">
                {project.outcomes.en.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
