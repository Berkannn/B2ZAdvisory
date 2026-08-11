import { getLocale, getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const tContact = await getTranslations("contactPage");

  const year = new Date().getFullYear();

  const serviceLinks = [
    { key: "impactAnalysis", label: tServices("items.0.title") },
    { key: "emissionCalc", label: tServices("items.1.title") },
    { key: "reporting", label: tServices("items.2.title") },
    { key: "netZero", label: tServices("items.4.title") },
  ];

  return (
    <footer className="border-t border-carbon-800 bg-carbon-950 text-carbon-200">
      <div className="container-page grid grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo locale={locale} variant="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-carbon-300">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">
            {t("columnsTitle.services")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {serviceLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href="/hizmetler"
                  className="text-carbon-300 transition-colors hover:text-brand-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">
            {t("columnsTitle.company")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/hakkimizda"
                className="text-carbon-300 transition-colors hover:text-brand-300"
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/cbam-nedir"
                className="text-carbon-300 transition-colors hover:text-brand-300"
              >
                {tNav("cbam")}
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="text-carbon-300 transition-colors hover:text-brand-300"
              >
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">
            {t("columnsTitle.contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-carbon-300">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a
                href={`mailto:${tContact("info.email")}`}
                className="transition-colors hover:text-brand-300"
              >
                {tContact("info.email")}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{tContact("info.phone")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-carbon-400 sm:flex-row lg:px-8">
          <p>
            © {year} B2Z Advisory. {t("rights")}
          </p>
          <p className="text-carbon-500">Business to Zero Carbon</p>
        </div>
      </div>
    </footer>
  );
}
