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
  const t = await getTranslations({ locale, namespace: "guides.valueComparison" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: buildAlternates("/gercek-deger-varsayilan-deger-karsilastirma", locale),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      locale,
      type: "article",
    },
  };
}

export default async function ValueComparisonGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guides.valueComparison");
  const sections = t.raw("sections") as { heading: string; body: string[] }[];
  const table = t.raw("exampleTable") as {
    title: string;
    note: string;
    headers: { method: string; intensity: string; volume: string; total: string };
    rows: { method: string; intensity: string; volume: string; totalEmissions: string }[];
    footnote: string;
  };

  return (
    <>
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
          <div className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-carbon-900">
              {table.title}
            </h2>
            <p className="mt-1 text-xs text-carbon-500">{table.note}</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-carbon-200 text-left text-xs uppercase tracking-wide text-carbon-500">
                    <th className="py-2 pr-4 font-semibold">{table.headers.method}</th>
                    <th className="py-2 pr-4 font-semibold">{table.headers.intensity}</th>
                    <th className="py-2 pr-4 font-semibold">{table.headers.volume}</th>
                    <th className="py-2 font-semibold">{table.headers.total}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.method} className="border-b border-carbon-100">
                      <td className="py-3 pr-4 font-medium text-carbon-900">{row.method}</td>
                      <td className="py-3 pr-4 text-carbon-700">{row.intensity}</td>
                      <td className="py-3 pr-4 text-carbon-700">{row.volume}</td>
                      <td className="py-3 text-carbon-700">{row.totalEmissions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-carbon-600">{table.footnote}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <p className="text-sm leading-relaxed text-carbon-700 sm:text-base">
            {t.rich("relatedParagraph", {
              link: (chunks) => (
                <Link href="/cbam-maliyet-hesaplama-ornek-vaka" className={linkClass}>
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
