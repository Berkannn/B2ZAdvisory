import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function CbamIntro() {
  const t = await getTranslations("cbamIntro");
  const tSectors = await getTranslations("sectors");
  const points = t.raw("points") as string[];
  const sectorList = tSectors.raw("list") as string[];
  const sectorRows = [82, 64, 71, 55].map((value, i) => ({
    label: sectorList[i],
    value,
  }));

  return (
    <section className="section-padding bg-paper">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative">
          <div className="relative rounded-3xl bg-carbon-950 p-8 sm:p-10">
            <div
              className="absolute inset-0 rounded-3xl bg-grid-pattern opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow text-brand-300">CBAM</p>
              <p className="mt-3 font-display text-lg font-semibold text-white">
                Carbon Border Adjustment Mechanism
              </p>
              <div className="mt-8 space-y-4">
                {sectorRows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs text-carbon-300">
                      <span>{row.label}</span>
                      <span>{row.value}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-carbon-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t("description")}
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm text-carbon-700 sm:text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/cbam-nedir"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {t("linkLabel")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
