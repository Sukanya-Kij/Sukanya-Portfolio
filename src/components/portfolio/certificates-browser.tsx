"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import type { CertificateItem, Locale } from "@/lib/types";

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
  const [year, month] = issueDate.split("-");
  const monthIndex = Number(month ?? "1") - 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[monthIndex] ?? "Jan"} ${year}`;
}

export function CertificatesBrowser({
  locale,
  items,
}: {
  locale: Locale;
  items: CertificateItem[];
}) {
  const dict = getDictionary(locale);
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [selected, setSelected] = useState<CertificateItem | null>(null);

  const categories = useMemo(
    () => ["all", ...new Set(items.map((item) => item.category))],
    [items],
  );
  const years = useMemo(() => ["all", ...new Set(items.map((item) => issueYear(item.issueDate)))], [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const yearMatch = year === "all" || issueYear(item.issueDate) === year;
      return categoryMatch && yearMatch;
    });
  }, [category, items, year]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="reveal grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          {dict.certificates.category}
          <select
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? dict.certificates.allCategories : labelizeCategory(value)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          {dict.certificates.issueDate}
          <select
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            {years.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? dict.certificates.allYears : value}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          {dict.certificates.noMatch}
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="reveal rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {item.previewImage ? (
                <Image
                  src={item.previewImage}
                  alt={item.title[locale]}
                  width={1200}
                  height={800}
                  className="h-44 w-full rounded-xl border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                  {dict.certificates.previewUnavailable}
                </div>
              )}

              <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title[locale]}</h2>
              <p className="text-sm text-slate-600">{item.issuer}</p>

              <p className="mt-2 text-xs text-slate-500">
                {dict.certificates.issueDate}: {issueDateLabel(item.issueDate)}
              </p>
              <p className="text-xs text-slate-500">
                {dict.certificates.category}: {labelizeCategory(item.category)}
              </p>

              {item.credentialId ? (
                <p className="mt-1 text-xs text-slate-500">
                  {dict.certificates.credentialId}: {item.credentialId}
                </p>
              ) : null}

              {item.placeholder ? (
                <p className="mt-2 text-xs font-semibold text-amber-700">{dict.certificates.placeholder}</p>
              ) : null}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {dict.certificates.preview}
                </button>

                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    download
                    className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    {dict.certificates.download}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title[locale]}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">{selected.title[locale]}</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
              >
                {dict.certificates.close}
              </button>
            </div>

            {selected.fileUrl ? (
              <iframe
                src={selected.fileUrl}
                title={selected.title[locale]}
                className="h-[70vh] w-full rounded-xl border border-slate-200"
              />
            ) : selected.previewImage ? (
              <Image
                src={selected.previewImage}
                alt={selected.title[locale]}
                width={1200}
                height={800}
                className="max-h-[70vh] w-full rounded-xl border border-slate-200 object-contain"
              />
            ) : (
              <div className="flex h-[70vh] items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500">
                {dict.certificates.previewUnavailable}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
