import { getTranslations } from "next-intl/server";
import { Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-carbon-900">
          {t("title")}
        </h1>
        <p className="mt-3 text-carbon-600">{t("description")}</p>
        <Link href="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" />
          {t("button")}
        </Link>
      </div>
    </section>
  );
}
