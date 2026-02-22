import { ui } from "@/lib/i18n";

export function SiteFooter() {
  return (
    <footer className="reveal border-t border-emerald-300/20 bg-[#040b08] py-8 text-emerald-100">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm sm:px-6 lg:px-8">
        <p className="heading-luxe text-lg tracking-wide text-emerald-50">{ui.footer.en}</p>
        <p className="mt-3 text-xs text-emerald-300/70">© {new Date().getFullYear()} Sukanya Kijjapalo</p>
      </div>
    </footer>
  );
}
