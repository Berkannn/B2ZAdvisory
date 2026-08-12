import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import {
  ArrowUpRight,
  Atom,
  CheckCircle2,
  Factory,
  FlaskConical,
  Flame,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import { buildAlternates, siteUrl } from "@/lib/seo";
import {
  getSectorIdBySlug,
  getSectorPathnameKey,
  sectorIds,
  sectors,
  type SectorId,
} from "@/lib/sectors";

const sectorIcons: Record<SectorId, LucideIcon> = {
  "iron-steel": Factory,
  cement: Flame,
  aluminium: Atom,
  fertilizers: Sprout,
  electricity: Zap,
  hydrogen: FlaskConical,
};

type Locale = "tr" | "en";

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    sectorIds.map((id) => ({ locale, sector: sectors[id].slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}): Promise<Metadata> {
  const { locale, sector: sectorSlug } = await params;
  const sectorId = getSectorIdBySlug(sectorSlug);
  if (!sectorId) return {};

  const t = await getTranslations({
    locale,
    namespace: `sectorPages.items.${sectorId}`,
  });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: buildAlternates(getSectorPathnameKey(sectorId) as AppPathnames, locale),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      locale,
      type: "website",
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector: sectorSlug } = await params;
  const localeTyped = locale as Locale;
  const sectorId = getSectorIdBySlug(sectorSlug);

  if (!sectorId) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations(`sectorPages.items.${sectorId}`);
  const tShared = await getTranslations("sectorPages");
  const tAllSectors = await getTranslations("sectorPages.items");
  const products = t.raw("products") as string[];
  const challenges = t.raw("challenges") as string[];
  const Icon = sectorIcons[sectorId];

  const otherSectors = sectorIds
    .filter((id) => id !== sectorId)
    .map((id) => ({
      id,
      name: tAllSectors(`${id}.name`),
      href: getPathname({ href: getSectorPathnameKey(id) as AppPathnames, locale: localeTyped }),
    }));

  const canonicalUrl = `${siteUrl}${getPathname({
    href: getSectorPathnameKey(sectorId) as AppPathnames,
    locale: localeTyped,
  })}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tShared("breadcrumbHome"),
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tShared("breadcrumbCbam"),
        item: `${siteUrl}${getPathname({ href: "/cbam-nedir", locale: localeTyped })}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("name"),
        item: canonicalUrl,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("seoTitle"),
    description: t("seoDescription"),
    serviceType: "CBAM Consulting",
    areaServed: "EU",
    provider: { "@type": "Organization", name: "B2Z Advisory" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="section-padding bg-paper !pb-10">
        <div className="container-page">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon className="h-6 w-6" />
            </span>
            <SectionHeading eyebrow={tShared("eyebrow")} title={t("title")} />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-carbon-900">
              {tShared("productsTitle")}
            </h2>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product} className="flex items-start gap-2.5 text-sm text-carbon-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {product}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-carbon-900">
              {tShared("challengesTitle")}
            </h2>
            <ul className="mt-5 space-y-3">
              {challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2.5 text-sm text-carbon-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-page">
          <div className="card-surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-carbon-900">
                {tShared("howWeHelpTitle")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-carbon-600 sm:text-base">
                {tShared("howWeHelpDescription")}
              </p>
            </div>
            <Link href="/hizmetler" className="btn-primary shrink-0">
              {tShared("howWeHelpLinkLabel")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="font-display text-xl font-semibold text-carbon-900">
            {tShared("relatedTitle")}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {otherSectors.map((sector) => {
              const OtherIcon = sectorIcons[sector.id];
              return (
                <NextLink
                  key={sector.id}
                  href={sector.href}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-carbon-100 bg-paper px-4 py-6 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                    <OtherIcon className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-medium text-carbon-800 sm:text-sm">
                    {sector.name}
                  </p>
                </NextLink>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
