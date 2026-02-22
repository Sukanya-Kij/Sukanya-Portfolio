"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${targetLocale}`;
  }

  if (locales.includes(parts[0] as Locale)) {
    parts[0] = targetLocale;
  } else {
    parts.unshift(targetLocale);
  }

  return `/${parts.join("/")}`;
}

export function LocaleSwitcher({ localeLabel }: { localeLabel: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-300 bg-white/70 p-1 text-xs font-semibold text-slate-700 backdrop-blur">
      <span className="px-2 text-slate-500">{localeLabel}</span>
      {locales.map((locale) => {
        const href = switchLocalePath(pathname, locale);
        const active = pathname.startsWith(`/${locale}`);

        return (
          <Link
            key={locale}
            href={href}
            className={`rounded-full px-2.5 py-1 transition ${
              active
                ? "bg-slate-900 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
