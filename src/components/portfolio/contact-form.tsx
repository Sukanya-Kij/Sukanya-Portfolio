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
    <form onSubmit={onSubmit} className="space-y-5 p-8 sm:p-10">
      <div className="mb-8">
        <h2 className="heading-luxe text-3xl text-emerald-950 mb-2">Send a Message</h2>
        <p className="text-sm text-emerald-800/80 font-medium">I&apos;m currently available for new opportunities.</p>
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-semibold tracking-wide uppercase text-[#b89555]">
          {ui.contact.formName}
          <input
            required
            value={state.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full min-h-[48px] rounded-xl border border-emerald-200/60 bg-white/50 px-4 py-3 text-emerald-950 placeholder-emerald-900/40 focus:border-[#c8a96f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c8a96f]/50 transition-all shadow-sm"
            maxLength={120}
          />
        </label>

        <label className="block text-sm font-semibold tracking-wide uppercase text-[#b89555]">
          {ui.contact.formEmail}
          <input
            type="email"
            required
            value={state.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full min-h-[48px] rounded-xl border border-emerald-200/60 bg-white/50 px-4 py-3 text-emerald-950 placeholder-emerald-900/40 focus:border-[#c8a96f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c8a96f]/50 transition-all shadow-sm"
            maxLength={180}
          />
        </label>

        <label className="block text-sm font-semibold tracking-wide uppercase text-[#b89555]">
          {ui.contact.formSubject}
          <input
            required
            value={state.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className="mt-2 w-full min-h-[48px] rounded-xl border border-emerald-200/60 bg-white/50 px-4 py-3 text-emerald-950 placeholder-emerald-900/40 focus:border-[#c8a96f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c8a96f]/50 transition-all shadow-sm"
            maxLength={160}
          />
        </label>

        <label className="block text-sm font-semibold tracking-wide uppercase text-[#b89555]">
          {ui.contact.formMessage}
          <textarea
            required
            value={state.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="mt-2 min-h-[160px] w-full rounded-xl border border-emerald-200/60 bg-white/50 px-4 py-3 text-emerald-950 placeholder-emerald-900/40 focus:border-[#c8a96f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c8a96f]/50 transition-all shadow-sm resize-y"
            maxLength={3000}
          />
        </label>
      </div>

      <label className="hidden" aria-hidden="true">
        Website
        <input value={state.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full min-h-[52px] rounded-xl bg-gradient-to-r from-[#c8a96f] to-[#b89555] px-6 py-3.5 text-sm font-bold tracking-wider text-emerald-950 shadow-lg shadow-[#c8a96f]/20 hover:shadow-[#c8a96f]/40 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-emerald-950/20 border-t-emerald-950 animate-spin"></div>
            {ui.contact.submitting}
          </>
        ) : ui.contact.submit}
      </button>

      {status === "success" ? (
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex gap-3 text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <p className="text-sm font-medium">{ui.contact.success}</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex gap-3 text-rose-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          <p className="text-sm font-medium">{ui.contact.error}</p>
        </div>
      ) : null}
    </form>
  );
}
