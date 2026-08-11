import { getTranslations } from "next-intl/server";
import { Award, FileCheck2, Handshake, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const icons = [Award, ShieldCheck, FileCheck2, Handshake];

export default async function WhyUs() {
  const t = await getTranslations("whyUs");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="relative overflow-hidden bg-carbon-950 section-padding">
      <div
        className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:36px_36px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="center"
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-brand-400/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon-300">
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
