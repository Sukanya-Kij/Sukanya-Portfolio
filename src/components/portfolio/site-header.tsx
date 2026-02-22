"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, ui } from "@/lib/i18n";

function isCurrentPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    // Focus the first item on open
    const focusableElements = drawer.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = drawer.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (elements.length === 0) return;
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    drawer.addEventListener('keydown', handleTab);
    return () => drawer.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-300/20 bg-[#06110d]/84 text-emerald-50 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="reveal flex items-center justify-between gap-4">
          <Link
            href="/"
            className="heading-luxe inline-flex min-h-[44px] min-w-[44px] items-center text-lg font-semibold tracking-[0.1em] text-emerald-50 uppercase transition hover:text-emerald-200"
          >
            {ui.brand}
          </Link>

          <p className="hidden text-right text-sm text-emerald-200/85 lg:block">{ui.role.en}</p>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20 sm:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>

        <nav className="reveal mt-3 hidden items-center gap-3 text-sm font-medium text-emerald-100 sm:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-pill inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border px-5 py-2.5 transition ${active
                    ? "border-[#c8a96f]/60 bg-emerald-400/20 text-[#f5dfb2]"
                    : "border-emerald-300/15 bg-emerald-500/5 hover:border-[#c8a96f]/40 hover:bg-emerald-400/12"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/55 sm:hidden"
          onClick={() => setMenuOpen(false)}
          role="presentation"
        >
          <nav
            ref={drawerRef}
            id="mobile-nav-drawer"
            className="absolute top-0 right-0 h-full w-72 border-l border-emerald-300/25 bg-[#071813] p-4 pt-6 shadow-2xl"
            aria-label="Mobile primary"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="px-2 text-xs font-semibold tracking-[0.16em] text-emerald-200 uppercase">Navigation</p>
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-500/10 text-emerald-100 transition hover:bg-emerald-500/20 px-3 py-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <div className="space-y-3">
              {navItems.map((item) => {
                const active = isCurrentPath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-[48px] w-full items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${active
                        ? "border-[#c8a96f]/60 bg-emerald-400/20 text-[#f5dfb2]"
                        : "border-emerald-300/20 bg-emerald-500/8 text-emerald-50 hover:bg-emerald-500/16"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
