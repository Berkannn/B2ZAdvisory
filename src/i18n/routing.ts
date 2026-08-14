import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
    },
    "/cbam-nedir": {
      tr: "/cbam-nedir",
      en: "/what-is-cbam",
    },
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    // Sector slugs are intentionally identical across locales — see the
    // comment in src/lib/sectors.ts for why a dynamic segment can't safely
    // carry a per-locale translated value here.
    "/cbam/demir-celik": "/cbam/demir-celik",
    "/cbam/cimento": "/cbam/cimento",
    "/cbam/aluminyum": "/cbam/aluminyum",
    "/cbam/gubre": "/cbam/gubre",
    "/cbam/elektrik": "/cbam/elektrik",
    "/cbam/hidrojen": "/cbam/hidrojen",
    // CBAM guide content cluster (pillar = /cbam-nedir above).
    "/cbam-dogrulama-sureci": {
      tr: "/cbam-dogrulama-sureci",
      en: "/cbam-verification-process",
    },
    "/gercek-deger-varsayilan-deger-karsilastirma": {
      tr: "/gercek-deger-varsayilan-deger-karsilastirma",
      en: "/actual-value-vs-default-value",
    },
    "/aluminyum-sektorunde-cbam-see-hesaplama": {
      tr: "/aluminyum-sektorunde-cbam-see-hesaplama",
      en: "/aluminium-cbam-see-calculation",
    },
    "/demir-celik-sektorunde-cbam": {
      tr: "/demir-celik-sektorunde-cbam",
      en: "/iron-steel-cbam-guide",
    },
    "/cimento-sektorunde-cbam": {
      tr: "/cimento-sektorunde-cbam",
      en: "/cement-cbam-guide",
    },
    "/cbam-izleme-plani-nasil-hazirlanir": {
      tr: "/cbam-izleme-plani-nasil-hazirlanir",
      en: "/cbam-monitoring-plan-guide",
    },
    "/cbam-kayit-sistemi-acd-basvuru": {
      tr: "/cbam-kayit-sistemi-acd-basvuru",
      en: "/cbam-registry-acd-application",
    },
    "/cbam-sertifika-fiyatlari-2026-2027": {
      tr: "/cbam-sertifika-fiyatlari-2026-2027",
      en: "/cbam-certificate-prices-2026-2027",
    },
    "/cbam-maliyet-hesaplama-ornek-vaka": {
      tr: "/cbam-maliyet-hesaplama-ornek-vaka",
      en: "/cbam-cost-calculation-case-study",
    },
    "/ab-ithalatcisi-tedarikci-beklentileri": {
      tr: "/ab-ithalatcisi-tedarikci-beklentileri",
      en: "/eu-importer-supplier-requirements",
    },
    "/cbam-denetim-hazirlik-kontrol-listesi": {
      tr: "/cbam-denetim-hazirlik-kontrol-listesi",
      en: "/cbam-audit-preparation-checklist",
    },
    "/cbam-sikca-sorulan-sorular": {
      tr: "/cbam-sikca-sorulan-sorular",
      en: "/cbam-faq",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
