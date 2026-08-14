import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NextLink from "next/link";
import { HelpCircle } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import FaqJsonLd from "@/components/FaqJsonLd";
import { buildAlternates } from "@/lib/seo";

type FaqItem = {
  question: string;
  answer: string;
  relatedLabel: string | null;
  relatedHref: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides.faq" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: buildAlternates("/cbam-sikca-sorulan-sorular", locale),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      locale,
      type: "website",
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeTyped = locale as "tr" | "en";
  setRequestLocale(locale);

  const t = await getTranslations("guides.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <>
      <FaqJsonLd
        items={items.map(({ question, answer }) => ({ question, answer }))}
      />

      <section className="section-padding bg-paper !pb-10">
        <div className="container-page">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-carbon-600 sm:text-lg">
            {t.rich("intro", {
              link: (chunks) => (
                <Link
                  href="/iletisim"
                  className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl space-y-6">
          {items.map((item) => (
            <div key={item.question} className="card-surface p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <h2 className="font-display text-base font-semibold text-carbon-900 sm:text-lg">
                    {item.question}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-carbon-700 sm:text-base">
                    {item.answer}
                  </p>
                  {item.relatedHref && item.relatedLabel && (
                    <NextLink
                      href={getPathname({
                        href: item.relatedHref as AppPathnames,
                        locale: localeTyped,
                      })}
                      className="mt-3 inline-block text-sm font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
                    >
                      {item.relatedLabel}
                    </NextLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
