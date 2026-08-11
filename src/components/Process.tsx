import { getTranslations } from "next-intl/server";
import { Calculator, ClipboardList, LineChart, SearchCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const icons = [SearchCheck, Calculator, ClipboardList, LineChart];

export default async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="section-padding bg-paper">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
        />

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-carbon-200 lg:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => {
            const Icon = icons[i] ?? SearchCheck;
            return (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-600 bg-white text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-brand-600 lg:mt-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-carbon-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
