import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Calculator,
  ClipboardList,
  GraduationCap,
  Leaf,
  SearchCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeading from "./SectionHeading";

const icons: Record<string, LucideIcon> = {
  impactAnalysis: SearchCheck,
  emissionCalc: Calculator,
  reporting: ClipboardList,
  supplyChain: Truck,
  netZero: Leaf,
  training: GraduationCap,
};

export default async function ServicesPreview() {
  const t = await getTranslations("services");
  const items = t.raw("items") as {
    key: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/hizmetler"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {t("linkLabel")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.key] ?? Leaf;
            return (
              <div
                key={item.key}
                className="card-surface group flex flex-col gap-4 p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-carbon-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-carbon-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
