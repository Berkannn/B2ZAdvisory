"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    // NOTE: This form is not yet wired to a backend. Connect it to an email
    // service (e.g. Resend, SendGrid) or a custom API route before going live.
    window.setTimeout(() => {
      setStatus("success");
    }, 700);
  }

  if (status === "success") {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-semibold text-carbon-900">
          {t("successTitle")}
        </h3>
        <p className="max-w-sm text-sm text-carbon-600">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-carbon-800"
          >
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("namePlaceholder")}
            className="mt-2 w-full rounded-xl border border-carbon-200 bg-white px-4 py-2.5 text-sm text-carbon-900 placeholder:text-carbon-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-carbon-800"
          >
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="mt-2 w-full rounded-xl border border-carbon-200 bg-white px-4 py-2.5 text-sm text-carbon-900 placeholder:text-carbon-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="text-sm font-medium text-carbon-800"
          >
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder={t("companyPlaceholder")}
            className="mt-2 w-full rounded-xl border border-carbon-200 bg-white px-4 py-2.5 text-sm text-carbon-900 placeholder:text-carbon-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="text-sm font-medium text-carbon-800"
          >
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="mt-2 w-full rounded-xl border border-carbon-200 bg-white px-4 py-2.5 text-sm text-carbon-900 placeholder:text-carbon-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-carbon-800"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="mt-2 w-full resize-none rounded-xl border border-carbon-200 bg-white px-4 py-2.5 text-sm text-carbon-900 placeholder:text-carbon-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-carbon-400">
        {t("note")}
      </p>
    </form>
  );
}
