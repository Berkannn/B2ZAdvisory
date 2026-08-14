import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "guides.importerRequirements" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: buildAlternates("/ab-ithalatcisi-tedarikci-beklentileri", locale),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      locale,
      type: "article",
    },
  };
}

export default async function ImporterRequirementsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guides.importerRequirements");
  const sections = t.raw("sections") as { heading: string; body: string[] }[];

  return (
    <>
      <section className="section-padding bg-paper !pb-10">
        <div className="container-page">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t("intro")}
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
          <p className="text-sm leading-relaxed text-carbon-700 sm:text-base">
            {t.rich("relatedParagraph", {
              verificationLink: (chunks) => (
                <Link href="/cbam-dogrulama-sureci" className={linkClass}>
                  {chunks}
                </Link>
              ),
              valueLink: (chunks) => (
                <Link
                  href="/gercek-deger-varsayilan-deger-karsilastirma"
                  className={linkClass}
                >
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
