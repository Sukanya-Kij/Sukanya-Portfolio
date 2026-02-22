import { getDictionary } from "@/lib/i18n";
import type { Locale, ProjectItem } from "@/lib/types";

export function ProjectCards({ locale, items }: { locale: Locale; items: ProjectItem[] }) {
  const dict = getDictionary(locale);

  return (
    <div className="grid gap-6">
      {items.map((project) => (
        <article key={project.slug} className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">{project.title[locale]}</h2>

          <div className="mt-5 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-900">{dict.projects.role}</h3>
              <p className="mt-1">{project.role[locale]}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{dict.projects.evidenceType}</h3>
              <p className="mt-1">{project.evidenceType[locale]}</p>
            </div>
          </div>

          <div className="mt-5 space-y-5 text-sm text-slate-700">
            <section>
              <h3 className="font-semibold text-slate-900">{dict.projects.context}</h3>
              <p className="mt-1">{project.context[locale]}</p>
            </section>

            <section>
              <h3 className="font-semibold text-slate-900">{dict.projects.challenge}</h3>
              <p className="mt-1">{project.challenge[locale]}</p>
            </section>

            <section>
              <h3 className="font-semibold text-slate-900">{dict.projects.tools}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {project.tools[locale].map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-slate-900">{dict.projects.actions}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {project.actions[locale].map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-slate-900">{dict.projects.outcomes}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {project.outcomes[locale].map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}
