"use client";

import { useState } from "react";
import { ui } from "@/lib/i18n";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setState(initialState);
    } catch {
      setStatus("error");
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="reveal premium-card space-y-4 p-6">
      <label className="block text-sm font-medium text-emerald-900/90">
        {ui.contact.formName}
        <input
          required
          value={state.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-1 w-full min-h-[44px] rounded-xl border border-emerald-200 px-4 py-2"
          maxLength={120}
        />
      </label>

      <label className="block text-sm font-medium text-emerald-900/90">
        {ui.contact.formEmail}
        <input
          type="email"
          required
          value={state.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="mt-1 w-full min-h-[44px] rounded-xl border border-emerald-200 px-4 py-2"
          maxLength={180}
        />
      </label>

      <label className="block text-sm font-medium text-emerald-900/90">
        {ui.contact.formSubject}
        <input
          required
          value={state.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="mt-1 w-full min-h-[44px] rounded-xl border border-emerald-200 px-4 py-2"
          maxLength={160}
        />
      </label>

      <label className="block text-sm font-medium text-emerald-900/90">
        {ui.contact.formMessage}
        <textarea
          required
          value={state.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-1 min-h-[144px] w-full rounded-xl border border-emerald-200 px-4 py-3"
          maxLength={3000}
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input value={state.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary min-h-11 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-50"
      >
        {status === "submitting" ? ui.contact.submitting : ui.contact.submit}
      </button>

      {status === "success" ? <p className="text-sm text-emerald-700">{ui.contact.success}</p> : null}
      {status === "error" ? <p className="text-sm text-rose-700">{ui.contact.error}</p> : null}
    </form>
  );
}
