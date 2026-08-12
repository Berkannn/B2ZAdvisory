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
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
