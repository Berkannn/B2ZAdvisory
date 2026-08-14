import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import { buildAlternates } from "@/lib/seo";

const linkClass =
  "font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides.monitoringPlan" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: buildAlternates("/cbam-izleme-plani-nasil-hazirlanir", locale),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      locale,
      type: "article",
    },
  };
}

export default async function MonitoringPlanGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guides.monitoringPlan");
  const sections = t.raw("sections") as { heading: string; body: string[] }[];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("seoTitle"),
    description: t("seoDescription"),
    serviceType: "CBAM Monitoring Plan Preparation",
    areaServed: "EU",
    provider: { "@type": "Organization", name: "B2Z Advisory" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="section-padding bg-paper !pb-10">
        <div className="container-page">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t.rich("intro", {
              link: (chunks) => (
                <Link href="/cbam-nedir" className={linkClass}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-carbon-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-carbon-700 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-page max-w-3xl">
          <div className="flex items-start gap-4 rounded-2xl border border-dashed border-brand-300 bg-brand-50/60 p-6">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <div>
              <h2 className="font-display text-base font-semibold text-carbon-900">
                {t("toolCta.title")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-carbon-600">
                {t("toolCta.description")}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-600">
                {t("toolCta.placeholder")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <p className="text-sm leading-relaxed text-carbon-700 sm:text-base">
            {t.rich("relatedParagraph", {
              link: (chunks) => (
                <Link href="/cbam-dogrulama-sureci" className={linkClass}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
