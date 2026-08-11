import { getTranslations } from "next-intl/server";
import {
  Factory,
  Flame,
  Sprout,
  Zap,
  FlaskConical,
  Atom,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const icons: LucideIcon[] = [Factory, Flame, Atom, Sprout, Zap, FlaskConical];

export default async function Sectors() {
  const t = await getTranslations("sectors");
  const list = t.raw("list") as string[];

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {list.map((sector, i) => {
            const Icon = icons[i] ?? Factory;
            return (
              <div
                key={sector}
                className="flex flex-col items-center gap-3 rounded-2xl border border-carbon-100 bg-paper px-4 py-7 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-carbon-800">
                  {sector}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
