"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = {
  tr: "TR",
  en: "EN",
};

export default function LocaleSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-semibold ${
        isDark
          ? "border-white/15 bg-white/5"
          : "border-carbon-200 bg-white"
      }`}
      role="group"
      aria-label="Dil seçimi / Language selection"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? isDark
                  ? "bg-white text-carbon-900"
                  : "bg-brand-600 text-white"
                : isDark
                  ? "text-white/70 hover:text-white"
                  : "text-carbon-500 hover:text-carbon-800"
            }`}
            aria-pressed={active}
          >
            {labels[loc] ?? loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
