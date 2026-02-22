import Link from "next/link";
import { getDictionary, navItems } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { LocaleSwitcher } from "@/components/portfolio/locale-switcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${locale}`} className="text-sm font-bold tracking-wide text-slate-900">
            {dict.brand}
          </Link>
          <LocaleSwitcher localeLabel={dict.common.localeSwitch} />
        </div>

        <nav className="mt-3 flex items-center gap-4 overflow-x-auto pb-1 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link key={item.key} href={`/${locale}${item.href}`} className="shrink-0 transition hover:text-teal-700">
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
