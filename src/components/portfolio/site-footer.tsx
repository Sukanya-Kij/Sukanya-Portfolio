import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-8 text-slate-200">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm sm:px-6 lg:px-8">
        <p>{dict.common.footer}</p>
        <p className="mt-2 text-slate-400">© {new Date().getFullYear()} Sukanya Kijjapalo</p>
      </div>
    </footer>
  );
}
