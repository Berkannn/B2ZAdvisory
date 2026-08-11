import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");

  return (
    <section className="section-padding bg-paper">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="card-surface p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-carbon-900">
                {t("infoTitle")}
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="text-carbon-700 hover:text-brand-700"
                  >
                    {t("info.email")}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-carbon-700">{t("info.phone")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-carbon-700">{t("info.address")}</span>
                </li>
              </ul>
            </div>

            <div className="card-surface p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-carbon-900">
                <Clock className="h-5 w-5 text-brand-600" />
                {t("hoursTitle")}
              </h3>
              <p className="mt-3 text-sm text-carbon-600">{t("hours")}</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
