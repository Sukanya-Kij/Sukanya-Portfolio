import { primary, ui } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/types";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item) => (
        <li key={`${item.company}-${item.period}`} className="reveal premium-card p-6">
          <p className="text-sm font-semibold text-emerald-700">{item.period}</p>
          <h2 className="mt-2 text-xl font-bold text-emerald-950">{primary(item.role)}</h2>
          <p className="mt-1 text-sm text-emerald-800/80">{item.company}</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-emerald-900/85">
            {item.bullets.en.map((bullet) => (
              <li key={bullet}>
                {bullet}
              </li>
            ))}
          </ul>

          {item.achievements?.en?.length ? (
            <>
              <h3 className="mt-5 text-sm font-semibold text-emerald-950">{ui.experience.achievements}</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-emerald-900/85">
                {item.achievements.en.map((achievement) => (
                  <li key={achievement}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
