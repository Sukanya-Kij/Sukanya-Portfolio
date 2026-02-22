import { getDictionary } from "@/lib/i18n";
import type { ExperienceItem, Locale } from "@/lib/types";

export function ExperienceTimeline({
  locale,
  items,
}: {
  locale: Locale;
  items: ExperienceItem[];
}) {
  const dict = getDictionary(locale);

  return (
    <ol className="space-y-6">
      {items.map((item) => (
        <li key={`${item.company}-${item.period}`} className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-teal-700">{item.period}</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{item.role[locale]}</h2>
          <p className="text-sm text-slate-600">{item.company}</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {item.bullets[locale].map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          {item.achievements?.[locale]?.length ? (
            <>
              <h3 className="mt-5 text-sm font-semibold text-slate-900">{dict.experience.achievements}</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {item.achievements[locale].map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
