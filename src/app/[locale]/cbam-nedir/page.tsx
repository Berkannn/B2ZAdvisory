import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowUpRight,
  Atom,
  CheckCircle2,
  Factory,
  FileWarning,
  Flame,
  FlaskConical,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/SectionHeading";

const sectorIcons: LucideIcon[] = [Factory, Flame, Atom, Sprout, Zap, FlaskConical];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cbamPage" });
  return { title: t("title") };
}

export default async function CbamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cbamPage");
  const tSectors = await getTranslations("sectors");
  const timeline = t.raw("timeline") as {
    period: string;
    title: string;
    description: string;
  }[];
  const meaningPoints = t.raw("meaningPoints") as string[];
  const sectorList = tSectors.raw("list") as string[];

  return (
    <>
      <section className="section-padding bg-paper">
        <div className="container-page">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t("intro")}
          </p>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-gold-200 bg-gold-50 p-6">
            <FileWarning className="mt-0.5 h-6 w-6 shrink-0 text-gold-600" />
            <div>
              <h3 className="font-display text-lg font-semibold text-carbon-900">
                {t("whyTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-700 sm:text-base">
                {t("whyDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading title={t("timelineTitle")} align="center" />
          <div className="relative mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-carbon-200 lg:block"
              aria-hidden="true"
            />
            {timeline.map((step, i) => (
              <div key={step.title} className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-600 bg-white font-display text-sm font-bold text-brand-700">
                  {i + 1}
                </span>
                <p className="mt-4 eyebrow">{step.period}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-carbon-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-page">
          <SectionHeading
            title={t("sectorsTitle")}
            description={t("sectorsDescription")}
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {sectorList.map((sector, i) => {
              const Icon = sectorIcons[i] ?? Factory;
              return (
                <div
                  key={sector}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-carbon-100 bg-white px-4 py-7 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-medium text-carbon-800">
                    {sector}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading title={t("meaningTitle")} />
          <ul className="space-y-4">
            {meaningPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm text-carbon-700 sm:text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-16 text-center sm:px-16">
            <div
              className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-50 sm:text-lg">
                {t("ctaDescription")}
              </p>
              <div className="mt-8">
                <Link href="/iletisim" className="btn-on-dark">
                  {t("ctaButton")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
