import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Leaf,
  SearchCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/SectionHeading";
import { buildAlternates } from "@/lib/seo";

const icons: Record<string, LucideIcon> = {
  impactAnalysis: SearchCheck,
  emissionCalc: Calculator,
  reporting: ClipboardList,
  supplyChain: Truck,
  netZero: Leaf,
  training: GraduationCap,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: "seo.hizmetler" });

  return {
    title: tSeo("title"),
    description: tSeo("description"),
    alternates: buildAlternates("/hizmetler", locale),
    openGraph: {
      title: tSeo("title"),
      description: tSeo("description"),
      locale,
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const items = t.raw("items") as {
    key: string;
    title: string;
    description: string;
    bullets: string[];
  }[];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "Service",
      position: i + 1,
      name: item.title,
      description: item.description,
      provider: { "@type": "Organization", name: "B2Z Advisory" },
    })),
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
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[item.key] ?? Leaf;
            return (
              <div
                key={item.key}
                className="card-surface flex flex-col p-7 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl font-bold text-carbon-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-carbon-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-600 sm:text-base">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-carbon-100 pt-5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-carbon-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-white">
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
