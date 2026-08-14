import type { MetadataRoute } from "next";
import { routing, type AppPathnames } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getSectorPathnameKey, sectorIds } from "@/lib/sectors";

const baseUrl = "https://www.b2zpartners.com";

const internalPaths: AppPathnames[] = [
  "/",
  "/hizmetler",
  "/cbam-nedir",
  "/hakkimizda",
  "/iletisim",
  ...sectorIds.map((id) => getSectorPathnameKey(id) as AppPathnames),
  // CBAM guide content cluster
  "/cbam-dogrulama-sureci",
  "/gercek-deger-varsayilan-deger-karsilastirma",
  "/aluminyum-sektorunde-cbam-see-hesaplama",
  "/demir-celik-sektorunde-cbam",
  "/cimento-sektorunde-cbam",
  "/cbam-izleme-plani-nasil-hazirlanir",
  "/cbam-kayit-sistemi-acd-basvuru",
  "/cbam-sertifika-fiyatlari-2026-2027",
  "/cbam-maliyet-hesaplama-ornek-vaka",
  "/ab-ithalatcisi-tedarikci-beklentileri",
  "/cbam-denetim-hazirlik-kontrol-listesi",
  "/cbam-sikca-sorulan-sorular",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return internalPaths.map((href) => ({
    url: `${baseUrl}${getPathname({ href, locale: routing.defaultLocale })}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${baseUrl}${getPathname({ href, locale })}`,
        ]),
      ),
    },
  }));
}
