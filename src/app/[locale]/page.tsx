import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import CbamIntro from "@/components/CbamIntro";
import ServicesPreview from "@/components/ServicesPreview";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Sectors from "@/components/Sectors";
import CtaBanner from "@/components/CtaBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CbamIntro />
      <ServicesPreview />
      <Process />
      <Sectors />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
