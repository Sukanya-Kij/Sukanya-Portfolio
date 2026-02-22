"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Award, Calendar, X, ImageIcon, SearchX } from "lucide-react";
import { ui } from "@/lib/i18n";
import type { CertificateItem } from "@/lib/types";

function labelizeCategory(category: string): string {
  return category
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

function issueYear(issueDate: string): string {
  return issueDate.slice(0, 4);
}

function issueDateLabel(issueDate: string): string {
  if (!issueDate.includes("-")) {
    return issueDate;
  }

  const [year, month] = issueDate.split("-");
  const monthIndex = Number(month ?? "1") - 1;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${monthNames[monthIndex] ?? "Jan"} ${year}`;
}



export function CertificatesBrowser({ items }: { items: CertificateItem[] }) {
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [selected, setSelected] = useState<CertificateItem | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const categories = useMemo(() => ["all", ...new Set(items.map((item) => item.category))], [items]);
  const years = useMemo(() => ["all", ...new Set(items.map((item) => issueYear(item.issueDate)))], [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const yearMatch = year === "all" || issueYear(item.issueDate) === year;
      return categoryMatch && yearMatch;
    });
  }, [category, items, year]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    lastActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const container = dialogRef.current;
      if (!container) {
        return;
      }

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      lastActiveRef.current?.focus();
    };
  }, [selected]);

  return (
    <>
      <div className="reveal relative overflow-hidden rounded-2xl border border-emerald-300/40 bg-white/40 p-1.5 shadow-lg shadow-emerald-900/5 backdrop-blur-xl sm:p-2">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-emerald-500/10" />
        <div className="relative grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-inset ring-emerald-200/50 backdrop-blur-md transition-all focus-within:ring-emerald-400">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-emerald-800 uppercase">
              <Award className="h-3.5 w-3.5" />
              {ui.certificates.category}
            </div>
            <select
              className="w-full bg-transparent text-sm font-medium text-emerald-950 outline-hidden"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? ui.certificates.allCategories : labelizeCategory(value)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-inset ring-emerald-200/50 backdrop-blur-md transition-all focus-within:ring-emerald-400">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-emerald-800 uppercase">
              <Calendar className="h-3.5 w-3.5" />
              {ui.certificates.issueDate}
            </div>
            <select
              className="w-full bg-transparent text-sm font-medium text-emerald-950 outline-hidden"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              {years.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? ui.certificates.allYears : value}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-white/60 p-12 text-center shadow-inner backdrop-blur-sm">
          <SearchX className="mb-3 h-8 w-8 text-emerald-300" />
          <p className="text-sm font-medium text-emerald-800">{ui.certificates.noMatch}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-300/30 bg-white p-1 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c8a96f]/[0.02] to-emerald-500/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/50">
                {item.previewImage ? (
                  <Image
                    src={item.previewImage}
                    alt={item.title.en}
                    width={1200}
                    height={800}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center gap-2 text-emerald-700/60">
                    <ImageIcon className="h-8 w-8 opacity-50" />
                    <span className="text-sm font-medium">{ui.certificates.previewUnavailable}</span>
                  </div>
                )}
              </div>

              <div className="relative flex flex-1 flex-col p-4">
                <h2 className="text-lg font-bold leading-tight tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                  {item.title.en}
                </h2>
                <p className="mt-1 line-clamp-1 text-sm font-medium text-emerald-700">{item.issuer}</p>

                <div className="mt-4 border-l-2 border-[#c8a96f]/30 pl-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800/80">
                    <Calendar className="h-3 w-3 text-emerald-600" />
                    {issueDateLabel(item.issueDate)}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700/80">
                    <Award className="h-3 w-3 text-emerald-600" />
                    {labelizeCategory(item.category)}
                  </p>
                </div>

                {item.credentialId ? (
                  <p className="mt-3 text-xs font-medium text-emerald-600/70">
                    {ui.certificates.credentialId}: <span className="text-emerald-800 font-mono tracking-wide">{item.credentialId}</span>
                  </p>
                ) : null}

                {item.placeholder ? (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 border border-amber-200/50 w-fit">
                    {ui.certificates.placeholder}
                  </p>
                ) : null}

                {item.description ? (
                  <p className="mt-3 text-xs leading-relaxed text-emerald-800/80">
                    {item.description.en}
                  </p>
                ) : null}

                <div className="mt-auto pt-6 flex">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg border border-[#c8a96f]/60 bg-gradient-to-br from-[#dfca9f]/20 via-[#c8a96f]/10 to-transparent px-3 py-2 text-sm font-bold text-emerald-900 shadow-sm transition hover:border-[#c8a96f] hover:bg-emerald-50 hover:text-emerald-950"
                  >
                    <Eye className="h-4 w-4 text-[#c8a96f]" />
                    {ui.certificates.preview}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/75 p-4"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            ref={dialogRef}
            className="w-full max-w-4xl rounded-2xl bg-white p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title.en}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-emerald-100 pb-3">
              <h3 className="text-lg font-bold text-emerald-950">{selected.title.en}</h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                <X className="h-4 w-4" />
                {ui.certificates.close}
              </button>
            </div>

            {selected.previewImage ? (
              <div className="flex flex-col gap-4">
                <Image
                  src={selected.previewImage}
                  alt={selected.title.en}
                  width={1200}
                  height={800}
                  className="max-h-[65vh] w-full rounded-xl border border-emerald-200 object-contain bg-emerald-50/50"
                />
                {selected.description ? (
                  <p className="rounded-lg bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-800 border border-emerald-100/50">
                    {selected.description.en}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="flex h-[60vh] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-emerald-300 text-emerald-700 bg-emerald-50/30">
                <ImageIcon className="h-8 w-8 opacity-50" />
                <span className="text-sm font-medium">{ui.certificates.previewUnavailable}</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
