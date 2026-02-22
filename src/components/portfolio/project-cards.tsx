import Image from "next/image";
import { primary, ui } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/types";

const projectImages: Record<string, { src: string; alt: string }> = {
  "crm-auto-alert": {
    src: "/images/certificates/sgs-certificate-crm-auto-alert-2023.jpg",
    alt: "CRM Auto Alert certificate of recognition",
  },
  "retention-and-iso-coordination": {
    src: "/images/achievements/sgs-top-crm-executive-2025.jpg",
    alt: "Top CRM Executive recognition board for Sukanya",
  },
};

export function ProjectCards({ items }: { items: ProjectItem[] }) {
  return (
    <div className="grid gap-6">
      {items.map((project) => (
        <article key={project.slug} className="reveal premium-card overflow-hidden p-0">
          {projectImages[project.slug] ? (
            <Image
              src={projectImages[project.slug].src}
              alt={projectImages[project.slug].alt}
              width={1200}
              height={700}
              className="media-lift h-56 w-full object-cover"
            />
          ) : null}

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="heading-luxe mt-4 text-4xl leading-tight text-emerald-950">{primary(project.title)}</h2>

            <div className="mt-5 grid gap-4 text-sm text-emerald-900/85 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-emerald-950">{ui.projects.role}</h3>
                <p className="mt-1">{primary(project.role)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-950">{ui.projects.evidenceType}</h3>
                <p className="mt-1">{primary(project.evidenceType)}</p>
              </div>
            </div>

            <div className="mt-5 space-y-5 text-sm text-emerald-900/85">
              <section>
                <h3 className="font-semibold text-emerald-950">{ui.projects.context}</h3>
                <p className="mt-1">{primary(project.context)}</p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-950">{ui.projects.challenge}</h3>
                <p className="mt-1">{primary(project.challenge)}</p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-950">{ui.projects.tools}</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {project.tools.en.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-950">{ui.projects.actions}</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {project.actions.en.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-950">{ui.projects.outcomes}</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {project.outcomes.en.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
