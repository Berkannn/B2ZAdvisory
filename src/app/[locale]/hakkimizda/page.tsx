import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Compass, Handshake, Microscope, RefreshCcw, Target } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import { buildAlternates } from "@/lib/seo";

const valueIcons = [Handshake, Microscope, Handshake, RefreshCcw];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: "seo.hakkimizda" });

  return {
    title: tSeo("title"),
    description: tSeo("description"),
    alternates: buildAlternates("/hakkimizda", locale),
    openGraph: {
      title: tSeo("title"),
      description: tSeo("description"),
      locale,
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <>
      <section className="section-padding bg-paper">
        <div className="container-page">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("intro")}
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="card-surface p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-carbon-900">
                {t("missionTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-carbon-600 sm:text-base">
                {t("mission")}
              </p>
            </div>
            <div className="card-surface p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                <Compass className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-carbon-900">
                {t("visionTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-carbon-600 sm:text-base">
                {t("vision")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading title={t("valuesTitle")} align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = valueIcons[i] ?? Handshake;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-carbon-100 p-6 text-center transition-colors hover:border-brand-200"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-carbon-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-carbon-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-carbon-950">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading title={t("approachTitle")} light />
            <p className="text-base leading-relaxed text-carbon-300 sm:text-lg">
              {t("approachDescription")}
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
