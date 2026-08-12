import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathnames } from "@/i18n/routing";

export const siteUrl = "https://www.b2zpartners.com";

type Locale = (typeof routing.locales)[number];

/**
 * Builds a page's canonical URL plus its full hreflang map (self-referencing,
 * per Google's guidance). `href` must be a key from `routing.pathnames` so the
 * localized slug (e.g. /hizmetler vs /services) resolves per locale.
 */
export function buildAlternates(href: AppPathnames, locale: string) {
  return {
    canonical: `${siteUrl}${getPathname({ href, locale: locale as Locale })}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${siteUrl}${getPathname({ href, locale: l })}`]),
    ),
  };
}
