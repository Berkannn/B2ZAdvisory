import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function CtaBanner() {
  const t = await getTranslations("ctaBanner");

  return (
    <section className="section-padding bg-paper">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold-300/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-50 sm:text-lg">
              {t("description")}
            </p>
            <div className="mt-8">
              <Link href="/iletisim" className="btn-on-dark">
                {t("button")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
