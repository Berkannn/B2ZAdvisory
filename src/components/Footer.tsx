import { getLocale, getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.66 10.6 20.53 3h-1.63l-5.97 6.6L8.15 3H3l7.2 9.98L3 21h1.63l6.3-6.97L15.85 21H21l-7.34-10.4Zm-2.23 2.47-.73-1L5.03 4.2h2.5l4.7 6.5.73 1.02 6.12 8.47h-2.5l-4.97-6.72Z" />
    </svg>
  );
}

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
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-carbon-300 transition-colors hover:border-brand-400 hover:text-white"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-carbon-300 transition-colors hover:border-brand-400 hover:text-white"
            >
              <XIcon />
            </a>
          </div>
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
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{tContact("info.address")}</span>
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
