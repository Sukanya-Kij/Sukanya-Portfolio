"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

function isImageAsset(url: string): boolean {
  return /\.(png|jpe?g|webp|gif|avif)$/i.test(url);
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
      <div className="reveal premium-card grid gap-4 p-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-emerald-900/90">
          {ui.certificates.category}
          <select
            className="mt-1 min-h-11 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2"
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

        <label className="text-sm font-medium text-emerald-900/90">
          {ui.certificates.issueDate}
          <select
            className="mt-1 min-h-11 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2"
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

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-emerald-200 bg-white p-6 text-sm text-emerald-700/80">{ui.certificates.noMatch}</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="reveal premium-card p-4">
              {item.previewImage ? (
                <Image
                  src={item.previewImage}
                  alt={item.title.en}
                  width={1200}
                  height={800}
                  className="media-lift h-44 w-full rounded-xl border border-emerald-200 object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-emerald-300 bg-emerald-50 text-sm text-emerald-700/75">
                  {ui.certificates.previewUnavailable}
                </div>
              )}

              <h2 className="heading-luxe mt-4 text-3xl leading-tight text-emerald-950">{item.title.en}</h2>
              <p className="text-sm text-emerald-800/80">{item.issuer}</p>

              <p className="mt-2 text-xs text-emerald-700/80">
                {ui.certificates.issueDate}: {issueDateLabel(item.issueDate)}
              </p>
              <p className="text-xs text-emerald-700/80">
                {ui.certificates.category}: {labelizeCategory(item.category)}
              </p>

              {item.credentialId ? (
                <p className="mt-1 text-xs text-emerald-700/80">
                  {ui.certificates.credentialId}: {item.credentialId}
                </p>
              ) : null}

              {item.placeholder ? <p className="mt-2 text-xs font-semibold text-amber-700">{ui.certificates.placeholder}</p> : null}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="btn-secondary min-h-11 rounded-lg border border-emerald-300 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50"
                >
                  {ui.certificates.preview}
                </button>

                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    download
                    className="btn-primary inline-flex min-h-11 items-center rounded-lg bg-emerald-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
                  >
                    {ui.certificates.download}
                  </a>
                ) : null}
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
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-emerald-950">{selected.title.en}</h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                className="min-h-11 rounded-lg border border-emerald-300 px-3 py-1.5 text-sm text-emerald-800"
              >
                {ui.certificates.close}
              </button>
            </div>

            {selected.fileUrl && isImageAsset(selected.fileUrl) ? (
              <Image
                src={selected.fileUrl}
                alt={selected.title.en}
                width={1200}
                height={800}
                className="max-h-[70vh] w-full rounded-xl border border-emerald-200 object-contain"
              />
            ) : selected.fileUrl ? (
              <iframe src={selected.fileUrl} title={selected.title.en} className="h-[70vh] w-full rounded-xl border border-emerald-200" />
            ) : selected.previewImage ? (
              <Image
                src={selected.previewImage}
                alt={selected.title.en}
                width={1200}
                height={800}
                className="max-h-[70vh] w-full rounded-xl border border-emerald-200 object-contain"
              />
            ) : (
              <div className="flex h-[70vh] items-center justify-center rounded-xl border border-dashed border-emerald-300 text-sm text-emerald-700">
                {ui.certificates.previewUnavailable}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
