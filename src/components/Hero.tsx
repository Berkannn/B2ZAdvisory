import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CheckCircle2, Leaf, TrendingDown } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function Hero() {
  const t = await getTranslations("hero");
  const badges = t.raw("badges") as string[];

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-[-10%] top-40 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-14 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up">
          <span className="badge-pill">
            <Leaf className="h-4 w-4" />
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-carbon-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {t("title")}{" "}
            <span className="relative inline-block text-brand-600">
              {t("titleHighlight")}
              <svg
                className="absolute -bottom-2 left-0 w-full text-brand-300"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9.5C60 3 240 3 298 9.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/iletisim" className="btn-primary">
              {t("primaryCta")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/hizmetler" className="btn-secondary">
              {t("secondaryCta")}
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2 text-sm font-medium text-carbon-600"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative animate-float rounded-3xl border border-carbon-100 bg-white p-6 shadow-xl shadow-carbon-900/10 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-carbon-400">
                  {t("card.scoreLabel")}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-carbon-900">
                  {t("card.facility")}
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {t("card.status")}
              </span>
            </div>

            <div className="mt-6 flex items-end gap-1.5">
              {[38, 52, 46, 60, 40, 30, 22].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-brand-300"
                  style={{ height: `${h * 1.4}px` }}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-carbon-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-semibold text-carbon-800">
                  {t("card.intensityLabel")}
                </span>
              </div>
              <span className="text-sm font-bold text-brand-700">-24%</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: t("card.stat1"), value: "1.2K" },
                { label: t("card.stat2"), value: "8" },
                { label: t("card.stat3"), value: "Q3" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-carbon-100 p-3 text-center"
                >
                  <p className="font-display text-lg font-bold text-carbon-900">
                    {stat.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-carbon-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute -right-6 -top-6 hidden rounded-2xl border border-carbon-100 bg-white px-4 py-3 shadow-lg shadow-carbon-900/10 sm:flex sm:items-center sm:gap-2"
            aria-hidden="true"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-600">
              <Leaf className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-carbon-800">
                {t("card.floatingTitle")}
              </p>
              <p className="text-[11px] text-carbon-400">
                {t("card.floatingSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
