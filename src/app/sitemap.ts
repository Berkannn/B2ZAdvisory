import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const baseUrl = "https://www.b2zpartners.com";

const internalPaths = [
  "/",
  "/hizmetler",
  "/cbam-nedir",
  "/hakkimizda",
  "/iletisim",
] as const;

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
